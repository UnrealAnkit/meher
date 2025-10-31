-- ============================================
-- MEHER Admin Panel - Supabase Setup Queries
-- ============================================
-- Project ID: zejmgbkizasnkxivobte
-- URL: https://zejmgbkizasnkxivobte.supabase.co
-- Run these queries in the Supabase SQL Editor

-- ============================================
-- 1. CREATE CALENDAR EVENTS TABLE
-- ============================================
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

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE RLS POLICIES FOR CALENDAR EVENTS
-- ============================================

-- Allow authenticated users to read all events
CREATE POLICY "Allow authenticated users to read events" 
  ON calendar_events 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to create events
CREATE POLICY "Allow authenticated users to create events" 
  ON calendar_events 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update events
CREATE POLICY "Allow authenticated users to update events" 
  ON calendar_events 
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete events
CREATE POLICY "Allow authenticated users to delete events" 
  ON calendar_events 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX idx_calendar_events_created_at ON calendar_events (created_at DESC);
CREATE INDEX idx_calendar_events_tag ON calendar_events (tag);
CREATE INDEX idx_calendar_events_title ON calendar_events (title);

-- ============================================
-- 5. CREATE STORAGE BUCKET FOR EVENT IMAGES
-- ============================================
-- Go to Supabase Dashboard > Storage > Create New Bucket
-- Name: event-images
-- Public: Yes (for public access to images)
-- File Size Limit: 10MB

-- Bucket-specific RLS Policy:
-- In the Storage section:
-- 1. Click on "Policies" under "event-images" bucket
-- 2. Add policy for authenticated users to upload/read/delete images

-- ============================================
-- 6. CREATE STORAGE BUCKET POLICIES (SQL)
-- ============================================

-- Allow authenticated users to read images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'event-images' 
    AND auth.role() = 'authenticated'
  );

-- Create policy for authenticated users to read images
CREATE POLICY "Allow public to read images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'event-images');

-- Create policy for authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'event-images'
    AND auth.role() = 'authenticated'
  );

-- ============================================
-- 7. SAMPLE INSERT DATA (Optional)
-- ============================================
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

-- ============================================
-- 8. VERIFY TABLE AND POLICIES
-- ============================================
-- Run these queries to verify:

-- Check table structure:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'calendar_events';

-- Check RLS policies:
-- SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check 
-- FROM pg_policies WHERE tablename = 'calendar_events';

-- Check storage buckets:
-- SELECT * FROM storage.buckets;

-- ============================================
-- IMPORTANT SETUP INSTRUCTIONS
-- ============================================
-- 
-- 1. Run all the SQL queries above in order in the Supabase SQL Editor
--
-- 2. Create Users in Supabase Auth:
--    - Go to Supabase Dashboard > Authentication > Users
--    - Click "Create new user"
--    - Enter email and password for admin users
--
-- 3. Configure CORS (if needed):
--    - Go to Project Settings > API
--    - Add your frontend URL to CORS allowed origins
--
-- 4. Create the 'event-images' Storage Bucket:
--    - Go to Storage section
--    - Create new bucket named 'event-images'
--    - Make it Public
--    - Run the storage policies from section 6 above
--
-- 5. Test the Admin Panel:
--    - Navigate to /admin/login
--    - Login with the credentials you created
--    - Try creating, updating, and deleting events
--
-- ============================================
-- TROUBLESHOOTING
-- ============================================
--
-- Issue: "Could not authenticate" error
-- Solution: Make sure users are created in Supabase Auth
--
-- Issue: Images not uploading
-- Solution: Check that the 'event-images' bucket exists and is public
--
-- Issue: Events not showing in dashboard
-- Solution: Check that RLS policies are enabled and correct
--
-- Issue: CORS errors
-- Solution: Update Project Settings > API > CORS allowed origins
-- ============================================
