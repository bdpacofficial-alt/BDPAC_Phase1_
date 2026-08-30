'use client';

import React, { useState } from 'react';
import { Laptop, Shield, CheckCircle2, Lock, AlertCircle } from 'lucide-react';

export function Step6TrustedDevice({ onNext, onPrev }: any) {
  const [deviceInfo] = useState({
    browser: 'Chrome / Edge / Firefox (Secure Client)',
    os: 'Linux / Windows / macOS',
    ip: '103.145.118.42 (Dhaka Gateway)',
    fingerprint: 'BDPAC-DEV-FP-98218-SEC'
  });

  return (
    <div className="space-y-5 text-xs">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-500" /> ধাপ ৬: নিরাপদ ডিভাইস নিবন্ধন (Trusted Device Binding)
        </h2>
        <p className="text-slate-500 mt-0.5">
          অননুমোদিত অ্যাক্সেস প্রতিরোধে বর্তমান ব্রাউজার ও ডিভাইস এনক্রিপশন ফিঙ্গারপ্রিন্ট রেজিস্টার করুন।
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
        <div>
          <p className="font-bold">ডিভাইস বাইন্ডিং সার্ভিস নোটিস (Device Binding Status)</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
            হার্ডওয়্যার সিকিউরিটি কী এবং ব্রাউজার ক্রিপ্টো কি-স্টোর লাইভ সার্ভিসে আবদ্ধ করার পূর্বে ব্রাউজারের স্ট্যান্ডার্ড মেটাডাটা সংরক্ষণ করা হচ্ছে।
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">বর্তমান ক্লায়েন্ট ডিভাইস</p>
            <p className="text-slate-400 text-[11px]">{deviceInfo.browser} on {deviceInfo.os}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px]">
          <div>
            <span className="text-slate-400">সিকিউরিটি কী:</span>{' '}
            <span className="font-mono text-emerald-500 font-bold">{deviceInfo.fingerprint}</span>
          </div>
          <div>
            <span className="text-slate-400">আইপি গেটওয়ে:</span>{' '}
            <span className="font-mono text-sky-500 font-bold">{deviceInfo.ip}</span>
          </div>
        </div>
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
          চূড়ান্ত ধাপ: নিবন্ধন সম্পন্ন করুন →
        </button>
      </div>
    </div>
  );
}
