-- ============================================
-- IMMEDIATE FIX - Use this if the main script doesn't work
-- This creates a SECURITY DEFINER function that bypasses RLS
-- ============================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================

-- Step 1: Drop existing policies (clean slate)
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

-- Step 2: Create a SECURITY DEFINER function that bypasses RLS
-- This function runs with elevated privileges, so it can insert regardless of RLS
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

-- Step 3: Grant execute permission to anon and public roles
GRANT EXECUTE ON FUNCTION public.insert_booking TO anon;
GRANT EXECUTE ON FUNCTION public.insert_booking TO public;
GRANT EXECUTE ON FUNCTION public.insert_booking TO authenticated;

-- Step 4: Still create RLS policies for direct table access (in case needed)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anon to insert directly (backup approach)
CREATE POLICY "Allow anon booking inserts" 
ON bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow public to insert directly (backup approach)
CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated to read/update/delete
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

-- Step 5: Verify function was created
SELECT 
    routine_name,
    routine_type,
    security_type
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'insert_booking';

-- Expected: Should show insert_booking with security_type = 'DEFINER'

-- ============================================
-- HOW TO USE THE FUNCTION (Alternative approach)
-- ============================================
-- If you want to use the function instead of direct inserts,
-- update your frontend code to call:
--
-- const { data, error } = await supabase.rpc('insert_booking', {
--   p_event_id: null,
--   p_event_title: 'MEHR Rejuvenation Retreat - 3 Day Package',
--   p_event_date: '2025-11-02',
--   p_selected_slot: 'Double Occupancy - 3 Days / 2 Nights',
--   p_price: '₹21,250 (Double Occupancy)',
--   p_customer_name: 'Ankit Kumar',
--   p_customer_email: 'work.ankit2@gmail.com',
--   p_customer_phone: '09304075346',
--   p_status: 'confirmed',
--   p_notes: 'Payment ID: ...'
-- });

