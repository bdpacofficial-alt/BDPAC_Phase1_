'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Users,
  Bot,
  Sparkles,
  Video,
  PhoneCall,
  MessageSquare,
  Newspaper,
  FileText,
  CheckSquare,
  Calendar,
  Vote,
  GraduationCap,
  BarChart3,
  CreditCard,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Radio,
  Building2,
  UserCheck,
  Server,
  Database,
  Fingerprint,
  Activity,
  Clock,
  MapPin,
  Mail,
  Phone,
  Play,
  Send,
  Download,
  Apple,
  Award,
  Zap,
  Check,
  ChevronRight,
  ExternalLink,
  QrCode,
  Globe,
  SlidersHorizontal,
  HelpCircle,
  TrendingUp,
  KeyRound
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';

export default function HomePage() {
  const { addToast } = useToast();

  // Interactive UI Showcase Tab State
  const [activeUiTab, setActiveUiTab] = useState<'dashboard' | 'directory' | 'profile' | 'admin'>('dashboard');

  // Interactive AI Assistant Playground State
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(
    'Welcome to the BDPAC Enterprise AI Suite. Select a preset prompt or submit any governance, constitution, speech drafting, or circular formulation query to receive instant AI synthesis.'
  );
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiTone, setAiTone] = useState<'Formal' | 'Inspirational' | 'Campaign' | 'Administrative'>('Formal');

  // Interactive Mobile App Simulator Tab State
  const [activeMobileScreen, setActiveMobileScreen] = useState<'feed' | 'chat' | 'id' | 'meeting'>('feed');

  // Interactive Security Tab State
  const [activeSecurityPillar, setActiveSecurityPillar] = useState<number>(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    division: 'Dhaka Division',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Sample Prompts for AI Section
  const aiPrompts = [
    { title: 'Draft Welcome Address', prompt: 'Draft a 3-minute welcome address for the divisional executive meeting on grassroots empowerment.' },
    { title: 'Article 12 Constitution', prompt: 'Explain the voting procedure and quorum requirements under Article 12 of the Party Constitution.' },
    { title: 'Ward Directives Circular', prompt: 'Generate an urgent official circular instructing all Ward Committees to complete digital member verification.' },
    { title: 'Election Campaign Plan', prompt: 'Create a 5-step digital mobilization strategy for youth student wings across 64 districts.' },
  ];

  const handleRunAiPrompt = (promptText: string) => {
    setAiPromptInput(promptText);
    setIsAiGenerating(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsAiGenerating(false);
      setAiResponse(
        `[Generated Policy Directive • Tone: ${aiTone}]\n\n` +
        `1. Strategic Objective: Standardize party operations across all 8 Divisions.\n` +
        `2. Execution Protocol: Deploy verified cadre leaders to coordinate local townhalls with biometric NID validation.\n` +
        `3. Compliance Milestone: All executive resolutions must be submitted via the Document Vault by 18:00 BST.`
      );
      addToast({
        type: 'success',
        title: 'AI Directive Generated',
        message: `Speech & policy synthesis completed by BDPAC Neural Model (${aiTone} Mode)`
      });
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      addToast({
        type: 'error',
        title: 'Incomplete Submission',
        message: 'Please fill in your name, email, and inquiry message.'
      });
      return;
    }

    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactForm({ name: '', email: '', phone: '', division: 'Dhaka Division', message: '' });
      addToast({
        type: 'success',
        title: 'Inquiry Transmitted',
        message: 'Your dispatch has been forwarded to the Central Secretariat Desk.'
      });
    }, 1200);
  };

  // 13 Key Features Data
  const coreFeatures = [
    {
      title: '7-Step Secure Registration & NID Gate',
      desc: 'Automated verification pipeline combining National ID OCR parsing, live 3D face liveness, 60-second OTP tokens, and hardware fingerprinting.',
      href: '/registration',
      icon: UserCheck,
      badge: 'Identity Security',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Hierarchical Member Directory',
      desc: 'Tree-view exploration of the entire party architecture from Bangladesh down to Division, District, Thana, Union, and 50,000+ Ward cadres.',
      href: '/directory',
      icon: Users,
      badge: 'Organization Structure',
      color: 'from-sky-500/20 to-blue-500/10 text-sky-600 dark:text-sky-400'
    },
    {
      title: 'Official News Feed & Broadcast Stream',
      desc: 'Verified central directives, media gallery, video streams, and interactive reactions with granular regional targeting.',
      href: '/feed',
      icon: Newspaper,
      badge: 'Official Media',
      color: 'from-indigo-500/20 to-purple-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Encrypted Multi-Channel Messenger',
      desc: 'High-security 1-on-1 chats, secret committee groups, broadcast announcement channels, and voice note communication.',
      href: '/chat',
      icon: MessageSquare,
      badge: 'Confidential Comms',
      color: 'from-violet-500/20 to-fuchsia-500/10 text-violet-600 dark:text-violet-400'
    },
    {
      title: 'Voice & Video Calling Suite',
      desc: 'Peer-to-peer encrypted calls, floating mini-window controls, HD screen sharing, and automatic bandwidth adaptation.',
      href: '/calls',
      icon: PhoneCall,
      badge: 'VoIP Telephony',
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Online Conferences & Assemblies',
      desc: 'Virtual meeting rooms with waiting rooms, host permissions, participant hand-raising, and AI meeting minutes generator.',
      href: '/meetings',
      icon: Video,
      badge: 'Virtual Assemblies',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Enterprise AI Political Copilot',
      desc: 'Purpose-trained political intelligence for rapid speech drafting, constitution QA, policy analysis, and meeting synthesis.',
      href: '/ai',
      icon: Bot,
      badge: 'AI Intelligence',
      color: 'from-rose-500/20 to-pink-500/10 text-rose-600 dark:text-rose-400'
    },
    {
      title: 'Digital Member ID & Smart Wallet',
      desc: 'Tamper-proof digital identification pass featuring animated security watermarks, encrypted dynamic QR codes, and exportable PDF cards.',
      href: '/identity',
      icon: CreditCard,
      badge: 'Smart Credentials',
      color: 'from-emerald-500/20 to-green-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Task & Workflow Delegation',
      desc: 'Kanban boards, milestone checklists, and ward-level action assignments to coordinate election campaigns with full accountability.',
      href: '/tasks',
      icon: CheckSquare,
      badge: 'Grassroots Operations',
      color: 'from-cyan-500/20 to-teal-500/10 text-cyan-600 dark:text-cyan-400'
    },
    {
      title: 'Event Management & QR Check-in',
      desc: 'Comprehensive event planning, RSVP approvals, speaker agendas, and contactless QR attendance verification.',
      href: '/events',
      icon: Calendar,
      badge: 'Field Campaigns',
      color: 'from-sky-500/20 to-indigo-500/10 text-sky-600 dark:text-sky-400'
    },
    {
      title: 'Document Center & Digital Vault',
      desc: 'Central repository for party constitutions, gazette notifications, press releases, and training curriculum with role-based access.',
      href: '/documents',
      icon: FileText,
      badge: 'Knowledge Archive',
      color: 'from-indigo-500/20 to-blue-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Poll & Survey Intelligence',
      desc: 'Real-time anonymous member polling, grassroots sentiment analysis, and demographic breakdowns for data-backed decisions.',
      href: '/polls',
      icon: Vote,
      badge: 'Opinion Mining',
      color: 'from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Executive Reports & Analytics SOC',
      desc: 'Real-time leadership dashboards tracking divisional growth, meeting attendance rates, and operational security health.',
      href: '/reports',
      icon: BarChart3,
      badge: 'Decision Intelligence',
      color: 'from-purple-500/20 to-violet-500/10 text-purple-600 dark:text-purple-400'
    },
  ];

  // 9 Security Highlights Data
  const securityPillars = [
    {
      title: 'NID Document OCR Validation',
      desc: 'Optical parsing and verification of National Identification credentials against electoral registers before profile activation.',
      detail: 'Ensures strict single-identity compliance with automated duplicate detection across all 64 districts.',
      icon: UserCheck
    },
    {
      title: 'Biometric Face Liveness Matching',
      desc: '3D circular camera liveness analysis delivering 98%+ facial confidence verification without storing raw biometric video.',
      detail: 'Real-time anti-spoofing algorithms prevent photo, screen, or deepfake impersonations.',
      icon: Fingerprint
    },
    {
      title: 'Time-Sensitive Multi-Channel OTP',
      desc: '60-second hardware-bound tokens transmitted through dual SMS and email gateways for zero unauthorized takeovers.',
      detail: 'Includes rate limiting, brute-force mitigation, and dynamic token rotation.',
      icon: Clock
    },
    {
      title: 'Two-Factor Authentication (2FA)',
      desc: 'Standardized TOTP authenticator app and security key integration for all leadership and administrative tiers.',
      detail: 'Enforces mandatory 2FA for Central, Division, and District Committee administrators.',
      icon: KeyRound
    },
    {
      title: 'Role-Based Access Control (RBAC)',
      desc: 'Strict multi-tier permission matrix dividing General Members, Ward, Union, Thana, District, Division, and Central Admins.',
      detail: 'Air-gapped separation between public announcements and confidential executive councils.',
      icon: Shield
    },
    {
      title: 'Trusted Device Hardware Binding',
      desc: 'Cryptographic fingerprinting of operating system, browser, and device signatures with instant unknown login alerts.',
      detail: 'Allows users and admins to remotely terminate active sessions on unrecognized hardware.',
      icon: Smartphone
    },
    {
      title: 'Real-time Login History & Geolocation',
      desc: 'Detailed telemetry capturing timestamp, IP address masking, approximate division location, and session validity.',
      detail: 'Visual timeline with one-click revocation of suspicious or stale background connections.',
      icon: MapPin
    },
    {
      title: 'Immutable Audit Trail & SOC Operations',
      desc: 'Chronological tamper-proof ledger recording all administrative approvals, document downloads, and member transfers.',
      detail: 'Complete visibility for central security officers into all platform activities.',
      icon: Activity
    },
    {
      title: 'End-to-End Encryption & Sovereign Vault',
      desc: 'Military-grade AES-256 at-rest encryption and TLS 1.3 in-transit ciphering with isolated air-gapped node hosting.',
      detail: 'Zero third-party advertising trackers or external cloud telemetry scripts.',
      icon: Lock
    }
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: IN-PAGE QUICK NAVIGATION BAR & BRAND ANCHOR         */}
      {/* ------------------------------------------------------------- */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm text-xs font-semibold text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>BDPAC Platform Navigation</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#overview" className="hover:text-emerald-500 transition">Overview</a>
          <a href="#features" className="hover:text-emerald-500 transition">Features</a>
          <a href="#security" className="hover:text-emerald-500 transition">Security</a>
          <a href="#ai-suite" className="hover:text-emerald-500 transition">AI Assistant</a>
          <a href="#mobile-app" className="hover:text-emerald-500 transition">Mobile App</a>
          <a href="#ui-showcase" className="hover:text-emerald-500 transition">UI Showcase</a>
          <a href="#governance" className="hover:text-emerald-500 transition">Governance</a>
          <a href="#contact" className="hover:text-emerald-500 transition">Contact</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition font-bold text-slate-700 dark:text-slate-200"
          >
            Member Login
          </Link>
          <Link
            href="/registration"
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition font-bold shadow-sm"
          >
            Register Now
          </Link>
        </div>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: ENTERPRISE HERO BANNER                             */}
      {/* ------------------------------------------------------------- */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-950 p-6 sm:p-10 lg:p-14 text-white overflow-hidden border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> BDPAC Certified Sovereign Political Infrastructure
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              The Sovereign Digital Infrastructure for <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                Leadership & Grassroots Governance
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Connecting 8 Divisions, 64 Districts, 495 Upazilas, and 50,000+ Wards into an impenetrable, end-to-end encrypted ecosystem powered by biometric identity validation, real-time conference suites, and autonomous political AI intelligence.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/registration"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-xs sm:text-sm text-white shadow-xl shadow-emerald-900/40 transition flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started • 7-Step Verification <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="px-7 py-3.5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 font-bold text-xs sm:text-sm text-white transition flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-400" /> Member Login
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-3.5 rounded-2xl border border-sky-400/30 text-sky-300 hover:bg-sky-500/10 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" /> Live Demo
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> NID & Face Biometrics
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 256-bit HSM Encryption
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Air-Gapped High Availability
              </span>
            </div>
          </div>

          {/* Hero Right Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl p-5 bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-2xl space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    AL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">BDPAC Central Operations</p>
                    <p className="text-[10px] text-emerald-400 font-mono">● Encrypted Air-Gapped Cluster</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase tracking-wider">
                  Live v3.4
                </span>
              </div>

              {/* Quick Metrics Inside Hero Preview */}
              <div className="grid grid-cols-2 gap-2.5 text-center text-xs">
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                  <p className="text-slate-400 text-[10px]">Verified Cadres</p>
                  <p className="text-lg font-black text-white">125,840</p>
                  <span className="text-[9px] text-emerald-400 font-semibold">+52 Registered Today</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                  <p className="text-slate-400 text-[10px]">Active Nodes</p>
                  <p className="text-lg font-black text-emerald-400">5,684</p>
                  <span className="text-[9px] text-sky-400 font-semibold">Across 8 Divisions</span>
                </div>
              </div>

              {/* Mini Real-time Dispatch Ticker */}
              <div className="space-y-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Real-Time Network Feed</p>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2 text-[11px]">
                  <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold text-slate-200">Dhaka Central Secretariat:</span>
                    <p className="text-slate-400 text-[10px]">Executive circular issued regarding upcoming regional assemblies.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">Chattogram Division:</span>
                    <p className="text-slate-400 text-[10px]">Ward 02 digital biometric verification batch approved (100%).</p>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <Link
                href="/dashboard"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                Access Central Control Dashboard <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: PLATFORM OVERVIEW & VALUE PROPOSITION               */}
      {/* ------------------------------------------------------------- */}
      <section id="overview" className="space-y-8 text-center">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Architectural Pillar
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empowering Sovereign Democratic Coordination at Scale
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Designed from the ground up to solve the challenges of grassroots political cohesion, impenetrable digital secrecy, and instantaneous leadership dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {[
            {
              title: '8 Divisions • 50k+ Wards',
              subtitle: 'Comprehensive Hierarchy',
              desc: 'Seamless structural drill-down from the Central Executive Council to individual Ward units with precise role boundaries.',
              icon: Building2,
              stat: '100% Coverage'
            },
            {
              title: 'Zero-Trust Cadre ID',
              subtitle: 'Biometric Integrity',
              desc: 'Tri-factor authentication combining National ID cards, live face verification, and hardware device pairing.',
              icon: Fingerprint,
              stat: '98%+ Match Accuracy'
            },
            {
              title: 'Encrypted Telephony & Meet',
              subtitle: 'Sovereign Comms',
              desc: 'Secure voice calling, HD video conference rooms, and group messaging shielded from interception.',
              icon: Lock,
              stat: 'AES-256 HSM'
            },
            {
              title: 'Autonomous Political AI',
              subtitle: 'Strategic Copilot',
              desc: 'Specialized language model for rapid circular drafting, speech generation, and party constitution Q&A.',
              icon: Bot,
              stat: 'Instant Synthesis'
            },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {card.subtitle}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-200">
                  <span className="text-[10px] text-slate-400 font-normal">Benchmark:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{card.stat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: 13 KEY ENTERPRISE FEATURES                          */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            Comprehensive Capability Suite
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Thirteen Unified Core Governance Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every module is integrated into a unified state container without external database dependencies, providing immediate interactive responsiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreFeatures.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Link
                key={idx}
                href={f.href}
                className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500/50 hover:shadow-xl transition duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center group-hover:scale-110 transition duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-200" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: SECURITY HIGHLIGHTS & ZERO-TRUST PILLARS           */}
      {/* ------------------------------------------------------------- */}
      <section id="security" className="space-y-8 p-6 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-2.5 text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Shield className="w-4 h-4" /> Zero-Trust Defense Protocol
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Nine Pillars of Uncompromised Political Security
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            From biometric identity verification to hardware cryptographic isolation, the platform ensures total protection against surveillance, unauthorized infiltration, and data tampering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 relative z-10">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activeSecurityPillar === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveSecurityPillar(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition duration-200 text-left space-y-2.5 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{p.title}</h4>
                <p className="text-xs text-slate-400 leading-snug">{p.desc}</p>
                {isSelected && (
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300 font-mono">
                    ✔ {p.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 text-xs text-slate-400">
          <span>Compliance: Air-Gapped Sovereign Hosting • Zero Cloud Trace</span>
          <Link
            href="/security-soc"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition"
          >
            Access Real-Time Security Operations Center (SOC) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: ENTERPRISE AI ASSISTANT SHOWCASE                   */}
      {/* ------------------------------------------------------------- */}
      <section id="ai-suite" className="space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
            Political Intelligence Engine
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Political Assistant: Copilot for Leadership
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Trained specifically on governance workflows, party charters, and speech formulation. Test the live simulator below:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
          {/* Left Column: Sample Prompts & Tone Switcher */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-6 space-y-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Preset Governance Prompts
                </h3>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">1-Click Test</span>
              </div>

              <div className="space-y-2">
                {aiPrompts.map((ap, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRunAiPrompt(ap.prompt)}
                    className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 text-left transition duration-200 space-y-1 group"
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition">
                      {ap.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {ap.prompt}
                    </p>
                  </button>
                ))}
              </div>

              {/* Tone Selection */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Select Output Tone:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Formal', 'Inspirational', 'Campaign', 'Administrative'] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setAiTone(tone)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                        aiTone === tone
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive AI Terminal Window */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white shadow-2xl overflow-hidden flex flex-col h-[460px]">
              {/* Terminal Title Bar */}
              <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-300 font-bold ml-2">BDPAC Neural Copilot • Live Terminal</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                  AIR-GAPPED
                </span>
              </div>

              {/* Output Content Area */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs text-slate-300">
                {aiPromptInput && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-sky-300">
                    <span className="text-slate-400">$ User Directive: </span>
                    {aiPromptInput}
                  </div>
                )}

                {isAiGenerating ? (
                  <div className="flex items-center gap-2.5 text-amber-400 py-4">
                    <Bot className="w-5 h-5 animate-spin" />
                    <span>Synthesizing constitutional guidelines & speech tone ({aiTone})...</span>
                  </div>
                ) : (
                  aiResponse && (
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-200 whitespace-pre-line leading-relaxed">
                      {aiResponse}
                    </div>
                  )
                )}
              </div>

              {/* Terminal Bottom Input Box */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a political question or speech prompt..."
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunAiPrompt(aiPromptInput)}
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition"
                />
                <button
                  onClick={() => handleRunAiPrompt(aiPromptInput)}
                  disabled={isAiGenerating || !aiPromptInput.trim()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Generate
                </button>
                <Link
                  href="/ai"
                  className="px-3 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold transition"
                >
                  Full AI Suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7: MOBILE APPLICATION SUITE PREVIEW                   */}
      {/* ------------------------------------------------------------- */}
      <section id="mobile-app" className="space-y-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-950 text-white border border-sky-500/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold">
              <Smartphone className="w-4 h-4 text-sky-400" /> Native Mobile Client Suite
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Grassroots Command in Your Pocket: iOS & Android
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enable field cadres, Ward Secretaries, and central coordinators to access real-time circulars, encrypted VoIP calls, digital member passes, and urgent emergency alerts anywhere.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>Offline Protocol Sync for connectivity-constrained regions.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>Dynamic QR pass for fast contactless conference verification.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>One-touch encrypted emergency broadcast signal to central dispatch.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3.5 pt-3">
              <Link
                href="/mobile-app"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Mobile Clients
              </Link>
              <Link
                href="/mobile-app"
                className="px-6 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition flex items-center gap-2"
              >
                <Apple className="w-4 h-4" /> iOS & Android Hub
              </Link>
            </div>
          </div>

          {/* Right Mobile Mockup Container */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[320px] rounded-[44px] p-3.5 bg-slate-900 border-4 border-slate-700 shadow-2xl relative">
              {/* Dynamic Island */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-slate-950 rounded-full mr-2" />
                <div className="w-8 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Screen Body */}
              <div className="w-full h-[460px] rounded-[32px] bg-slate-950 text-white overflow-hidden flex flex-col border border-slate-800 text-left">
                {/* App Screen Header */}
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[10px]">AL</div>
                    <span className="font-bold">PPN Mobile App</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono">● SECURE</span>
                </div>

                {/* Simulated Content */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                  {activeMobileScreen === 'feed' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wide">🚨 Pinned Directive</span>
                        <p className="text-[11px] font-bold text-white">Divisional Assembly Scheduled for 3 PM</p>
                        <p className="text-[9px] text-slate-400">All Ward Presidents and Secretaries must attend.</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <span className="text-[9px] text-sky-400 font-bold">Dhaka Metropolitan South</span>
                        <p className="text-[10px] text-slate-300">Ward 01 membership database verification updated.</p>
                      </div>
                    </div>
                  )}

                  {activeMobileScreen === 'chat' && (
                    <div className="space-y-2">
                      <div className="p-2 rounded-xl bg-sky-950/60 border border-sky-800/60 text-[11px]">
                        <p className="font-bold text-sky-300">Central Executive Group</p>
                        <p className="text-[10px] text-slate-300">Agenda points distributed for tomorrow's rally.</p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                        <p className="font-bold text-slate-200">Division Coordination Desk</p>
                        <p className="text-[10px] text-slate-400">District reports received from 64 coordinators.</p>
                      </div>
                    </div>
                  )}

                  {activeMobileScreen === 'id' && (
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-500/40 text-center space-y-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 mx-auto flex items-center justify-center font-bold text-xs border border-emerald-400">
                        AH
                      </div>
                      <p className="text-xs font-bold text-white">MD Abir Hasan</p>
                      <p className="text-[9px] text-emerald-300">Executive Member • Central</p>
                      <div className="w-20 h-20 bg-white rounded-xl mx-auto p-1.5 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-slate-900" />
                      </div>
                      <p className="text-[8px] font-mono text-slate-400">ID: PPN-2026-88492</p>
                    </div>
                  )}

                  {activeMobileScreen === 'meeting' && (
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 py-6">
                      <Video className="w-8 h-8 text-sky-400 mx-auto animate-pulse" />
                      <p className="text-xs font-bold text-white">Virtual Assembly in Progress</p>
                      <p className="text-[10px] text-slate-400">48 Leaders currently connected</p>
                      <Link
                        href="/meetings"
                        className="inline-block px-4 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-[10px] shadow transition"
                      >
                        Join Video Meeting
                      </Link>
                    </div>
                  )}
                </div>

                {/* Bottom App Navigation Switcher */}
                <div className="p-2 bg-slate-900 border-t border-slate-800 grid grid-cols-4 gap-1 text-center text-[9px]">
                  <button
                    onClick={() => setActiveMobileScreen('feed')}
                    className={`p-1 rounded-lg transition ${activeMobileScreen === 'feed' ? 'bg-slate-800 text-sky-400 font-bold' : 'text-slate-400'}`}
                  >
                    Feed
                  </button>
                  <button
                    onClick={() => setActiveMobileScreen('chat')}
                    className={`p-1 rounded-lg transition ${activeMobileScreen === 'chat' ? 'bg-slate-800 text-sky-400 font-bold' : 'text-slate-400'}`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveMobileScreen('id')}
                    className={`p-1 rounded-lg transition ${activeMobileScreen === 'id' ? 'bg-slate-800 text-sky-400 font-bold' : 'text-slate-400'}`}
                  >
                    Smart ID
                  </button>
                  <button
                    onClick={() => setActiveMobileScreen('meeting')}
                    className={`p-1 rounded-lg transition ${activeMobileScreen === 'meeting' ? 'bg-slate-800 text-sky-400 font-bold' : 'text-slate-400'}`}
                  >
                    Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8: PLATFORM UI SCREENSHOTS & LIVE MOCKUP SHOWCASE     */}
      {/* ------------------------------------------------------------- */}
      <section id="ui-showcase" className="space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Interactive Interface Preview
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fidelity Showcase: Enterprise Political Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore the authentic high-fidelity user experience built across all governance workflows.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {[
            { id: 'dashboard', label: 'Member Dashboard', icon: BarChart3 },
            { id: 'directory', label: 'Organization Tree', icon: Building2 },
            { id: 'profile', label: 'Digital Profile & ID', icon: CreditCard },
            { id: 'admin', label: 'Admin Control Center', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeUiTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveUiTab(tab.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-lg'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Mockup Frame based on selected tab */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl text-left space-y-6">
          {activeUiTab === 'dashboard' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-950 text-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">Executive Governance Dashboard</h4>
                  <p className="text-xs text-slate-300">Welcome back, MD Abir Hasan (Central Executive Member)</p>
                </div>
                <Link href="/dashboard" className="px-3.5 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs">
                  Open Full Dashboard
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-400 font-semibold">Total Members</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">125,840</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-400 font-semibold">Online Nodes</p>
                  <p className="text-xl font-black text-emerald-500">5,684</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-400 font-semibold">Active Meetings</p>
                  <p className="text-xl font-black text-amber-500">18</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-400 font-semibold">Security Score</p>
                  <p className="text-xl font-black text-indigo-500">99.9%</p>
                </div>
              </div>
            </div>
          )}

          {activeUiTab === 'directory' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">Hierarchy Explorer (VS Code Style)</h4>
                  <p className="text-xs text-emerald-300">Bangladesh → 8 Divisions → 64 Districts → 495 Thanas → Wards</p>
                </div>
                <Link href="/directory" className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                  Explore Directory
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <p className="font-bold text-emerald-600 dark:text-emerald-400">▼ Bangladesh Central Committee (1,250,000+ Cadres)</p>
                <p className="pl-4 font-bold text-sky-500">▼ Dhaka Division (32 Districts)</p>
                <p className="pl-8 font-bold text-indigo-400">▼ Keraniganj Thana (12 Unions)</p>
                <p className="pl-12 text-slate-400">👤 Md Hasan (Ward 01 Secretary) • 🟢 Online</p>
                <p className="pl-12 text-slate-400">👤 Abdur Rahman (Ward 01 President) • 🟢 Online</p>
              </div>
            </div>
          )}

          {activeUiTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">Digital Member Smart ID Pass</h4>
                  <p className="text-xs text-indigo-300">Cryptographically verified identity with dynamic QR codes</p>
                </div>
                <Link href="/identity" className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs">
                  View ID Wallet
                </Link>
              </div>

              <div className="max-w-sm mx-auto p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-emerald-500/40 text-center space-y-2 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-600 mx-auto flex items-center justify-center font-bold text-xs border-2 border-emerald-400">
                  AH
                </div>
                <p className="text-sm font-bold">MD Abir Hasan</p>
                <p className="text-xs text-emerald-400">Central Committee Executive Member</p>
                <div className="w-24 h-24 bg-white rounded-xl mx-auto p-2 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-slate-950" />
                </div>
                <p className="text-[10px] font-mono text-slate-400">Member ID: PPN-2026-88492 (Preview)</p>
              </div>
            </div>
          )}

          {activeUiTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950 text-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">Admin Control Center & Verification Queue</h4>
                  <p className="text-xs text-amber-300">Pending approval workflows and multi-role administrative matrix</p>
                </div>
                <Link href="/admin" className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs">
                  Open Admin Center
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Tariqul Islam • Thana Secretary Applicant</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px]">NID & Face Verified</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Nazmul Hossain • Ward 04 Delegate</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">Approved & Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 9: LIVE GOVERNANCE METRICS & ANIMATED STATS CARDS     */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Registered Members', val: '125,840+', icon: Users, change: '+12.4% this month' },
          { label: 'Territory Coverage', val: '8 Divisions', icon: Building2, change: '64 Districts Active' },
          { label: 'Encrypted Meetings', val: '18,400+', icon: Video, change: 'Zero Downtime' },
          { label: 'AI Directives Prepared', val: '95,000+', icon: Bot, change: 'Instant Synthesis' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg text-center space-y-1.5 hover:scale-[1.02] transition duration-200"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-1">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{s.val}</p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{s.label}</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                {s.change}
              </span>
            </div>
          );
        })}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10: TESTIMONIALS / TRUST & GOVERNANCE FEEDBACK         */}
      {/* ------------------------------------------------------------- */}
      <section id="governance" className="space-y-8 text-center">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Representative Cadre Feedback
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Grassroots and Central Leadership
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            [Representative Demo Feedback • Simulating Field Deployments Across Bangladesh]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {[
            {
              role: 'Division Coordinator (Dhaka Division - Demo)',
              quote: 'The hierarchical organization explorer allows our central office to transmit circulars directly down to the grassroots within seconds with full read receipts and biometric verification.',
              avatar: 'DC'
            },
            {
              role: 'Ward Secretary (Chattogram North - Demo)',
              quote: 'Face verification and digital member passes have eliminated duplicate identities and revolutionized attendance at our weekly local ward committee meetings.',
              avatar: 'WS'
            },
            {
              role: 'Central Executive Member (IT & Media - Demo)',
              quote: 'The encrypted video conference suite and AI speech assistant have saved hundreds of leadership hours during critical election campaign planning sessions.',
              avatar: 'CE'
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-4 flex flex-col justify-between"
            >
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{t.role}</p>
                  <p className="text-[10px] text-emerald-500 font-semibold">Verified Cadre Representative</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 11: FINAL HIGH-IMPACT CALL TO ACTION (CTA)            */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-950 to-sky-950 p-8 sm:p-12 text-white border border-emerald-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            Ready to Connect Your Constituency?
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Join the Sovereign Digital Political Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Complete your 7-step identity registration in less than 3 minutes to access your official digital ID card, encrypted committee messenger, and conference rooms.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-3">
            <Link
              href="/registration"
              className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition flex items-center gap-2 hover:scale-105"
            >
              Begin 7-Step Registration <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Member Portal Login
            </Link>
            <Link
              href="/launch"
              className="px-6 py-3.5 rounded-2xl border border-sky-400/30 text-sky-300 hover:bg-sky-500/10 font-bold text-xs sm:text-sm transition"
            >
              Launch Platform Tour
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 12: CONTACT, SUPPORT & REGIONAL OFFICES               */}
      {/* ------------------------------------------------------------- */}
      <section id="contact" className="space-y-8 text-left">
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Secretariat & Technical Support
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact the Central Coordination Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have inquiries regarding division assignments, biometric verification, or platform access? Our dedicated support staff is on standby.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Office Information */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-6 space-y-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Central Secretariat Headquarters
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Central Operations Complex</p>
                    <p className="text-slate-500 dark:text-slate-400">23 Bangabandhu Avenue, Dhaka-1000, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Encrypted Voice Helpline</p>
                    <p className="text-slate-500 dark:text-slate-400">+880 2-9884920 (Hotline) • 24/7 Operations Desk</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Dispatch Electronic Mail</p>
                    <p className="text-slate-500 dark:text-slate-400">support@ppn-bd.org • secretariat@bdpac.gov.bd</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <p className="font-bold">Direct Support Channels:</p>
                <p className="text-[11px] mt-0.5">Access the integrated <Link href="/support" className="underline font-bold">Help Desk & Support Center</Link> for instant ticket tracking.</p>
              </div>
            </Card>
          </div>

          {/* Right 7 Cols: Interactive Dispatch / Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Transmit Official Inquiry or Feedback
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Shahidul Islam"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="cadre@ppn-bd.org"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="+880 1700-000000"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Division Jurisdiction</label>
                    <select
                      value={contactForm.division}
                      onChange={(e) => setContactForm({ ...contactForm, division: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"
                    >
                      {['Dhaka Division', 'Chattogram Division', 'Rajshahi Division', 'Khulna Division', 'Barishal Division', 'Sylhet Division', 'Rangpur Division', 'Mymensingh Division'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Inquiry Message / Feedback *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your organizational inquiry, technical support question, or constituency feedback..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isSubmittingContact ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" /> Encrypting & Transmitting Dispatch...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Official Dispatch
                    </>
                  )}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 13: COMPREHENSIVE ENTERPRISE FOOTER                   */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 text-left text-xs space-y-8 text-slate-500 dark:text-slate-400">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand & Charter */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center text-sm shadow-md">
                AL
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">BDPAC • Bangladesh Awami League</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Political Private Network (PPN)</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pr-6">
              National sovereign political network platform engineered to connect grassroots cadres with central leadership under military-grade encryption and autonomous intelligence.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span>Air-Gapped Node #DH-884</span>
              <span>•</span>
              <span className="text-emerald-500 font-bold">TLS 1.3 Active</span>
            </div>
          </div>

          {/* Col 2: Platform Portals */}
          <div className="space-y-2.5">
            <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Member Portals</p>
            <ul className="space-y-1.5">
              <li><Link href="/dashboard" className="hover:text-emerald-500 transition">Dashboard</Link></li>
              <li><Link href="/directory" className="hover:text-emerald-500 transition">Member Directory</Link></li>
              <li><Link href="/chat" className="hover:text-emerald-500 transition">Messenger Chat</Link></li>
              <li><Link href="/calls" className="hover:text-emerald-500 transition">Voice & Video Calls</Link></li>
              <li><Link href="/meetings" className="hover:text-emerald-500 transition">Conferences</Link></li>
              <li><Link href="/ai" className="hover:text-emerald-500 transition">AI Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3: Operations & Admin */}
          <div className="space-y-2.5">
            <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Administration</p>
            <ul className="space-y-1.5">
              <li><Link href="/admin" className="hover:text-emerald-500 transition">Admin Control</Link></li>
              <li><Link href="/super-admin" className="hover:text-emerald-500 transition">Super Admin</Link></li>
              <li><Link href="/verification" className="hover:text-emerald-500 transition">Verification Queue</Link></li>
              <li><Link href="/organization" className="hover:text-emerald-500 transition">Org Structure</Link></li>
              <li><Link href="/security-soc" className="hover:text-emerald-500 transition">Security SOC</Link></li>
              <li><Link href="/developer" className="hover:text-emerald-500 transition">Developer API</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div className="space-y-2.5">
            <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Governance</p>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-emerald-500 transition">About Platform</Link></li>
              <li><Link href="/features" className="hover:text-emerald-500 transition">Features Overview</Link></li>
              <li><Link href="/security" className="hover:text-emerald-500 transition">Security Charter</Link></li>
              <li><Link href="/mobile-app" className="hover:text-emerald-500 transition">Mobile App Hub</Link></li>
              <li><Link href="/support" className="hover:text-emerald-500 transition">Help & Support</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-500 transition">Contact Secretariat</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 Bangladesh Political Private Network Platform (BDPAC). All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/about" className="hover:text-emerald-500 transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/security" className="hover:text-emerald-500 transition">Data Protection</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-emerald-500 transition">Terms of Governance</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
