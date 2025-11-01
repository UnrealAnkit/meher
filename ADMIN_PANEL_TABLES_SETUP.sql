-- ============================================
-- MEHER Admin Panel - Complete Database Setup
-- ============================================
-- Run these queries in Supabase SQL Editor

-- ============================================
-- 1. CLASSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  price VARCHAR(50) NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 20,
  schedule TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read classes" ON classes;
DROP POLICY IF EXISTS "Allow authenticated users to create classes" ON classes;
DROP POLICY IF EXISTS "Allow authenticated users to update classes" ON classes;
DROP POLICY IF EXISTS "Allow authenticated users to delete classes" ON classes;

CREATE POLICY "Allow authenticated users to read classes" 
  ON classes FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create classes" 
  ON classes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update classes" 
  ON classes FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete classes" 
  ON classes FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_classes_created_at ON classes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_classes_instructor ON classes (instructor);

-- ============================================
-- 2. USERS TABLE (Extended Profile)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to create users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to update users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to delete users" ON users;

CREATE POLICY "Allow authenticated users to read users" 
  ON users FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create users" 
  ON users FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update users" 
  ON users FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete users" 
  ON users FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);

-- ============================================
-- 3. BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES calendar_events(id) ON DELETE SET NULL,
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  booking_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT booking_type_check CHECK (
    (event_id IS NOT NULL AND class_id IS NULL) OR 
    (event_id IS NULL AND class_id IS NOT NULL)
  )
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated users to delete bookings" ON bookings;

CREATE POLICY "Allow authenticated users to read bookings" 
  ON bookings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create bookings" 
  ON bookings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update bookings" 
  ON bookings FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete bookings" 
  ON bookings FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings (user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event_id ON bookings (event_id);
CREATE INDEX IF NOT EXISTS idx_bookings_class_id ON bookings (class_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (booking_date DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);

-- ============================================
-- 4. BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated users to create blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated users to update blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated users to delete blogs" ON blogs;

CREATE POLICY "Allow authenticated users to read blogs" 
  ON blogs FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create blogs" 
  ON blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update blogs" 
  ON blogs FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete blogs" 
  ON blogs FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs (published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs (created_at DESC);

-- ============================================
-- 5. STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('class-images', 'class-images', true),
  ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for class-images
DROP POLICY IF EXISTS "Allow authenticated users to upload class images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read class images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete class images" ON storage.objects;

CREATE POLICY "Allow authenticated users to upload class images"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'class-images' AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow public to read class images"
  ON storage.objects FOR SELECT USING (bucket_id = 'class-images');

CREATE POLICY "Allow authenticated users to delete class images"
  ON storage.objects FOR DELETE USING (
    bucket_id = 'class-images' AND auth.role() = 'authenticated'
  );

-- Storage policies for blog-images
DROP POLICY IF EXISTS "Allow authenticated users to upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete blog images" ON storage.objects;

CREATE POLICY "Allow authenticated users to upload blog images"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow public to read blog images"
  ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to delete blog images"
  ON storage.objects FOR DELETE USING (
    bucket_id = 'blog-images' AND auth.role() = 'authenticated'
  );

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify tables were created:

-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_name IN ('classes', 'users', 'bookings', 'blogs');

-- SELECT * FROM storage.buckets WHERE name IN ('class-images', 'blog-images');



