'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { Member } from '@/data/membersData';
import { DigitalIDCard } from '../ui/DigitalIDCard';
import { Phone, Video, MessageSquare, ShieldCheck, MapPin, Calendar, Briefcase } from 'lucide-react';
import { useCall } from '@/context/CallContext';

export function MemberProfileModal({ isOpen, onClose, member }: { isOpen: boolean; onClose: () => void; member: Member | null }) {
  const { startCall } = useCall();
  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Member Profile: ${member.name}`} maxWidth="2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-900 to-indigo-950 text-white shadow-xl">
          <img
            src={member.photo}
            alt={member.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
          />
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h3 className="text-xl font-bold truncate">{member.name}</h3>
              {member.isVerified && <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />}
            </div>
            <p className="text-xs text-sky-300 font-semibold">{member.partyPosition}</p>
            <p className="text-[11px] text-slate-300 mt-0.5">{member.committee}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Member ID: {member.id}</p>
          </div>

          <div className="flex sm:flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                startCall(member.name, member.photo, member.partyPosition, 'voice');
              }}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition flex items-center justify-center gap-1.5 text-xs font-bold"
            >
              <Phone className="w-4 h-4" /> <span className="hidden sm:inline">Voice Call</span>
            </button>
            <button
              onClick={() => {
                onClose();
                startCall(member.name, member.photo, member.partyPosition, 'video');
              }}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-1.5 text-xs font-bold"
            >
              <Video className="w-4 h-4" /> <span className="hidden sm:inline">Video Call</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider text-sky-500">Contact Details</h4>
            <p><span className="text-slate-400">Mobile:</span> {member.mobile}</p>
            <p><span className="text-slate-400">Email:</span> {member.email}</p>
            <p><span className="text-slate-400">Emergency Contact:</span> {member.emergencyContact}</p>
            <p><span className="text-slate-400">Present Address:</span> {member.address}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider text-sky-500">Hierarchy & Governance</h4>
            <p><span className="text-slate-400">Division:</span> {member.division}</p>
            <p><span className="text-slate-400">District:</span> {member.district}</p>
            <p><span className="text-slate-400">Thana / Union:</span> {member.thana} / {member.union}</p>
            <p><span className="text-slate-400">Ward:</span> {member.ward}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Official Digital Credentials</h4>
          <DigitalIDCard member={member} />
        </div>
      </div>
    </Modal>
  );
}
