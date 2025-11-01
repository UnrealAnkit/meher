# 🚀 MEHER Admin Panel - Quick Start

## ⚡ 5-Minute Setup

### 1️⃣ Database Setup (2 minutes)

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select project: **zejmgbkizasnkxivobte**
3. Go to **SQL Editor** → **New Query**
4. Copy content from `SUPABASE_SETUP.sql` (this file contains all SQL queries)
5. Paste and click **Run** (or Ctrl+Enter)
6. Wait for completion ✅

### 2️⃣ Storage Bucket Setup (1 minute)

1. Go to **Storage** tab
2. Click **Create new bucket**
3. Name: `event-images`
4. Toggle **Make it public**
5. Click **Create bucket** ✅

### 3️⃣ Create Admin User (1 minute)

1. Go to **Authentication** → **Users**
2. Click **Create new user**
3. Enter:
   - Email: `admin@meher.com`
   - Password: `SecurePassword123!` (or your choice)
4. Click **Create user** ✅

### 4️⃣ Start Development Server (1 minute)

```bash
cd C:\Coding\meher\meher
npm install  # (already done)
npm run dev
```

### 5️⃣ Access Admin Panel

🔗 Open: `http://localhost:5173/admin/login`

Login with:
- Email: `admin@meher.com`
- Password: `SecurePassword123!`

## ✅ You're Done!

You can now:
- ✅ Create events
- ✅ Upload images
- ✅ Edit events
- ✅ Delete events

## 📍 Admin Panel URL

**Development**: `http://localhost:5173/admin/login`

**Production**: `https://your-domain.com/admin/login`

## 🎨 UI Features

- Beautiful peach & brown theme matching your website
- Form for event creation with all fields:
  - Title, Description, Tag, Price, Duration
  - Time slots, Detailed description, Image upload
- Events table showing all created events
- Edit/Delete buttons for each event
- Success/error notifications

## 📊 What Gets Saved

Each event includes:
```
{
  title: "Morning Yoga",
  description: "Facilitator: John Doe",
  tag: "UPCOMING",
  price: "Rs 500.00",
  duration: "60 Minutes",
  timeSlots: ["10:00 AM", "11:00 AM"],
  image_url: "https://...",
  expanded_description: "Full details..."
}
```

## 🐛 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| "Could not authenticate" | User doesn't exist - create in Supabase Auth |
| Image upload fails | Create 'event-images' bucket and make it public |
| Blank dashboard | Events table is empty - create first event |
| CORS error | Add your URL to Project Settings → API → CORS |

## 📚 Full Guide

See `ADMIN_PANEL_SETUP.md` for detailed information.

## 🎉 Ready to manage events!

---

**Questions?** Check the troubleshooting section or verify your SQL queries ran successfully.


