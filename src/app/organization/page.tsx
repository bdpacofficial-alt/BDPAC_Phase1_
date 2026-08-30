'use client';

import React from 'react';
import { DUMMY_COMMITTEES } from '@/data/orgManagementData';
import { Building2, Users, MapPin, ChevronRight, Plus } from 'lucide-react';

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Building2 className="w-6 h-6 text-sky-400" /> Enterprise Organization Management System
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Division, District, Thana, Union, and Ward Committee assignments & leadership structure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DUMMY_COMMITTEES.map((cmt) => (
          <div key={cmt.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-sky-500 uppercase">{cmt.level} Level</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{cmt.status}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{cmt.name}</h3>

            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
              <p><span className="text-slate-400">President:</span> {cmt.presidentName}</p>
              <p><span className="text-slate-400">General Secretary:</span> {cmt.secretaryName}</p>
              <p><span className="text-slate-400">Executive Members:</span> {cmt.totalMembers} Members</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
