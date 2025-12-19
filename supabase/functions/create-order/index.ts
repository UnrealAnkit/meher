

import Razorpay from "npm:razorpay";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    const { amount, currency = "INR", receipt, promo_code_id } = await req.json();

    if (!amount || isNaN(amount)) {
      return new Response(JSON.stringify({ error: "Amount must be a valid number" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    // If promo code is provided, validate it
    // Note: amount is in paise, convert to rupees for calculations
    const amountInRupees = Number(amount) / 100;
    let finalAmountInRupees = amountInRupees;
    let discountAmountInRupees = 0;
    let originalAmountInRupees = amountInRupees;

    if (promo_code_id) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const now = new Date().toISOString();

      const { data: promoCode, error: promoError } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('id', promo_code_id)
        .eq('is_active', true)
        .gte('valid_until', now)
        .lte('valid_from', now)
        .single();

      if (!promoError && promoCode) {
        // Check usage limit
        if (!promoCode.usage_limit || promoCode.used_count < promoCode.usage_limit) {
          // Check minimum amount
          if (originalAmountInRupees >= promoCode.min_amount) {
            // Calculate discount
            if (promoCode.discount_type === 'percentage') {
              discountAmountInRupees = (originalAmountInRupees * promoCode.discount_value) / 100;
              if (promoCode.max_discount) {
                discountAmountInRupees = Math.min(discountAmountInRupees, promoCode.max_discount);
              }
            } else {
              discountAmountInRupees = promoCode.discount_value;
            }
            discountAmountInRupees = Math.round(discountAmountInRupees * 100) / 100;
            finalAmountInRupees = Math.max(0, originalAmountInRupees - discountAmountInRupees);
          }
        }
      }
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
      amount: Math.round(finalAmountInRupees * 100), // Convert to paise
      currency,
      receipt
    });

    return new Response(JSON.stringify({
      ...order,
      original_amount: originalAmountInRupees,
      discount_amount: discountAmountInRupees,
      final_amount: finalAmountInRupees,
      promo_code_id: promo_code_id || null
    }), {
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
