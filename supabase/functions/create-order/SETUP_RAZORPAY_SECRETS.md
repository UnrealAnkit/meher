# Setting Razorpay Secrets in Supabase

## Quick Setup

Run these commands to set your Razorpay credentials:

```bash
# Make sure you're logged in and linked to your project
supabase login
supabase link --project-ref zejmgbkizasnkxivobte

# Set the secrets
supabase secrets set RAZORPAY_KEY_ID="rzp_test_RapqMdrvD1ZIvp"
supabase secrets set RAZORPAY_KEY_SECRET="SeWlSXtu1A3TFA9jNAi4q63j"

# Verify secrets are set
supabase secrets list

# Deploy the function with import_map.json
supabase functions deploy create-order --import-map ./supabase/functions/create-order/import_map.json --no-verify-jwt
```

## Expected Output

After running `supabase secrets list`, you should see:

```
RAZORPAY_KEY_ID = rzp_test_RapqMdrvD1ZIvp
RAZORPAY_KEY_SECRET = SeWlSXtu1A3TFA9jNAi4q63j
```

## Testing the Function

Test the endpoint with curl:

```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ" \
  -d '{"amount": 50000}'
```

## Expected Success Response

```json
{
  "id": "order_JyUuFb3xD9...",
  "entity": "order",
  "amount": 50000,
  "amount_paid": 0,
  "amount_due": 50000,
  "currency": "INR",
  "receipt": "receipt_1234567890",
  "status": "created",
  "created_at": 1234567890
}
```

## Troubleshooting

If you get a 500 error:

1. **Check logs:**
   ```bash
   supabase functions logs --project-ref zejmgbkizasnkxivobte --name create-order
   ```

2. **Verify secrets are set:**
   ```bash
   supabase secrets list
   ```

3. **Redeploy after setting secrets:**
   ```bash
   supabase functions deploy create-order --no-verify-jwt
   ```

4. **Ensure Test Mode is ON in Razorpay Dashboard:**
   - Go to https://dashboard.razorpay.com
   - Check that "Test Mode" toggle is ON in the top bar

