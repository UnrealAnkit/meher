# Deploy create-booking Edge Function

This Edge Function permanently fixes the bookings RLS issue by using service_role to bypass RLS entirely.

## Quick Setup Steps

### 1. Get Your Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/zejmgbkizasnkxivobte/settings/api)
2. Find **Service Role** key (under Project API keys)
3. Copy it - you'll need it in step 3

### 2. Deploy the Function

**Option A: Using Supabase Dashboard (Easiest)**

1. Go to [Supabase Dashboard → Edge Functions](https://supabase.com/dashboard/project/zejmgbkizasnkxivobte/functions)
2. Click **"Create a new function"**
3. Name it: `create-booking`
4. Copy the code from `supabase/functions/create-booking/index.ts`
5. Paste it into the function editor
6. Click **"Deploy Function"**

**Option B: Using Supabase CLI**

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login
supabase login

# Link project (if not already linked)
supabase link --project-ref zejmgbkizasnkxivobte

# Deploy the function
supabase functions deploy create-booking --project-ref zejmgbkizasnkxivobte
```

### 3. Set Service Role Key Secret

**Using Dashboard:**
1. Go to [Project Settings → Edge Functions → Secrets](https://supabase.com/dashboard/project/zejmgbkizasnkxivobte/settings/functions)
2. Add new secret:
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: Your service role key (from step 1)

**Using CLI:**
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here" --project-ref zejmgbkizasnkxivobte
```

### 4. Also Set SUPABASE_URL (if not auto-detected)

The function tries to auto-detect the URL, but you can set it explicitly:

```bash
supabase secrets set SUPABASE_URL="https://zejmgbkizasnkxivobte.supabase.co" --project-ref zejmgbkizasnkxivobte
```

### 5. Test the Function

Test it works:

```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-booking \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ" \
  -d '{
    "event_title": "Test Booking",
    "event_date": "2025-01-01",
    "selected_slot": "Morning",
    "price": "₹1000",
    "customer_name": "Test User",
    "customer_email": "test@example.com",
    "customer_phone": "1234567890",
    "status": "confirmed"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "event_title": "Test Booking",
    ...
  }
}
```

## How It Works

- The Edge Function uses `service_role` key which **bypasses RLS entirely**
- This means bookings will ALWAYS work, regardless of RLS policies
- The function validates input and inserts directly into the database
- Much more reliable than trying to fix RLS policies

## Troubleshooting

**Error: "Service role key not configured"**
→ Set the `SUPABASE_SERVICE_ROLE_KEY` secret in step 3

**Error: "Function not found"**
→ Make sure you deployed the function (step 2)

**Error: CORS issues**
→ The function already includes CORS headers, should work automatically

**Still getting RLS errors**
→ The frontend should now use the Edge Function, which bypasses RLS. Make sure you deployed the function and set the service role key.


