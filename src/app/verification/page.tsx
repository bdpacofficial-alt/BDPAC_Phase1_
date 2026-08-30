'use client';

import React from 'react';
import { ShieldCheck, Fingerprint, MessageSquareText, IdCard, CircleCheck, CircleDashed } from 'lucide-react';
import { AdminRoute } from '@/components/admin/AdminRoute';

interface GatewayStatus {
  name: string;
  description: string;
  icon: React.ElementType;
  connected: boolean;
}

// These reflect real integration status. Flip `connected` to true only once
// an actual authorized provider is wired up in src/lib/ — never based on
// a hardcoded/simulated response.
const GATEWAYS: GatewayStatus[] = [
  {
    name: 'NID Verification Gateway',
    description: 'Government National ID verification. Requires an authorized integration with the Election Commission / NID verification API.',
    icon: IdCard,
    connected: false,
  },
  {
    name: 'Biometric Face Verification',
    description: 'Liveness check and face-match against NID photo. Requires an authorized biometric verification provider.',
    icon: Fingerprint,
    connected: false,
  },
  {
    name: 'OTP Gateway',
    description: 'SMS-based one-time password verification for phone numbers. Requires an authorized SMS gateway provider.',
    icon: MessageSquareText,
    connected: false,
  },
  {
    name: 'Digital Member ID Verification',
    description: 'Cryptographic verification of issued Digital Member ID cards via QR/barcode scan.',
    icon: ShieldCheck,
    connected: false,
  },
];

function VerificationPageContent() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-sky-400" /> Verification Service
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          Secure identity verification infrastructure is ready. Government NID verification
          and biometric face verification will become available after the required
          authorized API integrations are connected.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-300/40 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30 p-4 text-xs text-amber-800 dark:text-amber-300">
        Member registration approval (reviewing and approving/rejecting applicants) is handled in{' '}
        <span className="font-semibold">Admin → Member Governance</span>. This page only reports
        the connection status of external identity-verification providers — it does not verify
        anyone's NID or face, and no data shown here represents a real verification result.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GATEWAYS.map((gw) => (
          <div
            key={gw.name}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                  <gw.icon className="w-5 h-5 text-sky-500" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{gw.name}</h3>
              </div>
              <span
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  gw.connected
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {gw.connected ? <CircleCheck className="w-3 h-3" /> : <CircleDashed className="w-3 h-3" />}
                {gw.connected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{gw.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VerificationPage() {
  return (
    <AdminRoute>
      <VerificationPageContent />
    </AdminRoute>
  );
}
