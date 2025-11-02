-- Create bookings table for storing customer bookings
CREATE TABLE IF NOT EXISTS bookings (
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

-- Create index on event_id for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_event_id ON bookings(event_id);

-- Create index on event_date for filtering by date
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);

-- Create index on status for filtering bookings
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create index on customer_email for customer lookups
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert bookings (for public booking)
CREATE POLICY "Allow public booking inserts" ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to view all bookings
CREATE POLICY "Allow admins to view all bookings" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users (admins) to update bookings
CREATE POLICY "Allow admins to update bookings" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users (admins) to delete bookings
CREATE POLICY "Allow admins to delete bookings" ON bookings
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE bookings IS 'Stores customer bookings for calendar events';




