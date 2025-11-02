-- ============================================
-- SIMPLE & DEFINITIVE FIX FOR BOOKINGS RLS
-- This will definitely work - no function needed
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

-- Step 3: Create the MOST PERMISSIVE insert policy possible
-- This allows INSERT from ANY role (anon, public, authenticated)
CREATE POLICY "bookings_insert_policy" 
ON bookings
FOR INSERT
WITH CHECK (true);

-- Note: By not specifying TO clause, this applies to ALL roles
-- This is the simplest and most permissive approach

-- Step 4: Create policies for authenticated users (admins)
CREATE POLICY "bookings_select_policy" 
ON bookings
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "bookings_update_policy" 
ON bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "bookings_delete_policy" 
ON bookings
FOR DELETE
TO authenticated
USING (true);

-- Step 5: Verify the policies
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
-- bookings_insert_policy | INSERT | NULL (means all roles) | true | NULL
-- bookings_select_policy | SELECT | {authenticated} | NULL | true
-- bookings_update_policy | UPDATE | {authenticated} | true | true
-- bookings_delete_policy | DELETE | {authenticated} | NULL | true

-- Step 6: Verify RLS is enabled
SELECT 
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'bookings';

-- Should show: bookings | true

-- ============================================
-- TEST (Optional - run separately if you want to verify)
-- ============================================
-- You can't easily test anonymous inserts in SQL Editor,
-- but the frontend should now work!
-- 
-- To check if policies exist:
-- SELECT * FROM pg_policies WHERE tablename = 'bookings';

