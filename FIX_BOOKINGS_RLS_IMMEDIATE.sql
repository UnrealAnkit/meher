

DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'bookings'
    ) 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
            r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.insert_booking(
  p_event_id UUID DEFAULT NULL,
  p_event_title TEXT,
  p_event_date DATE,
  p_selected_slot TEXT,
  p_price TEXT,
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_status TEXT DEFAULT 'pending',
  p_notes TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  booking_id UUID;
BEGIN
  INSERT INTO bookings (
    event_id, event_title, event_date, selected_slot, price,
    customer_name, customer_email, customer_phone, status, notes
  ) VALUES (
    p_event_id, p_event_title, p_event_date, p_selected_slot, p_price,
    p_customer_name, p_customer_email, p_customer_phone, p_status, p_notes
  ) RETURNING id INTO booking_id;
  RETURN booking_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.insert_booking TO anon;
GRANT EXECUTE ON FUNCTION public.insert_booking TO public;
GRANT EXECUTE ON FUNCTION public.insert_booking TO authenticated;

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO public;

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon booking inserts" 
ON bookings
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow authenticated to read bookings" 
ON bookings
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated to update bookings" 
ON bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete bookings" 
ON bookings
FOR DELETE
TO authenticated
USING (true);

SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'insert_booking';

