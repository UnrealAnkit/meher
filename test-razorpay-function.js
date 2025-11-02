/**
 * Test script for Razorpay Edge Function
 * 
 * Run this in your browser console or Node.js environment to test the function
 */

async function testCreateOrder() {
  try {
    console.log('Testing Razorpay create-order function...');
    
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ';
    
    const res = await fetch(
      "https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order",
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ amount: 50000 }), // ₹500 in paise
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', res.status, errorText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('✅ Success! Order created:');
    console.log(data);
    
    // Check for order ID
    if (data.id) {
      console.log(`\n🎉 Order ID: ${data.id}`);
      console.log(`💰 Amount: ₹${data.amount / 100}`);
      console.log(`💱 Currency: ${data.currency}`);
    } else {
      console.warn('⚠️ Warning: Order ID not found in response');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error testing function:', error);
    
    if (error.message.includes('CORS')) {
      console.error('\n🔴 CORS Error Detected!');
      console.error('Make sure your Edge Function includes CORS headers.');
      console.error('Check: supabase/functions/create-order/index.ts');
    }
    
    throw error;
  }
}

// Export for use in modules, or run directly
if (typeof window !== 'undefined') {
  // Browser environment - attach to window
  window.testCreateOrder = testCreateOrder;
  console.log('Test function available. Run: testCreateOrder()');
} else if (typeof module !== 'undefined') {
  // Node.js environment
  module.exports = testCreateOrder;
}

// Auto-run if in browser console
if (typeof window !== 'undefined' && window.location.href.includes('localhost')) {
  console.log('Running test automatically...');
  testCreateOrder();
}

