'use client';

import React from 'react';
import { Member } from '@/data/membersData';
import { ShieldCheck, Download, Printer } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function DigitalIDCard({ member }: { member: Member }) {
  const { addToast } = useToast();
  const fullyVerified = Boolean(member.nidVerified && member.faceMatched && member.isVerified);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast({
      type: 'success',
      title: 'Digital ID Slip Downloaded',
      message: `Downloaded official Digital ID Slip for ${member.name} (${member.id})`
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
      <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center font-black text-sky-400 text-sm">
              PPN
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">Political Private Network</h4>
              <p className="text-[10px] text-slate-400">BDPAC Digital Membership Credential</p>
            </div>
          </div>
          <ShieldCheck className={`w-6 h-6 ${fullyVerified ? 'text-emerald-400' : 'text-slate-500'}`} />
        </div>

        <div className="flex items-start gap-4 mb-4">
          <img
            src={member.photo}
            alt={member.name}
            className="w-20 h-24 object-cover rounded-xl border-2 border-sky-400/50 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${
              fullyVerified ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {fullyVerified ? 'VERIFIED MEMBER' : 'VERIFICATION PENDING'}
            </div>
            <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
            <p className="text-xs font-semibold text-sky-400 truncate">{member.partyPosition}</p>
            <p className="text-[11px] text-slate-300 mt-1">{member.partyLevel} Committee</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {member.id}</p>
          </div>
        </div>

        <div className="bg-slate-950/60 rounded-xl p-3 border border-white/5 flex items-center justify-between">
          <div className="text-[11px] space-y-0.5">
            <p><span className="text-slate-400">Division:</span> {member.division}</p>
            <p><span className="text-slate-400">District:</span> {member.district}</p>
            <p><span className="text-slate-400">Blood Group:</span> <span className="font-bold text-red-400">{member.bloodGroup}</span></p>
          </div>
          <img
            src={member.qrCode}
            alt="QR Code"
            className="w-16 h-16 rounded bg-white p-1"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition shadow"
        >
          <Download className="w-4 h-4" /> Download ID Slip
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
        >
          <Printer className="w-4 h-4" /> Print Card
        </button>
      </div>
    </div>
  );
}
