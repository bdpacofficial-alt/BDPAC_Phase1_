'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { Bell, Search, User, Shield, Menu, LogOut, UserPlus, ShieldCheck } from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

export function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 w-full border-b border-emerald-500/20 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl text-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            {/* Logo Emblem */}
            <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&auto=format&fit=crop&q=80"
                alt="BDPAC Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                BDPAC • বাংলাদেশ আওয়ামী লীগ <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
              </span>
              <p className="text-[10px] text-emerald-300 font-semibold -mt-0.5">ভার্চুয়াল প্রাইভেট নেটওয়ার্ক প্ল্যাটফর্ম</p>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="সদস্য, নোটিশ, ডকুমেন্ট বা বার্তা খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 focus:border-emerald-500 text-xs text-white placeholder-slate-400 outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />

          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2.5 rounded-xl border border-slate-800 bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          <Link
            href="/registration"
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition"
          >
            <UserPlus className="w-3.5 h-3.5" /> মেম্বার রেজিস্টার
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={user.photo}
                alt={user.name}
                className="w-8 h-8 rounded-xl object-cover border border-emerald-500/50"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.name}</p>
                <p className="text-[10px] text-emerald-400 font-semibold truncate max-w-[120px]">{user.partyPosition}</p>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </header>
  );
}
