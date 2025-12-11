

DELETE FROM bookings 
WHERE room_type = 'bloom-and-herbs' 
AND customer_email = 'test-bloom@example.com';

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
  '2025-11-20',
  '6 nights - 2 adults',
  '₹19,200',
  'Test Booking',
  'test-bloom@example.com',
  '+911234567890',
  'confirmed',
  'bloom-and-herbs',
  '2025-11-20',
  '2025-11-26',
  '15:00:00',
  'Test booking - Room booked until Nov 26, 2025 at 3 PM'
);

SELECT 
  room_type,
  customer_name,
  check_in,
  check_out,
  check_out_time,
  status
FROM bookings
WHERE room_type = 'bloom-and-herbs'
ORDER BY check_out DESC;

