// supabase/functions/verify-payment/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  // Get origin from request and allow both production and development
  const origin = req.headers.get("origin") || "";
  const allowedOrigins = [
    "https://mehr.world",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
  ];
  
  // Determine which origin to use (allow localhost for development)
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : "https://mehr.world";

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const body = await req.json();
    console.log("Received body:", JSON.stringify(body, null, 2));

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // 🔒 Ensure all fields exist and are not empty
    const missingFields: string[] = [];
    if (!razorpay_order_id || (typeof razorpay_order_id === "string" && razorpay_order_id.trim() === "")) {
      missingFields.push("razorpay_order_id");
    }
    if (!razorpay_payment_id || (typeof razorpay_payment_id === "string" && razorpay_payment_id.trim() === "")) {
      missingFields.push("razorpay_payment_id");
    }
    if (!razorpay_signature || (typeof razorpay_signature === "string" && razorpay_signature.trim() === "")) {
      missingFields.push("razorpay_signature");
    }

    if (missingFields.length > 0) {
      console.error("Missing or empty fields:", missingFields);
      console.error("Received values:", {
        razorpay_order_id: razorpay_order_id || "MISSING",
        razorpay_payment_id: razorpay_payment_id || "MISSING",
        razorpay_signature: razorpay_signature || "MISSING"
      });
      
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required Razorpay parameters",
        details: `Missing fields: ${missingFields.join(", ")}`,
        received: {
          razorpay_order_id: !!razorpay_order_id,
          razorpay_payment_id: !!razorpay_payment_id,
          razorpay_signature: !!razorpay_signature
        }
      }), {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    // ✅ Step 1: Verify signature using Deno Web Crypto API
    const key_secret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    if (!key_secret) {
      return new Response(JSON.stringify({
        success: false,
        error: "Razorpay credentials not configured",
      }), {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Content-Type": "application/json",
        },
        status: 500,
      });
    }

    // Use Web Crypto API for HMAC SHA256 (Deno-compatible)
    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const keyData = new TextEncoder().encode(key_secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      new TextEncoder().encode(message)
    );
    
    // Convert to hex string
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    const isValid = expectedSignature === razorpay_signature.toLowerCase();

    if (!isValid) {
      console.error("Invalid signature:", {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        received: razorpay_signature.substring(0, 20) + "...",
        expected: expectedSignature.substring(0, 20) + "..."
      });
      
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid signature",
      }), {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    // ✅ Step 2: Store in Supabase table (optional)
    // You can later insert logic here to save payment info using Supabase client

    console.log("Payment verified successfully:", {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Payment verified successfully",
      data: { razorpay_order_id, razorpay_payment_id },
    }), {
      headers: {
        "Access-Control-Allow-Origin": "https://mehr.world",
        "Content-Type": "application/json",
      },
      status: 200,
    });

  } catch (error) {
    console.error("Verification Error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Failed to verify payment",
    }), {
      headers: {
        "Access-Control-Allow-Origin": "https://mehr.world",
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
});
