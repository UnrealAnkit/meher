-- Fix RLS Policy for Bookings Table
-- This allows public (unauthenticated) users to insert bookings for payments
-- Run this in Supabase SQL Editor

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow authenticated users to create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public booking inserts" ON bookings;

-- Create/Recreate the public insert policy
-- This allows anyone (including unauthenticated users) to create bookings
CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Verify the policy exists
-- You can check this in Supabase Dashboard → Authentication → Policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'bookings' AND policyname = 'Allow public booking inserts';

