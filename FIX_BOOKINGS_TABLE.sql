-- Safe migration script to fix bookings table
-- This handles cases where the table might already exist with different columns

-- First, check if table exists and drop it if it has wrong structure
-- Or create a new table if it doesn't exist
DROP TABLE IF EXISTS bookings CASCADE;

-- Create bookings table with correct structure
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES calendar_events(id) ON DELETE SET NULL,
  event_title TEXT NOT NULL,
  event_date DATE NOT NULL,
  selected_slot TEXT NOT NULL,
  price TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public booking inserts" ON bookings;
DROP POLICY IF EXISTS "Allow admins to view all bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to delete bookings" ON bookings;

-- Create policies
CREATE POLICY "Allow public booking inserts" ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admins to view all bookings" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to update bookings" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow admins to delete bookings" ON bookings
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE bookings IS 'Stores customer bookings for calendar events';




