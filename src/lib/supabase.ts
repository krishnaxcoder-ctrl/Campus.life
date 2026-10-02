import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/lib/database.types';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } },
);

let _memberId = process.env.EXPO_PUBLIC_MEMBER_ID!;

/** Member ID of the currently logged-in user. */
export function getMemberId() {
  return _memberId;
}

/** Set after successful login. */
export function setLoggedInMemberId(id: string) {
  _memberId = id;
}

/** @deprecated Use getMemberId() instead. Kept for existing call sites. */
export const MEMBER_ID = process.env.EXPO_PUBLIC_MEMBER_ID!;
