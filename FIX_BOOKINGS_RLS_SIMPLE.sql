

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

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookings_insert_policy" 
ON bookings
FOR INSERT
WITH CHECK (true);

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

SELECT 
    policyname,
    cmd AS operation,
    roles,
    with_check AS with_check_expression,
    qual AS using_expression
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'bookings'
ORDER BY cmd, policyname;

SELECT 
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'bookings';

