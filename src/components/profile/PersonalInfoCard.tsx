import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { User, Calendar, Heart, Award } from 'lucide-react';

export function PersonalInfoCard({ member }: { member: Member }) {
  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <User className="w-4 h-4 text-sky-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">ব্যক্তিগত তথ্য (Personal Details)</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px]">পিতার নাম</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.fatherName || 'N/A'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">মাতার নাম</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.motherName || 'N/A'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">জন্ম তারিখ</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.dob || 'N/A'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">লিঙ্গ</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{member.gender || 'Male'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">রক্তের গ্রুপ</span>
          <span className="font-semibold text-red-500 font-bold">{member.bloodGroup || 'O+'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">জাতীয় পরিচয়পত্র (NID)</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{member.nid || 'N/A'}</span>
        </div>
      </div>
    </Card>
  );
}
