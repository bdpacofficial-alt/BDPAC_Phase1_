'use client';

import React, { useState, useEffect } from 'react';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { 
  fetchDivisions, 
  fetchDistricts, 
  fetchUpazilas, 
  fetchUnions, 
  fetchWards 
} from '@/lib/supabase/locations';
import { Building2, MapPin } from 'lucide-react';

export function Step3PartyInfo({ formData, setFormData, onNext, onPrev }: any) {
  const [divisions, setDivisions] = useState<{ value: string; label: string }[]>([]);
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);
  const [upazilas, setUpazilas] = useState<{ value: string; label: string }[]>([]);
  const [unions, setUnions] = useState<{ value: string; label: string }[]>([]);
  const [wards, setWards] = useState<{ value: string; label: string }[]>([]);

  const [selectedDivision, setSelectedDivision] = useState(formData.divisionId || 'div-mymensingh');
  const [selectedDistrict, setSelectedDistrict] = useState(formData.districtId || 'dist-mymensingh');
  const [selectedUpazila, setSelectedUpazila] = useState(formData.upazilaId || 'upz-muktagacha');
  const [selectedUnion, setSelectedUnion] = useState(formData.unionId || 'un-kashimpur');
  const [selectedWard, setSelectedWard] = useState(formData.wardId || 'ward-kas-01');
  const [address, setAddress] = useState(formData.address || '');
  const [partyPosition, setPartyPosition] = useState(formData.partyPosition || 'General Member');

  // Load Divisions
  useEffect(() => {
    fetchDivisions().then(divs => {
      setDivisions(divs.map(d => ({ value: d.id, label: `${d.nameBn} (${d.nameEn})` })));
    });
  }, []);

  // Load Districts when division changes
  useEffect(() => {
    if (selectedDivision) {
      fetchDistricts(selectedDivision).then(dists => {
        setDistricts(dists.map(d => ({ value: d.id, label: `${d.nameBn} (${d.nameEn})` })));
        if (dists.length > 0 && !dists.some(d => d.id === selectedDistrict)) {
          setSelectedDistrict(dists[0].id);
        }
      });
    }
  }, [selectedDivision]);

  // Load Upazilas when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetchUpazilas(selectedDistrict).then(upzs => {
        setUpazilas(upzs.map(u => ({ value: u.id, label: `${u.nameBn} (${u.nameEn})` })));
        if (upzs.length > 0 && !upzs.some(u => u.id === selectedUpazila)) {
          setSelectedUpazila(upzs[0].id);
        }
      });
    }
  }, [selectedDistrict]);

  // Load Unions when upazila changes
  useEffect(() => {
    if (selectedUpazila) {
      fetchUnions(selectedUpazila).then(uns => {
        setUnions(uns.map(u => ({ value: u.id, label: `${u.nameBn} (${u.nameEn})` })));
        if (uns.length > 0 && !uns.some(u => u.id === selectedUnion)) {
          setSelectedUnion(uns[0].id);
        }
      });
    }
  }, [selectedUpazila]);

  // Load Wards when union changes
  useEffect(() => {
    if (selectedUnion) {
      fetchWards(selectedUnion).then(wrds => {
        setWards(wrds.map(w => ({ value: w.id, label: `${w.nameBn} (${w.nameEn})` })));
        if (wrds.length > 0 && !wrds.some(w => w.id === selectedWard)) {
          setSelectedWard(wrds[0].id);
        }
      });
    }
  }, [selectedUnion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      divisionId: selectedDivision,
      districtId: selectedDistrict,
      upazilaId: selectedUpazila,
      unionId: selectedUnion,
      wardId: selectedWard,
      address,
      partyPosition
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-xs">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-sky-500" /> ধাপ ৩: ভৌগোলিক ও সাংগঠনিক কাঠামো (Geographic & Org Info)
        </h2>
        <p className="text-slate-500 mt-0.5">
          আপনার ভৌগোলিক এলাকা এবং রাজনৈতিক সাংগঠনিক দায়িত্ব নির্বাচন করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SearchableSelect
          label="বিভাগ (Division)"
          options={divisions}
          value={selectedDivision}
          onChange={setSelectedDivision}
          required
        />

        <SearchableSelect
          label="জেলা (District)"
          options={districts}
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          disabled={!selectedDivision}
          required
        />

        <SearchableSelect
          label="উপজেলা / থানা (Upazila)"
          options={upazilas}
          value={selectedUpazila}
          onChange={setSelectedUpazila}
          disabled={!selectedDistrict}
          required
        />

        <SearchableSelect
          label="ইউনিয়ন / পৌরসভা (Union)"
          options={unions}
          value={selectedUnion}
          onChange={setSelectedUnion}
          disabled={!selectedUpazila}
          required
        />

        <SearchableSelect
          label="ওয়ার্ড (Ward)"
          options={wards}
          value={selectedWard}
          onChange={setSelectedWard}
          disabled={!selectedUnion}
          required
        />

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            সাংগঠনিক পদবী / ভূমিকা (Party Designation) *
          </label>
          <select
            value={partyPosition}
            onChange={(e) => setPartyPosition(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          >
            <option value="General Member">সাধারণ সদস্য (General Member)</option>
            <option value="Ward Secretary">ওয়ার্ড সাধারণ সম্পাদক</option>
            <option value="Ward President">ওয়ার্ড সভাপতি</option>
            <option value="Union Joint Secretary">ইউনিয়ন যুগ্ম সম্পাদক</option>
            <option value="Union President">ইউনিয়ন সভাপতি</option>
            <option value="Thana Coordinator">থানা / উপজেলা সমন্বয়ক</option>
            <option value="District Executive Member">জেলা কার্যনির্বাহী সদস্য</option>
            <option value="District President">জেলা সভাপতি</option>
            <option value="Division Organizer">বিভাগীয় সংগঠক</option>
            <option value="Central Youth Leader">কেন্দ্রীয় যুব বিষয়ক সম্পাদক</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            বিস্তারিত ঠিকানা ও গ্রাম / এলাকা (Full Street Address)
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="বাড়ি নং, রোড, গ্রাম / মহল্লার নাম"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
        >
          ← পূর্ববর্তী
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg transition"
        >
          পরবর্তী ধাপ: বায়োমেট্রিক ও যাচাই →
        </button>
      </div>
    </form>
  );
}
