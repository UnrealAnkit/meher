-- ============================================
-- CLEANUP SCRIPT - Run this to reset
-- ============================================
-- Use this if you get "policy already exists" errors

-- Drop existing policies (safe - won't error if they don't exist)
DROP POLICY IF EXISTS "Allow authenticated users to read events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to create events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to update events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to delete events" ON calendar_events;

-- Drop existing table if you want a completely fresh start
-- Uncomment the line below ONLY if you want to delete all events
-- DROP TABLE IF EXISTS calendar_events;

-- Now run all the queries from SUPABASE_SETUP.sql starting from "CREATE TABLE..."



