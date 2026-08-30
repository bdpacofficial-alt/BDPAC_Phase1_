'use client';

import React, { useState } from 'react';
import { Member } from '@/data/membersData';
import { Shield, QrCode, Edit3, CheckCircle2, Clock, MapPin, Building } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadges';
import { ProfileQrModal } from './ProfileQrModal';
import { EditProfileModal } from './EditProfileModal';

interface ProfileHeaderProps {
  member: Member;
  onRefresh?: () => void;
}

export function ProfileHeader({ member, onRefresh }: ProfileHeaderProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={member.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-sky-500/40 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-slate-900 border border-slate-700">
                <Shield className="w-4 h-4 text-sky-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{member.name}</h1>
                <StatusBadge status={member.isVerified ? 'approved' : 'pending'} isVerified={member.isVerified} />
              </div>

              <p className="text-xs font-mono text-sky-300 font-bold tracking-wider">ID: {member.id}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-sky-400" /> {member.partyPosition}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {member.thana}, {member.district}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-sky-300 shadow transition"
            >
              <QrCode className="w-4 h-4" /> ডিজিটাল QR কোড
            </button>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition"
            >
              <Edit3 className="w-4 h-4" /> তথ্য পরিবর্তন
            </button>
          </div>
        </div>
      </div>

      <ProfileQrModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} member={member} />
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} member={member} onSaveComplete={onRefresh} />
    </>
  );
}
