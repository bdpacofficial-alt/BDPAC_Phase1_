import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { Phone, Mail, MapPin, AlertCircle } from 'lucide-react';

export function ContactInfoCard({ member }: { member: Member }) {
  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <Phone className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">যোগাযোগ ও ঠিকানা (Contact & Address)</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">মোবাইল নম্বর</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{member.mobile || 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">ইমেইল ঠিকানা</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{member.email || 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 block text-[10px]">বর্তমান ঠিকানা</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              {member.address || `${member.ward}, ${member.union}, ${member.thana}, ${member.district}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">জরুরি যোগাযোগ নম্বর</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">{member.emergencyContact || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
