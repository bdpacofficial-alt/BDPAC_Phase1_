-- ==============================================================================
-- BDPAC Security Hardening
-- Migration: 0003_security_hardening.sql
-- ==============================================================================
--
-- ISSUE:
-- public.member_directory_view (defined in 0001_init_schema.sql) was created
-- as a plain view with no `security_invoker` setting. On Postgres 15+
-- (which Supabase runs), a view without security_invoker = true executes
-- with the privileges of the view's OWNER (typically a superuser-like role
-- in Supabase), not the privileges of the querying role. This means the
-- view can silently bypass the Row Level Security policies defined on the
-- underlying public.profiles table — potentially exposing pending,
-- suspended, and rejected members' PII (phone, email, NID, DOB, address)
-- to anonymous/unapproved callers, even though profiles itself is properly
-- locked down.
--
-- FIX:
-- Force the view to run with the querying role's own privileges, so the
-- profiles table's RLS policies are evaluated normally for every caller.
-- ==============================================================================

ALTER VIEW public.member_directory_view SET (security_invoker = true);

-- After applying this migration, verify in the Supabase dashboard
-- (Database > Security Advisor) that no "Security Definer View" warning
-- remains for member_directory_view.
