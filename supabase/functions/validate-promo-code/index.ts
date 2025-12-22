import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code, amount } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Promo code is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Valid amount is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const now = new Date().toISOString();

    const { data: promoCode, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .eq('is_active', true)
      .gte('valid_until', now)
      .lte('valid_from', now)
      .single();

    if (error || !promoCode) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Invalid or expired promo code' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check usage limit
    if (promoCode.usage_limit && promoCode.used_count >= promoCode.usage_limit) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Promo code has reached its usage limit' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check minimum amount
    if (amount < promoCode.min_amount) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: `Minimum order amount of ₹${promoCode.min_amount} required for this promo code` 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate discount
    let discount = 0;
    if (promoCode.discount_type === 'percentage') {
      discount = (amount * promoCode.discount_value) / 100;
      if (promoCode.max_discount) {
        discount = Math.min(discount, promoCode.max_discount);
      }
    } else {
      discount = promoCode.discount_value;
    }

    discount = Math.round(discount * 100) / 100;
    const finalAmount = Math.max(0, amount - discount);

    return new Response(
      JSON.stringify({
        valid: true,
        promo_code_id: promoCode.id,
        code: promoCode.code,
        discount_amount: discount,
        original_amount: amount,
        final_amount: finalAmount,
        discount_type: promoCode.discount_type,
        discount_value: promoCode.discount_value,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    console.error('Error validating promo code:', err);
    const errorMessage = err instanceof Error ? err.message : 'Failed to validate promo code';
    return new Response(
      JSON.stringify({ valid: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});





