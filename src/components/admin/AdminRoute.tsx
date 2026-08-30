'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, LogIn, Lock } from 'lucide-react';
import { AppRole } from '@/lib/supabase/types';

interface AdminRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

export function AdminRoute({
  children,
  allowedRoles = ['super_admin', 'national_admin', 'division_admin', 'district_admin', 'upazila_admin', 'union_admin', 'ward_admin']
}: AdminRouteProps) {
  const { user, isAuthenticated, isLoading, primaryRole, isConfigured } = useAuth();

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-bold">অ্যাডমিন পারমিশন ও সিকিউরিটি যাচাই হচ্ছে...</p>
      </div>
    );
  }

  // If user is not logged in, block access.
  // NOTE: this check must NOT be skipped when Supabase is unconfigured —
  // doing so would grant every visitor admin access whenever env vars are
  // missing/misconfigured in production (fail-open). In unconfigured/local
  // preview mode, AuthContext seeds a demo super_admin user, so this still
  // allows local UI review without weakening the production guard.
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto ring-8 ring-amber-500/5">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">অ্যাডমিন প্রবেশাধিকার প্রয়োজন</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          এই সংরক্ষিত প্রশাসনিক ড্যাশবোর্ড ও সিএমএস প্যানেলে প্রবেশ করতে উপযুক্ত প্রশাসনিক অ্যাকাউন্টে লগইন করুন।
        </p>
        <a
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition"
        >
          <LogIn className="w-4 h-4" /> লগইন করুন
        </a>
      </div>
    );
  }

  // Verify Role Authorization
  const hasAccess = primaryRole && allowedRoles.includes(primaryRole);

  if (!hasAccess) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto ring-8 ring-red-500/5">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white">অননুমোদিত অ্যাক্সেস (Unauthorized)</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          আপনার অ্যাকাউন্ট রোল (<strong>{primaryRole}</strong>) এর অধীনে এই সিএমএস ও সিস্টেম কন্ট্রোল সেন্টারে প্রবেশের অনুমতি নেই।
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs shadow transition"
        >
          সদস্য ড্যাশবোর্ডে ফিরে যান
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
