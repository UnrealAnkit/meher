

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  check_out_time,
  customer_name,
  customer_email,
  customer_phone,
  price,
  status,
  payment_id,
  order_id,
  notes,
  created_at,
  updated_at
FROM bookings
WHERE room_type IS NOT NULL
ORDER BY check_out DESC, check_in DESC;

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  check_out_time,
  customer_name,
  customer_email,
  status,
  price
FROM bookings
WHERE room_type = 'earth-and-clay'
ORDER BY check_out DESC;

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  customer_name,
  customer_email,
  status
FROM bookings
WHERE room_type IS NOT NULL
  AND status = 'confirmed'
ORDER BY check_out DESC;

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  check_out_time,
  customer_name,
  customer_email,
  customer_phone,
  status,
  price
FROM bookings
WHERE room_type IS NOT NULL
  AND check_in >= CURRENT_DATE
ORDER BY check_in ASC;

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  check_out_time,
  customer_name,
  customer_email,
  status
FROM bookings
WHERE room_type IS NOT NULL
  AND check_in <= CURRENT_DATE
  AND check_out >= CURRENT_DATE
  AND status IN ('confirmed', 'pending')
ORDER BY room_type, check_out ASC;

SELECT 
  room_type,
  COUNT(*) as total_bookings,
  COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_bookings,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_bookings,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings
FROM bookings
WHERE room_type IS NOT NULL
GROUP BY room_type
ORDER BY room_type;

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  customer_name,
  customer_email,
  status,
  price
FROM bookings
WHERE room_type IS NOT NULL
  AND check_in >= '2025-11-01'
  AND check_out <= '2025-11-30'
ORDER BY check_in ASC;

SELECT 
  id,
  room_type,
  check_in,
  check_out,
  customer_name,
  customer_email,
  price,
  payment_id,
  order_id,
  status
FROM bookings
WHERE room_type IS NOT NULL
  AND payment_id IS NOT NULL
ORDER BY created_at DESC;

INSERT INTO bookings (
  event_title,
  event_date,
  selected_slot,
  price,
  customer_name,
  customer_email,
  customer_phone,
  status,
  room_type,
  check_in,
  check_out,
  check_out_time,
  notes
) VALUES (
  'MEHR Stay Booking',
  '2025-12-01',
  '2 night(s) - 2 adult(s)',
  '₹6,400',
  'John Doe',
  'john.doe@example.com',
  '+911234567890',
  'confirmed',
  'earth-and-clay',
  '2025-12-01',
  '2025-12-03',
  '15:00:00',
  'Admin created booking'
);

SELECT * FROM check_room_availability(
  'earth-and-clay'::TEXT,
  '2025-12-01'::DATE,
  '2025-12-03'::DATE,
  '15:00:00'::TIME
);

SELECT 
  id,
  room_type,
  TO_CHAR(check_in, 'DD Mon YYYY') as check_in_formatted,
  TO_CHAR(check_out, 'DD Mon YYYY') as check_out_formatted,
  check_out_time,
  customer_name,
  customer_email,
  price,
  status
FROM bookings
WHERE room_type IS NOT NULL
ORDER BY check_out DESC;

SELECT 
  TO_CHAR(check_in, 'YYYY-MM') as month,
  room_type,
  COUNT(*) as booking_count
FROM bookings
WHERE room_type IS NOT NULL
  AND check_in >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '6 months')
GROUP BY TO_CHAR(check_in, 'YYYY-MM'), room_type
ORDER BY month DESC, room_type;

SELECT 
  b.id,
  b.room_type,
  b.check_in,
  b.check_out,
  b.check_out_time,
  b.customer_name,
  b.customer_email,
  b.customer_phone,
  b.price,
  b.status,
  b.payment_id,
  b.order_id,
  b.notes,
  b.created_at,
  b.updated_at
FROM bookings b
WHERE b.room_type IS NOT NULL
ORDER BY b.check_out DESC, b.check_in DESC;

