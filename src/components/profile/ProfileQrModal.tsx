'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Member } from '@/data/membersData';
import { Download, ShieldCheck } from 'lucide-react';

interface ProfileQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}

export function ProfileQrModal({ isOpen, onClose, member }: ProfileQrModalProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(member.id)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ডিজিটাল মেম্বার QR কোড ও যাচাইকরণ">
      <div className="p-6 text-center space-y-4 text-xs">
        <div className="p-4 bg-white rounded-2xl inline-block border-4 border-sky-500/30 shadow-xl">
          <img src={qrUrl} alt={`QR for ${member.id}`} className="w-48 h-48 mx-auto" />
        </div>

        <div className="space-y-1">
          <p className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">{member.id}</p>
          <p className="font-bold text-slate-800 dark:text-slate-200">{member.name}</p>
          <p className="text-slate-400 text-[11px]">{member.partyPosition} • {member.district}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> BDPAC সিকিউর মেম্বার ডেটাবেজে এনক্রিপ্টেড কি দ্বারা ভেরিফায়েড
        </div>

        <div className="flex justify-center gap-2 pt-2">
          <a
            href={qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={`${member.id}-qr.png`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow"
          >
            <Download className="w-4 h-4" /> QR ইমেজ সংরক্ষণ
          </a>
        </div>
      </div>
    </Modal>
  );
}
