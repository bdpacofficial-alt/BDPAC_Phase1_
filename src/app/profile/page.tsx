'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { ContactInfoCard } from '@/components/profile/ContactInfoCard';
import { OrganizationInfoCard } from '@/components/profile/OrganizationInfoCard';
import { MembershipStatusCard } from '@/components/profile/MembershipStatusCard';
import { VerificationCard } from '@/components/profile/VerificationCard';
import { DocumentsCard } from '@/components/profile/DocumentsCard';
import { SocialMediaCard } from '@/components/profile/SocialMediaCard';
import { DigitalIDCard } from '@/components/ui/DigitalIDCard';
import { DUMMY_MEMBERS } from '@/data/membersData';
import { Shield, LogIn } from 'lucide-react';

export default function ProfilePage() {
  const { user, refreshUser, isAuthenticated, isConfigured } = useAuth();

  // If user is null, fallback gracefully to preview mode or demo member
  const currentMember = user || DUMMY_MEMBERS[0];

  return (
    <div className="space-y-6 py-4">
      {!isAuthenticated && isConfigured && (
        <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-sky-500" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              আপনি বর্তমানে ডেমো মোডে প্রোফাইল দেখছেন। নিজস্ব অ্যাকাউন্টে লগইন করুন।
            </p>
          </div>
          <a
            href="/login"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
          >
            <LogIn className="w-3.5 h-3.5" /> লগইন
          </a>
        </div>
      )}

      {/* Profile Banner & Actions */}
      <ProfileHeader member={currentMember} onRefresh={refreshUser} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (ID Card & Status) */}
        <div className="space-y-6">
          <DigitalIDCard member={currentMember} />
          <MembershipStatusCard member={currentMember} />
          <SocialMediaCard member={currentMember} />
        </div>

        {/* Right 2 Columns (Details & Documents) */}
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard member={currentMember} />
          <OrganizationInfoCard member={currentMember} />
          <ContactInfoCard member={currentMember} />
          <VerificationCard member={currentMember} />
          <DocumentsCard member={currentMember} />
        </div>
      </div>
    </div>
  );
}
