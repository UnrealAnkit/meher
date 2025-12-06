# 🎯 Event Date Range & Shareable Links Feature Guide

## ✅ What's New

### 1. **Start Date & End Date Fields**
Events now support date ranges! You can set:
- **Start Date**: When the event begins
- **End Date**: When the event ends
- **Event Date**: Display date (kept for backward compatibility)

### 2. **Shareable Event Links**
Each event now has a unique shareable link that:
- Goes directly to that specific event
- Opens the calendar on the event's date
- Highlights the event with a visual indicator
- Perfect for sharing in emails, WhatsApp, social media, etc.

---

## 🚀 Setup Instructions

### Step 1: Update Database

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file: `ADD_EVENT_DATE_RANGE.sql`
3. Copy and paste the contents into SQL Editor
4. Click **Run**

This will:
- Add `start_date` and `end_date` columns to `calendar_events` table
- Populate existing events with dates (using `event_date` as default)
- Add a validation constraint to ensure `end_date >= start_date`
- Create an index for better query performance

---

## 📝 How to Use

### Creating/Editing Events in Admin Panel

1. **Go to Admin Panel** → **Events** (`/admin/events`)

2. **Click "Add New Event"** or edit an existing event

3. **Fill in the new date fields**:
   - **Event Date**: The primary display date (e.g., Jan 11, 2026)
   - **Start Date**: When the event starts (can be same as Event Date)
   - **End Date**: When the event ends (can be same as Event Date for single-day events)

4. **Example Use Cases**:
   
   **Single Day Event:**
   - Event Date: Jan 11, 2026
   - Start Date: Jan 11, 2026
   - End Date: Jan 11, 2026
   
   **Multi-Day Event (e.g., Weekend Workshop):**
   - Event Date: Jan 11, 2026 (first day shown)
   - Start Date: Jan 11, 2026
   - End Date: Jan 13, 2026
   
   **Week-Long Retreat:**
   - Event Date: Jan 11, 2026
   - Start Date: Jan 11, 2026
   - End Date: Jan 18, 2026

---

## 🔗 Using Shareable Links

### Getting the Link

1. **Go to Admin Panel** → **Events**
2. Find the event you want to share
3. Click the **"Copy"** button with the link icon in the "Link" column
4. You'll see a success message: "Link copied to clipboard!"

### Link Format

```
https://yourdomain.com/calendar?event=EVENT_ID
```

Example:
```
https://meherspaces.com/calendar?event=123e4567-e89b-12d3-a456-426614174000
```

### What Happens When Someone Clicks the Link?

1. ✅ Opens the calendar page
2. ✅ Automatically selects the event's date
3. ✅ Scrolls to the specific event
4. ✅ Highlights the event with a visual border
5. ✅ User can immediately see event details and book

---

## 💡 Use Cases for Shareable Links

### 1. **Email Campaigns**
```
Join us for Dance Within - Movement & Expression on Jan 11!
Book now: https://meherspaces.com/calendar?event=abc123
```

### 2. **WhatsApp Messages**
```
Hey! Check out this amazing yoga workshop:
https://meherspaces.com/calendar?event=abc123
```

### 3. **Social Media Posts**
```
🧘‍♀️ New class alert! Aerial Yoga this Saturday
Register: https://meherspaces.com/calendar?event=xyz789
#MeherSpaces #Yoga
```

### 4. **SMS/Text Messages**
```
Reminder: Your booked event "Dance Within" is on Jan 11.
View details: https://meherspaces.com/calendar?event=abc123
```

### 5. **Printed Materials**
Add QR codes that link directly to specific events!

---

## 🎨 Visual Features

### In Admin Panel

**Events Table Now Shows:**
| Title | Date | Price | Duration | Tag | **Link** | Actions |
|-------|------|-------|----------|-----|----------|---------|
| Dance Within... | Jan 11, 2026 | 1499 | 180 mins | UPCOMING | **[🔗 Copy]** | ✏️ 🗑️ |

**New Form Fields:**
```
Event Date (Display Date) *    [date picker]
Start Date *                   [date picker]
End Date *                     [date picker]
```

### On Calendar Page

When someone clicks a shareable link:
- Event card gets a **highlighted border** (orange ring)
- Page **auto-scrolls** to show the event
- Calendar is set to the **correct date**

---

## 🔧 Technical Details

### Database Schema

```sql
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,         -- Display date
  start_date DATE NOT NULL,         -- New: Event start
  end_date DATE NOT NULL,           -- New: Event end
  time_slots TEXT[] NOT NULL,
  image_url TEXT,
  expanded_description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  CONSTRAINT check_event_date_range CHECK (end_date >= start_date)
);
```

### TypeScript Interface

```typescript
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  tag: string;
  price: string;
  duration: string;
  event_date: string;
  start_date: string;        // New
  end_date: string;          // New
  time_slots: string[];
  image_url: string;
  expanded_description: string;
  created_at: string;
  updated_at: string;
}
```

---

## ✅ Files Updated

1. ✅ **Database**: `ADD_EVENT_DATE_RANGE.sql` (new migration)
2. ✅ **TypeScript Types**: `src/lib/supabase.ts`
3. ✅ **Admin Panel**: `src/pages/admin/AdminEventsPage.tsx`
4. ✅ **Calendar Page**: `src/pages/CalendarPage.tsx`

---

## 📱 Testing the Features

### Test Shareable Links:

1. Create an event in admin panel
2. Copy its shareable link using the "Copy" button
3. Open the link in a new browser tab/window
4. Verify:
   - Calendar opens on the correct date
   - Event is visible
   - Event has a highlighted border
   - Page scrolls to show the event

### Test Date Ranges:

1. Create an event with different start and end dates
2. Verify it saves successfully
3. Edit the event and check dates are preserved
4. Try to set end_date before start_date (should fail validation)

---

## 🎯 Benefits

### For Admins:
- ✅ Better event organization with date ranges
- ✅ Easy sharing with one-click copy
- ✅ Track multi-day events properly

### For Users:
- ✅ Direct access to specific events
- ✅ No need to search through calendar
- ✅ Better user experience
- ✅ Easy booking process

### For Marketing:
- ✅ Shareable links in emails
- ✅ Direct links in social media
- ✅ QR codes for printed materials
- ✅ SMS/WhatsApp campaigns

---

## 🚨 Important Notes

1. **Backward Compatibility**: The `event_date` field is still used for display. New events automatically set start_date and end_date if not specified.

2. **Validation**: The database ensures that `end_date >= start_date`. You cannot create an event that ends before it starts.

3. **URL Parameters**: The shareable link uses URL query parameters (`?event=ID`), which are supported by all modern browsers.

4. **Clipboard API**: The "Copy" button uses the browser's Clipboard API. It works in all modern browsers but requires HTTPS in production.

---

## 🎉 Success!

You now have:
- ✅ Multi-day event support with start and end dates
- ✅ Shareable links for every event
- ✅ One-click copy functionality
- ✅ Auto-scroll and highlight features
- ✅ Better marketing capabilities

**Example Workflow:**
1. Create event "Dance Within" for Jan 11-13
2. Copy shareable link
3. Send in email: "Join us! [Link]"
4. Recipients click → Calendar opens → Event highlighted → Easy booking!

---

## 📞 Support

If you need any modifications or have questions:
- Start/end dates not showing? Run the SQL migration
- Copy button not working? Check if running on HTTPS
- Event not highlighting? Clear browser cache

**Remember**: Run the SQL migration first before using the new features!


