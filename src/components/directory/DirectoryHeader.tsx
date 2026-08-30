import React from 'react';
import { Users, Shield } from 'lucide-react';

interface DirectoryHeaderProps {
  totalCount: number;
  fromSupabase: boolean;
}

export function DirectoryHeader({ totalCount, fromSupabase }: DirectoryHeaderProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold mb-2">
          <Users className="w-4 h-4 text-sky-400" /> BDPAC জাতীয় সদস্য ডিরেক্টরি
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          সদস্য পরিচিতি ও সার্চ ডিরেক্টরি
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          সারাদেশের সকল অনুমোদিত ও ভেরিফায়েড সদস্য এবং কমিটি তালিকা অনুসন্ধান করুন।
        </p>
      </div>

      <div className="flex items-center gap-3 bg-slate-800/90 px-4 py-2.5 rounded-2xl border border-slate-700">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">মোট সদস্য রেকর্ড</p>
          <p className="text-lg font-black text-sky-400">{totalCount.toLocaleString()}</p>
        </div>
        {fromSupabase && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Live Supabase DB
          </span>
        )}
      </div>
    </div>
  );
}
