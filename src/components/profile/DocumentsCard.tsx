import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export function DocumentsCard({ member }: { member: Member }) {
  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <FileText className="w-4 h-4 text-sky-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">সংযুক্ত নথিপত্র ও প্রত্যয়ন (Documents)</h3>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">ডিজিটাল মেম্বারশিপ সার্টিফিকেট</p>
              <p className="text-[10px] text-slate-400">PDF • BDPAC ভেরিফায়েড</p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500">
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-emerald-500" />
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">সাংগঠনিক আচরণবিধি ও শপথপত্র</p>
              <p className="text-[10px] text-slate-400">PDF • স্বাক্ষরিত</p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
