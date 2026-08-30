# BDPAC Phase 1 & Admin CMS Setup & Deployment Guide

## 1. Supabase Database Migrations (SQL Editor)
Execute the migration scripts in sequential order inside the **Supabase Dashboard -> SQL Editor**:

1. **Step 1 — Core Database Schema**:
   - Open `supabase/migrations/0001_init_schema.sql`, copy all contents, and click **Run**.
2. **Step 2 — Geographic & Organization Seed**:
   - Open `supabase/seed/0001_locations_mymensingh_netrokona.sql`, copy all contents, and click **Run**.
3. **Step 3 — Extensible Admin CMS Engine**:
   - Open `supabase/migrations/0002_cms_core.sql`, copy all contents, and click **Run**.
4. **Step 4 — CMS Core Modules & Features Seed**:
   - Open `supabase/seed/0002_cms_seed.sql`, copy all contents, and click **Run**.

## 2. Supabase Tables & RLS Verification
Verify in **Table Editor** that all tables have Row Level Security (RLS) enabled:
- `profiles` (Auth-linked user profiles)
- `user_roles` (Hierarchical RBAC & Location Scopes)
- `divisions`, `districts`, `upazilas`, `unions`, `wards` (Geographic hierarchy)
- `organizations` (Committees)
- `cms_modules` (Extensible module registry)
- `cms_features` (Feature toggles & configuration)
- `cms_pages` (WordPress-style custom pages)
- `cms_sections` (Homepage blocks layout & configuration)
- `cms_banners` (Top banners & campaigns)
- `cms_news` (Official circulars, press releases & announcements)
- `cms_menu_items` (Dynamic header, sidebar & footer menus)
- `cms_feature_flags` (Real-time system feature toggles)
- `cms_media` (Media library catalog)
- `cms_settings` (General, branding, contact & security governance)
- `audit_logs` (Forensic audit trail)

## 3. Initial Super Admin / Owner Assignment
After creating your account via `/registration` or Supabase Auth, assign yourself the `super_admin` role in SQL Editor:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<YOUR_AUTH_USER_UUID>', 'super_admin')
ON CONFLICT DO NOTHING;

UPDATE public.profiles
SET status = 'approved', primary_role = 'super_admin', is_verified = true
WHERE id = '<YOUR_AUTH_USER_UUID>';
```

## 4. Environment Variables Setup (.env)
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://mopkaxnogxkdfhcqsyao.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
```

## 5. Netlify / Vercel Production Deployment
1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. Set environment variables in Netlify/Vercel:
   - `VITE_SUPABASE_URL` = `https://mopkaxnogxkdfhcqsyao.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `[your-anon-public-key]`

## 6. Accessing the Admin CMS
- Open `/admin/cms` in your browser.
- Only users with `super_admin`, `national_admin`, or authorized admin roles can access this area.
- Non-admin members will be safely blocked by both frontend `AdminRoute` and server-side Supabase RLS.
