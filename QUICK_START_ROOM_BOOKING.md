# Quick Start: Room Booking Availability System

## 🚀 Quick Setup (5 minutes)

### Step 1: Run SQL Migration
1. Open [Supabase Dashboard](https://app.supabase.com) → Your Project
2. Go to **SQL Editor**
3. Copy entire content from `ADD_ROOM_BOOKING_FIELDS.sql`
4. Paste and click **Run**

### Step 2: Test with Sample Data (Optional)
1. In SQL Editor, copy content from `INSERT_SAMPLE_ROOM_BOOKINGS.sql`
2. Paste and click **Run**
3. This creates bookings for all 6 rooms until Nov 26, 2025 3 PM

### Step 3: Test the System
1. Run `npm run dev`
2. Go to `/book-your-stay`
3. Select a room type
4. Try booking before Nov 26 → Should show "Sorry, room is booked"
5. Try booking after Nov 26 → Should show "Room is available"

## ✅ What's Implemented

- ✅ Room type selection dropdown (6 room types)
- ✅ Real-time availability checking
- ✅ Error message when room is booked
- ✅ Success message when room is available
- ✅ Booking saves with room type and dates
- ✅ Check-out time tracking (3 PM default)

## 📋 Files Created/Updated

1. **`ADD_ROOM_BOOKING_FIELDS.sql`** - Database migration
2. **`src/utils/roomAvailability.ts`** - Availability checking functions
3. **`src/pages/BookYourStayPage.tsx`** - Updated booking page
4. **`supabase/functions/create-booking/index.ts`** - Updated to save room data
5. **`ROOM_BOOKING_SETUP_GUIDE.md`** - Complete documentation
6. **`INSERT_SAMPLE_ROOM_BOOKINGS.sql`** - Sample test data

## 🎯 Room Types

1. Earth & Clay - ₹3,200/night
2. Bloom and Herbs - ₹3,200/night
3. Stone and Fog - ₹2,500/night
4. Golden Grasslands - ₹3,000/night
5. Forest Bathing - ₹3,200/night
6. Water and Sky - ₹2,500/night

## 📖 Full Documentation

See `ROOM_BOOKING_SETUP_GUIDE.md` for complete setup instructions and troubleshooting.

