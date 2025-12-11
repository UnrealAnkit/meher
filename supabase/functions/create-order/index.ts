

import Razorpay from "npm:razorpay";

Deno.serve(async (req: Request): Promise<Response> => {
  
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

    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay credentials not configured" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

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
