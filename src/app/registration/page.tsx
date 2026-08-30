'use client';

import React, { useState } from 'react';
import { Step1BasicInfo } from '@/components/registration/Step1BasicInfo';
import { Step2NidVerification } from '@/components/registration/Step2NidVerification';
import { Step3PartyInfo } from '@/components/registration/Step3PartyInfo';
import { Step4FaceVerification } from '@/components/registration/Step4FaceVerification';
import { Step5OtpVerification } from '@/components/registration/Step5OtpVerification';
import { Step6TrustedDevice } from '@/components/registration/Step6TrustedDevice';
import { Step7Complete } from '@/components/registration/Step7Complete';

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Abdur Rahman',
    fatherName: 'Late Md Karim Senior',
    motherName: 'Begum Fatema Sultana',
    dob: '1985-06-15',
    gender: 'Male',
    bloodGroup: 'O+',
    mobile: '+880 1711-223344',
    email: 'abdur.rahman@ppn-platform.gov.bd',
    address: 'House #12, Road #4, Kolatia, Keraniganj, Dhaka',
    nid: '19852694810284',
    nidVerified: false,
    division: 'Dhaka Division',
    district: 'Dhaka District',
    thana: 'Keraniganj',
    union: 'Kolatia Union',
    ward: 'Ward 01',
    partyPosition: 'Ward Secretary',
    faceMatched: false,
  });

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 7));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const steps = [
    'Basic Info', 'NID Verification', 'Party Info',
    'Face Scanner', 'OTP Verification', 'Trusted Device', 'Complete'
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Progress Bar */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Multi-Step Verification Wizard</span>
          <span className="text-sky-500">Step {currentStep} of 7 ({Math.round((currentStep / 7) * 100)}%)</span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-500"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        <div className="hidden sm:grid grid-cols-7 gap-1 text-[10px] text-center font-bold text-slate-400">
          {steps.map((st, idx) => (
            <span key={idx} className={idx + 1 <= currentStep ? 'text-sky-500' : ''}>
              {idx + 1}. {st}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        {currentStep === 1 && <Step1BasicInfo formData={formData} setFormData={setFormData} onNext={nextStep} />}
        {currentStep === 2 && <Step2NidVerification formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <Step3PartyInfo formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 4 && <Step4FaceVerification formData={formData} setFormData={setFormData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 5 && <Step5OtpVerification formData={formData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 6 && <Step6TrustedDevice onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 7 && <Step7Complete formData={formData} />}
      </div>
    </div>
  );
}
