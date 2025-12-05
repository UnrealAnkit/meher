-- ============================================
-- Add Start Date and End Date to Calendar Events
-- ============================================
-- Run this in Supabase SQL Editor
-- This adds start_date and end_date fields to support multi-day events

-- Add start_date column (defaults to event_date for existing events)
ALTER TABLE calendar_events 
ADD COLUMN IF NOT EXISTS start_date DATE;

-- Add end_date column (defaults to event_date for existing events)
ALTER TABLE calendar_events 
ADD COLUMN IF NOT EXISTS end_date DATE;

-- Update existing events to set start_date and end_date to event_date
UPDATE calendar_events 
SET start_date = event_date, 
    end_date = event_date 
WHERE start_date IS NULL OR end_date IS NULL;

-- Make the columns required after populating existing data
ALTER TABLE calendar_events 
ALTER COLUMN start_date SET NOT NULL;

ALTER TABLE calendar_events 
ALTER COLUMN end_date SET NOT NULL;

-- Add a check constraint to ensure end_date >= start_date
ALTER TABLE calendar_events 
ADD CONSTRAINT check_event_date_range 
CHECK (end_date >= start_date);

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_calendar_events_date_range 
ON calendar_events(start_date, end_date);

-- ============================================
-- Migration Complete!
-- ============================================
-- Now you can:
-- 1. Set different start and end dates for multi-day events
-- 2. Query events by date range
-- 3. The event_date field is kept for backward compatibility

