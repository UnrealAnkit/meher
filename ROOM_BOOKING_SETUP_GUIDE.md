# Room Booking Availability System - Complete Setup Guide

This guide will help you set up the room availability checking system for the MEHER booking platform. The system tracks 6 different room types and prevents double bookings by checking availability before allowing new bookings.

## 📋 Overview

The system includes:
- **6 Room Types**: Earth & Clay, Bloom and Herbs, Stone and Fog, Golden Grasslands, Forest Bathing, Water and Sky
- **Availability Checking**: Real-time checking before booking
- **Date Tracking**: Tracks check-in, check-out dates and check-out time (3 PM default)
- **User Feedback**: Shows clear messages when rooms are booked

---

## 🗄️ Step 1: Supabase Database Setup

### 1.1 Run SQL Migration

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `zejmgbkizasnkxivobte`
3. Navigate to **SQL Editor**
4. Click **New Query**
5. Copy and paste the entire contents of `ADD_ROOM_BOOKING_FIELDS.sql`
6. Click **Run** (or press Ctrl+Enter)

This will:
- Add `room_type`, `check_in`, `check_out`, and `check_out_time` columns to the `bookings` table
- Create indexes for faster queries
- Create a `check_room_availability()` function
- Create a `room_availability` view
- Set up proper RLS policies

### 1.2 Verify the Migration

Run this query to verify the columns were added:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN ('room_type', 'check_in', 'check_out', 'check_out_time');
```

You should see all 4 columns listed.

### 1.3 Test the Availability Function

Test the function with a sample query:

```sql
SELECT * FROM check_room_availability(
  'earth-and-clay'::TEXT,
  '2025-11-27'::DATE,
  '2025-11-28'::DATE,
  '15:00:00'::TIME
);
```

This should return availability status.

---

## 📝 Step 2: Add Sample Bookings (Optional - for testing)

If you want to test with existing bookings until November 26th, 3 PM, you can insert sample data:

```sql
-- Insert sample bookings for all 6 room types until Nov 26, 2025 3 PM
INSERT INTO bookings (
  event_title,
  event_date,
  selected_slot,
  price,
  customer_name,
  customer_email,
  customer_phone,
  status,
  room_type,
  check_in,
  check_out,
  check_out_time,
  notes
) VALUES
  ('MEHR Stay Booking', '2025-11-20', '2 nights - 2 adults', '₹6,400', 'Test Guest 1', 'test1@example.com', '+911234567890', 'confirmed', 'earth-and-clay', '2025-11-20', '2025-11-26', '15:00:00', 'Sample booking for testing'),
  ('MEHR Stay Booking', '2025-11-20', '2 nights - 2 adults', '₹6,400', 'Test Guest 2', 'test2@example.com', '+911234567891', 'confirmed', 'bloom-and-herbs', '2025-11-20', '2025-11-26', '15:00:00', 'Sample booking for testing'),
  ('MEHR Stay Booking', '2025-11-20', '2 nights - 2 adults', '₹5,000', 'Test Guest 3', 'test3@example.com', '+911234567892', 'confirmed', 'stone-and-fog', '2025-11-20', '2025-11-26', '15:00:00', 'Sample booking for testing'),
  ('MEHR Stay Booking', '2025-11-20', '2 nights - 2 adults', '₹6,000', 'Test Guest 4', 'test4@example.com', '+911234567893', 'confirmed', 'golden-grasslands', '2025-11-20', '2025-11-26', '15:00:00', 'Sample booking for testing'),
  ('MEHR Stay Booking', '2025-11-20', '2 nights - 2 adults', '₹6,400', 'Test Guest 5', 'test5@example.com', '+911234567894', 'confirmed', 'forest-bathing', '2025-11-20', '2025-11-26', '15:00:00', 'Sample booking for testing'),
  ('MEHR Stay Booking', '2025-11-20', '2 nights - 2 adults', '₹5,000', 'Test Guest 6', 'test6@example.com', '+911234567895', 'confirmed', 'water-and-sky', '2025-11-20', '2025-11-26', '15:00:00', 'Sample booking for testing');
```

**Note**: Adjust the dates as needed. These are just examples.

---

## 🔧 Step 3: Code Implementation

The code has already been implemented in:
- ✅ `src/utils/roomAvailability.ts` - Utility functions for availability checking
- ✅ `src/pages/BookYourStayPage.tsx` - Updated booking page with room type selection
- ✅ `supabase/functions/create-booking/index.ts` - Updated to handle room fields

### 3.1 Verify Files Are Updated

Check that these files exist and have the latest code:
- `src/utils/roomAvailability.ts` - Should contain `checkRoomAvailability()` function
- `src/pages/BookYourStayPage.tsx` - Should have room type dropdown and availability checking
- `supabase/functions/create-booking/index.ts` - Should handle `room_type`, `check_in`, `check_out`, `check_out_time`

---

## 🧪 Step 4: Testing

### 4.1 Test Availability Checking

1. Start your development server: `npm run dev`
2. Navigate to `/book-your-stay`
3. Select a room type (e.g., "Earth & Clay")
4. Select check-in date: November 20, 2025
5. Select check-out date: November 25, 2025
6. You should see: **"Sorry, this room is booked until [date] at 3:00 PM. Please book after this date."**

### 4.2 Test Available Booking

1. Select check-in date: November 27, 2025
2. Select check-out date: November 28, 2025
3. You should see: **"Room is available for the selected dates"**
4. The "Book Now" button should be enabled

### 4.3 Test Booking Flow

1. Select an available date range
2. Click "Book Now"
3. Fill in customer details
4. Complete payment
5. Verify booking is saved with room type in Supabase

---

## 📊 Step 5: View Bookings in Supabase

### 5.1 Check All Room Bookings

```sql
SELECT 
  room_type,
  customer_name,
  check_in,
  check_out,
  check_out_time,
  status,
  created_at
FROM bookings
WHERE room_type IS NOT NULL
ORDER BY check_out DESC, check_out_time DESC;
```

### 5.2 Check Availability for Specific Room

```sql
SELECT * FROM check_room_availability(
  'earth-and-clay'::TEXT,
  '2025-11-27'::DATE,
  '2025-11-28'::DATE,
  '15:00:00'::TIME
);
```

### 5.3 Use the Room Availability View

```sql
SELECT * FROM room_availability 
WHERE room_type = 'earth-and-clay';
```

---

## 🎯 Room Types Reference

| Room Type | Slug | Price/Night | Category |
|-----------|------|-------------|----------|
| Earth & Clay | `earth-and-clay` | ₹3,200 | Classic |
| Bloom and Herbs | `bloom-and-herbs` | ₹3,200 | Deluxe |
| Stone and Fog | `stone-and-fog` | ₹2,500 | Deluxe |
| Golden Grasslands | `golden-grasslands` | ₹3,000 | Deluxe |
| Forest Bathing | `forest-bathing` | ₹3,200 | Deluxe |
| Water and Sky | `water-and-sky` | ₹2,500 | Deluxe |

---

## 🔍 Troubleshooting

### Issue: "Function check_room_availability does not exist"

**Solution**: Make sure you ran the SQL migration in Step 1.1. The function should be created automatically.

### Issue: Availability check always returns "available"

**Solution**: 
1. Check if bookings exist in the database with `room_type` set
2. Verify the dates overlap correctly
3. Check browser console for errors

### Issue: "Unable to verify availability"

**Solution**:
1. Check Supabase RLS policies are set correctly
2. Verify the `check_room_availability` function exists
3. Check network tab for API errors

### Issue: Room type not saving in bookings

**Solution**:
1. Verify the `create-booking` Edge Function is deployed
2. Check that `room_type` is being sent in the booking data
3. Verify the Edge Function includes the room fields in `insertData`

---

## 📱 User Experience Flow

1. **User selects room type** → System shows price
2. **User selects dates** → System automatically checks availability
3. **If booked** → Shows error message: "Sorry, this room is booked until [date] at [time]. Please book after this date."
4. **If available** → Shows success message: "Room is available for the selected dates"
5. **User clicks "Book Now"** → System checks availability again before showing modal
6. **User completes booking** → Booking saved with room type, dates, and check-out time

---

## ✅ Checklist

- [ ] SQL migration executed successfully
- [ ] Columns added to bookings table
- [ ] `check_room_availability()` function created
- [ ] RLS policies updated
- [ ] Code files updated
- [ ] Room type dropdown appears on booking page
- [ ] Availability checking works
- [ ] Error messages display correctly
- [ ] Bookings save with room type
- [ ] Test bookings created (optional)

---

## 🚀 Next Steps

1. **Deploy Edge Function**: If you haven't already, deploy the updated `create-booking` function
2. **Add Real Bookings**: Add actual bookings through the UI
3. **Monitor**: Check the `room_availability` view regularly to see current bookings
4. **Customize**: Adjust check-out time (currently 3 PM) if needed

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase logs for database errors
3. Verify all SQL migrations were run successfully
4. Ensure RLS policies allow public reads for availability checking

---

**Last Updated**: 2025-01-27
**Version**: 1.0.0

