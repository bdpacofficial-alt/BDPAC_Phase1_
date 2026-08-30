import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { Globe, MessageSquare } from 'lucide-react';

export function SocialMediaCard({ member }: { member: Member }) {
  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <Globe className="w-4 h-4 text-sky-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">সোশ্যাল মিডিয়া ও লিংক</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <a
          href="#"
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" /> Facebook Profile
        </a>

        <a
          href="#"
          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> WhatsApp
        </a>
      </div>
    </Card>
  );
}
