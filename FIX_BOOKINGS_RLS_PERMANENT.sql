

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings') THEN
        RAISE EXCEPTION 'The bookings table does not exist. Please create it first.';
    END IF;
END $$;

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

CREATE POLICY "Allow public booking inserts" 
ON bookings
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow anon booking inserts" 
ON bookings
FOR INSERT
TO anon
WITH CHECK (true);

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

