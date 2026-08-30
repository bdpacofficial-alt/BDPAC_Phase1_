-- ==============================================================================
-- BDPAC (Bangladesh Political Analysis Centre) Database Schema - Phase 1 Production
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Custom Types & Enums
DO $$ BEGIN
    CREATE TYPE member_status AS ENUM ('pending', 'approved', 'suspended', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE org_level AS ENUM ('national', 'division', 'district', 'upazila', 'union', 'ward', 'unit');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE app_role AS ENUM (
        'super_admin',
        'national_admin',
        'division_admin',
        'district_admin',
        'upazila_admin',
        'union_admin',
        'ward_admin',
        'member'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Geographic Hierarchy Tables
CREATE TABLE IF NOT EXISTS public.divisions (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    code TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.districts (
    id TEXT PRIMARY KEY,
    division_id TEXT NOT NULL REFERENCES public.divisions(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    code TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.upazilas (
    id TEXT PRIMARY KEY,
    district_id TEXT NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    code TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.unions (
    id TEXT PRIMARY KEY,
    upazila_id TEXT NOT NULL REFERENCES public.upazilas(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    code TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.wards (
    id TEXT PRIMARY KEY,
    union_id TEXT REFERENCES public.unions(id) ON DELETE CASCADE,
    upazila_id TEXT REFERENCES public.upazilas(id) ON DELETE CASCADE,
    ward_number TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Organization & Committees Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    level org_level NOT NULL DEFAULT 'unit',
    parent_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    division_id TEXT REFERENCES public.divisions(id) ON DELETE SET NULL,
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    upazila_id TEXT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    union_id TEXT REFERENCES public.unions(id) ON DELETE SET NULL,
    ward_id TEXT REFERENCES public.wards(id) ON DELETE SET NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'dissolved')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. User Profiles / Members Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    member_id TEXT UNIQUE NOT NULL,
    full_name_en TEXT NOT NULL,
    full_name_bn TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    avatar_url TEXT,
    father_name TEXT,
    mother_name TEXT,
    date_of_birth DATE,
    gender TEXT DEFAULT 'Male',
    blood_group TEXT,
    occupation TEXT,
    nid_number TEXT,
    
    -- Geographic mapping
    division_id TEXT REFERENCES public.divisions(id) ON DELETE SET NULL,
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    upazila_id TEXT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    union_id TEXT REFERENCES public.unions(id) ON DELETE SET NULL,
    ward_id TEXT REFERENCES public.wards(id) ON DELETE SET NULL,
    village_area TEXT,
    address TEXT,
    
    -- Party & Organization mapping
    org_unit_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    party_designation TEXT DEFAULT 'General Member',
    primary_role app_role NOT NULL DEFAULT 'member',
    joined_date DATE DEFAULT CURRENT_DATE,
    
    -- Governance & Verification Status
    status member_status NOT NULL DEFAULT 'pending',
    approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Verification Flags (Pending external integrations)
    nid_verified BOOLEAN DEFAULT FALSE,
    face_verified BOOLEAN DEFAULT FALSE,
    otp_verified BOOLEAN DEFAULT FALSE,
    trusted_device_registered BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    
    -- Social & Emergency
    facebook_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    whatsapp_number TEXT,
    emergency_contact_name TEXT,
    emergency_contact_relation TEXT,
    emergency_contact_phone TEXT,
    bio TEXT,
    
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Role-Based Access Control (RBAC) with Location Scoping Table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'member',
    division_id TEXT REFERENCES public.divisions(id) ON DELETE SET NULL,
    district_id TEXT REFERENCES public.districts(id) ON DELETE SET NULL,
    upazila_id TEXT REFERENCES public.upazilas(id) ON DELETE SET NULL,
    union_id TEXT REFERENCES public.unions(id) ON DELETE SET NULL,
    ward_id TEXT REFERENCES public.wards(id) ON DELETE SET NULL,
    assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, role, division_id, district_id, upazila_id, union_id, ward_id)
);

-- 7. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. Indexes for High-Performance Queries
CREATE INDEX IF NOT EXISTS idx_profiles_member_id ON public.profiles(member_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_division ON public.profiles(division_id);
CREATE INDEX IF NOT EXISTS idx_profiles_district ON public.profiles(district_id);
CREATE INDEX IF NOT EXISTS idx_profiles_upazila ON public.profiles(upazila_id);
CREATE INDEX IF NOT EXISTS idx_profiles_union ON public.profiles(union_id);
CREATE INDEX IF NOT EXISTS idx_profiles_ward ON public.profiles(ward_id);
CREATE INDEX IF NOT EXISTS idx_profiles_org_unit ON public.profiles(org_unit_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_organizations_level ON public.organizations(level);
CREATE INDEX IF NOT EXISTS idx_districts_division ON public.districts(division_id);
CREATE INDEX IF NOT EXISTS idx_upazilas_district ON public.upazilas(district_id);
CREATE INDEX IF NOT EXISTS idx_unions_upazila ON public.unions(upazila_id);
CREATE INDEX IF NOT EXISTS idx_wards_union ON public.wards(union_id);

-- 9. Member ID Generator Function
CREATE OR REPLACE FUNCTION public.generate_member_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    current_year TEXT;
    seq_val INT;
    new_id TEXT;
BEGIN
    current_year := TO_CHAR(NOW(), 'YYYY');
    SELECT COUNT(*) + 1 INTO seq_val FROM public.profiles WHERE member_id LIKE 'BDPAC-' || current_year || '-%';
    new_id := 'BDPAC-' || current_year || '-' || LPAD(seq_val::TEXT, 5, '0');
    RETURN new_id;
END;
$$;

-- 10. Security Functions for RLS & Authorization
CREATE OR REPLACE FUNCTION public.is_super_admin(check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = check_user_id AND role = 'super_admin'
    );
$$;

CREATE OR REPLACE FUNCTION public.has_role(check_user_id UUID, req_role app_role)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = check_user_id AND (role = req_role OR role = 'super_admin')
    );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_location(
    admin_id UUID,
    p_division_id TEXT DEFAULT NULL,
    p_district_id TEXT DEFAULT NULL,
    p_upazila_id TEXT DEFAULT NULL,
    p_union_id TEXT DEFAULT NULL,
    p_ward_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
    -- Super Admin and National Admin have global authority
    IF EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = admin_id AND role IN ('super_admin', 'national_admin')
    ) THEN
        RETURN TRUE;
    END IF;

    -- Division Admin
    IF p_division_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = admin_id AND role = 'division_admin' AND division_id = p_division_id
    ) THEN
        RETURN TRUE;
    END IF;

    -- District Admin
    IF p_district_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = admin_id AND role = 'district_admin' AND district_id = p_district_id
    ) THEN
        RETURN TRUE;
    END IF;

    -- Upazila Admin
    IF p_upazila_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = admin_id AND role = 'upazila_admin' AND upazila_id = p_upazila_id
    ) THEN
        RETURN TRUE;
    END IF;

    -- Union Admin
    IF p_union_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = admin_id AND role = 'union_admin' AND union_id = p_union_id
    ) THEN
        RETURN TRUE;
    END IF;

    -- Ward Admin
    IF p_ward_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = admin_id AND role = 'ward_admin' AND ward_id = p_ward_id
    ) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$;

-- 11. Trigger on auth.users for Automatic Member Profile Creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    m_id TEXT;
    u_meta JSONB;
    v_full_name TEXT;
    v_phone TEXT;
    v_father_name TEXT;
    v_mother_name TEXT;
    v_dob DATE;
    v_gender TEXT;
    v_blood_group TEXT;
    v_division_id TEXT;
    v_district_id TEXT;
    v_upazila_id TEXT;
    v_union_id TEXT;
    v_ward_id TEXT;
    v_address TEXT;
    v_nid TEXT;
    v_party_pos TEXT;
BEGIN
    u_meta := NEW.raw_user_meta_data;
    m_id := public.generate_member_id();
    
    v_full_name := COALESCE(u_meta->>'full_name', u_meta->>'name', u_meta->>'fullName', 'New Member');
    v_phone := COALESCE(u_meta->>'phone', u_meta->>'mobile', '');
    v_father_name := u_meta->>'father_name';
    v_mother_name := u_meta->>'mother_name';
    v_gender := COALESCE(u_meta->>'gender', 'Male');
    v_blood_group := u_meta->>'blood_group';
    v_division_id := u_meta->>'division_id';
    v_district_id := u_meta->>'district_id';
    v_upazila_id := u_meta->>'upazila_id';
    v_union_id := u_meta->>'union_id';
    v_ward_id := u_meta->>'ward_id';
    v_address := u_meta->>'address';
    v_nid := u_meta->>'nid_number';
    v_party_pos := COALESCE(u_meta->>'party_designation', 'Member');
    
    IF u_meta->>'dob' IS NOT NULL AND u_meta->>'dob' != '' THEN
        BEGIN
            v_dob := (u_meta->>'dob')::DATE;
        EXCEPTION WHEN OTHERS THEN
            v_dob := NULL;
        END;
    END IF;

    INSERT INTO public.profiles (
        id,
        member_id,
        full_name_en,
        full_name_bn,
        email,
        phone,
        father_name,
        mother_name,
        date_of_birth,
        gender,
        blood_group,
        division_id,
        district_id,
        upazila_id,
        union_id,
        ward_id,
        address,
        nid_number,
        party_designation,
        status,
        primary_role
    ) VALUES (
        NEW.id,
        m_id,
        v_full_name,
        u_meta->>'full_name_bn',
        NEW.email,
        v_phone,
        v_father_name,
        v_mother_name,
        v_dob,
        v_gender,
        v_blood_group,
        v_division_id,
        v_district_id,
        v_upazila_id,
        v_union_id,
        v_ward_id,
        v_address,
        v_nid,
        v_party_pos,
        'pending',
        'member'
    ) ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = NOW();

    -- Assign default member role
    INSERT INTO public.user_roles (user_id, role, division_id, district_id, upazila_id, union_id, ward_id)
    VALUES (NEW.id, 'member', v_division_id, v_district_id, v_upazila_id, v_union_id, v_ward_id)
    ON CONFLICT DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Updated At Auto-Update Trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_organizations_updated_at ON public.organizations;
CREATE TRIGGER tr_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 13. Member Directory View
CREATE OR REPLACE VIEW public.member_directory_view AS
SELECT
    p.id,
    p.member_id,
    p.full_name_en,
    p.full_name_bn,
    p.email,
    p.phone,
    p.avatar_url,
    p.blood_group,
    p.gender,
    p.occupation,
    p.division_id,
    p.district_id,
    p.upazila_id,
    p.union_id,
    p.ward_id,
    p.village_area,
    p.address,
    div.name_en AS division_name_en,
    div.name_bn AS division_name_bn,
    dist.name_en AS district_name_en,
    dist.name_bn AS district_name_bn,
    upz.name_en AS upazila_name_en,
    upz.name_bn AS upazila_name_bn,
    un.name_en AS union_name_en,
    un.name_bn AS union_name_bn,
    w.ward_number,
    p.org_unit_id,
    o.name_en AS org_name_en,
    o.name_bn AS org_name_bn,
    p.party_designation,
    p.primary_role,
    p.status,
    p.is_verified,
    p.joined_date,
    p.created_at,
    p.updated_at
FROM public.profiles p
LEFT JOIN public.divisions div ON p.division_id = div.id
LEFT JOIN public.districts dist ON p.district_id = dist.id
LEFT JOIN public.upazilas upz ON p.upazila_id = upz.id
LEFT JOIN public.unions un ON p.union_id = un.id
LEFT JOIN public.wards w ON p.ward_id = w.id
LEFT JOIN public.organizations o ON p.org_unit_id = o.id;

-- ==============================================================================
-- 14. Row Level Security (RLS) Configuration & Policies
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upazilas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 14.1 Geographic Data Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read on divisions" ON public.divisions FOR SELECT USING (true);
CREATE POLICY "Allow public read on districts" ON public.districts FOR SELECT USING (true);
CREATE POLICY "Allow public read on upazilas" ON public.upazilas FOR SELECT USING (true);
CREATE POLICY "Allow public read on unions" ON public.unions FOR SELECT USING (true);
CREATE POLICY "Allow public read on wards" ON public.wards FOR SELECT USING (true);

CREATE POLICY "Allow admin write on divisions" ON public.divisions FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Allow admin write on districts" ON public.districts FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'national_admin'));
CREATE POLICY "Allow admin write on upazilas" ON public.upazilas FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'national_admin'));
CREATE POLICY "Allow admin write on unions" ON public.unions FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'national_admin'));
CREATE POLICY "Allow admin write on wards" ON public.wards FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'national_admin'));

-- 14.2 Organizations Policies
CREATE POLICY "Allow authenticated read organizations" ON public.organizations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read organizations" ON public.organizations FOR SELECT TO anon USING (true);
CREATE POLICY "Allow admin manage organizations" ON public.organizations FOR ALL TO authenticated
    USING (
        public.is_super_admin(auth.uid()) OR
        public.has_role(auth.uid(), 'national_admin') OR
        public.can_manage_location(auth.uid(), division_id, district_id, upazila_id, union_id, ward_id)
    );

-- 14.3 Profiles Policies
-- Users can always view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated
    USING (auth.uid() = id);

-- Approved members can be viewed in directory by authenticated members and directory searchers
CREATE POLICY "Approved members are viewable" ON public.profiles FOR SELECT
    USING (status = 'approved');

-- Admins can view pending/suspended/rejected profiles within their location jurisdiction
CREATE POLICY "Admins can view scoped profiles" ON public.profiles FOR SELECT TO authenticated
    USING (
        public.is_super_admin(auth.uid()) OR
        public.has_role(auth.uid(), 'national_admin') OR
        public.can_manage_location(auth.uid(), division_id, district_id, upazila_id, union_id, ward_id)
    );

-- Users can insert their own profile during registration
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

-- Users can update non-governance fields of their own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND
        -- Ensure user cannot unilaterally approve or promote themselves
        status = (SELECT status FROM public.profiles WHERE id = auth.uid()) AND
        primary_role = (SELECT primary_role FROM public.profiles WHERE id = auth.uid())
    );

-- Admins can update profiles (approve, reject, suspend, change role/org) within location jurisdiction
CREATE POLICY "Admins can update scoped profiles" ON public.profiles FOR UPDATE TO authenticated
    USING (
        public.is_super_admin(auth.uid()) OR
        public.has_role(auth.uid(), 'national_admin') OR
        public.can_manage_location(auth.uid(), division_id, district_id, upazila_id, union_id, ward_id)
    );

-- Only Super Admin can delete profiles
CREATE POLICY "Super Admin can delete profiles" ON public.profiles FOR DELETE TO authenticated
    USING (public.is_super_admin(auth.uid()));

-- 14.4 User Roles Policies
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view roles in scope" ON public.user_roles FOR SELECT TO authenticated
    USING (
        public.is_super_admin(auth.uid()) OR
        public.has_role(auth.uid(), 'national_admin') OR
        public.can_manage_location(auth.uid(), division_id, district_id, upazila_id, union_id, ward_id)
    );

CREATE POLICY "Admins can manage roles in scope" ON public.user_roles FOR ALL TO authenticated
    USING (
        public.is_super_admin(auth.uid()) OR
        public.has_role(auth.uid(), 'national_admin') OR
        public.can_manage_location(auth.uid(), division_id, district_id, upazila_id, union_id, ward_id)
    );

-- 14.5 Audit Logs Policies
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.has_role(auth.uid(), 'national_admin'));
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = actor_id);
