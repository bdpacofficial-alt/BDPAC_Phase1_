'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, ShieldCheck, CheckCircle2, Play, Users, Award } from 'lucide-react';

export default function LaunchPage() {
  return (
    <div className="space-y-6 py-4 text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl space-y-4 max-w-4xl mx-auto">
        <div className="w-16 h-16 bg-amber-400/20 text-amber-300 rounded-full flex items-center justify-center mx-auto border border-amber-400/40 animate-bounce">
          <Rocket className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Client Presentation & Platform Launch Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          🎉 ALL 30/30 Enterprise Modules Built & Verified! The Political Private Network Platform is fully interactive and ready for demonstration.
        </p>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 font-bold text-xs text-white shadow-2xl transition flex items-center gap-2"
          >
            <Play className="w-4 h-4" /> Launch Interactive Presentation
          </Link>
          <Link
            href="/registration"
            className="px-8 py-3 rounded-2xl border border-white/20 hover:bg-white/10 font-bold text-xs text-white transition"
          >
            Start Member Onboarding Demo
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <span>30/30 Modules Built</span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow">
          <ShieldCheck className="w-6 h-6 text-sky-500 mx-auto mb-1" />
          <span>Air-Gapped Encrypted</span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow">
          <Users className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
          <span>8 Divisions Hierarchy</span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow">
          <Award className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <span>Client Presentation Ready</span>
        </div>
      </div>
    </div>
  );
}
