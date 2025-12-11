

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS room_type TEXT,
ADD COLUMN IF NOT EXISTS check_in DATE,
ADD COLUMN IF NOT EXISTS check_out DATE,
ADD COLUMN IF NOT EXISTS check_out_time TIME;

CREATE INDEX IF NOT EXISTS idx_bookings_room_type ON bookings(room_type);

CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_check_out ON bookings(check_out);

CREATE INDEX IF NOT EXISTS idx_bookings_room_availability 
ON bookings(room_type, check_in, check_out, status) 
WHERE status IN ('confirmed', 'pending');

COMMENT ON COLUMN bookings.room_type IS 'Type of room booked: earth-and-clay, bloom-and-herbs, stone-and-fog, golden-grasslands, forest-bathing, water-and-sky';

COMMENT ON COLUMN bookings.check_in IS 'Check-in date for stay bookings';

COMMENT ON COLUMN bookings.check_out IS 'Check-out date for stay bookings';

COMMENT ON COLUMN bookings.check_out_time IS 'Check-out time (e.g., 15:00 for 3 PM)';

CREATE OR REPLACE FUNCTION check_room_availability(
  p_room_type TEXT,
  p_check_in DATE,
  p_check_out DATE,
  p_check_out_time TIME DEFAULT '15:00:00'
)
RETURNS TABLE (
  is_available BOOLEAN,
  booked_until DATE,
  booked_until_time TIME,
  message TEXT
) AS $$
DECLARE
  v_conflicting_booking RECORD;
  v_booked_until DATE;
  v_booked_until_time TIME;
BEGIN

  SELECT 
    check_out,
    check_out_time
  INTO v_conflicting_booking
  FROM bookings
  WHERE 
    room_type = p_room_type
    AND status IN ('confirmed', 'pending')
    AND (

      (check_in IS NOT NULL AND check_in <= p_check_out AND check_out >= p_check_in)
      OR

      (check_out = p_check_in AND check_out_time IS NOT NULL AND check_out_time > p_check_out_time)
    )
  ORDER BY check_out DESC, check_out_time DESC
  LIMIT 1;

  IF v_conflicting_booking IS NULL THEN
    RETURN QUERY SELECT TRUE, NULL::DATE, NULL::TIME, 'Room is available'::TEXT;
    RETURN;
  END IF;

  v_booked_until := v_conflicting_booking.check_out;
  v_booked_until_time := COALESCE(v_conflicting_booking.check_out_time, '15:00:00'::TIME);

  RETURN QUERY SELECT 
    FALSE,
    v_booked_until,
    v_booked_until_time,
    format('Sorry, this room is booked until %s at %s. Please book after this date.', 
           v_booked_until::TEXT, 
           to_char(v_booked_until_time, 'HH24:MI'))::TEXT;
END;
$$ LANGUAGE plpgsql;

GRANT EXECUTE ON FUNCTION check_room_availability TO anon, authenticated;

CREATE OR REPLACE VIEW room_availability AS
SELECT 
  room_type,
  check_in,
  check_out,
  check_out_time,
  status,
  customer_name,
  customer_email,
  created_at
FROM bookings
WHERE 
  room_type IS NOT NULL
  AND status IN ('confirmed', 'pending')
ORDER BY check_out DESC, check_out_time DESC;

GRANT SELECT ON room_availability TO anon, authenticated;

DROP POLICY IF EXISTS "Allow public to check room availability" ON bookings;

CREATE POLICY "Allow public to check room availability" ON bookings
  FOR SELECT
  TO public
  USING (

    room_type IS NOT NULL
  );

