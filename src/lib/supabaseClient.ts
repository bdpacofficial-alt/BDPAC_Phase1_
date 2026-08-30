/**
 * BDPAC (Bangladesh Political Analysis Centre)
 * Supabase Client Configuration - Phase 1 Production
 * 
 * SECURITY COMPLIANCE:
 * - Uses Public Anon / Publishable Key only.
 * - Never uses service_role key.
 * - Database operations are secured via PostgreSQL Row Level Security (RLS).
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mopkaxnogxkdfhcqsyao.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== 'https://your-project.supabase.co' &&
    SUPABASE_ANON_KEY !== 'your-anon-key' &&
    SUPABASE_ANON_KEY.length > 20
  );
};

export const getSupabaseConfig = () => ({
  url: SUPABASE_URL,
  isConfigured: isSupabaseConfigured(),
  region: 'ap-northeast-1',
  projectRef: 'mopkaxnogxkdfhcqsyao'
});

// Create standard Supabase JS client
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: 'bdpac_supabase_auth_token'
    }
  }
);
