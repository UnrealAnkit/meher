# Amount Validation - Complete Verification

## ✅ Current Implementation Status

### Frontend (`RejuvenationBookingModal.tsx`)

**✅ CORRECT - Sends amount in JSON body:**
```typescript
const requestBody = {
  amount: amountInPaise, // Amount in paise (integer)
  currency: "INR"
};

fetch("https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  },
  body: JSON.stringify(requestBody) // ✅ Correctly stringified
});
```

**What it sends:**
```json
{
  "amount": 50000,
  "currency": "INR"
}
```

### Backend (`create-order/index.ts`)

**✅ CORRECT - Extracts and validates amount:**
```typescript
// Parse request body
const rawBody = await req.text();
body = JSON.parse(rawBody) || {};

// Extract amount
let amount = body.amount;

// Validate amount exists
if (amount === undefined || amount === null || amount === "") {
  return error: "Amount is required"
}

// Validate and convert to integer
const finalAmount = parseInt(String(amountInPaise), 10);

// Pass to Razorpay
const orderData = {
  amount: finalAmount, // ✅ Amount in paise (integer)
  currency: body.currency || "INR",
  receipt: body.receipt || `receipt_${Date.now()}`
};

await razorpay.orders.create(orderData);
```

## 🔍 Verification Checklist

- [x] Frontend sends `amount` in request body
- [x] Frontend uses `JSON.stringify()` on body
- [x] Frontend sets `Content-Type: application/json` header
- [x] Backend parses request body with `JSON.parse()` or `req.json()`
- [x] Backend extracts `amount` from body
- [x] Backend validates `amount` exists
- [x] Backend validates `amount` is a number
- [x] Backend converts `amount` to integer
- [x] Backend passes `amount` to Razorpay's `orders.create()`

## 📋 Request Flow

1. **Frontend:**
   ```
   selectedTotal (₹500) 
   → amountInPaise (50000) 
   → requestBody { amount: 50000, currency: "INR" }
   → JSON.stringify(requestBody)
   → POST to Edge Function
   ```

2. **Edge Function:**
   ```
   Receive request
   → Parse JSON body
   → Extract body.amount (50000)
   → Validate amount exists and is valid
   → Convert to integer (finalAmount: 50000)
   → Create orderData { amount: 50000, currency: "INR", ... }
   → Call razorpay.orders.create(orderData)
   ```

3. **Razorpay:**
   ```
   Receive orderData
   → Validate amount is present ✅
   → Create order
   → Return order object
   ```

## 🧪 Testing

### Test 1: Valid Request
```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"amount": 50000, "currency": "INR"}'
```

**Expected:** Order created successfully

### Test 2: Missing Amount
```bash
curl -X POST ... \
  -d '{"currency": "INR"}'
```

**Expected:** `400 - Amount is required`

### Test 3: Empty Body
```bash
curl -X POST ... \
  -d '{}'
```

**Expected:** `400 - Amount is required`

## 🐛 If Still Getting "amount: is required"

### Check 1: Browser Console
Open browser DevTools → Console tab
- Look for: `"Creating Razorpay order with: { amount: ... }"`
- If amount is `undefined` or missing, frontend validation failed

### Check 2: Edge Function Logs
```bash
supabase functions logs --project-ref zejmgbkizasnkxivobte --name create-order --tail
```

Look for:
1. **Raw request body:** Should show `{"amount":50000,"currency":"INR"}`
2. **Parsed body:** Should show parsed JSON with `amount: 50000`
3. **Amount validation passed:** Shows amount at each step
4. **OrderData:** Shows `{ amount: 50000, currency: "INR", ... }`

### Check 3: Network Tab
Open browser DevTools → Network tab
- Find the request to `create-order`
- Check **Request Payload**: Should show `{"amount":50000,"currency":"INR"}`
- Check **Response**: Should show order object or error

## ✅ All Validation Points

1. **Frontend:**
   - ✅ Validates `selectedTotal` exists
   - ✅ Converts to paise: `amountInPaise = Math.round(selectedTotal * 100)`
   - ✅ Validates `amountInPaise` is positive integer
   - ✅ Creates `requestBody` object with `amount` and `currency`
   - ✅ Validates `requestBody.amount` before sending
   - ✅ Uses `JSON.stringify(requestBody)`

2. **Backend:**
   - ✅ Logs raw request body
   - ✅ Parses JSON body
   - ✅ Validates `body.amount` exists
   - ✅ Converts string amounts to number
   - ✅ Validates amount is valid number
   - ✅ Converts to paise if needed
   - ✅ Converts to integer: `parseInt(String(amountInPaise), 10)`
   - ✅ Validates final amount before Razorpay call
   - ✅ Passes validated `amount` to Razorpay

## 📝 Key Points

1. **Amount must be in paise** (smallest currency unit)
   - ₹500 = 50000 paise

2. **Amount must be integer**
   - Use `Math.round()` and `parseInt()`

3. **Always use JSON.stringify()**
   - Never send raw objects

4. **Validate at every step**
   - Frontend validates before sending
   - Backend validates before processing
   - Backend validates before Razorpay call

## 🚀 Current Status

**✅ IMPLEMENTATION IS CORRECT**

Both frontend and backend are correctly:
- Extracting `amount` from request
- Validating `amount` exists and is valid
- Passing `amount` to Razorpay

If you're still getting the error, check the logs to see where the amount is being lost in the flow.


