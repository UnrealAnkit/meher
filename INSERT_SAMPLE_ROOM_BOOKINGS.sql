

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
) VALUES
  (
    'MEHR Stay Booking',
    '2025-11-20',
    '6 nights - 2 adults',
    '₹19,200',
    'Test Guest - Earth & Clay',
    'test-earth-clay@example.com',
    '+911234567890',
    'confirmed',
    'earth-and-clay',
    '2025-11-20',
    '2025-11-26',
    '15:00:00',
    'Sample booking for testing - All rooms booked until Nov 26, 3 PM'
  ),
  (
    'MEHR Stay Booking',
    '2025-11-20',
    '6 nights - 2 adults',
    '₹19,200',
    'Test Guest - Bloom and Herbs',
    'test-bloom-herbs@example.com',
    '+911234567891',
    'confirmed',
    'bloom-and-herbs',
    '2025-11-20',
    '2025-11-26',
    '15:00:00',
    'Sample booking for testing - All rooms booked until Nov 26, 3 PM'
  ),
  (
    'MEHR Stay Booking',
    '2025-11-20',
    '6 nights - 2 adults',
    '₹15,000',
    'Test Guest - Stone and Fog',
    'test-stone-fog@example.com',
    '+911234567892',
    'confirmed',
    'stone-and-fog',
    '2025-11-20',
    '2025-11-26',
    '15:00:00',
    'Sample booking for testing - All rooms booked until Nov 26, 3 PM'
  ),
  (
    'MEHR Stay Booking',
    '2025-11-20',
    '6 nights - 2 adults',
    '₹18,000',
    'Test Guest - Golden Grasslands',
    'test-golden-grasslands@example.com',
    '+911234567893',
    'confirmed',
    'golden-grasslands',
    '2025-11-20',
    '2025-11-26',
    '15:00:00',
    'Sample booking for testing - All rooms booked until Nov 26, 3 PM'
  ),
  (
    'MEHR Stay Booking',
    '2025-11-20',
    '6 nights - 2 adults',
    '₹19,200',
    'Test Guest - Forest Bathing',
    'test-forest-bathing@example.com',
    '+911234567894',
    'confirmed',
    'forest-bathing',
    '2025-11-20',
    '2025-11-26',
    '15:00:00',
    'Sample booking for testing - All rooms booked until Nov 26, 3 PM'
  ),
  (
    'MEHR Stay Booking',
    '2025-11-20',
    '6 nights - 2 adults',
    '₹15,000',
    'Test Guest - Water and Sky',
    'test-water-sky@example.com',
    '+911234567895',
    'confirmed',
    'water-and-sky',
    '2025-11-20',
    '2025-11-26',
    '15:00:00',
    'Sample booking for testing - All rooms booked until Nov 26, 3 PM'
  );

SELECT 
  room_type,
  customer_name,
  check_in,
  check_out,
  check_out_time,
  status
FROM bookings
WHERE room_type IS NOT NULL
ORDER BY room_type, check_out DESC;

