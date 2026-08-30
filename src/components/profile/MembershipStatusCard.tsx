import React from 'react';
import { Card } from '@/components/ui/Card';
import { Member } from '@/data/membersData';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadges';

export function MembershipStatusCard({ member }: { member: Member }) {
  const isApproved = member.isVerified;

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">সদস্যপদ স্ট্যাটাস (Membership Governance)</h3>
        </div>
        <StatusBadge status={isApproved ? 'approved' : 'pending'} isVerified={isApproved} />
      </div>

      <div className="text-xs space-y-3">
        {isApproved ? (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">অনুমোদিত ও সক্রিয় সদস্য (Active & Verified)</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                আপনার সদস্যপদ কেন্দ্রীয়/স্থানীয় কাউন্সিল কর্তৃক সম্পূর্ণ অনুমোদিত। ভোটাধিকার, ফোরাম এবং দলীয় কার্যক্রমে সক্রিয় অংশগ্রহণের সুযোগ রয়েছে।
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">আবেদন প্রক্রিয়াকরণাধীন (Pending Admin Verification)</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                আপনার সদস্যপদের আবেদনটি প্রশাসনিক পর্যালোচনার অধীনে রয়েছে। অ্যাডমিন অনুমোদনের পর আপনি সম্পূর্ণ অ্যাক্সেস পাবেন।
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
