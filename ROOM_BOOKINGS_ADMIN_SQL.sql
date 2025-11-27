-- SQL Queries for Room Bookings Admin Panel
-- Copy and paste these queries into Supabase SQL Editor
--
-- ⚠️ IMPORTANT NOTES:
-- 1. Queries #10 and #11 (UPDATE/DELETE) are COMMENTED OUT for safety
-- 2. To use UPDATE/DELETE queries:
--    a) First run query #1 to get booking IDs
--    b) Copy an actual UUID from the results (looks like: 123e4567-e89b-12d3-a456-426614174000)
--    c) Replace 'REPLACE-WITH-ACTUAL-UUID-FROM-QUERY-1' with the real UUID
--    d) Uncomment the query (remove the -- at the start of each line) before running
-- 3. Never use placeholder text like 'booking-id-here' - it will cause errors!

-- ============================================
-- 1. VIEW ALL ROOM BOOKINGS
-- ============================================
-- This query shows all room bookings with all details
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

-- ============================================
-- 2. VIEW BOOKINGS BY ROOM TYPE
-- ============================================
-- Replace 'earth-and-clay' with any room type:
-- 'earth-and-clay', 'bloom-and-herbs', 'stone-and-fog', 
-- 'golden-grasslands', 'forest-bathing', 'water-and-sky'
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

-- ============================================
-- 3. VIEW BOOKINGS BY STATUS
-- ============================================
-- Shows all confirmed room bookings
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

-- ============================================
-- 4. VIEW UPCOMING ROOM BOOKINGS
-- ============================================
-- Shows all room bookings starting from today onwards
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

-- ============================================
-- 5. VIEW CURRENT OCCUPIED ROOMS
-- ============================================
-- Shows rooms that are currently occupied (check-in <= today <= check-out)
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

-- ============================================
-- 6. VIEW ROOM AVAILABILITY SUMMARY
-- ============================================
-- Shows count of bookings per room type
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

-- ============================================
-- 7. VIEW BOOKINGS BY DATE RANGE
-- ============================================
-- Replace dates as needed
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

-- ============================================
-- 8. VIEW BOOKINGS WITH PAYMENT INFORMATION
-- ============================================
-- Shows only bookings with payment IDs
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

-- ============================================
-- 9. CREATE A NEW ROOM BOOKING (INSERT)
-- ============================================
-- Example: Insert a new room booking
-- Modify the values as needed
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
  '2025-12-01',  -- This will be set to check_in date
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

-- ============================================
-- 10. UPDATE A ROOM BOOKING
-- ============================================
-- IMPORTANT: Replace the UUID below with an actual booking ID from your database
-- To get a booking ID, first run query #1 (View All Room Bookings)
-- Example UUID format: '123e4567-e89b-12d3-a456-426614174000'
-- 
-- Step 1: First, get a booking ID by running query #1
-- Step 2: Copy the ID from the results
-- Step 3: Uncomment and modify the query below with the actual UUID
--
-- UPDATE bookings
-- SET 
--   room_type = 'bloom-and-herbs',
--   check_in = '2025-12-05',
--   check_out = '2025-12-07',
--   check_out_time = '15:00:00',
--   status = 'confirmed',
--   notes = 'Updated booking dates'
-- WHERE id = 'REPLACE-WITH-ACTUAL-UUID-FROM-QUERY-1';  -- Replace with actual UUID from query #1

-- ============================================
-- 11. DELETE A ROOM BOOKING
-- ============================================
-- IMPORTANT: Replace the UUID below with an actual booking ID from your database
-- To get a booking ID, first run query #1 (View All Room Bookings)
-- WARNING: This permanently deletes the booking - USE WITH CAUTION!
-- 
-- Step 1: First, get a booking ID by running query #1
-- Step 2: Copy the ID from the results
-- Step 3: Uncomment and modify the query below with the actual UUID
--
-- DELETE FROM bookings
-- WHERE id = 'REPLACE-WITH-ACTUAL-UUID-FROM-QUERY-1'  -- Replace with actual UUID from query #1
--   AND room_type IS NOT NULL;

-- ============================================
-- 12. CHECK ROOM AVAILABILITY FOR A DATE
-- ============================================
-- Check if a specific room is available for given dates
-- This uses the check_room_availability function
SELECT * FROM check_room_availability(
  'earth-and-clay'::TEXT,
  '2025-12-01'::DATE,
  '2025-12-03'::DATE,
  '15:00:00'::TIME
);

-- ============================================
-- 13. VIEW ALL ROOM BOOKINGS WITH FORMATTED DATES
-- ============================================
-- Shows bookings with human-readable date formats
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

-- ============================================
-- 14. COUNT BOOKINGS PER MONTH
-- ============================================
-- Shows booking statistics by month
SELECT 
  TO_CHAR(check_in, 'YYYY-MM') as month,
  room_type,
  COUNT(*) as booking_count
FROM bookings
WHERE room_type IS NOT NULL
  AND check_in >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '6 months')
GROUP BY TO_CHAR(check_in, 'YYYY-MM'), room_type
ORDER BY month DESC, room_type;

-- ============================================
-- 15. VIEW ROOM BOOKINGS WITH CUSTOMER DETAILS
-- ============================================
-- Complete view with all customer and booking information
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

