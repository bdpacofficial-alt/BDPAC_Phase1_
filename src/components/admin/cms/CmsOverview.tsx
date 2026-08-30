'use client';

import React from 'react';
import { 
  Layers, 
  Sparkles, 
  FileText, 
  Sliders, 
  Image as ImageIcon, 
  Newspaper, 
  Menu as MenuIcon, 
  Flag, 
  Settings, 
  History, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface CmsOverviewProps {
  onNavigate: (tabId: string) => void;
  counts: {
    modules: number;
    features: number;
    pages: number;
    sections: number;
    banners: number;
    news: number;
    flags: number;
    media: number;
  };
  isConfigured: boolean;
}

export function CmsOverview({ onNavigate, counts, isConfigured }: CmsOverviewProps) {
  const cmsShortcuts = [
    { id: 'modules', title: 'মডিউল প্রশাসন (Modules)', desc: 'সিস্টেমের কোর ও কাস্টম মডিউল যুক্ত ও পরিচালনা', icon: Layers, count: counts.modules, color: 'text-sky-500 bg-sky-500/10' },
    { id: 'features', title: 'ফিচার কন্ট্রোল (Features)', desc: 'এআই, কল, চ্যাট, ইভেন্ট ও জরিপ ফিচার নিয়ন্ত্রণ', icon: Sparkles, count: counts.features, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'pages', title: 'ওয়েব পেজ তৈরি (Pages)', desc: 'ওয়ার্ডপ্রেস স্টাইল কাস্টম ও এসইও পেজ ব্যবস্থাপনা', icon: FileText, count: counts.pages, color: 'text-indigo-500 bg-indigo-500/10' },
    { id: 'sections', title: 'হোমপেজ সেকশন (Sections)', desc: 'ওয়েবসাইটের বিভিন্ন ব্লকের স্থান ও কন্টেন্ট সাজানো', icon: Sliders, count: counts.sections, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'banners', title: 'ব্যানার ও স্লাইডার (Banners)', desc: 'শীর্ষ ব্যানার, ক্যাম্পেইন ও বোতাম ইউআরএল পরিচালনা', icon: ImageIcon, count: counts.banners, color: 'text-rose-500 bg-rose-500/10' },
    { id: 'news', title: 'নিউজ ও সার্কুলার (News)', desc: 'দলীয় প্রেস রিলিজ, ঘোষণা ও প্রকাশনা', icon: Newspaper, count: counts.news, color: 'text-cyan-500 bg-cyan-500/10' },
    { id: 'navigation', title: 'মেনু ও নেভিগেশন (Menu)', desc: 'হেডার, সাইডবার ও ফুটার মেনুর আইটেম ও রোল সাজানো', icon: MenuIcon, count: 'Dynamic', color: 'text-purple-500 bg-purple-500/10' },
    { id: 'flags', title: 'ফিচার ফ্ল্যাগ (Feature Flags)', desc: 'তাত্ক্ষণিক ফিচার চালু বা বন্ধ করার সুইচ', icon: Flag, count: counts.flags, color: 'text-teal-500 bg-teal-500/10' },
    { id: 'media', title: 'মিডিয়া লাইব্রেরি (Media Library)', desc: 'ফটো, ব্যানার ও অ্যাসেট আপলোড ও ইউআরএল', icon: ImageIcon, count: counts.media, color: 'text-blue-500 bg-blue-500/10' },
    { id: 'settings', title: 'সিএমএস সেটিংস (Settings)', desc: 'সাইট পরিচিতি, ব্র্যান্ড কালার, সোশ্যাল ও সিকিউরিটি', icon: Settings, count: 'Global', color: 'text-slate-500 bg-slate-500/10' },
    { id: 'audit-logs', title: 'অডিট লগ ও নজরদারি (Audit Logs)', desc: 'সকল প্রশাসনিক পরিবর্তনের সম্পূর্ণ টাইমস্ট্যাম্প রেকর্ড', icon: History, count: 'Live', color: 'text-red-500 bg-red-500/10' }
  ];

  return (
    <div className="space-y-6">
      {/* Platform Status Alert */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 flex items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <span className="font-bold">WordPress-Style Extensible Engine Active:</span>{' '}
            <span className="text-slate-600 dark:text-slate-400">
              সোর্স কোড পরিবর্তন ছাড়াই সম্পূর্ণ প্ল্যাটফর্ম ডাটাবেজ দ্বারা চালিত ও সম্প্রসারণযোগ্য।
            </span>
          </div>
        </div>
        {isConfigured ? (
          <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] shrink-0">
            RLS Enforced
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-[10px] shrink-0">
            Dev Preview
          </span>
        )}
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cmsShortcuts.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {card.count}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-sky-500 transition">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                <span>পরিচালনা করুন</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
