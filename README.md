# MEHER - Wellness & Healing Platform

A beautiful wellness platform for booking experiences, classes, and accessing healing resources in Marbella.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- Supabase account (project already configured)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Your project will be accessible at [http://localhost:5173/](http://localhost:5173/)

### Production Build

```bash
npm run build
```

---

## 📊 Admin Panel

### 🔐 Accessing the Admin Panel

1. **URL**: Navigate to `/admin/login`
   - **Development**: `http://localhost:5173/admin/login`
   - **Production**: `https://meherr.netlify.app/admin/login`

2. **Login Credentials**:
   - Create admin users in **Supabase Dashboard** → **Authentication** → **Users**
   - Click "Create new user"
   - Enter email and password
   - Use these credentials to login

### ⚠️ Important: Configure CORS for Production

For the admin panel to work on your production domain, you must add it to Supabase CORS:

1. Go to [Supabase Dashboard](https://app.supabase.com/project/zejmgbkizasnkxivobte/settings/api)
2. Find **CORS Configuration** section
3. Add your production domain: `https://meherr.netlify.app`
4. Also keep development URLs: `http://localhost:5173`, `http://localhost:5174`
5. Click **Save**

**Without this step, the admin panel won't work on production!**

See `PRODUCTION_DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

### 🎯 Admin Panel Sections

After logging in, you'll see a sidebar with 6 sections:

#### 1. **Dashboard** (`/admin/dashboard`)
- Overview statistics for all sections
- Quick action cards to navigate
- Shows total counts: Events, Classes, Users, Bookings, Blogs

#### 2. **Events** (`/admin/events`)
Manage calendar events that appear on the website.

**Features:**
- ✅ Create new events
- ✅ Edit existing events
- ✅ Delete events
- ✅ Upload event images
- ✅ Set event dates

**Fields:**
- **Title** - Event name (e.g., "Morning Yoga Session")
- **Tag** - UPCOMING, FEATURED, or POPULAR
- **Price** - e.g., "Rs 500.00"
- **Duration** - e.g., "60 Minutes"
- **Event Date** - Select date from calendar
- **Facilitator** - e.g., "Facilitator: Yoga Master"
- **Time Slots** - Comma-separated (e.g., "10:00 AM, 11:00 AM")
- **Description** - Detailed event information
- **Image** - Upload event image

**How to Use:**
1. Click "Add New Event" button
2. Fill in all required fields (marked with *)
3. Upload an image (optional but recommended)
4. Click "Create Event"
5. Event appears in the table below
6. Click Edit (pencil icon) to modify
7. Click Delete (trash icon) to remove

#### 3. **Classes** (`/admin/classes`)
Manage recurring classes and sessions.

**Features:**
- ✅ Create classes
- ✅ Assign instructors
- ✅ Set capacity limits
- ✅ Upload class images

**Fields:**
- **Title** - Class name
- **Instructor** - Who teaches the class
- **Duration** - Class length
- **Price** - Class pricing
- **Capacity** - Maximum students
- **Schedule** - e.g., "Mon, Wed, Fri at 10:00 AM"
- **Description** - Class details
- **Image** - Class photo

**How to Use:**
1. Click "Add New Class"
2. Fill in class information
3. Upload class image
4. Click "Create Class"
5. Manage classes via Edit/Delete buttons

#### 4. **Users** (`/admin/users`)
Manage user accounts and profiles.

**Features:**
- ✅ Add new users
- ✅ Edit user information
- ✅ Assign roles
- ✅ Delete users

**Fields:**
- **Email** - User email address
- **Full Name** - User's name
- **Phone** - Contact number (optional)
- **Role** - user, admin, or instructor

**Roles:**
- **User** - Regular client
- **Admin** - Full access to admin panel
- **Instructor** - Can teach classes

**How to Use:**
1. Click "Add New User"
2. Enter user details
3. Select appropriate role
4. Click "Create User"
5. Edit or delete via table actions

#### 5. **Bookings** (`/admin/bookings`)
Manage reservations and bookings.

**Features:**
- ✅ Create bookings
- ✅ Link to events or classes
- ✅ Track booking status
- ✅ Monitor payment status

**Fields:**
- **User ID** - UUID of the user booking
- **Event ID** - Link to event (optional)
- **Class ID** - Link to class (optional)
- **Booking Date** - When booking is for
- **Status** - pending, confirmed, or cancelled
- **Payment Status** - pending, paid, or refunded
- **Notes** - Additional information

**How to Use:**
1. Click "New Booking" button
2. Enter User ID (from Users section)
3. Enter Event ID or Class ID (one required)
4. Select booking date
5. Set status and payment status
6. Add notes if needed
7. Click "Create Booking"

**Note**: Bookings can link to either an event OR a class, not both.

#### 6. **Blogs** (`/admin/blogs`)
Manage blog posts and articles.

**Features:**
- ✅ Create blog posts
- ✅ Publish/Draft toggle
- ✅ Auto-generate URL slugs
- ✅ Upload featured images

**Fields:**
- **Title** - Blog post title
- **Slug** - URL-friendly version (auto-generated from title)
- **Author** - Writer's name
- **Excerpt** - Short description
- **Content** - Full blog post content
- **Published** - Toggle to publish or save as draft
- **Image** - Featured image

**How to Use:**
1. Click "Add New Blog"
2. Enter blog title (slug auto-generates)
3. Write excerpt and full content
4. Set author name
5. Upload featured image
6. Toggle "Published" to make it live
7. Click "Create Blog"
8. Published blogs can be viewed on website

---

## 📝 Common Operations

### Creating New Items

1. Navigate to the desired section (Events, Classes, etc.)
2. Click "Add New [Item]" button
3. Fill in the form fields
4. Upload images if required
5. Click "Create [Item]"
6. See success notification
7. Item appears in the table

### Editing Items

1. Find the item in the table
2. Click the **Edit icon** (pencil) in Actions column
3. Form populates with existing data
4. Make your changes
5. Click "Update [Item]"
6. Changes saved successfully

### Deleting Items

1. Find the item in the table
2. Click the **Delete icon** (trash) in Actions column
3. Confirm deletion in popup
4. Item is removed
5. Success notification appears

### Image Uploads

**Supported Formats:**
- JPG/JPEG
- PNG
- WebP
- GIF

**Best Practices:**
- Recommended size: 400x300px for events/classes
- Max file size: 10MB
- Use high-quality images
- Optimize images before uploading

**How to Upload:**
1. Click "Choose File" or "Browse"
2. Select image from your computer
3. Preview appears automatically
4. Submit form to upload
5. Image stored in Supabase Storage

---

## 🎨 UI Features

### Navigation
- **Sidebar** - Always visible on left
- **Active Highlighting** - Current section highlighted in brown
- **Quick Access** - Click any section to navigate
- **Logout** - Red button at bottom of sidebar

### Notifications
- **Success** - Green notification (auto-hides after 3 seconds)
- **Error** - Red notification with error message
- **Auto-dismiss** - Notifications disappear automatically

### Tables
- **Sortable** - Click headers to sort
- **Actions** - Edit and Delete buttons on each row
- **Alternating Colors** - Easy to read
- **Hover Effects** - Rows highlight on hover

### Forms
- **Validation** - Required fields marked with *
- **Image Preview** - See images before submitting
- **Auto-fill** - Editing populates form automatically
- **Cancel Option** - Close form without saving

---

## 🔧 Troubleshooting

### Can't Login
- **Check**: User exists in Supabase Auth
- **Solution**: Create user in Supabase Dashboard → Authentication → Users

### Images Not Uploading
- **Check**: Storage bucket exists and is public
- **Solution**: Create bucket in Storage tab, make it Public

### Data Not Saving
- **Check**: Browser console for errors (F12)
- **Solution**: Verify SQL queries ran successfully

### Table Empty After Creating Item
- **Check**: Refresh page
- **Solution**: Data saves correctly, refresh to see it

### Can't See All Sections
- **Check**: You're logged in
- **Solution**: Logout and login again

### Admin Panel Doesn't Work on Production Domain
- **Check**: CORS configuration in Supabase
- **Solution**: Add `https://meherr.netlify.app` to Supabase CORS allowed origins
  1. Go to Supabase Dashboard → Project Settings → API
  2. Find CORS Configuration
  3. Add production domain
  4. Save and refresh admin panel
- **See**: `PRODUCTION_DEPLOYMENT_GUIDE.md` for full instructions

---

## 📍 Quick Reference

### Admin URLs

**Development:**
```
http://localhost:5173/admin/login
http://localhost:5173/admin/dashboard
http://localhost:5173/admin/events
http://localhost:5173/admin/classes
http://localhost:5173/admin/users
http://localhost:5173/admin/bookings
http://localhost:5173/admin/blogs
```

**Production:**
```
https://meherr.netlify.app/admin/login
https://meherr.netlify.app/admin/dashboard
https://meherr.netlify.app/admin/events
https://meherr.netlify.app/admin/classes
https://meherr.netlify.app/admin/users
https://meherr.netlify.app/admin/bookings
https://meherr.netlify.app/admin/blogs
```

### Keyboard Shortcuts
- **Tab** - Navigate form fields
- **Enter** - Submit form
- **Escape** - Close modal/form (where applicable)

---

## 🎓 Best Practices

### Events Management
- Keep titles descriptive and clear
- Use consistent date format
- Upload high-quality images
- Set realistic time slots

### Classes Management
- Update schedules regularly
- Monitor capacity limits
- Keep instructor information current
- Use clear class descriptions

### Users Management
- Assign roles carefully
- Verify email addresses
- Keep user data updated
- Use secure passwords for admin accounts

### Bookings Management
- Track booking status regularly
- Update payment status promptly
- Add notes for special requests
- Link bookings to correct events/classes

### Blogs Management
- Write engaging excerpts
- Use SEO-friendly slugs
- Upload featured images
- Toggle published status correctly
- Proofread before publishing

---

## 📚 Additional Resources

- **Database Setup**: See `ADMIN_PANEL_TABLES_SETUP.sql`
- **Quick Reference**: See `ADMIN_PANEL_QUICK_REFERENCE.md`
- **Complete Guide**: See `COMPLETE_ADMIN_PANEL_SETUP.md`
- **Troubleshooting**: Check browser console (F12)

---

## 🎯 Summary

The admin panel provides complete control over:
- ✅ Calendar events
- ✅ Classes and sessions
- ✅ User accounts
- ✅ Bookings and reservations
- ✅ Blog posts
- ✅ All content displayed on the website

**All sections are accessible via the sidebar navigation after login.**

---

**Happy Managing! 🎨✨**
