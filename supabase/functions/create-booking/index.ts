// supabase/functions/create-booking/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the service role key from environment (bypasses RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://zejmgbkizasnkxivobte.supabase.co';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Service role key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Supabase client with service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Parse request body
    const bookingData = await req.json();

    // Log received payment data for debugging
    console.log('Received booking data:', {
      payment_id: bookingData.payment_id,
      order_id: bookingData.order_id,
      customer_email: bookingData.customer_email
    });

    // Validate required fields
    const requiredFields = ['event_title', 'event_date', 'selected_slot', 'price', 'customer_name', 'customer_email', 'customer_phone'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          missingFields 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare insert data - handle empty strings as null
    const insertData: any = {
      event_id: bookingData.event_id || null,
      event_title: bookingData.event_title,
      event_date: bookingData.event_date,
      selected_slot: bookingData.selected_slot,
      price: bookingData.price,
      customer_name: bookingData.customer_name,
      customer_email: bookingData.customer_email,
      customer_phone: bookingData.customer_phone,
      status: bookingData.status || 'pending',
      notes: bookingData.notes || null,
      // Room booking fields (optional - only for stay bookings)
      room_type: bookingData.room_type || null,
      check_in: bookingData.check_in || null,
      check_out: bookingData.check_out || null,
      check_out_time: bookingData.check_out_time || null,
    };

    // Handle payment_id - only include if it's a non-empty string
    if (bookingData.payment_id && typeof bookingData.payment_id === 'string' && bookingData.payment_id.trim() !== '') {
      insertData.payment_id = bookingData.payment_id.trim();
    } else {
      insertData.payment_id = null;
    }

    // Handle order_id - only include if it's a non-empty string
    if (bookingData.order_id && typeof bookingData.order_id === 'string' && bookingData.order_id.trim() !== '') {
      insertData.order_id = bookingData.order_id.trim();
    } else {
      insertData.order_id = null;
    }

    console.log('Inserting booking with payment_id:', insertData.payment_id, 'order_id:', insertData.order_id);

    // Insert booking (using service role bypasses RLS)
    const { data, error } = await supabase
      .from('bookings')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create booking',
          details: error.message 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});


