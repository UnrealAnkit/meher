# 📋 Admin Panel Quick Reference

## 🎯 All Admin Sections

### **Dashboard** (`/admin/dashboard`)
- Overview statistics for all sections
- Quick action buttons
- Card-based layout

### **Events** (`/admin/events`)
- Calendar event management
- Fields: Title, Tag, Price, Duration, Date, Time Slots, Image, Description
- Same as before, now in dedicated section

### **Classes** (`/admin/classes`)
- Class management
- Fields: Title, Instructor, Duration, Price, Capacity, Schedule, Image, Description
- Image upload to `class-images` bucket

### **Users** (`/admin/users`)
- User profile management
- Fields: Email, Full Name, Phone, Role (user/admin/instructor)
- Role badges with colors

### **Bookings** (`/admin/bookings`)
- Booking/reservation management
- Fields: User ID, Event/Class ID, Booking Date, Status, Payment Status, Notes
- Links to events or classes
- Status badges (pending/confirmed/cancelled)

### **Blogs** (`/admin/blogs`)
- Blog post management
- Fields: Title, Slug (auto-generated), Content, Excerpt, Author, Image, Published
- Publish/Draft toggle
- Image upload to `blog-images` bucket

---

## 📊 Database Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `calendar_events` | Events | title, event_date, price, duration |
| `classes` | Classes | title, instructor, capacity, schedule |
| `users` | Users | email, full_name, role |
| `bookings` | Bookings | user_id, event_id/class_id, status |
| `blogs` | Blogs | title, slug, content, published |

---

## 🗄️ Storage Buckets

| Bucket | Purpose | Public |
|--------|---------|--------|
| `event-images` | Event images | Yes |
| `class-images` | Class images | Yes |
| `blog-images` | Blog images | Yes |

---

## 🎨 UI Components

### **Sidebar Navigation**
- Sticky sidebar on left
- Active route highlighting
- Logout button at bottom
- All sections accessible

### **Common Features**
- Add/Create button
- Form with validation
- Data table with actions
- Edit & Delete buttons
- Success/Error notifications
- Image upload with preview

---

## 📝 SQL Setup Order

1. Run `SUPABASE_SETUP_SAFE.sql` (calendar_events)
2. Run `ADMIN_PANEL_TABLES_SETUP.sql` (all new tables)
3. Verify storage buckets exist

---

## 🚀 Access URLs

**Login**: `/admin/login`
**Dashboard**: `/admin/dashboard`
**Events**: `/admin/events`
**Classes**: `/admin/classes`
**Users**: `/admin/users`
**Bookings**: `/admin/bookings`
**Blogs**: `/admin/blogs`

---

## ✅ Testing Checklist

- [ ] Login works
- [ ] Dashboard shows stats
- [ ] Can navigate all sections
- [ ] Can create events
- [ ] Can create classes
- [ ] Can create users
- [ ] Can create bookings
- [ ] Can create blogs
- [ ] Images upload successfully
- [ ] Edit/Delete works
- [ ] Logout works

---

**Everything is ready! 🎉**



