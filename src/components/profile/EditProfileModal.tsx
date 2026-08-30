'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Member } from '@/data/membersData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
  onSaveComplete?: () => void;
}

export function EditProfileModal({ isOpen, onClose, member, onSaveComplete }: EditProfileModalProps) {
  const { updateUserProfile } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(member.name || '');
  const [mobile, setMobile] = useState(member.mobile || '');
  const [address, setAddress] = useState(member.address || '');
  const [bio, setBio] = useState(member.bio || '');
  const [emergencyPhone, setEmergencyPhone] = useState(member.emergencyContact || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await updateUserProfile({
      full_name_en: name,
      phone: mobile,
      address,
      bio,
      emergency_contact_phone: emergencyPhone
    });

    setIsSaving(false);

    if (res.success) {
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your personal information has been saved successfully.'
      });
      if (onSaveComplete) onSaveComplete();
      onClose();
    } else {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: res.error || 'Failed to update profile.'
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ব্যক্তিগত তথ্য হালনাগাদ (Edit Profile)">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পূর্ণ নাম (Full Name)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">মোবাইল নম্বর</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">জরুরি যোগাযোগ নম্বর</label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ঠিকানা (Present Address)</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সংক্ষিপ্ত পরিচিতি (Bio)</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
          >
            বাতিল
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white shadow disabled:opacity-50"
          >
            {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
