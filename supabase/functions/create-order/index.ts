/// <reference path="./deno.d.ts" />

import Razorpay from "npm:razorpay";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

Deno.serve(async (req: Request): Promise<Response> => {
  // ✅ Handle CORS preflight request first
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  // ✅ Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      {
        status: 405,
        headers: corsHeaders,
      }
    );
  }

  try {
    // Parse request body - extract amount directly
    let body: { amount?: number; currency?: string; receipt?: string };
    try {
      body = await req.json();
    } catch (err) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON body",
          message: err instanceof Error ? err.message : "Failed to parse request body"
        }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Extract amount from body
    let { amount } = body;
    
    // Convert amount to number if it's a string (handle edge cases)
    if (typeof amount === "string") {
      amount = parseInt(amount, 10);
    }
    
    // Validate amount exists and is valid
    if (!amount || isNaN(amount) || amount <= 0) {
      return new Response(
        JSON.stringify({ 
          error: "Amount is required",
          message: "Valid amount is required. Amount must be a positive number (in paise)."
        }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Ensure amount is integer (in paise) - convert to number and round
    const amountInPaise = Math.round(Number(amount));

    // Get Razorpay credentials from environment variables
    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!keyId || !keySecret) {
      console.error("Razorpay credentials not found in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Payment gateway configuration error",
          message: "Razorpay credentials are not configured"
        }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    // Initialize Razorpay with proper configuration
    const razorpay = new Razorpay({
      key_id: keyId!,
      key_secret: keySecret!,
    });

    // Create Razorpay order
    try {
      // Ensure amount is a valid integer before sending to Razorpay
      if (!Number.isInteger(amountInPaise) || amountInPaise <= 0) {
        return new Response(
          JSON.stringify({ 
            error: "Invalid amount",
            message: "Amount must be a positive integer (in paise)."
          }),
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      const order = await razorpay.orders.create({
        amount: amountInPaise, // Amount in paise (integer)
        currency: body.currency || "INR",
        receipt: body.receipt || `receipt_${Date.now()}`,
      });

      console.log("Order created successfully:", order.id);

      return new Response(JSON.stringify(order), {
        status: 200,
        headers: corsHeaders,
      });
    } catch (razorpayError: unknown) {
      // Enhanced error logging for Razorpay API errors
      console.error("Razorpay API error:", razorpayError);
      
      let errorMessage = "Failed to create Razorpay order";
      let errorDetails: any = null;

      if (razorpayError instanceof Error) {
        errorMessage = razorpayError.message;
        // Try to extract more details from Razorpay error objects
        if ('error' in razorpayError && typeof razorpayError.error === 'object') {
          errorDetails = razorpayError.error;
          errorMessage = errorDetails.description || errorDetails.message || errorMessage;
        }
      } else if (typeof razorpayError === 'object' && razorpayError !== null) {
        // Razorpay errors are often objects with error property
        errorDetails = razorpayError;
        if ('error' in errorDetails && typeof errorDetails.error === 'object') {
          errorMessage = errorDetails.error.description || errorDetails.error.message || errorMessage;
        }
      }

      console.error("Error details:", JSON.stringify(errorDetails || razorpayError));

      return new Response(
        JSON.stringify({ 
          error: "Failed to create order",
          message: errorMessage,
          ...(errorDetails && { details: errorDetails })
        }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }
  } catch (err: unknown) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: err instanceof Error ? err.message : "Unknown error occurred"
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});

