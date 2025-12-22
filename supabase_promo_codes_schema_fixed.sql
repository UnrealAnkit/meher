
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
  min_amount NUMERIC(10, 2) DEFAULT 0,
  max_discount NUMERIC(10, 2) DEFAULT NULL,
  usage_limit INTEGER DEFAULT NULL,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Add promo_code_id to bookings table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'promo_code_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN promo_code_id UUID REFERENCES promo_codes(id);
  END IF;
END $$;

-- Add discount_amount to bookings table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'discount_amount'
  ) THEN
    ALTER TABLE bookings ADD COLUMN discount_amount NUMERIC(10, 2) DEFAULT 0;
  END IF;
END $$;

-- Add original_amount to bookings table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'original_amount'
  ) THEN
    ALTER TABLE bookings ADD COLUMN original_amount NUMERIC(10, 2) DEFAULT NULL;
  END IF;
END $$;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active, valid_from, valid_until);
CREATE INDEX IF NOT EXISTS idx_bookings_promo_code ON bookings(promo_code_id);

-- Function to update used_count when a booking is created
CREATE OR REPLACE FUNCTION update_promo_code_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.promo_code_id IS NOT NULL THEN
    UPDATE promo_codes
    SET used_count = used_count + 1
    WHERE id = NEW.promo_code_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update promo code usage
DROP TRIGGER IF EXISTS trigger_update_promo_code_usage ON bookings;
CREATE TRIGGER trigger_update_promo_code_usage
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_promo_code_usage();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for promo_codes updated_at
DROP TRIGGER IF EXISTS trigger_update_promo_codes_updated_at ON promo_codes;
CREATE TRIGGER trigger_update_promo_codes_updated_at
  BEFORE UPDATE ON promo_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read of active promo codes" ON promo_codes;
DROP POLICY IF EXISTS "Allow authenticated users to manage promo codes" ON promo_codes;
DROP POLICY IF EXISTS "Allow admins to manage promo codes" ON promo_codes;

-- Policy: Allow public to read active promo codes (for validation)
CREATE POLICY "Allow public read of active promo codes"
  ON promo_codes FOR SELECT
  USING (is_active = true AND NOW() >= valid_from AND NOW() <= valid_until);

-- Policy: Allow authenticated users to manage promo codes
-- This allows any authenticated user to manage. If you need admin-only access,
-- you'll need to implement role checking in your application layer or use a different auth method
CREATE POLICY "Allow authenticated users to manage promo codes"
  ON promo_codes FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT ON promo_codes TO anon;
GRANT ALL ON promo_codes TO authenticated;



