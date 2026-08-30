'use client';

import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  QrCode, 
  ShieldCheck, 
  WifiOff, 
  Fingerprint, 
  Radio, 
  CheckCircle2, 
  MessageSquare, 
  CreditCard, 
  Newspaper, 
  Lock,
  Apple
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';

export default function MobileAppPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'feed' | 'chat' | 'id' | 'sos'>('feed');

  const handleDownload = (platform: string) => {
    addToast({
      type: 'success',
      title: 'Download Initiated',
      message: `Downloading Political Private Network for ${platform} (v3.2.0 - Air-Gapped Release)`
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold">
            <Smartphone className="w-4 h-4 text-sky-400" /> Official Mobile Application • iOS & Android
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            নেতাকর্মীদের হাতের মুঠোয় <br />
            <span className="bg-gradient-to-r from-sky-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              নিরাপদ ডিজিটাল প্ল্যাটফর্ম
            </span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            End-to-End Encrypted Communication, Digital Member ID Wallet, Grassroots Committee Coordination, Instant Circulars & Emergency Broadcasts.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleDownload('Android APK')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xl transition flex items-center gap-2 hover:scale-105"
            >
              <Download className="w-4 h-4" /> Download Android APK (Direct)
            </button>
            <button
              onClick={() => handleDownload('iOS TestFlight')}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-2 hover:scale-105"
            >
              <Apple className="w-4 h-4" /> iOS App (TestFlight)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Simulator & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Interactive Phone Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[340px] rounded-[48px] p-4 bg-slate-900 border-4 border-slate-700 shadow-2xl relative">
            {/* Phone Speaker & Dynamic Island */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full mr-2" />
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Simulated Screen */}
            <div className="w-full h-[520px] rounded-[36px] bg-slate-950 text-white overflow-hidden flex flex-col border border-slate-800 relative">
              {/* Top Status Bar */}
              <div className="px-5 py-2 flex justify-between items-center text-[10px] text-slate-400 font-mono border-b border-slate-900">
                <span>09:41</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" /> VPN SECURE
                </span>
                <span>100% ⚡</span>
              </div>

              {/* In-App App Bar */}
              <div className="p-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                    AL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">PPN Mobile</p>
                    <p className="text-[9px] text-slate-400">Air-Gapped Node</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Dynamic Screen Content */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {activeTab === 'feed' && (
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold">
                        <Radio className="w-3 h-3 animate-pulse" /> জরুরি সাংগঠনিক বার্তা
                      </div>
                      <p className="text-[11px] font-bold text-white leading-snug">
                        দেশরত্ন শেখ হাসিনার ভার্চুয়াল অধিবেশন আজ বিকাল ৩টায়
                      </p>
                      <p className="text-[9px] text-slate-400">সকল বিভাগ ও জেলা কমিটির উপস্থিতি বাধ্যতামূলক।</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-sky-400">ঢাকা মহানগর দক্ষিণ</span>
                        <span className="text-slate-500 text-[8px]">১০ মি. আগে</span>
                      </div>
                      <p className="text-[10px] text-slate-300">
                        ওয়ার্ড ভিত্তিক নতুন সদস্য তালিকা হালনাগাদ সম্পন্ন হয়েছে।
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">গোপনীয় চ্যাট গ্রুপ</p>
                    <div className="p-2 rounded-xl bg-sky-950/40 border border-sky-800/40 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center font-bold text-[10px]">কে</div>
                      <div className="flex-1 truncate">
                        <p className="text-[11px] font-bold text-white">কেন্দ্রীয় নির্বাহী সংসদ</p>
                        <p className="text-[9px] text-emerald-400 truncate">✔ আজকের সভার আলোচ্যসূচি অনুমোদিত</p>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[10px]">ঢা</div>
                      <div className="flex-1 truncate">
                        <p className="text-[11px] font-bold text-white">ঢাকা বিভাগীয় সমন্বয়ক</p>
                        <p className="text-[9px] text-slate-400 truncate">রিপোর্ট আপলোড সম্পন্ন হয়েছে।</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'id' && (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-500/40 text-center space-y-1.5 shadow-lg">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 mx-auto flex items-center justify-center text-sm font-bold border-2 border-emerald-400">
                        AH
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">MD Abir Hasan</p>
                        <p className="text-[9px] text-emerald-300">Executive Member • Central</p>
                      </div>
                      <div className="w-24 h-24 bg-white rounded-xl mx-auto p-1.5 shadow-inner flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-slate-900" />
                      </div>
                      <p className="text-[8px] font-mono text-slate-400">ID: PPN-2026-88492</p>
                    </div>
                  </div>
                )}

                {activeTab === 'sos' && (
                  <div className="space-y-2.5 text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center mx-auto animate-pulse">
                      <Radio className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-red-400">Emergency Broadcast</h4>
                    <p className="text-[10px] text-slate-400 px-4">
                      Send high-priority encrypted push notification to your assigned division committee.
                    </p>
                    <button 
                      onClick={() => addToast({ type: 'warning', title: 'SOS Triggered', message: 'Encrypted emergency signal transmitted to Central Admin.' })}
                      className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] shadow-lg transition"
                    >
                      Broadcast Alert
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom In-App Nav */}
              <div className="p-2 bg-slate-900 border-t border-slate-800 grid grid-cols-4 gap-1 text-center text-[9px]">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`p-1.5 rounded-lg transition ${activeTab === 'feed' ? 'text-sky-400 font-bold bg-slate-800' : 'text-slate-400'}`}
                >
                  <Newspaper className="w-4 h-4 mx-auto mb-0.5" />
                  ফিড
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`p-1.5 rounded-lg transition ${activeTab === 'chat' ? 'text-sky-400 font-bold bg-slate-800' : 'text-slate-400'}`}
                >
                  <MessageSquare className="w-4 h-4 mx-auto mb-0.5" />
                  চ্যাট
                </button>
                <button
                  onClick={() => setActiveTab('id')}
                  className={`p-1.5 rounded-lg transition ${activeTab === 'id' ? 'text-sky-400 font-bold bg-slate-800' : 'text-slate-400'}`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-0.5" />
                  স্মার্ট আইডি
                </button>
                <button
                  onClick={() => setActiveTab('sos')}
                  className={`p-1.5 rounded-lg transition ${activeTab === 'sos' ? 'text-red-400 font-bold bg-slate-800' : 'text-slate-400'}`}
                >
                  <Radio className="w-4 h-4 mx-auto mb-0.5" />
                  জরুরি
                </button>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Interactive Mobile Simulator • Click tabs above to test app screens
          </p>
        </div>

        {/* Right 7 Cols: Features & QR Code Install */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-sky-500" /> Scan to Install on Device (PWA)
              </h2>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Instant Install
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 shrink-0">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  মোবাইল ক্যামেরা দিয়ে স্ক্যান করুন
                </p>
                <p>
                  ১. যেকোনো অ্যান্ড্রয়েড বা আইফোনের ক্যামেরা ওপেন করে QR কোডটি স্ক্যান করুন।
                </p>
                <p>
                  ২. ব্রাউজারে সাইটটি ওপেন হলে <strong>"Add to Home Screen"</strong> বাটনে চাপ দিন।
                </p>
                <p>
                  ৩. সাথে সাথে এটি আপনার ফোনে সম্পূর্ণ নেটিভ অ্যাপের মতো ইনস্টল হয়ে যাবে।
                </p>
              </div>
            </div>
          </Card>

          {/* Key Mobile Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 space-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Air-Gapped Encryption</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Every message, voice note, and document is end-to-end encrypted with zero third-party access.
              </p>
            </Card>

            <Card className="p-5 space-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Digital ID Wallet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Carry your verified party identity pass, dynamic QR codes, and meeting check-ins directly in the wallet.
              </p>
            </Card>

            <Card className="p-5 space-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Biometric & NID Gate</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Unlock the app with FaceID or Fingerprint authentication tied directly to verified NID credentials.
              </p>
            </Card>

            <Card className="p-5 space-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Offline Protocol Sync</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Access downloaded circulars, directory contacts, and guidelines even during network blackouts.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
