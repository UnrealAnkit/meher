/// <reference path="./deno.d.ts" />

import Razorpay from "npm:razorpay";

Deno.serve(async (req: Request): Promise<Response> => {
  // ✅ Handle preflight (CORS) - Must return 200 status
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
        "Access-Control-Max-Age": "86400"
      }
    });
  }

  try {
    const { amount, currency = "INR", receipt } = await req.json();

    if (!amount || isNaN(amount)) {
      return new Response(JSON.stringify({ error: "Amount must be a valid number" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // ⚠️ CRITICAL: RAZORPAY_KEY_ID here MUST match the key used in frontend checkout
    // Error "The id provided does not exist" occurs when keys don't match
    // Ensure Supabase env var RAZORPAY_KEY_ID matches src/config/razorpay.ts RAZORPAY_KEY_ID
    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay credentials not configured" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // ✅ Server-side Razorpay API call (prevents CORS errors)
    // Orders API is called server-side, not from client browser
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency,
      receipt
    });

    return new Response(JSON.stringify(order), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err: unknown) {
    console.error("Error creating Razorpay order:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to create order";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});
