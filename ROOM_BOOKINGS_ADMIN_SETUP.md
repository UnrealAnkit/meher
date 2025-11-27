# Room Bookings Admin Panel - Setup Guide

## ✅ What's Been Created

1. **New Admin Page**: `AdminRoomBookingsPage.tsx` - Dedicated page for managing room bookings
2. **Navigation**: Added "Room Bookings" tab in admin sidebar with bed icon
3. **Route**: `/admin/room-bookings` - Accessible from admin panel
4. **SQL Queries**: `ROOM_BOOKINGS_ADMIN_SQL.sql` - Ready-to-use SQL queries

## 🚀 How to Access

1. Go to your admin panel: `http://localhost:5173/admin/login`
2. Login with your admin credentials
3. Click on **"Room Bookings"** in the sidebar (bed icon 🛏️)
4. Or navigate directly to: `http://localhost:5173/admin/room-bookings`

## 📋 Features

### View Room Bookings
- See all room bookings in a table
- Filter by room type, date, status
- View check-in/check-out dates and times
- See customer information and pricing

### Create New Room Booking
1. Click **"New Room Booking"** button
2. Fill in the form:
   - **Room Type** (required) - Select from 6 room types
   - **Check-in Date** (required)
   - **Check-out Date** (required)
   - **Check-out Time** (default: 15:00)
   - **Customer Details** (name, email, phone)
   - **Price** (auto-calculated based on room type and nights)
   - **Status** (pending/confirmed/cancelled/completed)
   - **Notes** (optional)
3. Click **"Create Booking"**

### Edit Room Booking
1. Click the **pencil icon** (✏️) on any booking
2. Modify the fields
3. Click **"Update Booking"**

### Delete Room Booking
1. Click the **trash icon** (🗑️) on any booking
2. Confirm deletion

### View Booking Details
1. Click the **eye icon** (👁️) on any booking
2. See complete booking information in a modal

## 🗄️ SQL Queries for Supabase

All SQL queries are in `ROOM_BOOKINGS_ADMIN_SQL.sql`. Copy and paste into Supabase SQL Editor:

### Quick Queries:

**1. View All Room Bookings:**
```sql
SELECT * FROM bookings
WHERE room_type IS NOT NULL
ORDER BY check_out DESC;
```

**2. View Bookings by Room Type:**
```sql
SELECT * FROM bookings
WHERE room_type = 'earth-and-clay'
ORDER BY check_out DESC;
```

**3. View Current Occupied Rooms:**
```sql
SELECT * FROM bookings
WHERE room_type IS NOT NULL
  AND check_in <= CURRENT_DATE
  AND check_out >= CURRENT_DATE
  AND status IN ('confirmed', 'pending');
```

**4. Check Room Availability:**
```sql
SELECT * FROM check_room_availability(
  'earth-and-clay'::TEXT,
  '2025-12-01'::DATE,
  '2025-12-03'::DATE,
  '15:00:00'::TIME
);
```

## 🎨 Room Types Available

| Room Type | Slug | Price/Night | Category |
|-----------|------|-------------|----------|
| Earth & Clay | `earth-and-clay` | ₹3,200 | Classic |
| Bloom and Herbs | `bloom-and-herbs` | ₹3,200 | Deluxe |
| Stone and Fog | `stone-and-fog` | ₹2,500 | Deluxe |
| Golden Grasslands | `golden-grasslands` | ₹3,000 | Deluxe |
| Forest Bathing | `forest-bathing` | ₹3,200 | Deluxe |
| Water and Sky | `water-and-sky` | ₹2,500 | Deluxe |

## 📊 Table Columns

The room bookings table shows:
- **Room Type** - Name and price per night
- **Check-in / Check-out** - Dates and time
- **Customer** - Name, email, phone
- **Price** - Total booking price
- **Status** - Color-coded badges (Pending/Confirmed/Cancelled)
- **Actions** - View, Edit, Delete buttons

## 🔍 Filtering & Sorting

- Bookings are sorted by check-out date (newest first)
- Only shows bookings where `room_type IS NOT NULL`
- Regular bookings (without room_type) appear in the main "Bookings" tab

## ⚠️ Important Notes

1. **Room Type is Required**: All room bookings must have a `room_type` selected
2. **Date Validation**: Check-out must be after check-in
3. **Price Calculation**: Price is auto-calculated but can be manually adjusted
4. **Status**: Use "confirmed" for paid bookings, "pending" for unpaid

## 🐛 Troubleshooting

**Issue**: Room bookings not showing
- **Solution**: Make sure bookings have `room_type` field set (not NULL)

**Issue**: Can't create booking
- **Solution**: Check that all required fields are filled, especially room_type

**Issue**: Price not calculating
- **Solution**: Select room type, check-in, and check-out dates first

## 📝 Next Steps

1. Test creating a new room booking
2. Test editing an existing booking
3. Use SQL queries to analyze booking data
4. Check room availability using the SQL function

---

**Last Updated**: 2025-01-27
**Version**: 1.0.0

