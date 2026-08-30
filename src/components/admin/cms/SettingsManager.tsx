'use client';

import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Palette, Phone, Globe, Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';
import { updateCmsSetting } from '@/lib/supabase/cms/service';
import type { CmsSetting } from '@/lib/supabase/cms/types';

interface SettingsManagerProps {
  settings: CmsSetting[];
  onRefresh: () => void;
}

export function SettingsManager({ settings, onRefresh }: SettingsManagerProps) {
  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState<'general' | 'branding' | 'contact' | 'security'>('general');
  const [isSaving, setIsSaving] = useState(false);

  // Fallback initial values
  const [siteNameEn, setSiteNameEn] = useState('Bangladesh Political Analysis Centre');
  const [siteNameBn, setSiteNameBn] = useState('বাংলাদেশ পলিটিক্যাল অ্যানালাইসিস সেন্টার');
  const [tagline, setTagline] = useState('Data-Driven Grassroots Political Research Platform');
  
  const [primaryColor, setPrimaryColor] = useState('#0284c7');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  const [accentColor, setAccentColor] = useState('#f59e0b');

  const [address, setAddress] = useState('Central Office, Gulshan-2, Dhaka, Bangladesh');
  const [email, setEmail] = useState('contact@bdpac.org');
  const [phone, setPhone] = useState('+880 2-9880000');

  const [requireApproval, setRequireApproval] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('120');

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateCmsSetting('site_identity', {
      name_en: siteNameEn,
      name_bn: siteNameBn,
      tagline,
      short_code: 'BDPAC'
    });
    setIsSaving(false);
    if (res.success) {
      addToast({ type: 'success', title: 'Settings Saved', message: 'Site identity updated.' });
      onRefresh();
    } else {
      addToast({ type: 'error', title: 'Error', message: res.error });
    }
  };

  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateCmsSetting('theme_colors', {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor
    });
    setIsSaving(false);
    if (res.success) {
      addToast({ type: 'success', title: 'Branding Saved', message: 'Theme color palette updated.' });
      onRefresh();
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateCmsSetting('headquarters', {
      address,
      email,
      phone
    });
    setIsSaving(false);
    if (res.success) {
      addToast({ type: 'success', title: 'Contact Saved', message: 'Headquarters contact info updated.' });
      onRefresh();
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateCmsSetting('governance_policies', {
      require_admin_approval: requireApproval,
      session_timeout_minutes: parseInt(sessionTimeout, 10) || 120
    });
    setIsSaving(false);
    if (res.success) {
      addToast({ type: 'success', title: 'Security Policy Saved', message: 'Governance threshold updated.' });
      onRefresh();
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-xs">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-500" /> সেন্ট্রাল সিএমএস ও সিস্টেম সেটিংস (CMS Settings)
        </h2>
        <p className="text-[11px] text-slate-500">সাইট পরিচিতি, ব্র্যান্ডিং, যোগাযোগ এবং সিকিউরিটি পলিসি কনফিগার করুন।</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveCategory('general')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeCategory === 'general'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" /> সাধারণ পরিচিতি (General)
        </button>

        <button
          onClick={() => setActiveCategory('branding')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeCategory === 'branding'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" /> ব্র্যান্ডিং কালার (Branding)
        </button>

        <button
          onClick={() => setActiveCategory('contact')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeCategory === 'contact'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4" /> যোগাযোগ ঠিকানা (Contact)
        </button>

        <button
          onClick={() => setActiveCategory('security')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeCategory === 'security'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" /> সিকিউরিটি পলিসি (Security)
        </button>
      </div>

      {/* General Settings */}
      {activeCategory === 'general' && (
        <form onSubmit={handleSaveGeneral} className="space-y-4 max-w-xl">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সাইটের নাম (বাংলা)</label>
            <input
              type="text"
              value={siteNameBn}
              onChange={(e) => setSiteNameBn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Site Title (English)</label>
            <input
              type="text"
              value={siteNameEn}
              onChange={(e) => setSiteNameEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ট্যাগলাইন (Platform Tagline)</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}
          </button>
        </form>
      )}

      {/* Branding Settings */}
      {activeCategory === 'branding' && (
        <form onSubmit={handleSaveBranding} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-slate-800 dark:text-slate-200">{primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-slate-800 dark:text-slate-200">{secondaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-slate-800 dark:text-slate-200">{accentColor}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'কালার স্কিম সংরক্ষণ'}
          </button>
        </form>
      )}

      {/* Contact Settings */}
      {activeCategory === 'contact' && (
        <form onSubmit={handleSaveContact} className="space-y-4 max-w-xl">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">কেন্দ্রীয় কার্যালয়ের ঠিকানা</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">অফিসিয়াল ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">যোগাযোগ ফোন নম্বর</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'যোগাযোগ তথ্য সংরক্ষণ'}
          </button>
        </form>
      )}

      {/* Security Governance Settings */}
      {activeCategory === 'security' && (
        <form onSubmit={handleSaveSecurity} className="space-y-4 max-w-xl">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
                className="rounded text-sky-600"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">অ্যাডমিন অনুমোদন বাধ্যতামূলক</span>
                <span className="text-[11px] text-slate-400">নতুন নিবন্ধিত সদস্যদের ডিজিটাল কার্ড অ্যাক্টিভেশনের পূর্বে অ্যাডমিন অনুমোদন লাগবে।</span>
              </div>
            </label>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">অ্যাক্টিভ সেশন টাইমআউট (মিনিট)</label>
            <input
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-32 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সিকিউরিটি পলিসি সংরক্ষণ'}
          </button>
        </form>
      )}
    </Card>
  );
}
