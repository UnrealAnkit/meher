/**
 * Razorpay Configuration
 * 
 * ⚠️ CRITICAL: Ensure RAZORPAY_KEY_ID matches the key used in:
 * 1. Supabase Edge Function (create-order) environment variable: RAZORPAY_KEY_ID
 * 2. Frontend checkout initialization
 * 
 * Error Prevention:
 * - "The id provided does not exist" error occurs when keys don't match between
 *   order creation (server) and checkout (client)
 */

export const RAZORPAY_KEY_ID = "rzp_test_RapqMdrvD1ZIvp";

/**
 * Razorpay Test Key ID
 * 
 * This is used in:
 * - Supabase Edge Function (should match RAZORPAY_KEY_ID env var)
 * - Frontend checkout options
 * 
 * For production, replace with your live key from Razorpay Dashboard
 */

