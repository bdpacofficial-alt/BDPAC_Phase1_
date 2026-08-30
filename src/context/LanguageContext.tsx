'use client';

import React, { createContext, useContext, useState } from 'react';

export type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    'brand.name': 'বাংলাদেশ পলিটিক্যাল অ্যানালাইসিস সেন্টার',
    'brand.short': 'BDPAC',
    'nav.home': 'হোম',
    'nav.directory': 'সদস্য তালিকা',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.organization': 'সাংগঠনিক কাঠামো',
    'nav.profile': 'আমার প্রোফাইল',
    'nav.admin': 'অ্যাডমিন প্যানেল',
    'nav.admin_members': 'সদস্য অনুমোদন ও পরিচালনা',
    'nav.login': 'লগইন',
    'nav.register': 'সদস্যপদ নিবন্ধন',
    'nav.logout': 'লগআউট',
    'status.pending': 'অপেক্ষমান',
    'status.approved': 'অনুমোদিত',
    'status.suspended': 'স্থগিত',
    'status.rejected': 'প্রত্যাখ্যাত',
    'action.approve': 'অনুমোদন করুন',
    'action.reject': 'বাতিল করুন',
    'action.suspend': 'স্থগিত করুন',
    'action.activate': 'সক্রিয় করুন',
    'action.edit': 'সম্পাদনা',
    'action.save': 'সংরক্ষণ করুন',
    'action.cancel': 'বাতিল',
    'auth.login_title': 'BDPAC সদস্য লগইন',
    'auth.register_title': 'নতুন সদস্য নিবন্ধন আবেদন'
  },
  en: {
    'brand.name': 'Bangladesh Political Analysis Centre',
    'brand.short': 'BDPAC',
    'nav.home': 'Home',
    'nav.directory': 'Member Directory',
    'nav.dashboard': 'Dashboard',
    'nav.organization': 'Organization Structure',
    'nav.profile': 'My Profile',
    'nav.admin': 'Admin Panel',
    'nav.admin_members': 'Member Governance',
    'nav.login': 'Login',
    'nav.register': 'Member Registration',
    'nav.logout': 'Logout',
    'status.pending': 'Pending Approval',
    'status.approved': 'Approved & Active',
    'status.suspended': 'Suspended',
    'status.rejected': 'Rejected',
    'action.approve': 'Approve',
    'action.reject': 'Reject',
    'action.suspend': 'Suspend',
    'action.activate': 'Activate',
    'action.edit': 'Edit',
    'action.save': 'Save Changes',
    'action.cancel': 'Cancel',
    'auth.login_title': 'BDPAC Member Login',
    'auth.register_title': 'New Member Registration'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn');

  const t = (key: string, defaultText = ''): string => {
    return translations[language]?.[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
