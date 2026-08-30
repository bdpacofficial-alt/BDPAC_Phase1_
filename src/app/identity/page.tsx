'use client';

import React from 'react';
import { DigitalIDCard } from '@/components/ui/DigitalIDCard';
import { CreditCard, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function IdentityPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-xs">Loading your Digital Member ID...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center">
          <Lock className="w-7 h-7 text-sky-500" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">Sign in required</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
            Please log in to view your Digital Member ID. Your ID card is generated from your
            real, approved BDPAC membership profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-sky-400" /> Digital Member ID
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Your official BDPAC digital membership credential, generated from your profile.
        </p>
      </div>

      <div className="py-4">
        <DigitalIDCard member={user} />
      </div>

      {!(user.nidVerified && user.faceMatched) && (
        <div className="rounded-2xl border border-amber-300/40 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30 p-4 text-xs text-amber-800 dark:text-amber-300 max-w-md mx-auto text-center">
          Verification pending — NID and biometric face verification for your account have not
          been completed yet. Your ID card above reflects your current, actual verification
          status.
        </div>
      )}
    </div>
  );
}
