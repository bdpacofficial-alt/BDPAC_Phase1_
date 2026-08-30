/**
 * BDPAC Member Data Management Service - Phase 1 Production
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { mapProfileToMember } from './mapMember';
import { Member, DUMMY_MEMBERS } from '@/data/membersData';
import type { MemberStatus, MemberDirectoryViewRow, ProfileRow } from './types';

export interface FetchMembersOptions {
  search?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  wardId?: string;
  status?: MemberStatus | 'all';
  partyPosition?: string;
  limit?: number;
  offset?: number;
}

export interface MembersResponse {
  members: Member[];
  total: number;
  fromSupabase: boolean;
  error?: string;
}

export async function fetchMembers(options: FetchMembersOptions = {}): Promise<MembersResponse> {
  const {
    search = '',
    divisionId,
    districtId,
    upazilaId,
    status = 'all',
    partyPosition,
    limit = 50,
    offset = 0
  } = options;

  if (isSupabaseConfigured()) {
    try {
      let query = supabase
        .from('member_directory_view')
        .select('*', { count: 'exact' });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      if (divisionId) {
        query = query.eq('division_id', divisionId);
      }

      if (districtId) {
        query = query.eq('district_id', districtId);
      }

      if (upazilaId) {
        query = query.eq('upazila_id', upazilaId);
      }

      if (partyPosition) {
        query = query.eq('party_designation', partyPosition);
      }

      if (search) {
        query = query.or(`full_name_en.ilike.%${search}%,member_id.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
      }

      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data, count, error } = await query;

      if (!error && data) {
        return {
          members: data.map((row: any) => mapProfileToMember(row)),
          total: count || data.length,
          fromSupabase: true
        };
      }
      if (error) {
        console.warn('Supabase fetchMembers query error:', error.message);
      }
    } catch (err: any) {
      console.warn('Supabase fetchMembers exception:', err.message);
    }
  }

  // Fallback to local data if unconfigured/offline
  let filtered = [...DUMMY_MEMBERS];

  if (status && status !== 'all') {
    if (status === 'approved') filtered = filtered.filter(m => m.isVerified);
    if (status === 'pending') filtered = filtered.filter(m => !m.isVerified);
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      m => m.name.toLowerCase().includes(s) || m.id.toLowerCase().includes(s) || m.mobile.includes(s) || m.email.toLowerCase().includes(s)
    );
  }

  return {
    members: filtered.slice(offset, offset + limit),
    total: filtered.length,
    fromSupabase: false
  };
}

export async function fetchMemberById(idOrMemberId: string): Promise<Member | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('member_directory_view')
        .select('*')
        .or(`id.eq.${idOrMemberId},member_id.eq.${idOrMemberId}`)
        .maybeSingle();

      if (!error && data) {
        return mapProfileToMember(data);
      }
    } catch (e) {
      console.warn('fetchMemberById error:', e);
    }
  }

  const dummy = DUMMY_MEMBERS.find(m => m.id.toLowerCase() === idOrMemberId.toLowerCase());
  return dummy || null;
}

export async function updateMemberStatus(
  profileId: string,
  status: MemberStatus,
  notes?: string,
  adminId?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase configuration missing. Cannot modify production database state.'
    };
  }

  try {
    const updatePayload: Partial<ProfileRow> = {
      status,
      is_verified: status === 'approved',
      approved_by: adminId || null,
      approved_at: status === 'approved' ? new Date().toISOString() : null,
      rejection_reason: status === 'rejected' ? (notes || 'Application rejected by administration') : null,
      verification_notes: notes || null
    };

    const { error } = await supabase
      .from('profiles')
      .update(updatePayload as any)
      .or(`id.eq.${profileId},member_id.eq.${profileId}`);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateMemberProfile(
  profileId: string,
  updates: Partial<ProfileRow>
): Promise<{ success: boolean; data?: Member; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase credentials missing.' };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates as any)
      .eq('id', profileId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: mapProfileToMember(data) };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function fetchMemberStats(): Promise<{
  totalMembers: number;
  approvedMembers: number;
  pendingMembers: number;
  suspendedMembers: number;
  fromSupabase: boolean;
}> {
  if (isSupabaseConfigured()) {
    try {
      const [totalRes, approvedRes, pendingRes, suspendedRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('status', 'suspended'),
      ]);

      return {
        totalMembers: totalRes.count || 0,
        approvedMembers: approvedRes.count || 0,
        pendingMembers: pendingRes.count || 0,
        suspendedMembers: suspendedRes.count || 0,
        fromSupabase: true
      };
    } catch (e) {
      console.warn('fetchMemberStats error:', e);
    }
  }

  return {
    totalMembers: 125840,
    approvedMembers: 124200,
    pendingMembers: 12,
    suspendedMembers: 1628,
    fromSupabase: false
  };
}
