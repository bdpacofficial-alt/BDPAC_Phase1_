'use client';

import React, { useState } from 'react';
import { DUMMY_EVENTS, EventItem } from '@/data/eventsData';
import { Modal } from '@/components/ui/Modal';
import { Calendar, MapPin, Users, QrCode, Plus, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(DUMMY_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showQrScan, setShowQrScan] = useState(false);
  const { addToast } = useToast();

  const handleRegister = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return { ...e, isRegistered: true, registeredCount: e.registeredCount + 1 };
      }
      return e;
    }));
    addToast({ type: 'success', title: 'Registration Approved', message: 'You have been successfully registered for this official event.' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Calendar className="w-6 h-6 text-sky-400" /> Enterprise Event Management System
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Conferences, political rallies, digital webinars, and QR code check-in attendance verification.
          </p>
        </div>

        <button
          onClick={() => setShowQrScan(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
        >
          <QrCode className="w-4 h-4" /> QR Check-in Attendance
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl hover:border-sky-500/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={event.banner} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-300 text-[10px] font-bold uppercase border border-sky-500/30">
                  {event.locationType}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-500" /> {event.startDate} • {event.startTime}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-sky-500" /> {event.registeredCount} / {event.maxParticipants} Attending</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{event.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{event.description}</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-sky-500 shrink-0" /> {event.venue}</p>
              </div>
            </div>

            <div className="p-5 pt-0 flex gap-3">
              <button
                onClick={() => setSelectedEvent(event)}
                className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                View Full Agenda
              </button>
              <button
                onClick={() => handleRegister(event.id)}
                disabled={event.isRegistered}
                className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-emerald-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                {event.isRegistered ? '✔ Registered Pass' : 'Register Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Check-in Modal */}
      <Modal isOpen={showQrScan} onClose={() => setShowQrScan(false)} title="QR Attendance Scanner" maxWidth="sm">
        <div className="text-center space-y-4 p-2 text-xs">
          <div className="w-40 h-40 mx-auto rounded-2xl border-4 border-emerald-500/50 p-2 bg-slate-950 flex items-center justify-center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PPN-ATTENDANCE-2026" alt="" className="w-full h-full bg-white p-1 rounded-xl" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white">Scan Member Digital ID Card for Live Attendance Check-in</p>
          <button
            onClick={() => {
              setShowQrScan(false);
              addToast({ type: 'success', title: 'Check-in Verified', message: '✔ Member Attendance recorded successfully.' });
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold"
          >
            Simulate Scan Success
          </button>
        </div>
      </Modal>
    </div>
  );
}
