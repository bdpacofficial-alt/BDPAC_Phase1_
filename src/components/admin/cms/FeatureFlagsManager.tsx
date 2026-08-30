'use client';

import React from 'react';
import { Flag, CheckCircle2, XCircle, ShieldCheck, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';
import { toggleCmsFeatureFlag } from '@/lib/supabase/cms/service';
import type { CmsFeatureFlag } from '@/lib/supabase/cms/types';

interface FeatureFlagsManagerProps {
  flags: CmsFeatureFlag[];
  onRefresh: () => void;
}

export function FeatureFlagsManager({ flags, onRefresh }: FeatureFlagsManagerProps) {
  const { addToast } = useToast();

  const handleToggle = async (flag: CmsFeatureFlag) => {
    const nextState = !flag.enabled;
    const res = await toggleCmsFeatureFlag(flag.key, nextState);
    if (res.success) {
      addToast({
        type: 'info',
        title: 'Feature Flag Updated',
        message: `${flag.name} is now ${nextState ? 'ENABLED' : 'DISABLED'}.`
      });
      onRefresh();
    } else {
      addToast({ type: 'error', title: 'Toggle Failed', message: res.error });
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Flag className="w-5 h-5 text-teal-500" /> ফিচার ফ্ল্যাগ ও সুইচার (Feature Flags Engine)
        </h2>
        <p className="text-[11px] text-slate-500">
          সোর্স কোড রি-ডিপ্লয় না করে ড্যাশবোর্ড থেকে তাৎক্ষণিকভাবে ফিচার অন/অফ নিয়ন্ত্রণ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
              flag.enabled
                ? 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-500/30'
                : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs">{flag.name}</h3>
                <span className="px-1.5 py-0.2 rounded font-mono text-[9px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {flag.key}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{flag.description}</p>
            </div>

            <button
              onClick={() => handleToggle(flag)}
              className={`p-2 rounded-xl transition cursor-pointer shrink-0 ${
                flag.enabled
                  ? 'text-teal-600 dark:text-teal-400 hover:bg-teal-500/10'
                  : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={flag.enabled ? 'Disable Flag' : 'Enable Flag'}
            >
              {flag.enabled ? (
                <ToggleRight className="w-8 h-8 text-teal-500" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
