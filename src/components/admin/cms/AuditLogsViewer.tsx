'use client';

import React, { useState, useEffect } from 'react';
import { History, Search, RefreshCw, ShieldCheck, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { fetchCmsAuditLogs } from '@/lib/supabase/cms/service';

export function AuditLogsViewer() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadLogs = async () => {
    setIsLoading(true);
    const data = await fetchCmsAuditLogs(100);
    setLogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter(l =>
    (l.action && l.action.toLowerCase().includes(search.toLowerCase())) ||
    (l.entity_type && l.entity_type.toLowerCase().includes(search.toLowerCase())) ||
    (l.entity_id && l.entity_id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-red-500" /> প্রশাসনিক অডিট লগ ও ইতিহাস (CMS Audit Trail)
          </h2>
          <p className="text-[11px] text-slate-500">সকল অ্যাডমিন অ্যাকশন, মডিউল/ফিচার পরিবর্তন এবং মেম্বার অনুমোদনের অডিট হিস্টোরি।</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="অ্যাকশন বা এনটিটি খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            onClick={loadLogs}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold transition"
            title="রিফ্রেশ লগ"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">অ্যাকশন (Action)</th>
              <th className="py-2.5 px-3">এনটিটি টাইপ</th>
              <th className="py-2.5 px-3">এনটিটি আইডি</th>
              <th className="py-2.5 px-3">বিবরণ / JSON Details</th>
              <th className="py-2.5 px-3">সময়কাল (Timestamp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  {isLoading ? 'লগ লোড হচ্ছে...' : 'কোনো প্রশাসনিক অডিট লগ পাওয়া যায়নি'}
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-mono font-bold text-sky-500 text-[11px]">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 capitalize font-semibold text-slate-700 dark:text-slate-300">
                    {log.entity_type}
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-slate-400">
                    {log.entity_id || '—'}
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {JSON.stringify(log.details || {})}
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[10px]">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
