'use client';

import React from 'react';
import { Settings, Shield, Globe, Bell, Sliders } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function SettingsPage() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Settings className="w-6 h-6 text-sky-400" /> System Settings & Platform Configuration
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          M365 / AWS inspired platform configuration, auth policies, branding, and maintenance modes.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">General Configuration</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1">Platform Title</label>
            <input type="text" defaultValue="Political Private Network Platform (PPN)" className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border outline-none" />
          </div>
          <div>
            <label className="block font-bold mb-1">Default Timezone</label>
            <input type="text" defaultValue="Asia/Dhaka (GMT+6)" className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border outline-none" />
          </div>
        </div>

        <button
          onClick={() => addToast({ type: 'success', title: 'Settings Saved', message: 'Platform configuration updated.' })}
          className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
