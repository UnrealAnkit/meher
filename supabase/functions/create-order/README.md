# Create Order Edge Function

This Supabase Edge Function creates a Razorpay order for payments.

## Setup Instructions

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link Your Project

```bash
supabase link --project-ref zejmgbkizasnkxivobte
```

### 4. Set Environment Variables

Set your Razorpay credentials in Supabase:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
3. Add these secrets:
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID (e.g., `rzp_test_RapqMdrvD1ZIvp`)
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret

Or use CLI:

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_RapqMdrvD1ZIvp
supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret_here
```

### 5. Deploy the Function

**Using Supabase CLI:**
```bash
supabase functions deploy create-order --project-ref zejmgbkizasnkxivobte
```

**Or if already linked:**
```bash
supabase functions deploy create-order
```

**Using Supabase Dashboard:**
- Go to Edge Functions section
- Click "Deploy Function" button

### 6. Test the Function

**Option 1: Using curl (Terminal)**
```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ" \
  -d '{"amount": 50000}'
```

**Option 2: Using JavaScript (Browser Console or Test File)**
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

**Expected Response:**
```json
{
  "id": "order_xxxxx",
  "amount": 50000,
  "currency": "INR",
  "status": "created"
}
```

## API Usage

**Endpoint:** `POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 2125000
}
```

**Response:**
```json
{
  "id": "order_xxxxx",
  "entity": "order",
  "amount": 2125000,
  "amount_paid": 0,
  "amount_due": 2125000,
  "currency": "INR",
  "receipt": "receipt_1234567890",
  "status": "created",
  "created_at": 1234567890
}
```

## Notes

- Amount should be in **paise** (multiply ₹ by 100)
- The function includes CORS headers to allow requests from your frontend
- Environment variables are secure and not exposed to the frontend

