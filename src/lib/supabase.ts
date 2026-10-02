import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/lib/database.types';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  // The app has no sign-in yet, so there is no session to store or refresh.
  { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
);

/** Member ID of the `profiles` row the app shows. */
export const MEMBER_ID = process.env.EXPO_PUBLIC_MEMBER_ID!;
