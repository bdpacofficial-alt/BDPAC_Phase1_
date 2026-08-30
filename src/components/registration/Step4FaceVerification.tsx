'use client';

import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export function Step4FaceVerification({ formData, setFormData, onNext, onPrev }: any) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(formData.photo || null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      const mockPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
      setPhotoPreview(mockPhoto);
      setFormData({
        ...formData,
        photo: mockPhoto,
        faceMatched: false
      });
    }, 800);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="space-y-5 text-xs">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-sky-500" /> ধাপ ৪: ফেস ম্যাচিং ও ফটো ক্যাপচার (Biometric Face Verification)
        </h2>
        <p className="text-slate-500 mt-0.5">
          ডিজিটাল আইডি কার্ডের জন্য আপনার লাইভ ছবি আপলোড বা ক্যামেরা দিয়ে ক্যাপচার করুন।
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
        <div>
          <p className="font-bold">বায়োমেট্রিক এআই সার্ভিস স্ট্যাটাস (External AI Provider Status)</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
            প্রোডাকশন লাইভনেস ডিটেকশন ও এনআইডি ফেস ম্যাচিং এআই মডেল এপিআই ইন্টিগ্রেশন পেন্ডিং রয়েছে। আপনার প্রদত্ত প্রোফাইল ছবি ডাটাবেজে সংযুক্ত হবে এবং পরবর্তীতে এআই গেটওয়ে সক্রিয় হলে স্বয়ংক্রিয় লাইভনেস স্কোর গণনা হবে।
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-4">
        {photoPreview ? (
          <div className="text-center space-y-2">
            <img
              src={photoPreview}
              alt="Face preview"
              className="w-32 h-32 rounded-2xl object-cover mx-auto border-4 border-emerald-500 shadow-xl"
            />
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> ছবি সফলভাবে গ্রহণ করা হয়েছে
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto">
              <Camera className="w-10 h-10" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">লাইভ ফেস ক্যাপচার অথবা ছবি আপলোড করুন</p>
              <p className="text-[11px] text-slate-400">সরাসরি তাকান এবং পর্যাপ্ত আলো নিশ্চিত করুন</p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleCapture}
          disabled={isCapturing}
          className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {isCapturing ? 'ক্যাপচার হচ্ছে...' : photoPreview ? 'পুনরায় ছবি তুলুন' : 'ক্যামেরা দিয়ে ছবি তুলুন'}
        </button>
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
          onClick={handleContinue}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg transition"
        >
          পরবর্তী ধাপ: OTP ভেরিফিকেশন →
        </button>
      </div>
    </div>
  );
}
