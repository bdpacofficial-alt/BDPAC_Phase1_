/**
 * BDPAC Supabase Authentication Layer - Phase 1 Production
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';
import type { ProfileRow } from './types';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  fullNameBn?: string;
  mobile: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  occupation?: string;
  nidNumber?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  wardId?: string;
  address?: string;
  partyPosition?: string;
}

export interface AuthResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function signUpMember(data: SignUpData): Promise<AuthResult<{ user: any; profile?: ProfileRow }>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase configuration missing (VITE_SUPABASE_ANON_KEY not set). Production registrations require valid credentials.'
    };
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email.trim().toLowerCase(),
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          full_name_bn: data.fullNameBn || null,
          mobile: data.mobile,
          father_name: data.fatherName || null,
          mother_name: data.motherName || null,
          dob: data.dob || null,
          gender: data.gender || 'Male',
          blood_group: data.bloodGroup || null,
          occupation: data.occupation || null,
          nid_number: data.nidNumber || null,
          division_id: data.divisionId || null,
          district_id: data.districtId || null,
          upazila_id: data.upazilaId || null,
          union_id: data.unionId || null,
          ward_id: data.wardId || null,
          address: data.address || null,
          party_designation: data.partyPosition || 'Member'
        }
      }
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Registration failed. User was not created.' };
    }

    // Attempt to fetch profile created by trigger
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();

    return {
      success: true,
      data: {
        user: authData.user,
        profile: profile as ProfileRow
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred during registration.' };
  }
}

export async function signInMember(email: string, password: string): Promise<AuthResult<{ user: any; profile?: ProfileRow }>> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase is not configured with valid API keys. Please verify .env settings.'
    };
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Authentication failed. No user found.' };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      console.warn('Could not fetch user profile:', profileError);
    }

    return {
      success: true,
      data: {
        user: authData.user,
        profile: profile as ProfileRow
      }
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed.' };
  }
}

export async function signOutMember(): Promise<AuthResult> {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signOut();
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getCurrentUserProfile(): Promise<ProfileRow | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    return (profile as ProfileRow) || null;
  } catch {
    return null;
  }
}
