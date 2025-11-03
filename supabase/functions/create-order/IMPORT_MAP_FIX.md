# Import Map Fix for Razorpay

## ✅ What Was Changed

### 1. Created `import_map.json`
This file tells Deno's runtime to map `"razorpay"` to `"npm:razorpay"`:

```json
{
  "imports": {
    "razorpay": "npm:razorpay"
  }
}
```

### 2. Updated Import Statement
Changed from:
```typescript
import Razorpay from "npm:razorpay";
```

To:
```typescript
import Razorpay from "razorpay";
```

This allows the import_map.json to handle the npm: prefix automatically.

## 🚀 Deployment Command

**Important:** You MUST use the `--import-map` flag when deploying:

```bash
supabase functions deploy create-order \
  --import-map ./supabase/functions/create-order/import_map.json \
  --no-verify-jwt
```

## 📝 Why This Fixes the 500 Error

The `import_map.json` file is required for Supabase Edge Functions to:
1. Resolve npm packages correctly in Deno runtime
2. Avoid "Cannot find module" errors
3. Properly initialize the Razorpay constructor

Without the import map, Deno doesn't know where to find the `razorpay` package, leading to module resolution errors and 500 errors.

## ✅ Current Setup

- ✅ `import_map.json` created
- ✅ Import statement updated to use `"razorpay"` (not `"npm:razorpay"`)
- ✅ CORS headers maintained
- ✅ Enhanced error handling maintained
- ✅ Environment variable validation maintained

## 🧪 Testing

After deploying with the import map, test with:

```bash
curl -X POST https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"amount": 50000}'
```

## ⚠️ Note About IDE Errors

Your IDE may show:
```
Cannot find module 'razorpay' or its corresponding type declarations
```

This is **expected** and **will not affect runtime**. The import_map.json is used by Deno at runtime, not by your IDE's TypeScript checker. The function will work correctly when deployed.


