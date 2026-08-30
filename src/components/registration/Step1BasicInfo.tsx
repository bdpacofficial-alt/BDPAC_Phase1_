'use client';

import React from 'react';

export function Step1BasicInfo({ formData, setFormData, onNext }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          ধাপ ১: প্রাথমিক ব্যক্তিগত তথ্য (Basic Information)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          আপনার জাতীয় পরিচয়পত্র অনুযায়ী সঠিক নাম ও যোগাযোগের তথ্য প্রদান করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পূর্ণ নাম (ইংরেজি) *</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName || ''}
            onChange={handleChange}
            placeholder="e.g. Abdur Rahman"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পূর্ণ নাম (বাংলায়)</label>
          <input
            type="text"
            name="fullNameBn"
            value={formData.fullNameBn || ''}
            onChange={handleChange}
            placeholder="উদাঃ আব্দুর রহমান"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পিতার নাম *</label>
          <input
            type="text"
            name="fatherName"
            required
            value={formData.fatherName || ''}
            onChange={handleChange}
            placeholder="পিতার নাম লিখুন"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">মাতার নাম *</label>
          <input
            type="text"
            name="motherName"
            required
            value={formData.motherName || ''}
            onChange={handleChange}
            placeholder="মাতার নাম লিখুন"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">জন্ম তারিখ *</label>
          <input
            type="date"
            name="dob"
            required
            value={formData.dob || '1995-01-01'}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">রক্তের গ্রুপ</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || 'O+'}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">লিঙ্গ *</label>
          <select
            name="gender"
            value={formData.gender || 'Male'}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          >
            <option value="Male">পুরুষ (Male)</option>
            <option value="Female">মহিলা (Female)</option>
            <option value="Other">অন্যান্য (Other)</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পেশা</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation || ''}
            onChange={handleChange}
            placeholder="e.g. Teacher, Engineer, Businessman"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">মোবাইল নম্বর *</label>
          <input
            type="tel"
            name="mobile"
            required
            value={formData.mobile || ''}
            onChange={handleChange}
            placeholder="+880 17XX-XXXXXX"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ইমেইল ঠিকানা (Login ID) *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="member@bdpac.org"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">অ্যাকাউন্ট পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            value={formData.password || ''}
            onChange={handleChange}
            placeholder="একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg transition"
        >
          পরবর্তী ধাপ: NID তথ্য →
        </button>
      </div>
    </form>
  );
}
