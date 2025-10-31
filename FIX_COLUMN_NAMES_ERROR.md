# 🔧 Fix: Column Name Errors (PGRST204)

## ✅ Problem Fixed!

You were getting errors like:
```
Could not find the 'timeSlots' column of 'calendar_events' in the schema cache
Could not find the 'event_date' column of 'calendar_events' in the schema cache
```

**Root Cause**: Code was using camelCase column names but database uses snake_case.

---

## 🚀 What Was Fixed

### Updated Files:
1. ✅ `src/lib/supabase.ts` - Changed `timeSlots` → `time_slots`
2. ✅ `src/pages/AdminDashboardPage.tsx` - Changed all column references to snake_case

### Changes Made:
```typescript
// BEFORE (❌ Wrong)
const eventData = {
  timeSlots: formData.timeSlots,
  event_date: formData.event_date,
};

// AFTER (✅ Correct)
const eventData = {
  time_slots: formData.timeSlots,
  event_date: formData.event_date,
};
```

---

## 📋 Correct Column Names

Always use **snake_case** for database columns:

```sql
event_date        (NOT eventDate)
time_slots        (NOT timeSlots)
image_url         (NOT imageUrl)
expanded_description
```

---

## ✅ Next Steps

1. **Refresh** your admin dashboard (F5)
2. **Try creating** a new event
3. Should work now! 🎉

---

## 🔍 If You Still Get Errors

### Error: "Could not find the 'event_date' column"
→ Run this SQL:
```sql
ALTER TABLE calendar_events 
ADD COLUMN IF NOT EXISTS event_date DATE DEFAULT CURRENT_DATE;
```

### Error: "Could not find the 'time_slots' column"
→ Check that your table has `time_slots` (with underscore):
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'calendar_events';
```

---

## 📚 Reference

See `DATABASE_COLUMN_NAMES.md` for complete column name reference.

---

**All fixed! Your admin panel should work now! 🎉**
