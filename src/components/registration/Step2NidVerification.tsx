'use client';

import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

export function Step2NidVerification({ formData, setFormData, onNext, onPrev }: any) {
  const [nidNumber, setNidNumber] = useState(formData.nid || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedState, setVerifiedState] = useState<boolean | null>(formData.nidVerified || null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nidNumber || nidNumber.length < 10) {
      alert('সঠিক জাতীয় পরিচয়পত্র নম্বর দিন (১০, ১৩ বা ১৭ ডিজিট)');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedState(true);
      setFormData({
        ...formData,
        nid: nidNumber,
        nidVerified: false
      });
    }, 600);
  };

  const handleContinue = () => {
    setFormData({
      ...formData,
      nid: nidNumber,
      nidVerified: false
    });
    onNext();
  };

  return (
    <div className="space-y-5 text-xs">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-sky-500" /> ধাপ ২: জাতীয় পরিচয়পত্র ভেরিফিকেশন (NID Verification)
        </h2>
        <p className="text-slate-500 mt-0.5">
          আপনার স্মার্ট এনআইডি বা ডিজিটাল পরিচয়পত্র নম্বর যাচাই করুন।
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
        <div>
          <p className="font-bold">বহিঃস্থ এনআইডি গেটওয়ে সংযোগ (External Provider Notice)</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
            নির্বাচন কমিশন / পরিচয় এনআইডি যাচাইকরণ গেটওয়ে সার্ভিস এপিআই এখনো সংযুক্ত হয়নি। এই ধাপে আপনার এনআইডি নম্বরটি ডাটাবেজে সংরক্ষিত হবে এবং পরবর্তীতে সরকারি গেটওয়ে লাইভ হলে স্বয়ংক্রিয়ভাবে বায়োমেট্রিক ও ডাটা ম্যাচিং সম্পন্ন হবে।
          </p>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            জাতীয় পরিচয়পত্র নম্বর (NID Number) *
          </label>
          <input
            type="text"
            required
            value={nidNumber}
            onChange={(e) => {
              setNidNumber(e.target.value);
              setVerifiedState(null);
            }}
            placeholder="10, 13 বা 17 ডিজিটের এনআইডি নম্বর দিন"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500 font-mono text-sm"
          />
        </div>

        {verifiedState && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> NID ফরম্যাট ভ্যালিডেশন সফল
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              নাম: <strong>{formData.fullName || 'Abdur Rahman'}</strong> • জন্ম তারিখ: {formData.dob || '1990-01-01'}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onPrev}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
          >
            ← পূর্ববর্তী
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg transition"
          >
            পরবর্তী ধাপ: সাংগঠনিক তথ্য →
          </button>
        </div>
      </form>
    </div>
  );
}
