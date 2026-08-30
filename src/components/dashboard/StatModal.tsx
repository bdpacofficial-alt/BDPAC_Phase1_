'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { Users, Activity, UserPlus, Video, CheckSquare, Calendar } from 'lucide-react';

export function StatModal({ isOpen, onClose, statType }: { isOpen: boolean; onClose: () => void; statType: string | null }) {
  if (!statType) return null;

  const details: Record<string, any> = {
    members: { title: 'Total Members Breakdown', icon: Users, value: '125,840', list: ['Dhaka Division: 42,100', 'Chattogram Division: 28,400', 'Rajshahi Division: 18,200', 'Khulna Division: 14,500', 'Barishal Division: 8,300', 'Sylhet Division: 7,800', 'Rangpur Division: 4,140', 'Mymensingh Division: 2,400'] },
    online: { title: 'Online Active Members', icon: Activity, value: '5,684', list: ['Central Executive: 42 online', 'Division Steering: 310 online', 'District Leaders: 1,240 online', 'Grassroots Members: 4,092 online'] },
    registrations: { title: 'New Registrations Today', icon: UserPlus, value: '52', list: ['NID Verified: 52 (100%)', 'Biometric Face Matched: 52 (100%)', 'Pending Verification: 0'] },
    meetings: { title: 'Active Live Meetings', icon: Video, value: '18', list: ['Central Strategy Sync - Room 1', 'Dhaka Youth Conference - Room 4', 'Grassroots Organizing - Room 7', '15 Other Ward Level Syncs'] },
    tasks: { title: 'Pending Organizational Tasks', icon: CheckSquare, value: '12', list: ['Submit Ward Membership Audit Report', 'Review Draft Constitution Amendment', 'Approve Regional Youth Coordinators'] },
    events: { title: 'Upcoming Events', icon: Calendar, value: '8', list: ['Annual Steering Conference - Aug 15', 'Central Leadership Summit - Aug 22', 'Grassroots Orientation Week - Sep 01'] }
  };

  const curr = details[statType] || details.members;
  const Icon = curr.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={curr.title} maxWidth="md">
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
          <div className="p-3 rounded-xl bg-sky-600 text-white">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current Count</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{curr.value}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Detailed Categorization</h4>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {curr.list.map((item: string, idx: number) => (
              <li key={idx} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
