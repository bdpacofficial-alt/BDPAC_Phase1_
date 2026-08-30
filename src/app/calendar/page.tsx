'use client';

import React from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Calendar className="w-6 h-6 text-sky-400" /> Enterprise Calendar & Scheduling Suite
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Google Calendar / Outlook inspired scheduling for meetings, rallies, and room bookings.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl text-center space-y-3">
        <Calendar className="w-12 h-12 text-sky-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">August 2026 Master Event Calendar</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">All meetings, tasks, rallies, e-learning classes, and elections synchronized across 8 Divisions.</p>
      </div>
    </div>
  );
}
