'use client';

import React from 'react';
import { DUMMY_SECURITY_LOGS } from '@/data/securityData';
import { ShieldAlert, ShieldCheck, Lock, Activity, Monitor, Trash2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { AdminRoute } from '@/components/admin/AdminRoute';

export default function SecuritySocPage() {
  return (
    <AdminRoute>
      <SecuritySocPageContent />
    </AdminRoute>
  );
}

function SecuritySocPageContent() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-sky-400" /> Enterprise Security Operations Center (SOC)
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time threat monitoring, active session control, air-gapped proxy logs, and trusted device pairing.
          </p>
        </div>

        <button
          onClick={() => addToast({ type: 'warning', title: 'Sessions Terminated', message: 'All active secondary sessions terminated.' })}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Terminate All Other Sessions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
          <p className="text-2xl font-black text-slate-900 dark:text-white">99.8%</p>
          <p className="text-xs text-slate-400">Security Health Index</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
          <Monitor className="w-8 h-8 text-sky-500 mx-auto" />
          <p className="text-2xl font-black text-slate-900 dark:text-white">1 Active</p>
          <p className="text-xs text-slate-400">Paired Trusted Device (Windows 11)</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
          <Lock className="w-8 h-8 text-amber-500 mx-auto" />
          <p className="text-2xl font-black text-slate-900 dark:text-white">AES-256</p>
          <p className="text-xs text-slate-400">Air-Gapped Encrypted Proxy</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Real-time Security Audit Logs</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {DUMMY_SECURITY_LOGS.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{log.event}</p>
                <p className="text-[10px] text-slate-400">{log.member} • {log.ip} • {log.device}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                log.status === 'Successful' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
