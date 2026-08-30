'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Info,
  HelpCircle,
  ShieldAlert,
  Smartphone,
  Phone,
  LayoutDashboard,
  Newspaper,
  Users,
  MessageSquare,
  PhoneCall,
  Video,
  Calendar,
  Bot,
  CheckSquare,
  FileText,
  Vote,
  GraduationCap,
  BarChart3,
  Bell,
  CreditCard,
  User,
  Shield,
  Building2,
  UserCheck,
  Radio,
  Settings,
  Server,
  Database,
  HardDrive,
  Save,
  Code,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Globe,
  UserCircle,
  Sliders,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Section Collapsible States
  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const [isMemberOpen, setIsMemberOpen] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState(true);
  const [isCommOpen, setIsCommOpen] = useState(true);

  // 1. PUBLIC WEBSITE
  const publicWebNav = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Features', href: '/features', icon: HelpCircle },
    { name: 'Security Center', href: '/security', icon: ShieldAlert },
    { name: 'Mobile App', href: '/mobile-app', icon: Smartphone, highlight: true },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  // 2. MEMBER PORTAL
  const memberPortalNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'News Feed', href: '/feed', icon: Newspaper },
    { name: 'Member Directory', href: '/directory', icon: Users },
    { 
      name: 'Communication', 
      isParent: true, 
      icon: MessageSquare,
      subItems: [
        { name: 'Chat Messenger', href: '/chat', icon: MessageSquare },
        { name: 'Voice Calls', href: '/calls', icon: PhoneCall },
        { name: 'Video Calls', href: '/calls', icon: Video },
      ]
    },
    { name: 'Meetings', href: '/meetings', icon: Video },
    { name: 'AI Assistant', href: '/ai', icon: Bot, highlight: true },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Polls', href: '/polls', icon: Vote },
    { name: 'Training', href: '/training', icon: GraduationCap },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Digital ID', href: '/identity', icon: CreditCard },
    { name: 'My Profile', href: '/profile', icon: User, highlight: true },
  ];

  // 3. ADMIN PANEL & CMS
  const adminPanelNav = [
    { name: 'Admin CMS Center', href: '/admin/cms', icon: Sliders, highlight: true },
    { name: 'Member Governance', href: '/admin/members', icon: UserCheck },
    { name: 'Committee Structure', href: '/admin/organization', icon: Building2 },
    { name: 'General Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Registration & Verification', href: '/verification', icon: Shield },
    { name: 'Meetings Admin', href: '/meetings', icon: Video },
    { name: 'Tasks Delegation', href: '/tasks', icon: CheckSquare },
    { name: 'Events Management', href: '/events', icon: Calendar },
    { name: 'Documents Approval', href: '/documents', icon: FileText },
    { name: 'Polls Control', href: '/polls', icon: Vote },
    { name: 'AI Management', href: '/ai', icon: Bot },
    { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
    { name: 'Security SOC', href: '/security-soc', icon: ShieldAlert },
    { name: 'Settings & Roles', href: '/settings', icon: Settings },
  ];

  // 4. SUPER ADMIN
  const superAdminNav = [
    { name: 'Infrastructure', href: '/super-admin', icon: Server },
    { name: 'Database Engine', href: '/super-admin', icon: Database },
    { name: 'Cloud Storage', href: '/super-admin', icon: HardDrive },
    { name: 'Global Security', href: '/super-admin', icon: ShieldAlert },
    { name: 'Backup & Restore', href: '/super-admin', icon: Save },
    { name: 'APIs & Webhooks', href: '/developer', icon: Code },
    { name: 'AI Model Config', href: '/super-admin', icon: Bot },
    { name: 'System Configuration', href: '/super-admin', icon: SlidersHorizontal },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={}
      >
        <div className="p-3 overflow-y-auto flex-1 space-y-4">
          
          {/* SECTION 1: PUBLIC WEBSITE */}
          <div>
            <button
              onClick={() => setIsPublicOpen(!isPublicOpen)}
              className="w-full px-2 py-1.5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-500" /> Public Website
              </span>
              {isPublicOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {isPublicOpen && (
              <nav className="mt-1 space-y-0.5">
                {publicWebNav.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name + item.href}
                      href={item.href}
                      onClick={onClose}
                      className={}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* SECTION 2: MEMBER PORTAL */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
            <button
              onClick={() => setIsMemberOpen(!isMemberOpen)}
              className="w-full px-2 py-1.5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition"
            >
              <span className="flex items-center gap-1.5">
                <UserCircle className="w-3.5 h-3.5 text-emerald-500" /> Member Portal
              </span>
              {isMemberOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {isMemberOpen && (
              <nav className="mt-1 space-y-0.5">
                {memberPortalNav.map((item) => {
                  if (item.isParent && item.subItems) {
                    return (
                      <div key={item.name} className="space-y-0.5">
                        <button
                          onClick={() => setIsCommOpen(!isCommOpen)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <span className="flex items-center gap-2.5">
                            <item.icon className="w-3.5 h-3.5 shrink-0 text-sky-500" />
                            <span>{item.name}</span>
                          </span>
                          {isCommOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </button>

                        {isCommOpen && (
                          <div className="pl-6 space-y-0.5 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
                            {item.subItems.map((sub) => {
                              const isActive = pathname === sub.href;
                              const SubIcon = sub.icon;
                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={onClose}
                                  className={}
                                >
                                  <SubIcon className="w-3 h-3" />
                                  <span>{sub.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name + item.href}
                      href={item.href}
                      onClick={onClose}
                      className={}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* SECTION 3: ADMIN PANEL & CMS */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="w-full px-2 py-1.5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 hover:text-sky-500 transition"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sky-500" /> Admin Governance
              </span>
              {isAdminOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {isAdminOpen && (
              <nav className="mt-1 space-y-0.5">
                {adminPanelNav.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name + item.href}
                      href={item.href}
                      onClick={onClose}
                      className={}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* SECTION 4: SUPER ADMIN */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
            <button
              onClick={() => setIsSuperAdminOpen(!isSuperAdminOpen)}
              className="w-full px-2 py-1.5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:text-amber-500 transition"
            >
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-amber-500" /> Super Admin
              </span>
              {isSuperAdminOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {isSuperAdminOpen && (
              <nav className="mt-1 space-y-0.5">
                {superAdminNav.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name + item.href}
                      href={item.href}
                      onClick={onClose}
                      className={}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

        </div>

        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50">
          <Link
            href="/admin/cms"
            className="flex items-center justify-between rounded-xl bg-gradient-to-br from-slate-900 to-sky-950 p-2.5 text-white text-xs border border-sky-500/30 hover:border-sky-400 transition group"
          >
            <div>
              <p className="font-bold text-[11px] flex items-center gap-1 text-sky-400">
                <Sliders className="w-3 h-3" /> CMS Control Center
              </p>
              <p className="text-[10px] text-slate-300 mt-0.5">Manage Site & Features</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </aside>
    </>
  );
}
