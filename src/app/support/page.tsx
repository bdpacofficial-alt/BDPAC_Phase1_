'use client';

import React from 'react';
import { DUMMY_TICKETS } from '@/data/supportData';
import { LifeBuoy, Plus, CheckCircle2, MessageSquare } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function SupportPage() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-sky-400" /> Enterprise Help Desk & Support Center
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Zendesk / Intercom inspired ticketing system, live support chat queue, and knowledge base.
          </p>
        </div>

        <button
          onClick={() => addToast({ type: 'success', title: 'Ticket Created', message: 'Support Ticket #TCK-2026-900 created.' })}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Support Ticket
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl divide-y divide-slate-100 dark:divide-slate-800">
        {DUMMY_TICKETS.map((t) => (
          <div key={t.id} className="p-5 flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-mono text-[10px] text-sky-500 font-bold">{t.id}</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t.subject}</h3>
              <p className="text-slate-400">{t.category} • Submitted by {t.member} on {t.createdDate}</p>
            </div>
            <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
              t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
            }`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
