'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full">
      {toasts.map((toast) => {
        const icon = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          error: <AlertCircle className="w-5 h-5 text-red-500" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          info: <Info className="w-5 h-5 text-sky-500" />,
        }[toast.type];

        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-2xl transition-all animate-slideUp"
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{toast.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
