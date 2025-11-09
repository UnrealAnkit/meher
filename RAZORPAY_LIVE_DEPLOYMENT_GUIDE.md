# Razorpay Live Keys Deployment Guide

## ✅ What Has Been Updated

### 1. Frontend Configuration
Updated `src/config/razorpay.ts`:
- Changed from test key: `rzp_test_RapqMdrvD1ZIvp`
- Changed to live key: `rzp_live_RdBJHsKgb896uM`

This key is used in:
- `YogaTeacherTrainingBookingModal.tsx`
- `RejuvenationBookingModal.tsx`

### 2. Edge Functions
Your Supabase Edge Functions are already correctly configured to use environment variables:
- `create-order` → uses `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- `verify-payment` → uses `RAZORPAY_KEY_SECRET`
- `create-booking` → no Razorpay keys needed

---

## 🔐 Required Actions: Update Supabase Environment Variables

You need to update your Supabase Edge Function secrets with the live keys.

### Step 1: Set Razorpay Live Keys in Supabase

Run these commands in your terminal:

```bash
# Set the live Razorpay Key ID
npx supabase secrets set RAZORPAY_KEY_ID=rzp_live_RdBJHsKgb896uM

# Set the live Razorpay Key Secret
npx supabase secrets set RAZORPAY_KEY_SECRET=6O3SRJEvX1BBfPi6GdgB7DWz
```

**⚠️ CRITICAL:** Both the frontend (`RAZORPAY_KEY_ID` in `razorpay.ts`) and backend (`RAZORPAY_KEY_ID` env var) MUST use the same key ID, otherwise you'll get "The id provided does not exist" errors.

### Step 2: Verify Secrets Are Set

```bash
npx supabase secrets list
```

You should see:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- Other existing secrets (like `SUPABASE_SERVICE_ROLE_KEY`)

### Step 3: Redeploy Edge Functions

After setting the secrets, redeploy your Edge Functions so they pick up the new values:

```bash
# Deploy all functions
npx supabase functions deploy create-order
npx supabase functions deploy verify-payment
npx supabase functions deploy create-booking
```

Or deploy all at once:

```bash
npx supabase functions deploy
```

---

## 🧪 Testing Live Payments

### Test with Small Amount
1. Go to your booking page (Yoga Teacher Training or Rejuvenation Package)
2. Fill in the form with real details
3. Click "PAY NOW"
4. **Use a real payment method** (test cards won't work with live keys)
5. Complete the payment

### Verify Payment in Razorpay Dashboard
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Transactions** → **Payments**
3. You should see your test payment listed
4. Check that the amount matches what was charged

### Verify Booking in Supabase
1. Go to your Supabase Dashboard
2. Navigate to **Table Editor** → `bookings` table
3. Verify the booking was created with:
   - `payment_id` (from Razorpay)
   - `order_id` (from Razorpay)
   - Customer details
   - Status: `confirmed`

---

## 🔒 Security Checklist

- [x] ✅ Frontend uses live Key ID: `rzp_live_RdBJHsKgb896uM`
- [ ] ⏳ Set `RAZORPAY_KEY_ID` in Supabase (run command above)
- [ ] ⏳ Set `RAZORPAY_KEY_SECRET` in Supabase (run command above)
- [ ] ⏳ Redeploy Edge Functions
- [ ] ⏳ Test a live payment
- [ ] ⏳ Verify payment in Razorpay Dashboard
- [ ] ⏳ Verify booking in Supabase Database

---

## 🚨 Important Notes

### Key Matching
The `RAZORPAY_KEY_ID` must be identical in:
1. Frontend config (`src/config/razorpay.ts`)
2. Supabase environment variable (`RAZORPAY_KEY_ID`)

**Current values (must match):**
- Frontend: `rzp_live_RdBJHsKgb896uM` ✅
- Backend: `rzp_live_RdBJHsKgb896uM` (to be set)

### Live vs Test Keys
- **Live keys** start with `rzp_live_`
- **Test keys** start with `rzp_test_`
- You are now using **LIVE KEYS** → real money will be charged

### Webhook Setup (Optional but Recommended)
To handle payment failures, refunds, and other events automatically:
1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://zejmgbkizasnkxivobte.supabase.co/functions/v1/verify-payment`
3. Select events: `payment.captured`, `payment.failed`
4. Save webhook secret and add to Supabase: `npx supabase secrets set RAZORPAY_WEBHOOK_SECRET=your_webhook_secret`

---

## 🐛 Troubleshooting

### Error: "The id provided does not exist"
**Cause:** Frontend and backend are using different Key IDs
**Fix:** Verify both `razorpay.ts` and Supabase env use `rzp_live_RdBJHsKgb896uM`

### Error: "Invalid signature"
**Cause:** `RAZORPAY_KEY_SECRET` is incorrect or not set
**Fix:** Run `npx supabase secrets set RAZORPAY_KEY_SECRET=6O3SRJEvX1BBfPi6GdgB7DWz`

### Payment succeeds but booking not created
**Cause:** `create-booking` function issue
**Fix:** Check Supabase logs: Dashboard → **Edge Functions** → `create-booking` → **Logs**

### CORS errors
**Cause:** Origin not allowed in Edge Functions
**Fix:** Verify `verify-payment/index.ts` includes your domain in `allowedOrigins` array

---

## 📞 Next Steps

1. **Run the Supabase secret commands** (see Step 1 above)
2. **Redeploy Edge Functions** (see Step 3 above)
3. **Test a live payment** with a small amount
4. **Monitor Razorpay Dashboard** for incoming payments
5. **Check Supabase Database** for booking confirmations

Your application is now ready to accept **real payments** through Razorpay! 🎉

---

## 🔗 Useful Links

- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Razorpay API Documentation](https://razorpay.com/docs/api/)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)





