'use client';

import React, { useState } from 'react';
import { Building2, Plus, Users, Shield, MapPin, Layers, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { AdminRoute } from '@/components/admin/AdminRoute';

interface OrgUnit {
  id: string;
  nameEn: string;
  nameBn: string;
  level: string;
  location: string;
  memberCount: number;
  president: string;
  secretary: string;
}

export default function AdminOrganizationPage() {
  return (
    <AdminRoute>
      <AdminOrganizationPageContent />
    </AdminRoute>
  );
}

function AdminOrganizationPageContent() {
  const { addToast } = useToast();
  const [isAddUnitModal, setIsAddUnitModal] = useState(false);

  const [orgUnits, setOrgUnits] = useState<OrgUnit[]>([
    {
      id: 'org-01',
      nameEn: 'National Executive Council',
      nameBn: 'জাতীয় কেন্দ্রীয় কার্যনির্বাহী সংসদ',
      level: 'National (জাতীয়)',
      location: 'Central Headquarters, Dhaka',
      memberCount: 151,
      president: 'Dr. Kamal Hossain',
      secretary: 'Saiful Islam'
    },
    {
      id: 'org-02',
      nameEn: 'Dhaka Division Steering Committee',
      nameBn: 'ঢাকা বিভাগীয় পরিচালনা কমিটি',
      level: 'Division (বিভাগ)',
      location: 'Dhaka Division',
      memberCount: 71,
      president: 'Kazi Nazrul Ahmed',
      secretary: 'Monirul Haque'
    },
    {
      id: 'org-03',
      nameEn: 'Mymensingh Division Committee',
      nameBn: 'ময়মনসিংহ বিভাগীয় কমিটি',
      level: 'Division (বিভাগ)',
      location: 'Mymensingh Division',
      memberCount: 65,
      president: 'Md Hasan Mahmud',
      secretary: 'Abdur Rahman'
    },
    {
      id: 'org-04',
      nameEn: 'Netrokona District Committee',
      nameBn: 'নেত্রকোণা জেলা কমিটি',
      level: 'District (জেলা)',
      location: 'Netrokona District',
      memberCount: 45,
      president: 'Tariqul Islam',
      secretary: 'Farhana Sultana'
    },
    {
      id: 'org-05',
      nameEn: 'Muktagacha Upazila Committee',
      nameBn: 'মুক্তাগাছা উপজেলা কমিটি',
      level: 'Upazila (উপজেলা)',
      location: 'Muktagacha, Mymensingh',
      memberCount: 31,
      president: 'Shakil Ahmed',
      secretary: 'Kamrul Islam'
    }
  ]);

  const [newUnit, setNewUnit] = useState({
    nameEn: '',
    nameBn: '',
    level: 'District',
    location: '',
    president: '',
    secretary: ''
  });

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OrgUnit = {
      id: `org-${Date.now()}`,
      nameEn: newUnit.nameEn,
      nameBn: newUnit.nameBn,
      level: newUnit.level,
      location: newUnit.location || 'Dhaka',
      memberCount: 0,
      president: newUnit.president || 'Pending Assignment',
      secretary: newUnit.secretary || 'Pending Assignment'
    };

    setOrgUnits([...orgUnits, created]);
    setIsAddUnitModal(false);
    addToast({
      type: 'success',
      title: 'Committee Created',
      message: `${newUnit.nameBn} successfully registered in organization hierarchy.`
    });
    setNewUnit({ nameEn: '', nameBn: '', level: 'District', location: '', president: '', secretary: '' });
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold mb-2">
            <Building2 className="w-4 h-4 text-sky-400" /> সাংগঠনিক ইউনিট ও কমিটি পরিচালনা
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            সাংগঠনিক কাঠামো ও কমিটি প্রশাসন
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            কেন্দ্রীয়, বিভাগীয়, জেলা, উপজেলা এবং তৃণমূল ওয়ার্ড কমিটি গঠন ও সমন্বয় করুন।
          </p>
        </div>

        <button
          onClick={() => setIsAddUnitModal(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" /> নতুন কমিটি গঠন করুন
        </button>
      </div>

      {/* Grid of Organization Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orgUnits.map((unit) => (
          <Card key={unit.id} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  {unit.level}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{unit.nameBn}</h3>
                <p className="text-xs text-slate-400 font-medium">{unit.nameEn}</p>
              </div>

              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                <Building2 className="w-5 h-5 text-sky-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">সভাপতি (President)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{unit.president}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">সাধারণ সম্পাদক (Secretary)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{unit.secretary}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">এলাকা / এখতিয়ার</span>
                <span className="font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" /> {unit.location}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">সদস্য সংখ্যা</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {unit.memberCount} জন
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Committee Modal */}
      <Modal
        isOpen={isAddUnitModal}
        onClose={() => setIsAddUnitModal(false)}
        title="নতুন সাংগঠনিক কমিটি গঠন (Create Committee Unit)"
      >
        <form onSubmit={handleAddUnit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">কমিটির নাম (বাংলায়) *</label>
            <input
              type="text"
              required
              placeholder="উদাঃ মুক্তাগাছা উপজেলা নির্বাহী কমিটি"
              value={newUnit.nameBn}
              onChange={(e) => setNewUnit({ ...newUnit, nameBn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Committee Name (English) *</label>
            <input
              type="text"
              required
              placeholder="e.g. Muktagacha Upazila Executive Committee"
              value={newUnit.nameEn}
              onChange={(e) => setNewUnit({ ...newUnit, nameEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">কমিটির স্তর (Level)</label>
              <select
                value={newUnit.level}
                onChange={(e) => setNewUnit({ ...newUnit, level: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="Division">Division (বিভাগীয়)</option>
                <option value="District">District (জেলা)</option>
                <option value="Upazila">Upazila (উপজেলা/থানা)</option>
                <option value="Union">Union (ইউনিয়ন)</option>
                <option value="Ward">Ward (ওয়ার্ড)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">অবস্থান / এলাকা</label>
              <input
                type="text"
                placeholder="উদাঃ ময়মনসিংহ"
                value={newUnit.location}
                onChange={(e) => setNewUnit({ ...newUnit, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সভাপতি (President)</label>
              <input
                type="text"
                placeholder="সভাপতির নাম"
                value={newUnit.president}
                onChange={(e) => setNewUnit({ ...newUnit, president: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সাধারণ সম্পাদক</label>
              <input
                type="text"
                placeholder="সাধারণ সম্পাদকের নাম"
                value={newUnit.secretary}
                onChange={(e) => setNewUnit({ ...newUnit, secretary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddUnitModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white shadow"
            >
              কমিটি গঠন করুন
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
