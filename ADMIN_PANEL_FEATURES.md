# 🎯 Admin Panel Features & Implementation Guide

## 📍 Admin Panel Location

- **Login Page**: `/admin/login`
- **Dashboard**: `/admin/dashboard`
- **Supabase Project**: `zejmgbkizasnkxivobte`

## 🎨 Design & Theme

### Color Scheme (Matching Website)
```css
Primary:   #ab4b28 (Brown)
Secondary: #f9d2a3 (Peach)
Text:      #24312e (Dark Green)
Background: #f9f5f0 (Light Cream)
Font:      Poppins
```

### Components
- Login form with elegant gradient background
- Dashboard header with branding
- Form for event creation
- Events table with CRUD actions
- Toast notifications (success/error)
- Responsive design (mobile & desktop)

## 🔐 Authentication

### Login Page Features
- Email/password authentication via Supabase Auth
- Password visibility toggle
- Error message display
- Loading states
- Gradient background with MEHER branding

### Session Management
- Automatic session persistence
- Session validation on page load
- Logout functionality
- Protected routes (redirects to login if not authenticated)

### Code Implementation
```typescript
// src/lib/supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/pages/AdminLoginPage.tsx
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// src/index.tsx
const AdminWrapper = ({ children }) => {
  // Checks auth state and protects routes
}
```

## 📝 Event Management

### Create Event

**Form Fields:**
```
Title              - Event name
Description        - "Facilitator: Name"
Tag                - UPCOMING / FEATURED / POPULAR
Price              - "Rs 500.00"
Duration           - "60 Minutes"
Time Slots         - "10:00 AM, 11:00 AM, 2:00 PM"
Detailed Desc.     - Full event details
Image              - JPG/PNG file upload
```

**Database Fields Saved:**
```typescript
interface CalendarEvent {
  id: string;              // UUID
  title: string;           // Event name
  description: string;     // Facilitator info
  tag: string;             // Category
  price: string;           // Price
  duration: string;        // Duration
  timeSlots: string[];     // Array of times
  image_url: string;       // Storage URL
  expanded_description: string; // Full details
  created_at: string;      // Timestamp
  updated_at: string;      // Timestamp
}
```

### Upload Image

**Process:**
1. User selects image file (JPG/PNG/WebP/GIF)
2. Preview shown in form
3. On submit, image uploaded to Supabase Storage
4. Public URL returned
5. URL saved with event in database

**Upload Implementation:**
```typescript
const uploadImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from('event-images')
    .upload(fileName, file);

  const { data } = supabase.storage
    .from('event-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
};
```

**Storage Details:**
- Bucket: `event-images`
- Public: Yes (accessible via public URL)
- Max Size: 10MB per file
- Formats: JPG, PNG, WebP, GIF

### Edit Event

**Steps:**
1. Click Edit icon (pencil) in table
2. Form populates with event data
3. Image preview shows
4. Make changes
5. Click "Update Event"
6. Database updates with new data

**Update Implementation:**
```typescript
const { error } = await supabase
  .from('calendar_events')
  .update(eventData)
  .eq('id', eventId);
```

### Delete Event

**Steps:**
1. Click Delete icon (trash) in table
2. Confirm in popup
3. Event removed from database
4. Table refreshes

**Delete Implementation:**
```typescript
const { error } = await supabase
  .from('calendar_events')
  .delete()
  .eq('id', eventId);
```

## 📊 Events Table

**Columns:**
- Title (searchable)
- Price
- Duration
- Tag (badge)
- Actions (Edit/Delete buttons)

**Features:**
- Sorted by newest first
- Alternating row colors
- Hover effects
- Loading state
- Empty state message
- Event count in header

## 🔔 Notifications

**Success Notifications:**
- "Event created successfully"
- "Event updated successfully"
- "Event deleted successfully"

**Error Notifications:**
- "Failed to fetch events"
- "Failed to save event"
- "Failed to delete event"
- Authentication errors

**Display:**
- Auto-hide after 3 seconds
- Green for success, Red for errors
- Animated fade-in

## 🔒 Security Features

### Row Level Security (RLS) Policies

```sql
-- Only authenticated users can access events
SELECT: true (anyone can read)
INSERT: auth.role() = 'authenticated'
UPDATE: auth.role() = 'authenticated'
DELETE: auth.role() = 'authenticated'
```

### Storage Security

```sql
-- Upload: authenticated users only
-- Read: public access
-- Delete: authenticated users only
```

### Best Practices Implemented
- ✅ No sensitive data in frontend code
- ✅ API keys restricted by CORS
- ✅ Server-side validation via RLS
- ✅ User sessions managed by Supabase
- ✅ Images stored separately from data

## 📱 Responsive Design

**Mobile:**
- Single column form layout
- Touch-friendly buttons
- Readable table on small screens
- Stacked navigation

**Desktop:**
- Multi-column form (2 columns)
- Full-width table
- Optimal spacing and sizing

## 🎯 File Structure

```
src/
├── lib/
│   └── supabase.ts           # Supabase client & types
├── pages/
│   ├── AdminLoginPage.tsx    # Login form
│   └── AdminDashboardPage.tsx # Main dashboard
├── index.tsx                 # Routing & session wrapper
```

## 🔄 Data Flow

### Create Event
```
User fills form
    ↓
Image selected
    ↓
Submit clicked
    ↓
Image uploaded to Storage
    ↓
Get public URL
    ↓
Save event to DB
    ↓
Show success notification
    ↓
Refresh events table
```

### Edit Event
```
Click Edit button
    ↓
Form populates
    ↓
User makes changes
    ↓
Submit clicked
    ↓
Update database
    ↓
Show success notification
    ↓
Refresh table
```

## 🚀 Performance Optimizations

### Database
- Indexes on: `created_at`, `tag`, `title`
- Sorted by `created_at DESC` (newest first)
- Efficient queries with select()

### Storage
- Images cached by browser
- Public URLs avoid re-authentication
- CDN delivery by Supabase

### Frontend
- React Query-like patterns (fetch on mount)
- Controlled form components
- Debounced notifications

## 🧪 Testing Checklist

- [ ] Login with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Create event with image
- [ ] Image preview shows
- [ ] Event appears in table
- [ ] Edit event and save
- [ ] Delete event with confirmation
- [ ] Logout redirects to home
- [ ] Session persists on page reload
- [ ] Mobile responsive layout works

## 📚 Related Files

- `SUPABASE_SETUP.sql` - Database setup queries
- `ADMIN_PANEL_SETUP.md` - Detailed setup guide
- `QUICK_START.md` - Quick start guide
- `SQL_QUERIES_SUMMARY.md` - Copy-paste SQL

## 🎓 Using Events on Frontend

Events are available via Supabase Query:

```typescript
import { supabase } from '../lib/supabase';

// Get all events
const { data: events } = await supabase
  .from('calendar_events')
  .select('*')
  .order('created_at', { ascending: false });

// Get specific event
const { data: event } = await supabase
  .from('calendar_events')
  .select('*')
  .eq('id', eventId)
  .single();

// Filter by tag
const { data: upcomingEvents } = await supabase
  .from('calendar_events')
  .select('*')
  .eq('tag', 'UPCOMING');
```

## 🎉 Ready to Use!

The admin panel is fully functional and integrated with your Supabase project. Create users, set up the database, and start managing events!

---

**Questions or issues?** Check the troubleshooting sections in the setup guides.



