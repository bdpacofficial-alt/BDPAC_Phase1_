import React from 'react';
import { MemberStatus } from '@/lib/supabase/types';
import { CheckCircle2, Clock, Ban, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status?: MemberStatus | string;
  isVerified?: boolean;
  className?: string;
}

export function StatusBadge({ status = 'pending', isVerified, className = '' }: StatusBadgeProps) {
  const normStatus = (status || (isVerified ? 'approved' : 'pending')).toLowerCase();

  switch (normStatus) {
    case 'approved':
    case 'active':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 ${className}`}>
          <CheckCircle2 className="w-3 h-3" /> অনুমোদিত (Active)
        </span>
      );
    case 'pending':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 ${className}`}>
          <Clock className="w-3 h-3 animate-pulse" /> অপেক্ষমান (Pending)
        </span>
      );
    case 'suspended':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 ${className}`}>
          <Ban className="w-3 h-3" /> স্থগিত (Suspended)
        </span>
      );
    case 'rejected':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 ${className}`}>
          <XCircle className="w-3 h-3" /> প্রত্যাখ্যাত (Rejected)
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/30 ${className}`}>
          {status}
        </span>
      );
  }
}
