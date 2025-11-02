# 📅 Adding Date Field to Calendar Events

Date field has been added to allow admins to set specific dates for events!

## ✅ What's New

- ✅ **Date Input** in event creation form
- ✅ **Date Display** in events table
- ✅ **Date Storage** in database
- ✅ **Date Query** on main website

---

## 🚀 Implementation Steps

### Step 1: Update Database

**If you haven't run SQL yet:**
- Use `SUPABASE_SETUP_SAFE.sql` (includes date field)

**If you already have calendar_events table:**
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy content from `ADD_DATE_FIELD_MIGRATION.sql`
3. Paste and **Run**
4. This safely adds the date field to existing data

### Step 2: Update Your Code

Code has been updated automatically:
- ✅ `src/lib/supabase.ts` - Updated interface
- ✅ `src/pages/AdminDashboardPage.tsx` - Added date input & display

### Step 3: Test

1. Go to admin dashboard
2. Create new event - you'll see **"Event Date"** field
3. Select a date
4. Create event
5. See date in events table

---

## 📊 Database Schema

```sql
event_date DATE NOT NULL
```

The date is required for each event.

---

## 🎨 Form Changes

### New Form Field
```
Event Title    [text input]
Tag            [dropdown]
Price          [text input]
Duration       [text input]
Event Date     [date picker] ← NEW!
Facilitator    [text input]
Time Slots     [text input]
```

### Date Input Type
- Uses HTML5 `<input type="date">`
- Beautiful date picker in all browsers
- Required field (can't create event without date)

---

## 📋 Table Display

Events table now shows:
| Title | Date | Price | Duration | Tag | Actions |

Example: "Morning Yoga Session | Oct 31, 2025 | Rs 500.00 | 60 Minutes | UPCOMING | [Edit] [Delete]"

---

## 🔄 Data Format

**In Database:**
```sql
event_date: '2025-10-31'  -- YYYY-MM-DD format
```

**In Admin Table:**
```
Oct 31, 2025  -- User-friendly format
```

**In Frontend Code:**
```typescript
const date = new Date(event.event_date); // Convert to Date object
const formatted = date.toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
});
// Result: "Oct 31, 2025"
```

---

## 🌐 Using Dates on Main Website

### Get Upcoming Events

```typescript
import { supabase } from '../lib/supabase';

// Get events from today onwards
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

const { data: upcomingEvents } = await supabase
  .from('calendar_events')
  .select('*')
  .gte('event_date', today)
  .order('event_date', { ascending: true });
```

### Get Past Events

```typescript
const today = new Date().toISOString().split('T')[0];

const { data: pastEvents } = await supabase
  .from('calendar_events')
  .select('*')
  .lt('event_date', today)
  .order('event_date', { ascending: false });
```

### Get Events for Specific Date

```typescript
const { data: todayEvents } = await supabase
  .from('calendar_events')
  .select('*')
  .eq('event_date', '2025-10-31');
```

### Display Events with Date

```typescript
import { EventCard } from './components/EventCard';

export const EventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('calendar_events')
      .select('*')
      .gte('event_date', today)
      .order('event_date', { ascending: true });
    
    setEvents(data);
  }, []);

  return (
    <div>
      {events.map(event => (
        <div key={event.id} className="mb-4">
          <p className="text-sm text-gray-500 font-bold">
            📅 {new Date(event.event_date).toLocaleDateString()}
          </p>
          <EventCard {...event} />
        </div>
      ))}
    </div>
  );
};
```

---

## 🔍 Filter Events by Date Range

```typescript
const getEventsByDateRange = async (startDate: string, endDate: string) => {
  const { data } = await supabase
    .from('calendar_events')
    .select('*')
    .gte('event_date', startDate)
    .lte('event_date', endDate)
    .order('event_date', { ascending: true });
  
  return data;
};

// Usage
const september2025 = await getEventsByDateRange('2025-09-01', '2025-09-30');
```

---

## 📊 Event Example with Date

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Morning Yoga Session",
  "description": "Facilitator: Yoga Master",
  "tag": "UPCOMING",
  "price": "Rs 500.00",
  "duration": "60 Minutes",
  "event_date": "2025-10-31",
  "timeSlots": ["10:00 AM", "11:00 AM", "12:00 PM"],
  "image_url": "https://...",
  "expanded_description": "Join our rejuvenating yoga session...",
  "created_at": "2025-10-31T10:00:00+00:00",
  "updated_at": "2025-10-31T10:00:00+00:00"
}
```

---

## ✅ Checklist

- [ ] Run migration SQL (if adding to existing table)
- [ ] Update your database
- [ ] Refresh admin dashboard
- [ ] Test creating event with date
- [ ] Verify date appears in table
- [ ] Update main site to query by date
- [ ] Display events with dates on website

---

## 📚 Files Updated

- ✅ `src/lib/supabase.ts` - Added event_date to interface
- ✅ `src/pages/AdminDashboardPage.tsx` - Added date input & display
- ✅ `SUPABASE_SETUP_SAFE.sql` - Includes date field
- ✅ `SUPABASE_SETUP.sql` - Updated with date field
- ✅ `ADD_DATE_FIELD_MIGRATION.sql` - Migration script

---

## 🎯 What's Next?

1. Update your calendar page to show dates
2. Filter events by date on main site
3. Add date picker to filter events
4. Display upcoming vs past events separately
5. Add event date to calendar view

---

**Date field is ready! Events now have specific dates! 📅✨**



