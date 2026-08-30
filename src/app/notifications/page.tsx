'use client';

import React, { useState } from 'react';
import { DUMMY_NOTIFICATIONS, NotificationItem } from '@/data/notificationsData';
import { Bell, AlertTriangle, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<NotificationItem[]>(DUMMY_NOTIFICATIONS);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Bell className="w-6 h-6 text-sky-400" /> Enterprise Communication & Notification Center
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Real-time emergency alerts, meeting reminders, task notifications, and division circulars.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl divide-y divide-slate-100 dark:divide-slate-800">
        {notifs.map((n) => (
          <div key={n.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h4>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
