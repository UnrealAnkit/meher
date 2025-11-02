# 🚀 Razorpay Payment Gateway Setup Guide

## Problem: CORS Error

If you're seeing this error:
```
Access to fetch at 'https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

This means your Supabase Edge Function needs CORS headers. Follow the steps below.

---

## ✅ Solution: Create/Update the Edge Function

You have **two options** to create the Edge Function:

### **Option 1: Using Supabase Dashboard (Recommended for beginners)**

1. **Go to Supabase Dashboard**
   - Navigate to: [Supabase Dashboard](https://app.supabase.com/project/zejmgbkizasnkxivobte)
   - Click on **Edge Functions** in the left sidebar

2. **Create New Function**
   - Click **"Create a new function"**
   - Function name: `create-order`
   - Template: Choose **"Deno"** template

3. **Copy the Code**
   - Replace the default code with the code from `supabase/functions/create-order/index.ts`
   - Make sure to include all CORS headers

4. **Set Environment Variables**
   - Go to **Project Settings** → **Edge Functions** → **Secrets**
   - Add:
     - `RAZORPAY_KEY_ID`: `rzp_test_RapqMdrvD1ZIvp`
     - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret (get it from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys))

5. **Deploy**
   - Click **"Deploy Function"** button in the Supabase Dashboard

---

### **Option 2: Using Supabase CLI (For developers)**

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login**
   ```bash
   supabase login
   ```

3. **Link Project**
   ```bash
   supabase link --project-ref zejmgbkizasnkxivobte
   ```

4. **Set Secrets**
   ```bash
   supabase secrets set RAZORPAY_KEY_ID=rzp_test_RapqMdrvD1ZIvp
   supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret_here
   ```

5. **Deploy Function**
   ```bash
   supabase functions deploy create-order --project-ref zejmgbkizasnkxivobte
   ```
   
   Or if already linked:
   ```bash
   supabase functions deploy create-order
   ```

---

## 🔍 Verify the Function Works

**After deployment, test it:**

**Option 1: Browser Console**
Open your browser console (F12) and run:
```javascript
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ';

const res = await fetch(
  "https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order",
  {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ amount: 50000 }),
  }
);
const data = await res.json();
console.log(data);
```

**Option 2: Using curl**
```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ" \
  -d '{"amount": 50000}'
```

**Option 3: Using Test File**
Run the test script:
```bash
node test-razorpay-function.js
```

**Expected Response:**
```json
{
  "id": "order_xxxxx",
  "amount": 50000,
  "currency": "INR",
  "status": "created"
}
```

If you see an order ID, the function is working! ✅

---

## 🔐 Get Razorpay Credentials

1. **Go to Razorpay Dashboard**: [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. **Navigate to**: Settings → API Keys
3. **Copy**:
   - **Key ID**: `rzp_test_RapqMdrvD1ZIvp` (already in code)
   - **Key Secret**: Copy this and add it to Supabase secrets

**⚠️ Important:**
- Use **Test Mode** keys for development
- Use **Live Mode** keys for production (different keys!)

---

## 📝 Function Code Reference

The Edge Function code is located at:
```
supabase/functions/create-order/index.ts
```

**Key Features:**
- ✅ CORS headers included
- ✅ Handles OPTIONS preflight requests
- ✅ Validates amount
- ✅ Creates Razorpay order
- ✅ Error handling

---

## ✅ After Setup

Once the function is deployed with CORS headers:

1. Restart your React app: `npm run dev`
2. Click "PAY NOW" button in the Rejuvenation Package booking modal
3. The Razorpay checkout should open without CORS errors!

---

## 🐛 Troubleshooting

### Still getting CORS errors?

1. **Check function is deployed**: Visit the function URL in browser (should show 405 Method Not Allowed, not 404)
2. **Verify CORS headers**: Check the function response includes `Access-Control-Allow-Origin: *`
3. **Check Supabase CORS settings**: Go to Project Settings → API → CORS Configuration
   - Add: `http://localhost:5173`
   - Add: `https://your-production-domain.com`

### Function not found (404)?

- Make sure function name is exactly `create-order`
- Verify you're using the correct project ID: `zejmgbkizasnkxivobte`

### Payment fails after checkout?

- Check browser console for errors
- Verify Razorpay credentials are correct
- Make sure amount is in paise (multiply ₹ by 100)

---

## 📞 Need Help?

If you're still stuck:
1. Check Supabase Dashboard → Edge Functions → Logs
2. Check browser console for detailed error messages
3. Verify all environment variables are set correctly

