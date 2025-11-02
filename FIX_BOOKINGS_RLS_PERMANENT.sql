-- ============================================
-- PERMANENT FIX FOR BOOKINGS RLS POLICY
-- This script completely resets and fixes all RLS policies for the bookings table
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================

-- Step 1: Ensure the bookings table exists (safety check)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings') THEN
        RAISE EXCEPTION 'The bookings table does not exist. Please create it first.';
    END IF;
END $$;

-- Step 2: Drop ALL existing policies on bookings table (clean slate)
-- This ensures no conflicting policies remain
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
        RAISE NOTICE 'Dropped policy: %', r.policyname;
    END LOOP;
END $$;

-- Step 3: Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Step 4: Create insert policies for both anon and public roles
-- This is CRITICAL for payment processing where users are not logged in
-- The anon key maps to 'anon' role in RLS, but we allow both to be safe
CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Also explicitly allow anon role (unauthenticated users using anon key)
CREATE POLICY "Allow anon booking inserts" 
ON bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 5: Create policy for authenticated users to read all bookings (admins)
CREATE POLICY "Allow authenticated to read bookings" 
ON bookings
FOR SELECT
TO authenticated
USING (true);

-- Step 6: Create policy for authenticated users to update bookings (admins)
CREATE POLICY "Allow authenticated to update bookings" 
ON bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 7: Create policy for authenticated users to delete bookings (admins)
CREATE POLICY "Allow authenticated to delete bookings" 
ON bookings
FOR DELETE
TO authenticated
USING (true);

-- Step 8: Verify all policies are correct
SELECT 
    policyname,
    cmd AS operation,
    roles,
    with_check AS with_check_expression,
    qual AS using_expression
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'bookings'
ORDER BY cmd, policyname;

-- Expected Results:
-- 1. "Allow public booking inserts" | INSERT | {public} | true | NULL
-- 2. "Allow anon booking inserts" | INSERT | {anon} | true | NULL
-- 3. "Allow authenticated to read bookings" | SELECT | {authenticated} | NULL | true
-- 4. "Allow authenticated to update bookings" | UPDATE | {authenticated} | true | true
-- 5. "Allow authenticated to delete bookings" | DELETE | {authenticated} | NULL | true

-- Step 9: Verify RLS is properly enabled
SELECT 
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'bookings';

-- Should show: bookings | true

-- ============================================
-- VERIFICATION COMMANDS (run separately if needed)
-- ============================================
-- After running this script, you can verify it worked by running:

-- Check all policies:
-- SELECT * FROM pg_policies WHERE schemaname = 'public' AND tablename = 'bookings';

-- Check RLS status:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings';

-- Test insert (as anonymous user - will fail in SQL editor but should work from frontend):
-- Note: You cannot easily test anonymous inserts in SQL Editor, but the frontend should work now.

-- ============================================
-- ALTERNATIVE: If above doesn't work, try this more permissive approach
-- ============================================
-- Run this ONLY if the above policies still don't work:

/*
-- Option 1: Create a permissive policy for ALL roles (including anon)
DROP POLICY IF EXISTS "Allow all booking inserts" ON bookings;
CREATE POLICY "Allow all booking inserts" 
ON bookings
FOR INSERT
WITH CHECK (true);

-- Option 2: Use SECURITY DEFINER function to bypass RLS (more advanced)
-- This requires creating a function that runs with elevated privileges
CREATE OR REPLACE FUNCTION insert_booking(
  p_event_id UUID,
  p_event_title TEXT,
  p_event_date DATE,
  p_selected_slot TEXT,
  p_price TEXT,
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_status TEXT,
  p_notes TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Grant execute permission to anon role
GRANT EXECUTE ON FUNCTION insert_booking TO anon;
GRANT EXECUTE ON FUNCTION insert_booking TO public;
*/

-- ============================================
-- DIAGNOSTIC QUERIES (Run these to check what's wrong)
-- ============================================

-- Check all policies on bookings table:
-- SELECT * FROM pg_policies WHERE schemaname = 'public' AND tablename = 'bookings';

-- Check RLS status:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings';

-- Check table structure:
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_schema = 'public' AND table_name = 'bookings';

-- Check for any triggers that might interfere:
-- SELECT trigger_name, event_manipulation, action_statement 
-- FROM information_schema.triggers 
-- WHERE event_object_schema = 'public' AND event_object_table = 'bookings';

-- ============================================
-- TROUBLESHOOTING
-- ============================================
-- If you still get RLS errors after running this:
-- 1. Make sure you ran this ENTIRE script (not just parts of it)
-- 2. Check that the bookings table exists: SELECT * FROM bookings LIMIT 1;
-- 3. Verify policies: SELECT * FROM pg_policies WHERE tablename = 'bookings';
-- 4. Ensure you're using the anon key (not service_role) in your frontend
-- 5. Check if there are any triggers or constraints blocking inserts
-- 6. Try the alternative SECURITY DEFINER function approach above if needed

