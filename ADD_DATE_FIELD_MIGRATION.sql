-- ============================================
-- MIGRATION: Add event_date field to calendar_events
-- ============================================
-- Run this if you already have the calendar_events table
-- and need to add the date field

-- Add event_date column (if it doesn't exist)
-- Note: We need to handle existing rows by providing a default date
ALTER TABLE calendar_events 
ADD COLUMN IF NOT EXISTS event_date DATE DEFAULT CURRENT_DATE;

-- Update all existing events to have today's date (if they don't have one)
UPDATE calendar_events 
SET event_date = CURRENT_DATE 
WHERE event_date IS NULL;

-- Make the column NOT NULL after setting defaults
ALTER TABLE calendar_events 
ALTER COLUMN event_date SET NOT NULL;

-- Create index on event_date for better query performance
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events (event_date DESC);

-- ============================================
-- VERIFICATION: Check the column was added
-- ============================================
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'calendar_events' AND column_name = 'event_date';


