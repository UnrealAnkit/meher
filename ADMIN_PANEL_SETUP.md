# MEHER Admin Panel - Setup & Usage Guide

## 🎯 Overview

The MEHER Admin Panel is a beautiful, intuitive dashboard for managing calendar events. It features:

- ✅ Beautiful UI matching your website's design and color theme
- ✅ Supabase authentication
- ✅ Full CRUD operations for calendar events
- ✅ Image upload functionality with preview
- ✅ Real-time database synchronization
- ✅ Responsive design

## 🌐 Access the Admin Panel

**URL**: `http://localhost:5173/admin/login` (development) or `https://your-domain.com/admin/login` (production)

## 📋 Supabase Project Details

- **Project ID**: `zejmgbkizasnkxivobte`
- **URL**: `https://zejmgbkizasnkxivobte.supabase.co`
- **Anon Key**: Already configured in `src/lib/supabase.ts`

## 🚀 Initial Setup Steps

### Step 1: Run SQL Queries

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New Query"**
3. Copy and paste all SQL queries from `SUPABASE_SETUP.sql`
4. Execute the queries

This will create:
- `calendar_events` table with proper structure
- Row Level Security (RLS) policies
- Indexes for performance
- Storage bucket policies

### Step 2: Create Storage Bucket

1. Go to **Supabase Dashboard** → **Storage**
2. Click **"Create a new bucket"**
3. Name it: `event-images`
4. Make it **Public** (toggle the switch)
5. Set file size limit to **10MB**

### Step 3: Create Admin Users

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Create new user"**
3. Enter:
   - Email: (your admin email)
   - Password: (strong password)
4. Click **"Create user"**
5. Repeat for additional admins

**Example**:
```
Email: admin@meher.com
Password: YourSecurePassword123!
```

### Step 4: Configure CORS (if needed)

1. Go to **Supabase Dashboard** → **Project Settings** → **API**
2. Under "CORS Configuration", add your frontend URL:
   - Development: `http://localhost:5173`
   - Production: `https://your-domain.com`

### Step 5: Install Dependencies

```bash
npm install
```

The `@supabase/supabase-js` package is already added to `package.json`.

## 🎨 Admin Panel Features

### Dashboard Overview

**Header**:
- MEHER branding with brown theme
- Logout button (top right)

**Main Content**:
- Notification system (success/error messages)
- Add New Event button
- Event form (expandable)
- Events list table

### Creating an Event

1. Click **"Add New Event"** button
2. Fill in the form:
   - **Event Title**: Name of the event (e.g., "Morning Yoga Session")
   - **Tag**: Select from UPCOMING, FEATURED, POPULAR
   - **Price**: Format like "Rs 500.00"
   - **Duration**: Format like "60 Minutes"
   - **Facilitator Description**: Who's leading (e.g., "Facilitator: Yoga Master")
   - **Time Slots**: Comma-separated times (e.g., "10:00 AM, 11:00 AM, 2:00 PM")
   - **Detailed Description**: Full event details
   - **Event Image**: Upload JPG/PNG image
3. Click **"Create Event"**
4. See success notification ✅

### Editing an Event

1. Locate the event in the Events List table
2. Click the **Edit icon** (pencil) in the Actions column
3. Form will populate with event data
4. Make your changes
5. Click **"Update Event"**
6. See success notification ✅

### Deleting an Event

1. Locate the event in the Events List table
2. Click the **Delete icon** (trash) in the Actions column
3. Confirm deletion in the popup
4. Event is removed
5. See success notification ✅

### Image Upload

- Supported formats: JPG, PNG, WebP, GIF
- Recommended size: **400x300px**
- Max file size: **10MB**
- Images are automatically uploaded to Supabase Storage
- Public URL is saved to the database

## 🎨 Color Theme

The admin panel uses your website's color scheme:

- **Primary**: `#ab4b28` (Brown)
- **Secondary**: `#f9d2a3` (Peach)
- **Text**: `#24312e` (Dark Green)
- **Background**: `#f9f5f0` (Light Cream)

## 📊 Database Structure

### calendar_events Table

```sql
id              UUID (Primary Key)
title           VARCHAR(255) - Event name
description     TEXT - Facilitator info
tag             VARCHAR(100) - Event category
price           VARCHAR(50) - Price in currency format
duration        VARCHAR(50) - Duration string
time_slots      TEXT[] - Array of time slots
image_url       TEXT - Public URL to event image
expanded_description TEXT - Full event details
created_at      TIMESTAMP - Creation date
updated_at      TIMESTAMP - Last update date
```

### Example Data

```json
{
  "title": "Morning Yoga Session",
  "description": "Facilitator: Yoga Master",
  "tag": "UPCOMING",
  "price": "Rs 500.00",
  "duration": "60 Minutes",
  "timeSlots": ["10:00 AM", "11:00 AM", "12:00 PM"],
  "image_url": "https://...",
  "expanded_description": "Join our rejuvenating morning yoga..."
}
```

## 🔑 Authentication

- Uses **Supabase Auth**
- No user registration available (admin creates users manually)
- Session persists across browser refreshes
- Logout clears session and redirects to home

## 🐛 Troubleshooting

### Error: "Could not authenticate"

**Cause**: Email/password combination is incorrect or user doesn't exist

**Solution**:
1. Check user exists in Supabase Auth
2. Verify email and password are correct
3. Reset password if needed

### Error: "Failed to fetch events"

**Cause**: Database connection issue or RLS policy problem

**Solution**:
1. Check Supabase is running
2. Verify RLS policies are correct (see SUPABASE_SETUP.sql)
3. Check internet connection

### Error: "Failed to upload image"

**Cause**: Storage bucket doesn't exist or policies are wrong

**Solution**:
1. Create 'event-images' bucket (must be public)
2. Run storage policies from SUPABASE_SETUP.sql
3. Check file size < 10MB

### Image not showing in preview

**Cause**: File upload failed silently

**Solution**:
1. Check browser console for errors (F12)
2. Verify image file is valid
3. Try different image format

### Blank dashboard after login

**Cause**: Events table is empty

**Solution**:
1. This is normal for new projects
2. Click "Add New Event" to create first event
3. Insert sample data from SUPABASE_SETUP.sql if needed

## 📱 Using Events on Frontend

The events created in the admin panel are automatically available in:
- `/calendar` page
- Calendar component displays events from the database

Example implementation:

```typescript
import { supabase } from '../lib/supabase';

const { data: events } = await supabase
  .from('calendar_events')
  .select('*')
  .order('created_at', { ascending: false });
```

## 🔒 Security Notes

- ✅ All data is protected by Row Level Security (RLS)
- ✅ Only authenticated users can modify events
- ✅ Images are stored in public bucket but can be deleted only by admins
- ✅ Passwords are hashed by Supabase
- ✅ API keys are restricted by CORS

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Check browser console (F12) for error messages
3. Review Supabase dashboard for database issues
4. Verify all SQL queries were run successfully

## 🎓 Next Steps

1. ✅ Run SQL queries from SUPABASE_SETUP.sql
2. ✅ Create event-images storage bucket
3. ✅ Create admin users in Supabase Auth
4. ✅ Test login at /admin/login
5. ✅ Create sample events
6. ✅ Verify events appear on /calendar page
7. ✅ Share /admin/login link with team members

---

**Happy Managing! 🎉**


