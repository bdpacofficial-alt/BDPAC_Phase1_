'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, Download, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { DigitalIDCard } from '../ui/DigitalIDCard';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { StatusBadge } from '@/components/admin/StatusBadges';

export function Step7Complete({ formData }: any) {
  const { register, isConfigured } = useAuth();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdMember, setCreatedMember] = useState<any>(null);

  const handleSubmitRegistration = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      email: formData.email,
      password: formData.password || 'Bdpac@2026',
      fullName: formData.fullName,
      fullNameBn: formData.fullNameBn,
      mobile: formData.mobile,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      occupation: formData.occupation,
      nidNumber: formData.nid,
      divisionId: formData.divisionId,
      districtId: formData.districtId,
      upazilaId: formData.upazilaId,
      unionId: formData.unionId,
      wardId: formData.wardId,
      address: formData.address,
      partyPosition: formData.partyPosition
    };

    const res = await register(payload);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      setCreatedMember(res.member || {
        id: 'BDPAC-2026-PENDING',
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        partyPosition: formData.partyPosition || 'Member',
        partyLevel: 'Ward',
        division: 'Dhaka Division',
        district: 'Dhaka District',
        thana: 'Keraniganj',
        union: 'Kolatia Union',
        ward: 'Ward 01',
        nid: formData.nid,
        bloodGroup: formData.bloodGroup || 'O+',
        gender: formData.gender || 'Male',
        joinedDate: new Date().toISOString().split('T')[0],
        isVerified: false
      });
      addToast({
        type: 'success',
        title: 'Application Submitted',
        message: 'Your registration application has been submitted and is pending admin approval.'
      });
    } else {
      setErrorMessage(res.error || 'Registration failed. Please check your inputs and Supabase configuration.');
      addToast({
        type: 'error',
        title: 'Submission Error',
        message: res.error || 'Failed to submit registration.'
      });
    }
  };

  useEffect(() => {
    handleSubmitRegistration();
  }, []);

  const memberForCard = createdMember || {
    id: 'BDPAC-2026-PENDING',
    name: formData.fullName || 'Abdur Rahman',
    fatherName: formData.fatherName || 'Late Md Karim Senior',
    motherName: formData.motherName || 'Begum Fatema Sultana',
    dob: formData.dob || '1985-06-15',
    gender: formData.gender || 'Male',
    bloodGroup: formData.bloodGroup || 'O+',
    mobile: formData.mobile || '+880 1700-000000',
    email: formData.email || 'member@bdpac.org',
    address: formData.address || 'Keraniganj, Dhaka',
    nid: formData.nid || '198500000000',
    nidVerified: false,
    faceMatched: false,
    partyPosition: formData.partyPosition || 'General Member',
    partyLevel: 'Ward' as const,
    division: 'Dhaka Division',
    district: 'Dhaka District',
    thana: 'Keraniganj',
    union: 'Kolatia Union',
    ward: 'Ward 01',
    photo: formData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BDPAC-PENDING`,
    isOnline: true,
    isVerified: false,
    joinedDate: new Date().toISOString().split('T')[0],
    emergencyContact: '+880 1800-000000',
    committee: 'Grassroots Committee',
    bio: 'Dedicated political and community worker for grassroots democracy and human rights.',
    recentActivities: []
  };

  return (
    <div className="space-y-6 text-center text-xs">
      {isSubmitting && (
        <div className="py-12 space-y-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            সুপাবেজ ডাটাবেজে আবেদন জমা হচ্ছে (Submitting to Supabase Auth & Database)...
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-left space-y-3">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
            <AlertCircle className="w-5 h-5" /> নিবন্ধন প্রক্রিয়া সম্পন্ন করা যায়নি (Registration Failed)
          </div>
          <p className="text-slate-700 dark:text-slate-300">{errorMessage}</p>
          <button
            onClick={handleSubmitRegistration}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs"
          >
            পুনরায় চেষ্টা করুন (Retry)
          </button>
        </div>
      )}

      {isSuccess && (
        <>
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              নিবন্ধন আবেদন সফলভাবে জমা হয়েছে!
            </h2>
            <div className="flex justify-center">
              <StatusBadge status="pending" isVerified={false} />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              আপনার সদস্যপদ আবেদনটি স্থানীয় / কেন্দ্রীয় প্রশাসনিক অনুমোদনের অপেক্ষায় রয়েছে। অনুমোদনের পর আপনার কার্ডটি সম্পূর্ণ সক্রিয় হবে।
            </p>
          </div>

          {/* Digital ID Card Preview */}
          <div className="py-4">
            <DigitalIDCard member={memberForCard} />
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Download className="w-4 h-4" /> ডাউনলোড আইডি কার্ড
            </button>

            <a
              href="/profile"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold shadow-lg transition"
            >
              প্রোফাইল দেখুন <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
