# Razorpay ₹1 Test Verification Guide

## ✅ What Has Been Added

### Test Mode Feature
Added a "Test Mode (₹1 Verification)" toggle to both booking modals:
- **Yoga Teacher Training Booking Modal**
- **Rejuvenation Package Booking Modal**

This allows you to test the live Razorpay payment integration with a minimal ₹1 charge instead of the full amount.

---

## 🧪 How to Test Live Payments

### Step 1: Start Your Development Server

```bash
npm run dev
```

Your app should be running on `http://localhost:5173`

### Step 2: Navigate to a Booking Page

Choose one of:
- **Yoga Teacher Training**: `http://localhost:5173/yoga-teacher-training`
- **Rejuvenation Package**: `http://localhost:5173/rejuvenation/package`

### Step 3: Open Booking Modal

Click the "BOOK THIS EXPERIENCE" or "BOOK NOW" button to open the booking modal.

### Step 4: Enable Test Mode

1. In the booking modal, you'll see a **yellow checkbox** labeled:
   ```
   ☐ Test Mode (₹1 Verification)
   Enable to test payment with ₹1 charge
   ```

2. **Check the box** to enable test mode.

3. The pricing breakdown will change to show:
   ```
   Test Mode - Verification Amount: ₹1
   ```

### Step 5: Fill in Your Details

- **Name**: Your name
- **Email**: Your email address
- **Phone**: Your phone number (10 digits)

### Step 6: Click "PAY NOW"

This will:
1. Create a Razorpay order for ₹1 (100 paise)
2. Open the Razorpay checkout popup
3. Show "TEST MODE (₹1 Verification)" in the description

### Step 7: Complete Payment

**⚠️ Important:** Live keys require **real payment methods** (test cards won't work)

Use a real payment method:
- **UPI**: Your actual UPI ID
- **Card**: Your real debit/credit card
- **Net Banking**: Your actual bank account
- **Wallet**: Your actual Paytm/PhonePe wallet

You will be charged **₹1** (real money).

### Step 8: Verify Payment Success

After successful payment:
1. You'll be redirected to the success page
2. Check **Razorpay Dashboard** → **Transactions** → **Payments**
   - You should see a ₹1 payment
   - Status should be "Captured"
3. Check **Supabase Dashboard** → **Table Editor** → `bookings`
   - New booking record should exist
   - `payment_id` should match Razorpay payment ID
   - `order_id` should match Razorpay order ID
   - Status should be "confirmed"

---

## 📋 Test Checklist

Use this checklist to verify everything works:

### Frontend Test
- [ ] Test mode checkbox appears in both modals
- [ ] Checking the box changes pricing to ₹1
- [ ] Unchecking the box restores full pricing
- [ ] "PAY NOW" button creates ₹1 order when test mode enabled
- [ ] Razorpay popup shows "TEST MODE (₹1 Verification)" in description

### Payment Gateway Test
- [ ] Razorpay popup opens successfully
- [ ] Can select payment method (UPI/Card/Net Banking)
- [ ] Payment processes successfully with ₹1
- [ ] No CORS errors in browser console
- [ ] No "The id provided does not exist" error

### Backend Verification
- [ ] Payment appears in Razorpay Dashboard
- [ ] Amount shows ₹1.00
- [ ] Status is "Captured"
- [ ] Order ID matches what was created

### Database Verification
- [ ] Booking created in Supabase `bookings` table
- [ ] `payment_id` field populated correctly
- [ ] `order_id` field populated correctly
- [ ] `customer_name`, `customer_email`, `customer_phone` saved
- [ ] `status` is "confirmed"
- [ ] `notes` field contains correct details

---

## 🔍 Testing Both Modals

### Yoga Teacher Training Modal
```
1. Go to: http://localhost:5173/yoga-teacher-training
2. Click "BOOK THIS EXPERIENCE"
3. Select: "With Food And Accommodation" or "Without Food And Accommodation"
4. Enable "Test Mode (₹1 Verification)"
5. Fill details and click "PAY NOW"
6. Complete ₹1 payment
7. Verify success
```

### Rejuvenation Package Modal
```
1. Go to: http://localhost:5173/rejuvenation/package
2. Click "BOOK NOW"
3. Select: "Double" or "Single" occupancy
4. Enable "Test Mode (₹1 Verification)"
5. Fill details and click "PAY NOW"
6. Complete ₹1 payment
7. Verify success
```

---

## 🎯 What to Look For

### Success Indicators
✅ Razorpay popup opens without errors
✅ Payment completes successfully
✅ Redirected to success page
✅ Payment visible in Razorpay Dashboard
✅ Booking created in database with payment_id

### Error Indicators
❌ "The id provided does not exist" → Keys don't match (frontend vs backend)
❌ CORS errors → Check Edge Function CORS headers
❌ "Invalid signature" → Key secret mismatch
❌ Booking not saved → Check `create-booking` function logs
❌ Payment successful but booking not created → Check Supabase logs

---

## 🐛 Troubleshooting

### Error: "The id provided does not exist"
**Cause:** Frontend and backend Razorpay Key IDs don't match

**Fix:**
1. Frontend uses: `rzp_live_RdBJHsKgb896uM` (in `src/config/razorpay.ts`)
2. Backend must use same key:
   ```bash
   npx supabase secrets set RAZORPAY_KEY_ID=rzp_live_RdBJHsKgb896uM
   ```
3. Redeploy: `npx supabase functions deploy create-order`

### Error: "Payment failed" or "Invalid signature"
**Cause:** Razorpay Key Secret is incorrect

**Fix:**
```bash
npx supabase secrets set RAZORPAY_KEY_SECRET=6O3SRJEvX1BBfPi6GdgB7DWz
npx supabase functions deploy verify-payment
```

### Payment succeeds but booking not created
**Cause:** `create-booking` function issue

**Fix:**
1. Check Supabase Dashboard → **Edge Functions** → `create-booking` → **Logs**
2. Look for errors related to:
   - Missing fields
   - RLS (Row Level Security) blocking insert
   - Invalid data format
3. Ensure `SUPABASE_SERVICE_ROLE_KEY` is set:
   ```bash
   npx supabase secrets list
   ```

### CORS errors
**Cause:** Origin not allowed

**Fix:**
1. Open `supabase/functions/verify-payment/index.ts`
2. Ensure `allowedOrigins` includes:
   ```typescript
   const allowedOrigins = [
     "https://mehr.world",
     "http://localhost:5173",
     "http://localhost:5174",
   ];
   ```

---

## 💰 Production Testing (After ₹1 Tests Pass)

Once ₹1 tests are successful:

1. **Disable Test Mode** (uncheck the checkbox)
2. Complete a **real booking** with full amount
3. Verify in Razorpay Dashboard (full amount captured)
4. Verify in Supabase (booking with correct price)

---

## 📊 Expected Results

### Test Mode Enabled (₹1)
```
Razorpay Order Amount: 100 paise (₹1)
Razorpay Dashboard: ₹1.00 payment
Supabase Booking: "Test Mode" in notes
```

### Test Mode Disabled (Full Amount)
```
Yoga Teacher Training (With Food):
  Razorpay Order: 17,700,000 paise (₹1,77,000 including GST)
  
Yoga Teacher Training (Without Food):
  Razorpay Order: 9,676,000 paise (₹96,760 including GST)
  
Rejuvenation (Double):
  Razorpay Order: 2,125,000 paise (₹21,250)
  
Rejuvenation (Single):
  Razorpay Order: 2,325,000 paise (₹23,250)
```

---

## 🔐 Security Notes

- **Test Mode is for verification only** - Don't use in production
- **Real money is charged** - Even ₹1 is a real transaction
- **Remove test mode** before going live (or hide it from users)
- **Monitor Razorpay Dashboard** for all transactions
- **Check Supabase logs** regularly for errors

---

## 📞 Support Resources

- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Edge Functions Logs](https://supabase.com/dashboard/project/_/functions)

---

## ✅ Next Steps

1. **Run ₹1 tests** for both booking modals
2. **Verify all payments** in Razorpay Dashboard
3. **Check all bookings** in Supabase Database
4. **Test full payments** (disable test mode)
5. **Remove or hide test mode** before production launch
6. **Monitor transactions** regularly

Your live Razorpay integration is ready to test! 🎉

