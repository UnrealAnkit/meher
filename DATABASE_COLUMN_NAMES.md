# 📋 Database Column Names Reference

## ✅ Correct Column Names (Snake Case)

Always use **snake_case** for database column names:

```sql
-- CORRECT column names in database
id
title
description
tag
price
duration
event_date        ← Use this (NOT eventDate)
time_slots        ← Use this (NOT timeSlots)
image_url         ← Use this (NOT imageUrl)
expanded_description  ← Use this
created_at
updated_at
```

---

## 🔄 Frontend Interface (Matches Database)

```typescript
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  tag: string;
  price: string;
  duration: string;
  event_date: string;        // snake_case
  time_slots: string[];      // snake_case
  image_url: string;         // snake_case
  expanded_description: string;
  created_at: string;
  updated_at: string;
}
```

---

## ✅ When Saving Events

```typescript
const eventData = {
  title: formData.title,
  description: formData.description,
  tag: formData.tag,
  price: formData.price,
  duration: formData.duration,
  event_date: formData.event_date,      // ← snake_case
  time_slots: formData.timeSlots,       // ← snake_case (convert from form)
  image_url: imageUrl,                  // ← snake_case
  expanded_description: formData.expanded_description,
};

await supabase.from('calendar_events').insert([eventData]);
```

---

## ✅ When Reading Events

```typescript
const { data: events } = await supabase
  .from('calendar_events')
  .select('*');

// Access as:
events.map(event => (
  <div key={event.id}>
    <h3>{event.title}</h3>
    <p>{event.event_date}</p>        // ← snake_case
    <p>{event.time_slots.join(', ')}</p>  // ← snake_case
    <img src={event.image_url} />    // ← snake_case
  </div>
))
```

---

## 🚫 Common Mistakes

**❌ WRONG - Don't use camelCase:**
```typescript
const eventData = {
  timeSlots: slots,        // ❌ Wrong
  imageUrl: url,           // ❌ Wrong
  eventDate: date,         // ❌ Wrong
};
```

**✅ CORRECT - Use snake_case:**
```typescript
const eventData = {
  time_slots: slots,       // ✅ Correct
  image_url: url,          // ✅ Correct
  event_date: date,        // ✅ Correct
};
```

---

## 📊 Full Database Schema

```sql
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  time_slots TEXT[] NOT NULL,
  image_url TEXT,
  expanded_description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## ✅ Summary

- **Database**: Always snake_case (`time_slots`, `image_url`, `event_date`)
- **TypeScript**: Always snake_case to match database
- **Never mix**: Don't use camelCase for database columns

---

**Remember: Snake case for database, match it in TypeScript! 🐍**
