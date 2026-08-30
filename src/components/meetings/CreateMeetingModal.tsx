'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useToast } from '@/context/ToastContext';

export function CreateMeetingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('10:00');
  const { addToast } = useToast();

  const handleCreate = (e: any) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Meeting Scheduled',
      message: `Meeting "${title}" scheduled for ${date} at ${time}. Invitations dispatched.`
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create / Schedule New Meeting" maxWidth="md">
      <form onSubmit={handleCreate} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold mb-1">Meeting Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Grassroots Organizing Strategy"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1">Date *</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Time *</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border">Cancel</button>
          <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 text-white font-bold">Schedule Meeting</button>
        </div>
      </form>
    </Modal>
  );
}
