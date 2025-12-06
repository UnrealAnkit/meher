import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zejmgbkizasnkxivobte.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase Edge Function URLs for Razorpay integration
export const CREATE_ORDER_FUNCTION_URL = "https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-order";
export const VERIFY_PAYMENT_FUNCTION_URL = "https://zejmgbkizasnkxivobte.supabase.co/functions/v1/verify-payment";
export const CREATE_BOOKING_FUNCTION_URL = "https://zejmgbkizasnkxivobte.supabase.co/functions/v1/create-booking";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  tag: string;
  price: string;
  duration: string;
  event_date: string;
  time_slots: string[];
  image_url: string;
  expanded_description: string;
  created_at: string;
  updated_at: string;
}
