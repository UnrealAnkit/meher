# Deploying the verify-payment Edge Function

## Prerequisites

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```
   This will open your browser for authentication.

3. **Link Project** (if not already linked):
   ```bash
   supabase link --project-ref zejmgbkizasnkxivobte
   ```

## Step 1: Verify Environment Variables

The `verify-payment` function uses the same Razorpay secret as `create-order`:

```bash
supabase secrets list
```

Make sure `RAZORPAY_KEY_SECRET` is set. If not, set it:

```bash
supabase secrets set RAZORPAY_KEY_SECRET="YOUR_ACTUAL_SECRET_HERE"
```

## Step 2: Deploy the Function

**From the project root directory:**

```bash
supabase functions deploy verify-payment --project-ref zejmgbkizasnkxivobte
```

**Or if project is already linked:**

```bash
supabase functions deploy verify-payment
```

## Step 3: Test the Function

Test the deployed function with a sample request:

```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/verify-payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ" \
  -d '{
    "razorpay_order_id": "order_test123",
    "razorpay_payment_id": "pay_test123",
    "razorpay_signature": "signature_test"
  }'
```

**Expected Response:**
```json
{
  "verified": false,
  "error": "Invalid payment signature"
}
```

(Note: This is expected for test data. Real payment signatures will verify correctly.)

## Step 4: Verify CORS

The function should now accept requests from:
- `https://mehr.world` (production)
- `http://localhost:5173`, `5174`, `3000` (development)

## Troubleshooting

### Error: "NOT_FOUND - Requested function was not found"
- ✅ Function hasn't been deployed yet - run deployment command above
- ✅ Check function name matches exactly: `verify-payment`

### Error: "Razorpay credentials not configured"
- ✅ Run: `supabase secrets set RAZORPAY_KEY_SECRET="your_secret"`
- ✅ Verify: `supabase secrets list`

### Error: "CORS policy" error
- ✅ Function is already configured with CORS headers
- ✅ Check browser console for exact CORS error
- ✅ Ensure function is deployed with latest code

### View Logs

Check function logs for debugging:

```bash
supabase functions logs verify-payment --project-ref zejmgbkizasnkxivobte
```

Or for real-time logs:

```bash
supabase functions logs verify-payment --project-ref zejmgbkizasnkxivobte --tail
```

## Quick Reference

```bash
# Login and link (first time only)
supabase login
supabase link --project-ref zejmgbkizasnkxivobte

# Set secret (if not already set)
supabase secrets set RAZORPAY_KEY_SECRET="your_secret"

# Deploy
supabase functions deploy verify-payment --project-ref zejmgbkizasnkxivobte

# View logs
supabase functions logs verify-payment --project-ref zejmgbkizasnkxivobte --tail
```


