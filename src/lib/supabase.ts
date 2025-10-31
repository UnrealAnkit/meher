import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zejmgbkizasnkxivobte.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplam1nYmtpemFzbmt4aXZvYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTEzODksImV4cCI6MjA3NzAyNzM4OX0.yoJE8kMx6Dn8db5RjtmBMeDc_BXsfUNnG_OTl4NMrhQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
