-- ============================================
-- PERMANENT FIX FOR BOOKINGS RLS
-- This script ensures bookings can be inserted
-- ============================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================

-- Step 1: Drop ALL existing policies (complete clean slate)
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

-- Step 2: Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Step 3: Create the MOST PERMISSIVE insert policy
-- This allows INSERT from ANY role without any restrictions
CREATE POLICY "bookings_allow_insert" 
ON bookings
FOR INSERT
WITH CHECK (true);

-- Step 4: Policies for authenticated users (admins)
CREATE POLICY "bookings_allow_select" 
ON bookings
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "bookings_allow_update" 
ON bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "bookings_allow_delete" 
ON bookings
FOR DELETE
TO authenticated
USING (true);

-- Step 5: Verify
SELECT 
    policyname,
    cmd AS operation,
    roles,
    with_check AS with_check_expression
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'bookings'
ORDER BY cmd, policyname;

-- Expected: bookings_allow_insert | INSERT | NULL (all roles) | true

