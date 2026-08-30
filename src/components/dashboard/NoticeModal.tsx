'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { AlertTriangle, FileText, Download, Share2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function NoticeModal({ isOpen, onClose, notice }: { isOpen: boolean; onClose: () => void; notice: any }) {
  const { addToast } = useToast();
  if (!notice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official Notice / Circular" maxWidth="lg">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block">{notice.category || 'Official Circular'}</span>
            <span className="text-[10px] opacity-80">{notice.date || 'August 06, 2026'}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{notice.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Issued by: {notice.issuer || 'Central Steering Secretariat'}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed text-slate-700 dark:text-slate-300 space-y-2">
          <p>{notice.content || 'All Division, District, and Thana executive leaders are hereby directed to complete the grassroots digital membership verification drive before August 15, 2026. Non-verified profiles will be temporarily restricted.'}</p>
          <p>Compliance must be reported directly via the PPN Analytics portal.</p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => {
              addToast({ type: 'success', title: 'Circular Downloaded', message: 'Downloaded Official Circular PDF' });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
          >
            <Download className="w-4 h-4" /> Download Official PDF
          </button>
          <button
            onClick={() => {
              addToast({ type: 'info', title: 'Link Copied', message: 'Encrypted link copied to clipboard' });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition"
          >
            <Share2 className="w-4 h-4" /> Share Internal
          </button>
        </div>
      </div>
    </Modal>
  );
}
