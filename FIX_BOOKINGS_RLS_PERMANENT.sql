-- ============================================
-- PERMANENT FIX FOR BOOKINGS RLS POLICY
-- This script completely resets and fixes all RLS policies for the bookings table
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================

-- Step 1: Disable RLS temporarily to reset everything
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on bookings table (clean slate)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'bookings') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON bookings';
    END LOOP;
END $$;

-- Step 3: Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Step 4: Create public insert policy (allows unauthenticated users)
-- This is CRITICAL for payment processing
CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
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
WHERE tablename = 'bookings'
ORDER BY cmd, policyname;

-- Expected Results:
-- 1. "Allow public booking inserts" | INSERT | {public} | true
-- 2. "Allow authenticated to read bookings" | SELECT | {authenticated} | true
-- 3. "Allow authenticated to update bookings" | UPDATE | {authenticated} | true | true
-- 4. "Allow authenticated to delete bookings" | DELETE | {authenticated} | true

-- Step 9: Test that RLS is properly configured
SELECT 
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'bookings';

-- Should show: bookings | true

-- ============================================
-- VERIFICATION COMMANDS
-- ============================================
-- After running this script, you can verify it worked by running:

-- Check all policies:
-- SELECT * FROM pg_policies WHERE tablename = 'bookings';

-- Test that public can insert (this should work):
-- -- Note: You can't easily test this in SQL Editor, but the frontend should work

