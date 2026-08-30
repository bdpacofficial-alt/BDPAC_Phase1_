'use client';

import React from 'react';
import { Member } from '@/data/membersData';
import { User, Copy, Phone, MessageSquare, CheckSquare, Shield } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface ContextMenuProps {
  x: number;
  y: number;
  member: Member;
  onClose: () => void;
  onViewProfile: (m: Member) => void;
}

export function ContextMenu({ x, y, member, onClose, onViewProfile }: ContextMenuProps) {
  const { addToast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast({ type: 'info', title: 'Copied', message: `Copied ${label} to clipboard` });
    onClose();
  };

  return (
    <div
      style={{ top: y, left: x }}
      className="fixed z-50 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl py-1 text-xs text-slate-800 dark:text-slate-200 animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          onViewProfile(member);
          onClose();
        }}
        className="w-full text-left px-3 py-2 hover:bg-sky-500/10 hover:text-sky-500 flex items-center gap-2"
      >
        <User className="w-3.5 h-3.5" /> View Full Profile
      </button>
      <button
        onClick={() => handleCopy(member.id, 'Member ID')}
        className="w-full text-left px-3 py-2 hover:bg-sky-500/10 hover:text-sky-500 flex items-center gap-2"
      >
        <Copy className="w-3.5 h-3.5" /> Copy Member ID
      </button>
      <button
        onClick={() => handleCopy(member.mobile, 'Phone Number')}
        className="w-full text-left px-3 py-2 hover:bg-sky-500/10 hover:text-sky-500 flex items-center gap-2"
      >
        <Phone className="w-3.5 h-3.5" /> Copy Phone Number
      </button>
      <div className="border-t border-slate-200 dark:border-slate-800 my-1" />
      <button
        onClick={() => {
          addToast({ type: 'success', title: 'Task Assigned', message: `Task assigned to ${member.name}` });
          onClose();
        }}
        className="w-full text-left px-3 py-2 hover:bg-sky-500/10 hover:text-sky-500 flex items-center gap-2"
      >
        <CheckSquare className="w-3.5 h-3.5" /> Assign Task
      </button>
    </div>
  );
}
