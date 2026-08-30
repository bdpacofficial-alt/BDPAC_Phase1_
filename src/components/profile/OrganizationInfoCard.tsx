import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { Building2, Award, Calendar, Layers } from 'lucide-react';

export function OrganizationInfoCard({ member }: { member: Member }) {
  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <Building2 className="w-4 h-4 text-indigo-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">সাংগঠনিক পদবী ও ইউনিট (Organization)</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px]">পদবী (Designation)</span>
          <span className="font-bold text-sky-600 dark:text-sky-400">{member.partyPosition || 'General Member'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">কমিটি / ইউনিট</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.committee || 'Grassroots Unit'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">সাংগঠনিক স্তর</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.partyLevel || 'Ward'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">যোগদানের তারিখ</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.joinedDate || '2024-01-01'}</span>
        </div>
      </div>
    </Card>
  );
}
