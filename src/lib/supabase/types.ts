export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type MemberStatus = 'pending' | 'approved' | 'suspended' | 'rejected';
export type OrgLevel = 'national' | 'division' | 'district' | 'upazila' | 'union' | 'ward' | 'unit';
export type AppRole =
  | 'super_admin'
  | 'national_admin'
  | 'division_admin'
  | 'district_admin'
  | 'upazila_admin'
  | 'union_admin'
  | 'ward_admin'
  | 'member';

export interface Database {
  public: {
    Tables: {
      divisions: {
        Row: DivisionRow;
        Insert: Omit<DivisionRow, 'created_at'> & { created_at?: string };
        Update: Partial<DivisionRow>;
      };
      districts: {
        Row: DistrictRow;
        Insert: Omit<DistrictRow, 'created_at'> & { created_at?: string };
        Update: Partial<DistrictRow>;
      };
      upazilas: {
        Row: UpazilaRow;
        Insert: Omit<UpazilaRow, 'created_at'> & { created_at?: string };
        Update: Partial<UpazilaRow>;
      };
      unions: {
        Row: UnionRow;
        Insert: Omit<UnionRow, 'created_at'> & { created_at?: string };
        Update: Partial<UnionRow>;
      };
      wards: {
        Row: WardRow;
        Insert: Omit<WardRow, 'created_at'> & { created_at?: string };
        Update: Partial<WardRow>;
      };
      organizations: {
        Row: OrganizationRow;
        Insert: Omit<OrganizationRow, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<OrganizationRow>;
      };
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProfileRow>;
      };
      user_roles: {
        Row: UserRoleRow;
        Insert: Omit<UserRoleRow, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<UserRoleRow>;
      };
      audit_logs: {
        Row: AuditLogRow;
        Insert: Omit<AuditLogRow, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<AuditLogRow>;
      };
    };
    Views: {
      member_directory_view: {
        Row: MemberDirectoryViewRow;
      };
    };
    Functions: {
      is_super_admin: {
        Args: { check_user_id: string };
        Returns: boolean;
      };
      has_role: {
        Args: { check_user_id: string; req_role: AppRole };
        Returns: boolean;
      };
      can_manage_location: {
        Args: {
          admin_id: string;
          p_division_id?: string;
          p_district_id?: string;
          p_upazila_id?: string;
          p_union_id?: string;
          p_ward_id?: string;
        };
        Returns: boolean;
      };
      generate_member_id: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
  };
}

export interface DivisionRow {
  id: string;
  name_en: string;
  name_bn: string;
  code: string | null;
  created_at: string;
}

export interface DistrictRow {
  id: string;
  division_id: string;
  name_en: string;
  name_bn: string;
  code: string | null;
  created_at: string;
}

export interface UpazilaRow {
  id: string;
  district_id: string;
  name_en: string;
  name_bn: string;
  code: string | null;
  created_at: string;
}

export interface UnionRow {
  id: string;
  upazila_id: string;
  name_en: string;
  name_bn: string;
  code: string | null;
  created_at: string;
}

export interface WardRow {
  id: string;
  union_id: string | null;
  upazila_id: string | null;
  ward_number: string;
  name_en: string;
  name_bn: string;
  created_at: string;
}

export interface OrganizationRow {
  id: string;
  name_en: string;
  name_bn: string;
  level: OrgLevel;
  parent_id: string | null;
  division_id: string | null;
  district_id: string | null;
  upazila_id: string | null;
  union_id: string | null;
  ward_id: string | null;
  description: string | null;
  status: 'active' | 'inactive' | 'dissolved';
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  member_id: string;
  full_name_en: string;
  full_name_bn: string | null;
  email: string;
  phone: string;
  avatar_url: string | null;
  father_name: string | null;
  mother_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  blood_group: string | null;
  occupation: string | null;
  nid_number: string | null;
  division_id: string | null;
  district_id: string | null;
  upazila_id: string | null;
  union_id: string | null;
  ward_id: string | null;
  village_area: string | null;
  address: string | null;
  org_unit_id: string | null;
  party_designation: string | null;
  primary_role: AppRole;
  joined_date: string | null;
  status: MemberStatus;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  is_verified: boolean;
  nid_verified: boolean;
  face_verified: boolean;
  otp_verified: boolean;
  trusted_device_registered: boolean;
  verification_notes: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
  emergency_contact_name: string | null;
  emergency_contact_relation: string | null;
  emergency_contact_phone: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoleRow {
  id: string;
  user_id: string;
  role: AppRole;
  division_id: string | null;
  district_id: string | null;
  upazila_id: string | null;
  union_id: string | null;
  ward_id: string | null;
  assigned_by: string | null;
  created_at: string;
}

export interface AuditLogRow {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Json;
  ip_address: string | null;
  created_at: string;
}

export interface MemberDirectoryViewRow {
  id: string;
  member_id: string;
  full_name_en: string;
  full_name_bn: string | null;
  email: string;
  phone: string;
  avatar_url: string | null;
  blood_group: string | null;
  gender: string | null;
  occupation: string | null;
  division_id: string | null;
  district_id: string | null;
  upazila_id: string | null;
  union_id: string | null;
  ward_id: string | null;
  village_area: string | null;
  address: string | null;
  division_name_en: string | null;
  division_name_bn: string | null;
  district_name_en: string | null;
  district_name_bn: string | null;
  upazila_name_en: string | null;
  upazila_name_bn: string | null;
  union_name_en: string | null;
  union_name_bn: string | null;
  ward_number: string | null;
  org_unit_id: string | null;
  org_name_en: string | null;
  org_name_bn: string | null;
  party_designation: string | null;
  primary_role: AppRole;
  status: MemberStatus;
  is_verified: boolean;
  joined_date: string | null;
  created_at: string;
  updated_at: string;
}
