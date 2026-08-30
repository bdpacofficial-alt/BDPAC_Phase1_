/**
 * BDPAC Role-Based Access Control (RBAC) & Scopes - Phase 1 Production
 */

import { AppRole } from './supabase/types';

export interface RoleDefinition {
  id: AppRole;
  nameEn: string;
  nameBn: string;
  level: 'national' | 'division' | 'district' | 'upazila' | 'union' | 'ward' | 'member';
  permissions: string[];
}

export const APP_ROLES: Record<AppRole, RoleDefinition> = {
  super_admin: {
    id: 'super_admin',
    nameEn: 'Super Administrator',
    nameBn: 'প্রধান অ্যাডমিনিস্ট্রেটর',
    level: 'national',
    permissions: ['all']
  },
  national_admin: {
    id: 'national_admin',
    nameEn: 'National Central Admin',
    nameBn: 'কেন্দ্রীয় অ্যাডমিন',
    level: 'national',
    permissions: ['manage_all_members', 'manage_organizations', 'approve_members', 'publish_circulars', 'view_reports']
  },
  division_admin: {
    id: 'division_admin',
    nameEn: 'Division Administrator',
    nameBn: 'বিভাগীয় অ্যাডমিন',
    level: 'division',
    permissions: ['manage_division_members', 'approve_division_members', 'view_division_reports']
  },
  district_admin: {
    id: 'district_admin',
    nameEn: 'District Administrator',
    nameBn: 'জেলা অ্যাডমিন',
    level: 'district',
    permissions: ['manage_district_members', 'approve_district_members', 'view_district_reports']
  },
  upazila_admin: {
    id: 'upazila_admin',
    nameEn: 'Upazila / Thana Admin',
    nameBn: 'উপজেলা / থানা অ্যাডমিন',
    level: 'upazila',
    permissions: ['manage_upazila_members', 'approve_upazila_members']
  },
  union_admin: {
    id: 'union_admin',
    nameEn: 'Union Administrator',
    nameBn: 'ইউনিয়ন অ্যাডমিন',
    level: 'union',
    permissions: ['manage_union_members', 'approve_union_members']
  },
  ward_admin: {
    id: 'ward_admin',
    nameEn: 'Ward Administrator',
    nameBn: 'ওয়ার্ড অ্যাডমিন',
    level: 'ward',
    permissions: ['manage_ward_members']
  },
  member: {
    id: 'member',
    nameEn: 'General Member',
    nameBn: 'সাধারণ সদস্য',
    level: 'member',
    permissions: ['view_directory', 'view_feed', 'participate_polls', 'view_profile']
  }
};

export function canUserManageScope(
  userRole: AppRole,
  userScope: { divisionId?: string; districtId?: string; upazilaId?: string },
  targetScope: { divisionId?: string; districtId?: string; upazilaId?: string }
): boolean {
  if (userRole === 'super_admin' || userRole === 'national_admin') return true;

  if (userRole === 'division_admin') {
    return userScope.divisionId === targetScope.divisionId;
  }

  if (userRole === 'district_admin') {
    return userScope.districtId === targetScope.districtId;
  }

  if (userRole === 'upazila_admin') {
    return userScope.upazilaId === targetScope.upazilaId;
  }

  return false;
}
