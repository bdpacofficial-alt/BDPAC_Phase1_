-- ==============================================================================
-- BDPAC (Bangladesh Political Analysis Centre) CMS & Extensibility Core Schema
-- Migration: 0002_cms_core.sql
-- ==============================================================================

-- 1. Custom Types for CMS
DO $$ BEGIN
    CREATE TYPE cms_status AS ENUM ('draft', 'active', 'published', 'disabled', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE cms_visibility AS ENUM ('public', 'authenticated', 'approved_members', 'admin_only', 'owner_only');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Helper Functions for CMS Authorization
CREATE OR REPLACE FUNCTION public.can_manage_cms(check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = check_user_id 
        AND role IN ('super_admin', 'national_admin')
    );
$$;

-- 3. CMS Modules Table
CREATE TABLE IF NOT EXISTS public.cms_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'Layers',
    route TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'member' CHECK (category IN ('public', 'member', 'admin', 'governance', 'tools')),
    status cms_status NOT NULL DEFAULT 'active',
    visibility cms_visibility NOT NULL DEFAULT 'authenticated',
    sort_order INT NOT NULL DEFAULT 0,
    is_core BOOLEAN NOT NULL DEFAULT false,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. CMS Features Table
CREATE TABLE IF NOT EXISTS public.cms_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.cms_modules(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    status cms_status NOT NULL DEFAULT 'active',
    visibility cms_visibility NOT NULL DEFAULT 'authenticated',
    route TEXT,
    icon TEXT DEFAULT 'Sparkles',
    sort_order INT NOT NULL DEFAULT 0,
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. CMS Pages Table
CREATE TABLE IF NOT EXISTS public.cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    status cms_status NOT NULL DEFAULT 'draft',
    visibility cms_visibility NOT NULL DEFAULT 'public',
    seo_title TEXT,
    seo_description TEXT,
    featured_image TEXT,
    template TEXT NOT NULL DEFAULT 'default',
    sort_order INT NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. CMS Homepage / Site Sections Table
CREATE TABLE IF NOT EXISTS public.cms_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    status cms_status NOT NULL DEFAULT 'published',
    visibility cms_visibility NOT NULL DEFAULT 'public',
    sort_order INT NOT NULL DEFAULT 0,
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. CMS Banners Table
CREATE TABLE IF NOT EXISTS public.cms_banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    mobile_image_url TEXT,
    button_text TEXT,
    button_url TEXT,
    status cms_status NOT NULL DEFAULT 'active',
    visibility cms_visibility NOT NULL DEFAULT 'public',
    sort_order INT NOT NULL DEFAULT 0,
    start_at TIMESTAMPTZ,
    end_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. CMS News & Announcements Table
CREATE TABLE IF NOT EXISTS public.cms_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL DEFAULT 'General',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    featured_image TEXT,
    is_announcement BOOLEAN NOT NULL DEFAULT false,
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    status cms_status NOT NULL DEFAULT 'draft',
    visibility cms_visibility NOT NULL DEFAULT 'public',
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. CMS Navigation & Menu Items Table
CREATE TABLE IF NOT EXISTS public.cms_menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_location TEXT NOT NULL CHECK (menu_location IN ('header', 'sidebar', 'footer', 'admin')),
    label TEXT NOT NULL,
    route TEXT NOT NULL,
    icon TEXT,
    parent_id UUID REFERENCES public.cms_menu_items(id) ON DELETE CASCADE,
    sort_order INT NOT NULL DEFAULT 0,
    visibility cms_visibility NOT NULL DEFAULT 'public',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
    required_role app_role,
    module_id UUID REFERENCES public.cms_modules(id) ON DELETE SET NULL,
    feature_id UUID REFERENCES public.cms_features(id) ON DELETE SET NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. CMS Feature Flags Table
CREATE TABLE IF NOT EXISTS public.cms_feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    enabled BOOLEAN NOT NULL DEFAULT true,
    visibility cms_visibility NOT NULL DEFAULT 'public',
    configuration JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. CMS Media Library Table
CREATE TABLE IF NOT EXISTS public.cms_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL DEFAULT 0,
    alt_text TEXT,
    caption TEXT,
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'authenticated', 'admin_only')),
    url TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 12. CMS Settings Table
CREATE TABLE IF NOT EXISTS public.cms_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL CHECK (category IN ('general', 'branding', 'contact', 'homepage', 'security', 'features')),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 13. CMS Triggers for updated_at Auto-Update
DROP TRIGGER IF EXISTS tr_cms_modules_updated_at ON public.cms_modules;
CREATE TRIGGER tr_cms_modules_updated_at
    BEFORE UPDATE ON public.cms_modules
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_features_updated_at ON public.cms_features;
CREATE TRIGGER tr_cms_features_updated_at
    BEFORE UPDATE ON public.cms_features
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_pages_updated_at ON public.cms_pages;
CREATE TRIGGER tr_cms_pages_updated_at
    BEFORE UPDATE ON public.cms_pages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_sections_updated_at ON public.cms_sections;
CREATE TRIGGER tr_cms_sections_updated_at
    BEFORE UPDATE ON public.cms_sections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_banners_updated_at ON public.cms_banners;
CREATE TRIGGER tr_cms_banners_updated_at
    BEFORE UPDATE ON public.cms_banners
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_news_updated_at ON public.cms_news;
CREATE TRIGGER tr_cms_news_updated_at
    BEFORE UPDATE ON public.cms_news
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_menu_items_updated_at ON public.cms_menu_items;
CREATE TRIGGER tr_cms_menu_items_updated_at
    BEFORE UPDATE ON public.cms_menu_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_feature_flags_updated_at ON public.cms_feature_flags;
CREATE TRIGGER tr_cms_feature_flags_updated_at
    BEFORE UPDATE ON public.cms_feature_flags
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_media_updated_at ON public.cms_media;
CREATE TRIGGER tr_cms_media_updated_at
    BEFORE UPDATE ON public.cms_media
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_cms_settings_updated_at ON public.cms_settings;
CREATE TRIGGER tr_cms_settings_updated_at
    BEFORE UPDATE ON public.cms_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 14. Indexes for CMS High Performance
CREATE INDEX IF NOT EXISTS idx_cms_modules_status ON public.cms_modules(status);
CREATE INDEX IF NOT EXISTS idx_cms_modules_visibility ON public.cms_modules(visibility);
CREATE INDEX IF NOT EXISTS idx_cms_features_module ON public.cms_features(module_id);
CREATE INDEX IF NOT EXISTS idx_cms_features_status ON public.cms_features(status);
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON public.cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON public.cms_pages(status);
CREATE INDEX IF NOT EXISTS idx_cms_sections_key ON public.cms_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_cms_banners_status ON public.cms_banners(status);
CREATE INDEX IF NOT EXISTS idx_cms_news_slug ON public.cms_news(slug);
CREATE INDEX IF NOT EXISTS idx_cms_news_status ON public.cms_news(status);
CREATE INDEX IF NOT EXISTS idx_cms_menu_items_location ON public.cms_menu_items(menu_location);
CREATE INDEX IF NOT EXISTS idx_cms_feature_flags_key ON public.cms_feature_flags(key);
CREATE INDEX IF NOT EXISTS idx_cms_settings_key ON public.cms_settings(key);

-- ==============================================================================
-- 15. Row Level Security (RLS) Configuration for CMS
-- ==============================================================================

ALTER TABLE public.cms_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;

-- 15.1 CMS Modules RLS Policies
CREATE POLICY "Public can view active public modules" ON public.cms_modules
    FOR SELECT USING (status = 'active' AND visibility = 'public');

CREATE POLICY "Authenticated users can view accessible modules" ON public.cms_modules
    FOR SELECT TO authenticated
    USING (
        (status = 'active' AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all modules" ON public.cms_modules
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.2 CMS Features RLS Policies
CREATE POLICY "Public can view active public features" ON public.cms_features
    FOR SELECT USING (status = 'active' AND visibility = 'public');

CREATE POLICY "Authenticated users can view accessible features" ON public.cms_features
    FOR SELECT TO authenticated
    USING (
        (status = 'active' AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all features" ON public.cms_features
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.3 CMS Pages RLS Policies
CREATE POLICY "Public can view published public pages" ON public.cms_pages
    FOR SELECT USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Authenticated users can view accessible pages" ON public.cms_pages
    FOR SELECT TO authenticated
    USING (
        (status = 'published' AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all pages" ON public.cms_pages
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.4 CMS Sections RLS Policies
CREATE POLICY "Public can view published sections" ON public.cms_sections
    FOR SELECT USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Authenticated users can view accessible sections" ON public.cms_sections
    FOR SELECT TO authenticated
    USING (
        (status = 'published' AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all sections" ON public.cms_sections
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.5 CMS Banners RLS Policies
CREATE POLICY "Public can view active public banners" ON public.cms_banners
    FOR SELECT USING (
        status = 'active' 
        AND visibility = 'public'
        AND (start_at IS NULL OR start_at <= NOW())
        AND (end_at IS NULL OR end_at >= NOW())
    );

CREATE POLICY "Authenticated users can view active banners" ON public.cms_banners
    FOR SELECT TO authenticated
    USING (
        (status = 'active' AND visibility IN ('public', 'authenticated', 'approved_members')
         AND (start_at IS NULL OR start_at <= NOW())
         AND (end_at IS NULL OR end_at >= NOW()))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all banners" ON public.cms_banners
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.6 CMS News RLS Policies
CREATE POLICY "Public can view published public news" ON public.cms_news
    FOR SELECT USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Authenticated users can view published news" ON public.cms_news
    FOR SELECT TO authenticated
    USING (
        (status = 'published' AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all news" ON public.cms_news
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.7 CMS Menu Items RLS Policies
CREATE POLICY "Public can view active public menu items" ON public.cms_menu_items
    FOR SELECT USING (status = 'active' AND visibility = 'public');

CREATE POLICY "Authenticated users can view accessible menu items" ON public.cms_menu_items
    FOR SELECT TO authenticated
    USING (
        (status = 'active' AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all menu items" ON public.cms_menu_items
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.8 CMS Feature Flags RLS Policies
CREATE POLICY "Anyone can view enabled public feature flags" ON public.cms_feature_flags
    FOR SELECT USING (enabled = true AND visibility = 'public');

CREATE POLICY "Authenticated users can view accessible flags" ON public.cms_feature_flags
    FOR SELECT TO authenticated
    USING (
        (enabled = true AND visibility IN ('public', 'authenticated', 'approved_members'))
        OR public.can_manage_cms(auth.uid())
    );

CREATE POLICY "Admins can manage all feature flags" ON public.cms_feature_flags
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.9 CMS Media Library RLS Policies
CREATE POLICY "Public can view public media" ON public.cms_media
    FOR SELECT USING (visibility = 'public');

CREATE POLICY "Authenticated users can view authenticated media" ON public.cms_media
    FOR SELECT TO authenticated
    USING (visibility IN ('public', 'authenticated') OR public.can_manage_cms(auth.uid()));

CREATE POLICY "Admins can manage all media" ON public.cms_media
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));

-- 15.10 CMS Settings RLS Policies
CREATE POLICY "Anyone can view public settings" ON public.cms_settings
    FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can view all settings" ON public.cms_settings
    FOR SELECT TO authenticated
    USING (public.can_manage_cms(auth.uid()));

CREATE POLICY "Admins can manage all settings" ON public.cms_settings
    FOR ALL TO authenticated
    USING (public.can_manage_cms(auth.uid()))
    WITH CHECK (public.can_manage_cms(auth.uid()));
