# ✅ Admin Panel Implementation Checklist

Complete these steps in order to fully set up and test your admin panel.

## Phase 1: Database Setup (5 minutes)

### Database & Tables
- [ ] Open [Supabase Dashboard](https://app.supabase.com)
- [ ] Select project: `zejmgbkizasnkxivobte`
- [ ] Go to **SQL Editor**
- [ ] Copy all SQL from `SUPABASE_SETUP.sql`
- [ ] Paste into SQL Editor
- [ ] Click **Run** (Ctrl+Enter)
- [ ] Wait for completion ✅
- [ ] Verify table created: `SELECT * FROM calendar_events;`

### Storage Bucket
- [ ] Go to **Storage** tab
- [ ] Click **Create a new bucket**
- [ ] Name: `event-images`
- [ ] Toggle **Make it public**
- [ ] Click **Create bucket** ✅

### Row Level Security
- [ ] Run storage policies from `SUPABASE_SETUP.sql`
- [ ] Verify RLS is enabled: `SELECT tablename FROM pg_tables WHERE schemaname='public';`

## Phase 2: Authentication Setup (3 minutes)

### Create Admin Users
- [ ] Go to **Authentication** → **Users**
- [ ] Click **Create new user**
- [ ] Email: `admin@meher.com` (or your email)
- [ ] Password: Create a strong password
- [ ] Click **Create user** ✅
- [ ] Repeat for additional admins if needed

### CORS Configuration
- [ ] Go to **Project Settings** → **API**
- [ ] Find **CORS** section
- [ ] Add `http://localhost:5173` (development)
- [ ] Add `https://your-domain.com` (production)
- [ ] Save changes

## Phase 3: Code Setup (2 minutes)

### Dependencies
- [ ] Run `npm install` (already done ✅)
- [ ] Verify Supabase package: `npm list @supabase/supabase-js`

### Environment Variables
- [ ] Check `src/lib/supabase.ts` has correct:
  - [ ] Project URL: `https://zejmgbkizasnkxivobte.supabase.co`
  - [ ] Anon Key: Already set ✅

### Verify Files Created
- [ ] `src/lib/supabase.ts` ✅
- [ ] `src/pages/AdminLoginPage.tsx` ✅
- [ ] `src/pages/AdminDashboardPage.tsx` ✅
- [ ] `src/index.tsx` (updated with admin routes) ✅
- [ ] `package.json` (Supabase dependency added) ✅

## Phase 4: Development & Testing (5 minutes)

### Start Development Server
- [ ] Terminal: `npm run dev`
- [ ] Wait for compilation to complete
- [ ] Check for any errors in console

### Test Login Page
- [ ] Open: `http://localhost:5173/admin/login`
- [ ] Check UI is rendered correctly
- [ ] Verify color theme matches website (brown & peach)
- [ ] Check form layout is responsive
- [ ] Test password visibility toggle
- [ ] Try login with incorrect credentials (should show error)
- [ ] Try login with correct credentials:
  - Email: `admin@meher.com`
  - Password: (the one you created)
- [ ] Should redirect to `/admin/dashboard` ✅

### Test Admin Dashboard
- [ ] Dashboard should load successfully
- [ ] Verify "Add New Event" button is visible
- [ ] Verify events table is visible (empty initially)
- [ ] Check header has MEHER branding and logout button

## Phase 5: Event Creation Testing (5 minutes)

### Create First Event
- [ ] Click **"Add New Event"** button
- [ ] Fill in the form:
  - [ ] Title: "Morning Yoga Session"
  - [ ] Tag: "UPCOMING"
  - [ ] Price: "Rs 500.00"
  - [ ] Duration: "60 Minutes"
  - [ ] Facilitator: "Facilitator: Yoga Master"
  - [ ] Time Slots: "10:00 AM, 11:00 AM, 2:00 PM"
  - [ ] Description: "Join our yoga session for wellness"
  - [ ] Image: Select a JPG or PNG file
- [ ] Verify image preview shows
- [ ] Click **"Create Event"**
- [ ] Should see success notification ✅
- [ ] Event should appear in table

### Verify Event in Database
- [ ] Go to Supabase → Table Editor
- [ ] Select `calendar_events` table
- [ ] Verify event is there with all fields ✅
- [ ] Check image_url is populated with public URL

## Phase 6: CRUD Operations Testing (10 minutes)

### Test Read
- [ ] Events display in table
- [ ] Event count shows in table header
- [ ] All event details are visible

### Test Update
- [ ] Click Edit button (pencil icon) for an event
- [ ] Form populates with event data ✅
- [ ] Change event title to "Updated Yoga Session"
- [ ] Click **"Update Event"**
- [ ] See success notification ✅
- [ ] Table updates automatically

### Test Delete
- [ ] Click Delete button (trash icon) for an event
- [ ] Confirm deletion in popup
- [ ] Event removed from table ✅
- [ ] See success notification ✅
- [ ] Verify in Supabase table

### Test Image Upload
- [ ] Create new event
- [ ] Upload different image
- [ ] Verify preview shows
- [ ] Check image URL in Supabase database
- [ ] Try to open image URL in new tab (should work)

## Phase 7: Session Testing (3 minutes)

### Test Session Persistence
- [ ] Logged in to admin dashboard
- [ ] Refresh the page (F5)
- [ ] Should stay logged in ✅

### Test Logout
- [ ] Click **Logout** button in header
- [ ] Should redirect to home page
- [ ] Try to access `/admin/dashboard`
- [ ] Should redirect to `/admin/login` ✅

### Test Session Expiry
- [ ] Logout
- [ ] Manually go to `/admin/dashboard`
- [ ] Should redirect to login page ✅

## Phase 8: Responsive Design Testing (5 minutes)

### Desktop View
- [ ] Form displays in 2 columns
- [ ] Table is fully visible
- [ ] All buttons are clickable

### Mobile View
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (mobile view)
- [ ] Form displays in single column
- [ ] Buttons are touch-friendly
- [ ] Table is readable
- [ ] Images display properly

### Tablet View
- [ ] Check layout at 768px width
- [ ] Check layout at 1024px width
- [ ] Verify scaling works correctly

## Phase 9: Error Handling Testing (5 minutes)

### Network Errors
- [ ] Open DevTools Network tab
- [ ] Block requests to Supabase
- [ ] Try to create event
- [ ] Should show error notification ✅

### Authentication Errors
- [ ] Try login with wrong email
- [ ] Try login with wrong password
- [ ] Should show specific error messages

### Validation Errors
- [ ] Try to create event without title
- [ ] Form should require fields
- [ ] Try uploading very large image (> 10MB)
- [ ] Should show error

## Phase 10: Performance Testing (5 minutes)

### Load Testing
- [ ] Create 5-10 events
- [ ] Check table loads quickly
- [ ] No lag when scrolling
- [ ] Editing/deleting is responsive

### Image Upload
- [ ] Upload images of different sizes
- [ ] Check upload speed
- [ ] Verify images display correctly

## Phase 11: Security Verification (5 minutes)

### Check RLS Policies
- [ ] Go to Supabase → Authentication → Policies
- [ ] Verify policies exist for `calendar_events`
- [ ] Verify storage policies exist
- [ ] Unauthenticated users can read but not modify

### Check API Keys
- [ ] Verify Supabase keys are in frontend code only
- [ ] No sensitive data in console logs
- [ ] CORS is properly configured

## Phase 12: Documentation Review (3 minutes)

### Check Documentation
- [ ] `QUICK_START.md` - 5 minute guide ✅
- [ ] `ADMIN_PANEL_SETUP.md` - Detailed guide ✅
- [ ] `SQL_QUERIES_SUMMARY.md` - Copy-paste SQL ✅
- [ ] `ADMIN_PANEL_FEATURES.md` - Features ✅
- [ ] `README_ADMIN_PANEL.md` - Overview ✅

## Final Checklist: Before Going Live

### Pre-Production
- [ ] All SQL queries ran successfully
- [ ] Storage bucket is public
- [ ] Admin users created
- [ ] CORS configured for production URL
- [ ] Environment variables set (if any)
- [ ] Error handling working
- [ ] Mobile responsive
- [ ] Security verified

### Production Deployment
- [ ] Build project: `npm run build`
- [ ] Deploy to your hosting
- [ ] Update `/admin/login` URL in production
- [ ] Test login with production URL
- [ ] Create test event in production
- [ ] Verify image upload works
- [ ] Share admin URL with team

## ✅ All Done!

Congratulations! Your admin panel is fully set up and tested. You can now:

- ✅ Create calendar events
- ✅ Upload and manage images
- ✅ Edit and delete events
- ✅ Manage admin users
- ✅ Secure admin access

## 🎯 Next Steps

1. Invite team members to create accounts
2. Create production admin users
3. Set up event creation workflow
4. Train team on using admin panel
5. Monitor performance and security
6. Regular backups of database

## 📞 Quick Reference

**Admin Panel**: `/admin/login`
**Supabase URL**: `https://zejmgbkizasnkxivobte.supabase.co`
**Project ID**: `zejmgbkizasnkxivobte`
**Storage Bucket**: `event-images`
**Table**: `calendar_events`

## 🐛 Issues?

Refer to troubleshooting in:
- `ADMIN_PANEL_SETUP.md` (Detailed)
- `QUICK_START.md` (Quick)
- `README_ADMIN_PANEL.md` (Overview)

---

**You're all set! Happy managing! 🎉**



