'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  CheckSquare, 
  Calendar, 
  Bell, 
  TrendingUp, 
  Award, 
  Activity, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  QrCode,
  UserCheck,
  Building2,
  FileText
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { fetchMemberStats } from '@/lib/supabase/members';
import { StatusBadge } from '@/components/admin/StatusBadges';
import { DUMMY_MEMBERS } from '@/data/membersData';

export default function DashboardPage() {
  const { user, isConfigured, primaryRole } = useAuth();
  const currentMember = user || DUMMY_MEMBERS[0];

  const [stats, setStats] = useState({
    totalMembers: 125840,
    approvedMembers: 124200,
    pendingMembers: 12,
    suspendedMembers: 1628,
    fromSupabase: false
  });

  useEffect(() => {
    fetchMemberStats().then(setStats);
  }, []);

  const isPending = !currentMember.isVerified;

  return (
    <div className="space-y-6 py-4">
      {/* Pending Approval Notice Banner */}
      {isPending && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>সদস্যপদ আবেদন পর্যালোচনামূলক (Application Pending Approval)</span>
                <StatusBadge status="pending" isVerified={false} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                আপনার মেম্বার আইডি: <strong className="font-mono text-sky-600 dark:text-sky-400">{currentMember.id}</strong>। কেন্দ্রীয় বা আঞ্চলিক অ্যাডমিন কর্তৃক যাচাই সম্পন্ন হলে আপনার ডিজিটাল আইডি কার্ডটি পূর্ণাঙ্গ সক্রিয় হবে।
              </p>
            </div>
          </div>

          <a
            href="/profile"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shrink-0 transition"
          >
            প্রোফাইল দেখুন
          </a>
        </div>
      )}

      {/* Main Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-sky-400" /> BDPAC সেন্ট্রাল কমান্ড ড্যাশবোর্ড
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            স্বাগতম, {currentMember.name}
          </h1>
          <p className="text-xs text-slate-300">
            দায়িত্ব: <strong>{currentMember.partyPosition}</strong> • এলাকা: {currentMember.thana}, {currentMember.district}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <a
            href="/directory"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition"
          >
            <Users className="w-4 h-4 text-sky-400" /> সদস্য ডিরেক্টরি
          </a>

          <a
            href="/profile"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition"
          >
            <QrCode className="w-4 h-4" /> ডিজিটাল আইডি কার্ড
          </a>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">মোট নিবন্ধিত সদস্য</span>
            <Users className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalMembers.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-500 font-semibold">{stats.fromSupabase ? 'Supabase Live Sync' : 'Platform Total'}</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">অনুমোদিত সদস্য</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-500">{stats.approvedMembers.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400">সক্রিয় ভোটার ও কর্মী</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">অপেক্ষমান আবেদন</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-500">{stats.pendingMembers.toLocaleString()}</p>
          <p className="text-[10px] text-amber-500 font-semibold">যাচাই প্রক্রিয়াধীন</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">সংগঠন ও কমিটি</span>
            <Building2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-500">8,420</p>
          <p className="text-[10px] text-slate-400">৮টি প্রশাসনিক বিভাগ</p>
        </Card>
      </div>

      {/* Dashboard Sub-Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity & Action Center */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-500" /> সাম্প্রতিক দলীয় ও সদস্য কার্যক্রম (Recent Timeline)
              </h3>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-3 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900 dark:text-white">সদস্য আবেদন ডাটাবেজে অন্তর্ভুক্ত</p>
                  <p className="text-[11px] text-slate-500">
                    {currentMember.name} এর সদস্য প্রোফাইল তৈরি হয়েছে ({currentMember.id})।
                  </p>
                  <p className="text-[10px] text-slate-400">আজকে</p>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900 dark:text-white">ময়মনসিংহ বিভাগীয় সমন্বয় সভা</p>
                  <p className="text-[11px] text-slate-500">নেত্রকোণা ও ময়মনসিংহ জেলার তৃণমূল সাংগঠনিক পর্যালোচনা।</p>
                  <p className="text-[10px] text-slate-400">গতকাল</p>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900 dark:text-white">কেন্দ্রীয় রাজনৈতিক বিশ্লেষণ সার্কুলার ০৩/২০২৬</p>
                  <p className="text-[11px] text-slate-500">আসন্ন জাতীয় ও স্থানীয় নির্বাচন পলিসি গাইডলাইন প্রকাশিত হয়েছে।</p>
                  <p className="text-[10px] text-slate-400">৩ দিন আগে</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Quick Links & Governance Links */}
        <div className="space-y-6">
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" /> প্রশাসনিক দ্রুত লিংক (Quick Navigation)
            </h3>

            <div className="space-y-2 text-xs">
              <a
                href="/admin/members"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold transition"
              >
                <span>সদস্য অনুমোদন প্যানেল</span>
                <ArrowRight className="w-4 h-4 text-sky-500" />
              </a>

              <a
                href="/admin/organization"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold transition"
              >
                <span>কমিটি ও ইউনিট প্রশাসন</span>
                <ArrowRight className="w-4 h-4 text-sky-500" />
              </a>

              <a
                href="/directory"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold transition"
              >
                <span>সারাদেশের সদস্য তালিকা</span>
                <ArrowRight className="w-4 h-4 text-sky-500" />
              </a>

              <a
                href="/profile"
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center justify-between text-slate-700 dark:text-slate-200 font-bold transition"
              >
                <span>আমার ব্যক্তিগত প্রোফাইল</span>
                <ArrowRight className="w-4 h-4 text-sky-500" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
