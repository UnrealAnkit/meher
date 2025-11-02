-- ============================================
-- FIX BOOKINGS RLS POLICY - URGENT!
-- ============================================
-- This script fixes the RLS policy to allow public (unauthenticated) users
-- to insert bookings for payment processing.
--
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================

-- Step 1: Drop all existing conflicting policies on bookings table
DROP POLICY IF EXISTS "Allow authenticated users to create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public booking inserts" ON bookings;
DROP POLICY IF EXISTS "Allow admins to create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public booking inserts" ON bookings; -- Drop again in case of duplicates

-- Step 2: Create the public insert policy
-- This allows ANYONE (including unauthenticated users) to create bookings
-- This is needed for payment processing where users aren't logged in
CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Step 3: Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  with_check
FROM pg_policies 
WHERE tablename = 'bookings' 
AND cmd = 'INSERT'
ORDER BY policyname;

-- Expected result: Should see "Allow public booking inserts" with roles = '{public}'
