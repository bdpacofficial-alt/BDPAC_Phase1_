'use client';

import React, { useState } from 'react';
import { Code, Play, Key, Webhook, Terminal } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { AdminRoute } from '@/components/admin/AdminRoute';

export default function DeveloperPage() {
  return (
    <AdminRoute allowedRoles={['super_admin']}>
      <DeveloperPageContent />
    </AdminRoute>
  );
}

function DeveloperPageContent() {
  const [response, setResponse] = useState('');
  const { addToast } = useToast();

  const handleTestApi = () => {
    setResponse(JSON.stringify({
      status: 200,
      message: "PPN Air-Gapped REST API Mock Response",
      data: {
        organization: "PPN Central Network",
        verifiedMembers: 125840,
        nodesOnline: 8
      }
    }, null, 2));
    addToast({ type: 'success', title: 'API Test 200 OK', message: 'Received simulated response.' });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Code className="w-6 h-6 text-sky-400" /> Enterprise Developer Center & API Hub
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Postman / Swagger inspired live API playground, SDK downloads, and webhook logs.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">API Playground</h3>
          <button onClick={handleTestApi} className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5" /> Execute GET /v1/members/stats
          </button>
        </div>

        {response && (
          <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
