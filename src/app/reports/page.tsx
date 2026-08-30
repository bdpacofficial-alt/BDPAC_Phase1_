'use client';

import React from 'react';
import { BarChart3, Download, TrendingUp, Users, Shield, CheckSquare } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ReportsPage() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-sky-400" /> Enterprise Reports & Analytics Center
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time Power BI / Tableau style analytical dashboards for Division, District, and Ward performance.
          </p>
        </div>

        <button
          onClick={() => addToast({ type: 'success', title: 'Export Generated', message: 'Downloaded Executive Analytics Report (PDF).' })}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Executive PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-2 text-center">
          <Users className="w-8 h-8 text-sky-500 mx-auto" />
          <p className="text-2xl font-black text-slate-900 dark:text-white">1,000,000+</p>
          <p className="text-xs text-slate-400">Total Registered Members Nationwide</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-2 text-center">
          <Shield className="w-8 h-8 text-emerald-500 mx-auto" />
          <p className="text-2xl font-black text-slate-900 dark:text-white">99.4%</p>
          <p className="text-xs text-slate-400">NID & Biometric Verification Rate</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-2 text-center">
          <CheckSquare className="w-8 h-8 text-indigo-500 mx-auto" />
          <p className="text-2xl font-black text-slate-900 dark:text-white">88.2%</p>
          <p className="text-xs text-slate-400">Grassroots Task Completion Index</p>
        </div>
      </div>
    </div>
  );
}
