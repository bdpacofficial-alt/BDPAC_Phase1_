'use client';

import React, { useState } from 'react';
import { Smartphone, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Step5OtpVerification({ formData, onNext, onPrev }: any) {
  const [otp, setOtp] = useState(['5', '2', '8', '9', '4', '1']);
  const [isVerified, setIsVerified] = useState(true);

  const handleOtpChange = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
  };

  return (
    <div className="space-y-5 text-xs">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-sky-500" /> ধাপ ৫: মোবাইল নম্বর ও ওটিপি যাচাই (SMS OTP Verification)
        </h2>
        <p className="text-slate-500 mt-0.5">
          আপনার প্রদত্ত নম্বর ({formData.mobile || '+880 17XX-XXXXXX'}) যাচাই করুন।
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
        <div>
          <p className="font-bold">এসএমএস গেটওয়ে সার্ভিস স্ট্যাটাস (SMS Gateway Notice)</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
            টেলকো এপিআই বা এসএমএস গেটওয়ে প্রোভাইডার (যেমন Twilio / Greenweb / Teletalk SMS Gateway) এখনো লাইভ ইন্টিগ্রেট হয়নি। প্রাথমিক টেস্টিং এবং ফর্ম ভ্যালিডেশনের পর আপনার নম্বরটি ডাটাবেজে সংরক্ষিত হবে।
          </p>
        </div>
      </div>

      <div className="text-center space-y-4 py-4">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          নিচের ফিল্ডে ওটিপি কোড নিশ্চিত করুন:
        </p>

        <div className="flex justify-center gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              className="w-10 h-12 text-center text-lg font-mono font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          ))}
        </div>

        {isVerified && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" /> মোবাইল নম্বর ভ্যালিডেশন সম্পন্ন
          </div>
        )}
      </div>

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
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg transition"
        >
          পরবর্তী ধাপ: ট্রাস্টেড ডিভাইস →
        </button>
      </div>
    </div>
  );
}
