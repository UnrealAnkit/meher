

CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  time_slots TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  expanded_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to create events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to update events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to delete events" ON calendar_events;

CREATE POLICY "Allow authenticated users to read events" 
  ON calendar_events 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to create events" 
  ON calendar_events 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update events" 
  ON calendar_events 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete events" 
  ON calendar_events 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

DROP INDEX IF EXISTS idx_calendar_events_created_at;
DROP INDEX IF EXISTS idx_calendar_events_tag;
DROP INDEX IF EXISTS idx_calendar_events_title;

CREATE INDEX idx_calendar_events_created_at ON calendar_events (created_at DESC);
CREATE INDEX idx_calendar_events_tag ON calendar_events (tag);
CREATE INDEX idx_calendar_events_title ON calendar_events (title);

INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;

CREATE POLICY "Allow authenticated users to upload images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'event-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow public to read images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "Allow authenticated users to delete images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'event-images'
    AND auth.role() = 'authenticated'
  );

