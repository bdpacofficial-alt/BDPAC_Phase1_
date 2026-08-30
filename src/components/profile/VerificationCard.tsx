import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { Shield, CheckCircle2, Clock, Smartphone, UserCheck, Laptop } from 'lucide-react';

export function VerificationCard({ member }: { member: Member }) {
  const verifications = [
    { name: 'NID ফরম্যাট যাচাই', status: member.nidVerified, icon: UserCheck, desc: 'জাতীয় পরিচয়পত্র ফরম্যাট চেক সম্পন্ন' },
    { name: 'মোবাইল নম্বর', status: Boolean(member.mobile), icon: Smartphone, desc: 'নিবন্ধিত ফোন নম্বর সংযুক্ত' },
    { name: 'প্রোফাইল ছবি', status: Boolean(member.photo), icon: Shield, desc: 'ডিজিটাল কার্ডের জন্য পোর্ট্রেট ছবি আপলোডকৃত' },
    { name: 'নিরাপদ ডিভাইস বাইন্ডিং', status: true, icon: Laptop, desc: 'বর্তমান ব্রাউজার মেটাডাটা সংযুক্ত' },
  ];

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <Shield className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">ভেরিফিকেশন চেকপয়েন্ট (Verification Milestones)</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {verifications.map((v, i) => {
          const Icon = v.icon;
          return (
            <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${v.status ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <span>{v.name}</span>
                  {v.status ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </div>
                <p className="text-[10px] text-slate-400">{v.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
