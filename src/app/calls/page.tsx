'use client';

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Video, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  PhoneOff, 
  Search, 
  UserCheck, 
  ShieldCheck, 
  Mic, 
  Volume2, 
  Clock, 
  Plus, 
  Users, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  Play
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useCall } from '@/context/CallContext';
import { useToast } from '@/context/ToastContext';

export default function CallsPage() {
  const { startCall } = useCall();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | 'voice' | 'video' | 'dialer'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialNumber, setDialNumber] = useState('');

  const contacts = [
    {
      id: '1',
      name: 'Obaidul Quader',
      position: 'General Secretary',
      organization: 'Central Committee',
      division: 'Dhaka',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      online: true,
      lastCall: 'Today, 02:30 PM',
      callType: 'outgoing',
      duration: '08:45',
      type: 'video'
    },
    {
      id: '2',
      name: 'Asaduzzaman Khan',
      position: 'Senior Member',
      organization: 'Central Working Committee',
      division: 'Dhaka',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      online: true,
      lastCall: 'Yesterday, 11:15 AM',
      callType: 'incoming',
      duration: '14:20',
      type: 'voice'
    },
    {
      id: '3',
      name: 'Dipu Moni',
      position: 'Joint General Secretary',
      organization: 'Central Committee',
      division: 'Chattogram',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      online: false,
      lastCall: '3 days ago',
      callType: 'missed',
      duration: '00:00',
      type: 'video'
    },
    {
      id: '4',
      name: 'Md. Abdur Rahman',
      position: 'Division Coordinator',
      organization: 'Dhaka Division Committee',
      division: 'Dhaka',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      online: true,
      lastCall: 'Yesterday, 04:10 PM',
      callType: 'incoming',
      duration: '05:12',
      type: 'voice'
    },
    {
      id: '5',
      name: 'Begum Matia Chowdhury',
      position: 'Presidium Member',
      organization: 'Central Presidium',
      division: 'Mymensingh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      online: false,
      lastCall: '1 week ago',
      callType: 'outgoing',
      duration: '19:40',
      type: 'voice'
    }
  ];

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.organization.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'voice') return c.type === 'voice';
    if (activeTab === 'video') return c.type === 'video';
    return true;
  });

  const handleDialNumber = (digit: string) => {
    setDialNumber(prev => prev + digit);
  };

  const handleDialCall = (type: 'voice' | 'video') => {
    if (!dialNumber) {
      addToast({
        type: 'warning',
        title: 'Enter Member ID/Phone',
        message: 'Please enter a valid Member ID or phone number to initiate encrypted call.'
      });
      return;
    }
    startCall(`Member (${dialNumber})`, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80', 'Grassroots Representative', type);
    addToast({
      type: 'info',
      title: 'Connecting Call...',
      message: `Establishing encrypted ${type} tunnel with ${dialNumber}`
    });
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Air-Gapped E2E Encrypted Voice & Video Bridge
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            যোগাযোগ ও কনফারেন্সিং সেন্টার
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Zero-leakage encrypted peer-to-peer audio/video calls for party central & district leaders.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => startCall('Emergency High Command', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'Presidium Emergency Channel', 'video')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xl transition flex items-center gap-2"
          >
            <Video className="w-4 h-4" /> Start Quick Video Call
          </button>
        </div>
      </div>

      {/* Main Grid: Call History & Dial Pad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Call Logs and Directory Calling */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            {/* Search & Tabs */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'all' ? 'bg-sky-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  সকল কল (All)
                </button>
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'voice' ? 'bg-sky-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  ভয়েস কল (Voice)
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'video' ? 'bg-sky-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  ভিডিও কল (Video)
                </button>
                <button
                  onClick={() => setActiveTab('dialer')}
                  className={`px-3 py-1.5 rounded-lg transition lg:hidden ${activeTab === 'dialer' ? 'bg-sky-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  ডায়ালপ্যাড
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="নেতা বা কমিটি সার্চ করুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Call List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={contact.avatar} alt={contact.name} className="w-11 h-11 rounded-full object-cover border border-slate-300 dark:border-slate-700" />
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{contact.name}</p>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                          {contact.division}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{contact.position} • {contact.organization}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        {contact.callType === 'incoming' && <PhoneIncoming className="w-3 h-3 text-emerald-500" />}
                        {contact.callType === 'outgoing' && <PhoneOutgoing className="w-3 h-3 text-sky-500" />}
                        {contact.callType === 'missed' && <PhoneMissed className="w-3 h-3 text-red-500" />}
                        <span>{contact.lastCall}</span>
                        <span>•</span>
                        <span>{contact.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        startCall(contact.name, contact.avatar, contact.position, 'voice');
                        addToast({ type: 'info', title: 'Connecting Voice...', message: `Calling ${contact.name}` });
                      }}
                      className="p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 transition"
                      title="Voice Call"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        startCall(contact.name, contact.avatar, contact.position, 'video');
                        addToast({ type: 'info', title: 'Connecting Video...', message: `Calling ${contact.name}` });
                      }}
                      className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition"
                      title="Video Call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 4 Cols: Keypad Dialer */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-sky-500" /> ডায়াল প্যাড (Keypad Dialer)
              </span>
              <span className="text-[10px] text-emerald-500 font-mono">E2E ENCRYPTED</span>
            </h3>

            {/* Display Box */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <input
                type="text"
                placeholder="সদস্য আইডি বা নম্বর লিখুন..."
                value={dialNumber}
                onChange={(e) => setDialNumber(e.target.value)}
                className="w-full text-center text-lg font-mono font-bold bg-transparent text-slate-900 dark:text-white outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">PPN-2026-XXXXX / Mobile</p>
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDialNumber(d)}
                  className="py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-200 transition active:scale-95"
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDialNumber('')}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Clear
              </button>
              <button
                onClick={() => handleDialCall('voice')}
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" /> Voice Call
              </button>
              <button
                onClick={() => handleDialCall('video')}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Video className="w-4 h-4" /> Video Call
              </button>
            </div>
          </Card>

          {/* Air-Gapped Security Meter */}
          <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Tunnel Security</span>
              <span>AES-256 GCM</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Direct peer-to-peer WebRTC mesh routing with air-gapped cryptographic relay protection.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
