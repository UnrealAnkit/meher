# Promo Code Feature - Setup Instructions

## Overview
A complete promo code system has been implemented for the "Book Your Stay" feature. Admins can create and manage promo codes from the admin panel, and users can apply them during booking to get discounts.

## Features Implemented

### 1. Admin Panel - Offers Management
- **Location**: `/admin/offers`
- **Features**:
  - Create new promo codes with percentage or fixed discounts
  - Edit existing promo codes
  - View current offers (active and valid)
  - View past offers (expired or inactive)
  - See bookings that used each promo code
  - Track usage statistics (used count vs limit)
  - Set validity dates, minimum amounts, maximum discounts, and usage limits

### 2. User-Facing Features
- Promo code input field on "Book Your Stay" page
- Real-time validation of promo codes
- Automatic discount calculation and display
- Shows original amount, discount, and final amount
- Promo code validation on both frontend and backend for security

### 3. Backend Integration
- Promo code validation edge function (`validate-promo-code`)
- Updated `create-order` function to apply discounts
- Automatic tracking of promo code usage
- Discount amounts stored with bookings

## Database Setup

### Step 1: Run SQL in Supabase

Copy and paste the following SQL into your Supabase SQL Editor:

```sql
-- Promo Codes Table
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

-- Policy: Allow authenticated users to read active promo codes
CREATE POLICY "Allow public read of active promo codes"
  ON promo_codes FOR SELECT
  USING (is_active = true AND NOW() >= valid_from AND NOW() <= valid_until);

-- Policy: Allow admins to manage promo codes
CREATE POLICY "Allow admins to manage promo codes"
  ON promo_codes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN (
        SELECT email FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
      )
    )
  );

-- Grant permissions
GRANT SELECT ON promo_codes TO anon;
GRANT ALL ON promo_codes TO authenticated;
```

### Step 2: Deploy Edge Functions

Deploy the new `validate-promo-code` edge function to Supabase:

1. Go to Supabase Dashboard → Edge Functions
2. Create a new function called `validate-promo-code`
3. Copy the contents from `meher/supabase/functions/validate-promo-code/index.ts`
4. Deploy the function

### Step 3: Update Existing Edge Function

Update the `create-order` function:

1. Go to Supabase Dashboard → Edge Functions → `create-order`
2. Replace the contents with the updated code from `meher/supabase/functions/create-order/index.ts`
3. Deploy the updated function

## Files Created/Modified

### New Files:
1. `meher/supabase_promo_codes_schema.sql` - Database schema SQL
2. `meher/src/pages/admin/AdminOffersPage.tsx` - Admin offers management page
3. `meher/supabase/functions/validate-promo-code/index.ts` - Promo code validation function

### Modified Files:
1. `meher/src/pages/admin/AdminLayout.tsx` - Added "Offers" menu item
2. `meher/src/index.tsx` - Added `/admin/offers` route
3. `meher/src/lib/supabase.ts` - Added `VALIDATE_PROMO_CODE_FUNCTION_URL`
4. `meher/src/pages/BookYourStayPage.tsx` - Added promo code validation and discount application
5. `meher/supabase/functions/create-order/index.ts` - Added promo code validation and discount calculation

## How It Works

### Admin Flow:
1. Admin navigates to `/admin/offers`
2. Clicks "New Promo Code"
3. Fills in:
   - Code (e.g., "SUMMER20")
   - Discount type (Percentage or Fixed)
   - Discount value
   - Minimum amount (optional)
   - Maximum discount (for percentage, optional)
   - Usage limit (optional)
   - Validity dates
4. Saves the promo code
5. Can view all bookings that used a specific promo code by clicking the eye icon

### User Flow:
1. User goes to "Book Your Stay" page
2. Selects room type, dates, and number of adults
3. Enters promo code in the promo code field
4. System validates the code in real-time:
   - Checks if code exists and is active
   - Checks validity dates
   - Checks usage limit
   - Checks minimum amount requirement
   - Calculates discount
5. If valid, discount is applied and shown:
   - Original amount (strikethrough)
   - Discount amount
   - Final amount
6. User proceeds to payment with discounted amount

### Backend Flow:
1. Frontend validates promo code for UX
2. When creating order, sends original amount + promo_code_id to backend
3. Backend validates promo code again (security)
4. Backend calculates discount and creates Razorpay order with discounted amount
5. When booking is created, promo_code_id, discount_amount, and original_amount are stored
6. Promo code usage count is automatically incremented via trigger

## Testing

### Test Promo Code Creation:
1. Create a promo code with 20% discount
2. Set minimum amount to ₹1000
3. Set validity for next 30 days
4. Set usage limit to 10

### Test User Application:
1. Go to Book Your Stay page
2. Select a room and dates that total more than ₹1000
3. Enter the promo code
4. Verify discount is applied correctly
5. Complete booking and verify discount is saved

## Notes

- Promo codes are automatically converted to uppercase
- Discounts are calculated on the backend for security
- Usage counts are automatically tracked
- Past offers are separated from current offers in the admin panel
- All bookings using a promo code can be viewed from the admin panel

