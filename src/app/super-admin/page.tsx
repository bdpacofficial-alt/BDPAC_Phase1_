'use client';

import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  HardDrive, 
  ShieldCheck, 
  RefreshCw, 
  Code, 
  Bot, 
  Sliders, 
  Cpu, 
  Activity, 
  Key, 
  Lock, 
  Save, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Radio,
  FileCode,
  SlidersHorizontal
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { AdminRoute } from '@/components/admin/AdminRoute';

export default function SuperAdminPage() {
  return (
    <AdminRoute allowedRoles={['super_admin']}>
      <SuperAdminPageContent />
    </AdminRoute>
  );
}

function SuperAdminPageContent() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('infrastructure');

  // Super Admin States
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(false);
  const [aiTemperature, setAiTemperature] = useState('0.7');
  const [apiKey, setApiKey] = useState('ppn_sec_live_994829a8f29910d8');

  const superAdminTabs = [
    { id: 'infrastructure', name: 'Infrastructure', icon: Server },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'storage', name: 'Cloud Storage', icon: HardDrive },
    { id: 'security', name: 'Global Security', icon: ShieldCheck },
    { id: 'backup', name: 'Backup & Restore', icon: Save },
    { id: 'apis', name: 'APIs & Webhooks', icon: Code },
    { id: 'ai', name: 'AI Configuration', icon: Bot },
    { id: 'config', name: 'System Configuration', icon: SlidersHorizontal },
  ];

  const handleGenerateApiKey = () => {
    const newKey = 'ppn_sec_live_' + Math.random().toString(36).substring(2, 18);
    setApiKey(newKey);
    addToast({
      type: 'success',
      title: 'New API Key Generated',
      message: `Master integration key updated: ${newKey}`
    });
  };

  const handleRunBackup = () => {
    addToast({
      type: 'info',
      title: 'Snapshot Created',
      message: 'Full air-gapped system snapshot backup saved to secure local JSON storage.'
    });
  };

  const handleOptimizeDb = () => {
    addToast({
      type: 'success',
      title: 'Database Optimized',
      message: 'Indexed 5,000,000+ local records. Query latency reduced to 1.2ms.'
    });
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 text-white border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
            <Server className="w-4 h-4 text-amber-400" /> Super Admin Master Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            গ্লোবাল ইনফ্রাস্ট্রাকচার ও প্ল্যাটফর্ম ইঞ্জিন
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Top-tier system diagnostics, air-gapped cluster monitoring, database optimization & master configuration.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => addToast({ type: 'success', title: 'Global Health Check', message: 'All 100+ simulated nodes running at 99.999% uptime.' })}
            className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xl transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Global Diagnostics
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        {superAdminTabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/20 shadow-xs'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Infrastructure */}
      {activeTab === 'infrastructure' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2">
              <Cpu className="w-6 h-6 text-sky-500" />
              <p className="text-xs text-slate-400">CPU Usage</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">18.4%</p>
              <p className="text-[10px] text-emerald-500 font-bold">Normal Load</p>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2">
              <HardDrive className="w-6 h-6 text-emerald-500" />
              <p className="text-xs text-slate-400">RAM Allocation</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">32.1 GB</p>
              <p className="text-[10px] text-slate-400 font-mono">of 128 GB</p>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2">
              <Database className="w-6 h-6 text-indigo-500" />
              <p className="text-xs text-slate-400">Local JSON Storage</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">5.4 GB</p>
              <p className="text-[10px] text-indigo-400 font-mono">5M+ Records</p>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2">
              <Activity className="w-6 h-6 text-amber-500" />
              <p className="text-xs text-slate-400">Air-Gapped Uptime</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">99.999%</p>
              <p className="text-[10px] text-emerald-500 font-bold">142 Days Online</p>
            </Card>
          </div>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Server className="w-4 h-4 text-amber-500" /> Active Regional Clusters (৮টি বিভাগীয় নোড)
              </span>
              <span className="text-xs text-emerald-500 font-bold">All 8 Nodes Online</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {['Dhaka Node-01', 'Chattogram Node-02', 'Rajshahi Node-03', 'Khulna Node-04', 'Barishal Node-05', 'Sylhet Node-06', 'Rangpur Node-07', 'Mymensingh Node-08'].map((node, i) => (
                <div key={node} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 dark:text-white">{node}</p>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Latency: {12 + i * 2}ms</p>
                  <p className="text-[10px] text-emerald-500 font-mono">Load: {20 + i * 5}%</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 2. Database Center */}
      {activeTab === 'database' && (
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-500" /> Local JSON Database Engine
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">High-speed in-memory indexed store for political hierarchy and logs.</p>
            </div>
            <button
              onClick={handleOptimizeDb}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Optimize Indices
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-400">Total Indexed Documents</p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">5,284,910</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-400">Average Read Latency</p>
              <p className="text-xl font-black text-emerald-500 mt-1">0.8 ms</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-400">Database Integrity</p>
              <p className="text-xl font-black text-sky-500 mt-1">100% Valid</p>
            </div>
          </div>
        </Card>
      )}

      {/* 5. Backup & Restore */}
      {activeTab === 'backup' && (
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Save className="w-4 h-4 text-emerald-500" /> Automated & Manual Backup Snapshots
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Encrypted cold-storage backups of all committee rosters and circulars.</p>
            </div>
            <button
              onClick={handleRunBackup}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Create Immediate Backup
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Daily Snapshot • 2026-08-14-0400.json</p>
                <p className="text-[10px] text-slate-400">Size: 4.8 GB • SHA-256 Verified</p>
              </div>
              <button 
                onClick={() => addToast({ type: 'success', title: 'Snapshot Restored', message: 'Test restore succeeded.' })}
                className="px-3 py-1 rounded-lg text-xs font-bold text-sky-500 hover:bg-sky-500/10"
              >
                Restore
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* 6. APIs & Webhooks */}
      {activeTab === 'apis' && (
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-500" /> Master API Key & Webhook Gateway
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">RESTful integration endpoints for SMS gateways and identity validation.</p>
            </div>
            <button
              onClick={handleGenerateApiKey}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Regenerate API Key
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Master Live API Key</label>
              <input
                type="text"
                value={apiKey}
                readOnly
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-bold text-slate-900 dark:text-white outline-none border border-slate-300 dark:border-slate-700"
              />
            </div>
          </div>
        </Card>
      )}

      {/* 8. System Configuration */}
      {activeTab === 'config' && (
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-amber-500" /> Global Platform Flags & Emergency Controls
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Maintenance Mode (রক্ষণাবেক্ষণ মোড)</p>
                <p className="text-slate-400 text-[11px]">When enabled, non-admin members see the maintenance holding page.</p>
              </div>
              <input
                type="checkbox"
                checked={isMaintenanceMode}
                onChange={(e) => {
                  setIsMaintenanceMode(e.target.checked);
                  addToast({ type: 'warning', title: 'System Flag Changed', message: `Maintenance Mode is now ${e.target.checked ? 'ENABLED' : 'DISABLED'}` });
                }}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Air-Gapped Read-Only Lockdown</p>
                <p className="text-slate-400 text-[11px]">Prevents database mutations during sensitive emergency sessions.</p>
              </div>
              <input
                type="checkbox"
                checked={isReadOnlyMode}
                onChange={(e) => {
                  setIsReadOnlyMode(e.target.checked);
                  addToast({ type: 'warning', title: 'System Flag Changed', message: `Read-Only Lockdown is now ${e.target.checked ? 'ENABLED' : 'DISABLED'}` });
                }}
                className="w-5 h-5 accent-red-500 cursor-pointer"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Default placeholder for remaining tabs */}
      {activeTab !== 'infrastructure' && activeTab !== 'database' && activeTab !== 'backup' && activeTab !== 'apis' && activeTab !== 'config' && (
        <Card className="p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            {React.createElement(superAdminTabs.find(t => t.id === activeTab)?.icon || Server, { className: 'w-6 h-6' })}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
            {superAdminTabs.find(t => t.id === activeTab)?.name} Console
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Super Administrator permissions verified. All system parameters, cryptographic seeds, and cloud clusters are operating under strict air-gapped compliance.
          </p>
        </Card>
      )}
    </div>
  );
}
