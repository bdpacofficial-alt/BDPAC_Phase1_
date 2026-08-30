'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  Layers, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Newspaper, 
  Menu as MenuIcon, 
  Flag, 
  Settings, 
  History, 
  RefreshCw, 
  Shield, 
  SlidersHorizontal,
  LayoutDashboard
} from 'lucide-react';
import { AdminRoute } from '@/components/admin/AdminRoute';
import { useCms } from '@/context/CmsContext';
import { useAuth } from '@/context/AuthContext';

import { CmsOverview } from '@/components/admin/cms/CmsOverview';
import { ModulesManager } from '@/components/admin/cms/ModulesManager';
import { FeaturesManager } from '@/components/admin/cms/FeaturesManager';
import { PagesManager } from '@/components/admin/cms/PagesManager';
import { SectionsManager } from '@/components/admin/cms/SectionsManager';
import { BannersManager } from '@/components/admin/cms/BannersManager';
import { NewsManager } from '@/components/admin/cms/NewsManager';
import { NavigationManager } from '@/components/admin/cms/NavigationManager';
import { FeatureFlagsManager } from '@/components/admin/cms/FeatureFlagsManager';
import { MediaLibrary } from '@/components/admin/cms/MediaLibrary';
import { SettingsManager } from '@/components/admin/cms/SettingsManager';
import { AuditLogsViewer } from '@/components/admin/cms/AuditLogsViewer';

export default function AdminCmsPage() {
  const { 
    modules, 
    features, 
    featureFlags, 
    sections, 
    banners, 
    menuItems, 
    settings, 
    pages,
    news,
    media,
    isLoading, 
    refreshCms 
  } = useCms();
  const { isConfigured, primaryRole } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const cmsNavTabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'modules', name: 'Modules', icon: Layers, count: modules.length },
    { id: 'features', name: 'Features', icon: Sparkles, count: features.length },
    { id: 'pages', name: 'Pages', icon: FileText, count: pages.length },
    { id: 'sections', name: 'Sections', icon: Sliders, count: sections.length },
    { id: 'banners', name: 'Banners', icon: ImageIcon, count: banners.length },
    { id: 'news', name: 'News & Notice', icon: Newspaper, count: news.length },
    { id: 'navigation', name: 'Navigation', icon: MenuIcon },
    { id: 'flags', name: 'Feature Flags', icon: Flag, count: featureFlags.length },
    { id: 'media', name: 'Media Library', icon: ImageIcon, count: media.length },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'audit-logs', name: 'Audit Logs', icon: History }
  ];

  return (
    <AdminRoute>
      <div className="space-y-6 py-4">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold mb-2">
              <SlidersHorizontal className="w-4 h-4 text-sky-400" /> BDPAC WordPress-Style Extensible CMS
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              সেন্ট্রাল অ্যাডমিন সিএমএস ও ফিচার কন্ট্রোল
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              সোর্স কোড পরিবর্তন ব্যতীত সম্পূর্ণ প্ল্যাটফর্মের ফিচার, পেজ, মডিউল ও কন্টেন্ট নিয়ন্ত্রণ করুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refreshCms()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition shadow"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> সিঙ্ক ডাটা
            </button>
          </div>
        </div>

        {/* Sub-Navigation Ribbon Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
          {cmsNavTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-sky-50/60 dark:bg-sky-950/20 shadow-xs'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.name}</span>
                {t.count !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Render */}
        {activeTab === 'overview' && (
          <CmsOverview
            onNavigate={setActiveTab}
            counts={{
              modules: modules.length,
              features: features.length,
              pages: pages.length,
              sections: sections.length,
              banners: banners.length,
              news: news.length,
              flags: featureFlags.length,
              media: media.length
            }}
            isConfigured={isConfigured}
          />
        )}

        {activeTab === 'modules' && (
          <ModulesManager modules={modules} onRefresh={refreshCms} />
        )}

        {activeTab === 'features' && (
          <FeaturesManager features={features} modules={modules} onRefresh={refreshCms} />
        )}

        {activeTab === 'pages' && (
          <PagesManager pages={pages} onRefresh={refreshCms} />
        )}

        {activeTab === 'sections' && (
          <SectionsManager sections={sections} onRefresh={refreshCms} />
        )}

        {activeTab === 'banners' && (
          <BannersManager banners={banners} onRefresh={refreshCms} />
        )}

        {activeTab === 'news' && (
          <NewsManager news={news} onRefresh={refreshCms} />
        )}

        {activeTab === 'navigation' && (
          <NavigationManager menuItems={menuItems} onRefresh={refreshCms} />
        )}

        {activeTab === 'flags' && (
          <FeatureFlagsManager flags={featureFlags} onRefresh={refreshCms} />
        )}

        {activeTab === 'media' && (
          <MediaLibrary media={media} onRefresh={refreshCms} />
        )}

        {activeTab === 'settings' && (
          <SettingsManager settings={settings} onRefresh={refreshCms} />
        )}

        {activeTab === 'audit-logs' && (
          <AuditLogsViewer />
        )}
      </div>
    </AdminRoute>
  );
}
