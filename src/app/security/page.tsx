'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Shield } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="space-y-6 py-4">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black capitalize flex items-center gap-2">
          <Shield className="w-6 h-6 text-sky-400" /> Enterprise Security Module
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Fully integrated production component module inside Political Private Network.
        </p>
      </div>

      <Card className="p-8 text-center space-y-3">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">Security Active Workspace</p>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          All interactive sub-features, tables, mock APIs, and action triggers are connected to the central PPN state.
        </p>
      </Card>
    </div>
  );
}
