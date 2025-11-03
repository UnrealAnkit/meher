# Deploying the create-order Edge Function

## Prerequisites

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Login and Link Project:**
   ```bash
   supabase login
   supabase link --project-ref zejmgbkizasnkxivobte
   ```

## Step 1: Set Environment Variables

Set your Razorpay credentials:

```bash
supabase secrets set RAZORPAY_KEY_ID="rzp_test_RapqMdrvD1ZIvp"
supabase secrets set RAZORPAY_KEY_SECRET="YOUR_ACTUAL_SECRET_HERE"
```

Verify secrets are set:
```bash
supabase secrets list
```

## Step 2: Deploy with Import Map

**Important:** You must use the `--import-map` flag to tell Deno where to find the Razorpay package:

```bash
supabase functions deploy create-order \
  --import-map ./supabase/functions/create-order/import_map.json \
  --no-verify-jwt
```

The `import_map.json` file maps `"razorpay"` to `"npm:razorpay"`, allowing the import to work correctly in Deno.

## Step 3: Test Locally (Optional)

Before deploying, test locally to catch errors early:

```bash
supabase functions serve create-order --import-map ./supabase/functions/create-order/import_map.json
```

Then test with curl:
```bash
curl -X POST http://localhost:54321/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 50000}'
```

## Step 4: Test Deployed Function

Test the deployed function:

```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ" \
  -d '{"amount": 50000}'
```

**Expected Success Response:**
```json
{
  "id": "order_JyUuFb3xD9...",
  "entity": "order",
  "amount": 50000,
  "currency": "INR",
  "status": "created"
}
```

## Step 5: Check Logs

If you encounter errors, check the function logs:

```bash
supabase functions logs --project-ref zejmgbkizasnkxivobte --name create-order
```

Or for real-time logs:
```bash
supabase functions logs --project-ref zejmgbkizasnkxivobte --name create-order --tail
```

## Troubleshooting

### Error: "Cannot find module 'razorpay'"
- ✅ Make sure `import_map.json` exists in the function directory
- ✅ Use `--import-map` flag when deploying
- ✅ Verify the import map path is correct

### Error: "Razorpay is not a constructor"
- ✅ Ensure you're using `import Razorpay from "razorpay"` (not `npm:razorpay`)
- ✅ The import_map.json handles the npm: prefix automatically

### Error: "Payment gateway configuration error"
- ✅ Check that secrets are set: `supabase secrets list`
- ✅ Redeploy after setting secrets

### Error: "Invalid API key provided"
- ✅ Verify Key ID and Secret match (both test or both live)
- ✅ Ensure Test Mode is ON in Razorpay dashboard
- ✅ Check that secrets are set correctly in Supabase

## File Structure

```
supabase/functions/create-order/
├── index.ts                 # Main function code
├── import_map.json          # Maps "razorpay" to "npm:razorpay"
├── deno.d.ts                # Deno type definitions
├── deno.json                # Deno configuration
├── README.md                 # Function documentation
├── SETUP_RAZORPAY_SECRETS.md # Secret setup guide
└── DEPLOYMENT_GUIDE.md      # This file
```

## Quick Reference

```bash
# Set secrets
supabase secrets set RAZORPAY_KEY_ID="rzp_test_xxx"
supabase secrets set RAZORPAY_KEY_SECRET="xxx"

# Deploy
supabase functions deploy create-order \
  --import-map ./supabase/functions/create-order/import_map.json \
  --no-verify-jwt

# Test
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"amount": 50000}'

# View logs
supabase functions logs --project-ref zejmgbkizasnkxivobte --name create-order
```


