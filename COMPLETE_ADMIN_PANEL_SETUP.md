# 🎨 Complete MEHER Admin Panel - Multi-Section Setup

## 🎯 Overview

Your admin panel now includes **6 sections**:
1. ✅ **Dashboard** - Overview with statistics
2. ✅ **Events** - Calendar event management
3. ✅ **Classes** - Class management
4. ✅ **Users** - User management
5. ✅ **Bookings** - Booking/reservation management
6. ✅ **Blogs** - Blog post management

---

## 📦 What's Included

### **New Admin Pages Created:**

```
src/pages/admin/
├── AdminLayout.tsx              ← Sidebar navigation layout
├── AdminDashboardOverview.tsx   ← Dashboard with stats
├── AdminEventsPage.tsx          ← Events management
├── AdminClassesPage.tsx         ← Classes management
├── AdminUsersPage.tsx           ← Users management
├── AdminBookingsPage.tsx        ← Bookings management
└── AdminBlogsPage.tsx           ← Blogs management
```

### **Database Setup:**
- `ADMIN_PANEL_TABLES_SETUP.sql` - Complete SQL for all tables

---

## 🚀 Setup Instructions

### **Step 1: Database Setup (10 minutes)**

1. Go to **Supabase Dashboard** → **SQL Editor**
2. **First**, run the existing calendar events setup:
   - Copy from `SUPABASE_SETUP_SAFE.sql`
   - Run queries
3. **Then**, run the new tables setup:
   - Copy **ALL** content from `ADMIN_PANEL_TABLES_SETUP.sql`
   - Paste and **Run**
4. This creates:
   - `classes` table
   - `users` table
   - `bookings` table
   - `blogs` table
   - Storage buckets: `class-images`, `blog-images`

### **Step 2: Create Storage Buckets (2 minutes)**

If storage buckets weren't created by SQL:

1. Go to **Storage** tab
2. Create bucket: `class-images` (Public)
3. Create bucket: `blog-images` (Public)

### **Step 3: Test Admin Panel (5 minutes)**

1. Start dev server: `npm run dev`
2. Login at: `/admin/login`
3. You'll see the new sidebar with all sections:
   - Dashboard
   - Events
   - Classes
   - Users
   - Bookings
   - Blogs

---

## 📊 Database Tables Structure

### **1. Classes Table**
```sql
- id (UUID)
- title (VARCHAR)
- description (TEXT)
- instructor (VARCHAR)
- duration (VARCHAR)
- price (VARCHAR)
- capacity (INTEGER)
- schedule (TEXT)
- image_url (TEXT)
- created_at, updated_at
```

### **2. Users Table**
```sql
- id (UUID)
- email (VARCHAR, UNIQUE)
- full_name (VARCHAR)
- phone (VARCHAR)
- role (VARCHAR) - user/admin/instructor
- created_at, updated_at
```

### **3. Bookings Table**
```sql
- id (UUID)
- user_id (UUID) - References users
- event_id (UUID) - References calendar_events (optional)
- class_id (UUID) - References classes (optional)
- booking_date (DATE)
- status (VARCHAR) - pending/confirmed/cancelled
- payment_status (VARCHAR) - pending/paid/refunded
- notes (TEXT)
- created_at, updated_at
```

### **4. Blogs Table**
```sql
- id (UUID)
- title (VARCHAR)
- slug (VARCHAR, UNIQUE)
- content (TEXT)
- excerpt (TEXT)
- author (VARCHAR)
- image_url (TEXT)
- published (BOOLEAN)
- published_at (TIMESTAMP)
- created_at, updated_at
```

---

## 🎨 Admin Panel Features

### **Navigation Sidebar**
- Beautiful sidebar with all sections
- Active route highlighting
- Logout button at bottom
- Responsive design

### **Each Section Has:**
- ✅ Create/Add button
- ✅ Form for creating/editing
- ✅ Data table with all records
- ✅ Edit & Delete buttons
- ✅ Success/Error notifications
- ✅ Image upload support (where applicable)
- ✅ Loading states

---

## 📍 Admin Panel URLs

| Section | URL |
|---------|-----|
| Dashboard | `/admin/dashboard` |
| Events | `/admin/events` |
| Classes | `/admin/classes` |
| Users | `/admin/users` |
| Bookings | `/admin/bookings` |
| Blogs | `/admin/blogs` |

---

## 🔑 Features by Section

### **Events**
- Create calendar events
- Set event dates
- Time slots management
- Image uploads
- Tag categories (UPCOMING, FEATURED, POPULAR)

### **Classes**
- Class schedule management
- Instructor assignment
- Capacity limits
- Pricing
- Class images

### **Users**
- User profile management
- Role assignment (user/admin/instructor)
- Email and phone
- Full name

### **Bookings**
- Link to events or classes
- Booking status tracking
- Payment status
- Booking notes
- Date management

### **Blogs**
- Blog post creation
- Auto-slug generation
- Published/Draft status
- Featured images
- Author attribution

---

## 🗄️ Storage Buckets Required

1. `event-images` - For event images (already exists)
2. `class-images` - For class images (new)
3. `blog-images` - For blog images (new)

All buckets should be **Public** for images to display on website.

---

## ✅ Quick Test Checklist

After setup, test each section:

- [ ] **Dashboard** - Shows statistics for all sections
- [ ] **Events** - Create, edit, delete events
- [ ] **Classes** - Create class with image upload
- [ ] **Users** - Add user with role
- [ ] **Bookings** - Create booking linked to event/class
- [ ] **Blogs** - Create blog post, publish/draft toggle
- [ ] **Navigation** - Click between all sections
- [ ] **Logout** - Logout button works

---

## 📝 SQL Queries Summary

All tables are created with:
- ✅ Row Level Security (RLS) enabled
- ✅ Policies for authenticated users
- ✅ Indexes for performance
- ✅ Foreign key relationships (bookings)

**Run**: `ADMIN_PANEL_TABLES_SETUP.sql` in Supabase SQL Editor

---

## 🎯 Next Steps

1. ✅ Run SQL queries from `ADMIN_PANEL_TABLES_SETUP.sql`
2. ✅ Create storage buckets (if not auto-created)
3. ✅ Test all sections in admin panel
4. ✅ Create sample data for testing
5. ✅ Customize as needed

---

## 📚 Future: Client-Facing Pages

Later, these sections can be displayed on the website:
- **Classes** → Show classes page for clients
- **Blogs** → Display blog posts
- **Bookings** → Allow users to make bookings
- **Users** → User profiles (for clients)

---

**Your complete multi-section admin panel is ready! 🎉**

**Access**: `/admin/login` → Navigate through all sections via sidebar!




