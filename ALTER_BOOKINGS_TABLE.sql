-- Alternative: ALTER existing bookings table instead of dropping it
-- Use this if you want to preserve existing data

-- Add missing columns if they don't exist
DO $$ 
BEGIN
  -- Check and add event_date column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'event_date') THEN
    ALTER TABLE bookings ADD COLUMN event_date DATE;
  END IF;

  -- Check and add event_title column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'event_title') THEN
    ALTER TABLE bookings ADD COLUMN event_title TEXT;
  END IF;

  -- Check and add selected_slot column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'selected_slot') THEN
    ALTER TABLE bookings ADD COLUMN selected_slot TEXT;
  END IF;

  -- Check and add price column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'price') THEN
    ALTER TABLE bookings ADD COLUMN price TEXT;
  END IF;

  -- Check and add customer_name column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'customer_name') THEN
    ALTER TABLE bookings ADD COLUMN customer_name TEXT;
  END IF;

  -- Check and add customer_email column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'customer_email') THEN
    ALTER TABLE bookings ADD COLUMN customer_email TEXT;
  END IF;

  -- Check and add customer_phone column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'customer_phone') THEN
    ALTER TABLE bookings ADD COLUMN customer_phone TEXT;
  END IF;

  -- Check and add status column with default
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'status') THEN
    ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'pending';
    -- Add constraint if needed
    ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
      CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));
  END IF;

  -- Check and add notes column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'bookings' AND column_name = 'notes') THEN
    ALTER TABLE bookings ADD COLUMN notes TEXT;
  END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_bookings_event_id ON bookings(event_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);

-- Enable RLS if not already enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Recreate policies
DROP POLICY IF EXISTS "Allow public booking inserts" ON bookings;
DROP POLICY IF EXISTS "Allow admins to view all bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow admins to delete bookings" ON bookings;

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



