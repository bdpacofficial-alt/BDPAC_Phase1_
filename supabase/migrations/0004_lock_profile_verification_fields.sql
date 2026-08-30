-- ==============================================================================
-- BDPAC Security Hardening — Lock Governance/Verification Fields
-- Migration: 0004_lock_profile_verification_fields.sql
-- ==============================================================================
--
-- ISSUE:
-- The existing "Users can update own profile" policy on public.profiles
-- (defined in 0001_init_schema.sql) correctly prevents an authenticated
-- user from changing their own `status` or `primary_role` via WITH CHECK,
-- but it does NOT protect these other governance/verification columns:
--   is_verified, nid_verified, face_verified, otp_verified,
--   trusted_device_registered, approved_by, approved_at
-- As written, an authenticated user could call the Supabase REST API
-- directly (bypassing the frontend entirely) and set these fields on
-- their own row — e.g. marking themselves as NID/face verified without
-- any real verification ever occurring.
--
-- FIX:
-- Replace the policy with an equivalent one that additionally pins all
-- of the above columns to their existing (pre-update) values, the same
-- way status/primary_role were already locked. IS NOT DISTINCT FROM is
-- used instead of plain equality so this works correctly for the
-- nullable columns (approved_by, approved_at), which are NULL for the
-- vast majority of members and must still compare as "unchanged".
--
-- Nothing else about the policy changes: users can still update their
-- own legitimate profile fields (name, phone, address, bio, social
-- links, etc.) exactly as before.
-- ==============================================================================

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND
        status IS NOT DISTINCT FROM (SELECT status FROM public.profiles WHERE id = auth.uid()) AND
        primary_role IS NOT DISTINCT FROM (SELECT primary_role FROM public.profiles WHERE id = auth.uid()) AND
        is_verified IS NOT DISTINCT FROM (SELECT is_verified FROM public.profiles WHERE id = auth.uid()) AND
        nid_verified IS NOT DISTINCT FROM (SELECT nid_verified FROM public.profiles WHERE id = auth.uid()) AND
        face_verified IS NOT DISTINCT FROM (SELECT face_verified FROM public.profiles WHERE id = auth.uid()) AND
        otp_verified IS NOT DISTINCT FROM (SELECT otp_verified FROM public.profiles WHERE id = auth.uid()) AND
        trusted_device_registered IS NOT DISTINCT FROM (SELECT trusted_device_registered FROM public.profiles WHERE id = auth.uid()) AND
        approved_by IS NOT DISTINCT FROM (SELECT approved_by FROM public.profiles WHERE id = auth.uid()) AND
        approved_at IS NOT DISTINCT FROM (SELECT approved_at FROM public.profiles WHERE id = auth.uid())
    );
