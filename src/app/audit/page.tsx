'use client';

import React from 'react';
import { DUMMY_SECURITY_LOGS } from '@/data/securityData';
import { Shield, Clock, FileText } from 'lucide-react';

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Clock className="w-6 h-6 text-sky-400" /> Activity Timeline & Audit Explorer
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Microsoft Purview / Splunk inspired chronological platform audit trail & change history.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl p-5 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Audit Events</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {DUMMY_SECURITY_LOGS.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{log.event}</p>
                <p className="text-[10px] text-slate-400">{log.member} • {log.time}</p>
              </div>
              <span className="font-mono text-[10px] text-sky-500 font-bold">{log.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
