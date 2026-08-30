'use client';

import React from 'react';
import { Member } from '@/data/membersData';
import { ShieldCheck, Phone, Video, MessageSquare, Download, CheckSquare } from 'lucide-react';
import { useCall } from '@/context/CallContext';

interface MemberCardProps {
  member: Member;
  onViewProfile: (member: Member) => void;
  onContextMenu: (e: React.MouseEvent, member: Member) => void;
}

export function MemberCard({ member, onViewProfile, onContextMenu }: MemberCardProps) {
  const { startCall } = useCall();

  return (
    <div
      onContextMenu={(e) => onContextMenu(e, member)}
      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-sky-500/50 hover:shadow-xl transition flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <img
              src={member.photo}
              alt={member.name}
              className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                member.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{member.name}</h4>
              {member.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
            </div>
            <p className="text-xs font-semibold text-sky-500 truncate">{member.partyPosition}</p>
            <p className="text-[10px] text-slate-400 truncate">{member.district} • {member.thana}</p>
          </div>
        </div>

        <div className="text-[11px] space-y-1 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2 mb-3">
          <p className="truncate"><span className="text-slate-400">Mobile:</span> {member.mobile}</p>
          <p><span className="text-slate-400">Blood Group:</span> <strong className="text-red-500">{member.bloodGroup}</strong></p>
        </div>
      </div>

      <div className="flex gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onViewProfile(member)}
          className="flex-1 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold transition"
        >
          Profile
        </button>
        <button
          onClick={() => startCall(member.name, member.photo, member.partyPosition, 'voice')}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition"
          title="Voice Call"
        >
          <Phone className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => startCall(member.name, member.photo, member.partyPosition, 'video')}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition"
          title="Video Call"
        >
          <Video className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
