
ALTER TABLE calendar_events 
ADD COLUMN IF NOT EXISTS event_date DATE DEFAULT CURRENT_DATE;

UPDATE calendar_events 
SET event_date = CURRENT_DATE 
WHERE event_date IS NULL;

ALTER TABLE calendar_events 
ALTER COLUMN event_date SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events (event_date DESC);

