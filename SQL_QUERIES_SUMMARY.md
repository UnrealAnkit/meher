# 📋 SQL Queries Summary - Copy & Paste

Use these SQL queries in your Supabase SQL Editor.

## ✅ Run in Order:

### Query 1: Create Table
```sql
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  time_slots TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  expanded_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Query 2: Enable RLS
```sql
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
```

### Query 3: Read Policy
```sql
CREATE POLICY "Allow authenticated users to read events" 
  ON calendar_events 
  FOR SELECT 
  USING (true);
```

### Query 4: Create Policy
```sql
CREATE POLICY "Allow authenticated users to create events" 
  ON calendar_events 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');
```

### Query 5: Update Policy
```sql
CREATE POLICY "Allow authenticated users to update events" 
  ON calendar_events 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

### Query 6: Delete Policy
```sql
CREATE POLICY "Allow authenticated users to delete events" 
  ON calendar_events 
  FOR DELETE 
  USING (auth.role() = 'authenticated');
```

### Query 7: Indexes
```sql
CREATE INDEX idx_calendar_events_created_at ON calendar_events (created_at DESC);
CREATE INDEX idx_calendar_events_tag ON calendar_events (tag);
CREATE INDEX idx_calendar_events_title ON calendar_events (title);
```

### Query 8: Storage Bucket
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;
```

### Query 9: Storage Upload Policy
```sql
CREATE POLICY "Allow authenticated users to upload images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'event-images' 
    AND auth.role() = 'authenticated'
  );
```

### Query 10: Storage Read Policy
```sql
CREATE POLICY "Allow public to read images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');
```

### Query 11: Storage Delete Policy
```sql
CREATE POLICY "Allow authenticated users to delete images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'event-images'
    AND auth.role() = 'authenticated'
  );
```

### Query 12 (Optional): Sample Data
```sql
INSERT INTO calendar_events (
  title,
  description,
  tag,
  price,
  duration,
  time_slots,
  expanded_description,
  image_url
) VALUES
(
  'Morning Yoga Session',
  'Facilitator: Yoga Master',
  'UPCOMING',
  'Rs 500.00',
  '60 Minutes',
  ARRAY['10:00 AM', '11:00 AM', '12:00 PM'],
  'Join our rejuvenating morning yoga session to start your day with energy and peace. Perfect for all levels.',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'
),
(
  'Sound Healing Meditation',
  'Facilitator: Healing Guide',
  'FEATURED',
  'Rs 700.00',
  '45 Minutes',
  ARRAY['2:00 PM', '3:30 PM', '5:00 PM'],
  'Experience deep healing through ancient sound frequencies. A transformative meditation journey.',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'
);
```

---

## 🎯 Quick Copy-Paste All-in-One

If you want to run everything at once, use this (but run individually if any error):

```sql
-- Create table
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  time_slots TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  expanded_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated users to read events" 
  ON calendar_events FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create events" 
  ON calendar_events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update events" 
  ON calendar_events FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete events" 
  ON calendar_events FOR DELETE USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_calendar_events_created_at ON calendar_events (created_at DESC);
CREATE INDEX idx_calendar_events_tag ON calendar_events (tag);
CREATE INDEX idx_calendar_events_title ON calendar_events (title);

-- Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow authenticated users to upload images"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'event-images' AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow public to read images"
  ON storage.objects FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Allow authenticated users to delete images"
  ON storage.objects FOR DELETE USING (
    bucket_id = 'event-images' AND auth.role() = 'authenticated'
  );
```

---

## ✅ Verification Queries

Run these to verify everything is set up correctly:

### Check table exists:
```sql
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'calendar_events';
```

### Check RLS policies:
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies WHERE tablename = 'calendar_events';
```

### Check storage bucket:
```sql
SELECT * FROM storage.buckets WHERE name = 'event-images';
```

### Count events:
```sql
SELECT COUNT(*) FROM calendar_events;
```

---

## 📝 Notes

- Run queries in Supabase **SQL Editor** (not in functions panel)
- If you get an error, copy just that query and run individually
- Storage policies might need to be created via the Storage UI if SQL errors occur
- After running queries, refresh the Supabase dashboard to see changes

## 🚨 If Queries Fail

1. Check you're in the correct project (zejmgbkizasnkxivobte)
2. Run one query at a time
3. Check error message in the SQL editor
4. Try refreshing the Supabase page
5. Check that storage bucket exists before running storage policies

---

**Happy Setting Up! 🎉**
