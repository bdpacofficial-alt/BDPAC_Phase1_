'use client';

import React from 'react';
import { X, CheckCircle, Bell, Calendar, MessageSquare, AlertTriangle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  if (!isOpen) return null;

  const notifs = [
    { id: '1', title: 'New Circular Posted', desc: 'Central Steering Committee issued Circular #2026-08', time: '10 mins ago', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
    { id: '2', title: 'Meeting Reminder', desc: 'Dhaka Division Strategy Sync in 15 minutes', time: '15 mins ago', icon: Calendar, color: 'text-sky-500 bg-sky-500/10' },
    { id: '3', title: 'New Message', desc: 'Abdur Rahman sent you a message in Chat', time: '1 hour ago', icon: MessageSquare, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
      <div className="w-full max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col p-4 animate-slideLeft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {notifs.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <div className={`p-2 rounded-lg ${n.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.desc}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-center"
        >
          Mark All as Read
        </button>
      </div>
    </div>
  );
}
