'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { Download, FileText, Share2, Sparkles } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function DocumentViewerModal({ isOpen, onClose, doc }: { isOpen: boolean; onClose: () => void; doc: any }) {
  const { addToast } = useToast();
  if (!doc) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Document: ${doc.title}`} maxWidth="2xl">
      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-sky-400">CLASSIFIED OFFICIAL DOCUMENT</span>
            <span className="text-[10px] text-slate-400">VERSION {doc.version || '1.0'}</span>
          </div>
          <h3 className="text-base font-bold">{doc.title}</h3>
          <p className="text-slate-300 leading-relaxed">
            {doc.preview || 'Official directive detailing organizational protocols, security compliance rules, and digital membership verification routines across all 8 division units.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs space-y-1">
          <p className="font-bold text-sky-400 flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> AI Summary & Analysis</p>
          <p className="text-slate-600 dark:text-slate-300">
            Key Directive: All grassroots ward leaders must conduct biometric verification using PPN mobile portal before the mid-month deadline.
          </p>
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={() => addToast({ type: 'success', title: 'Downloaded', message: `Downloaded ${doc.title}` })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
          >
            <Download className="w-4 h-4" /> Download File
          </button>
          <button
            onClick={() => addToast({ type: 'info', title: 'Link Shared', message: 'Document access link copied' })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
          >
            <Share2 className="w-4 h-4" /> Share Document
          </button>
        </div>
      </div>
    </Modal>
  );
}
