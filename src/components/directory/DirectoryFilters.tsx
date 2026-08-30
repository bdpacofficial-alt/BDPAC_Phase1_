'use client';

import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDivision: string;
  onDivisionChange: (div: string) => void;
  selectedStatus: string;
  onStatusChange: (st: string) => void;
  onReset: () => void;
}

export function DirectoryFilters({
  searchQuery,
  onSearchChange,
  selectedDivision,
  onDivisionChange,
  selectedStatus,
  onStatusChange,
  onReset
}: DirectoryFiltersProps) {
  const divisions = [
    'Dhaka Division',
    'Mymensingh Division',
    'Chattogram Division',
    'Rajshahi Division',
    'Khulna Division',
    'Barishal Division',
    'Sylhet Division',
    'Rangpur Division'
  ];

  return (
    <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow">
      <div className="flex flex-col md:flex-row items-center gap-3 text-xs">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="নাম, সদস্য আইডি, ফোন নম্বর বা জেলা দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        {/* Division Filter */}
        <div className="w-full sm:w-48">
          <select
            value={selectedDivision}
            onChange={(e) => onDivisionChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
          >
            <option value="">সকল বিভাগ (All Divisions)</option>
            {divisions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-40">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="approved">অনুমোদিত (Approved)</option>
            <option value="pending">অপেক্ষমান (Pending)</option>
          </select>
        </div>

        <button
          onClick={onReset}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="রিসেট ফিল্টার"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
