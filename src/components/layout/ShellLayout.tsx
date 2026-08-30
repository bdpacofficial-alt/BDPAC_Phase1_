'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Breadcrumb } from './Breadcrumb';
import { ToastContainer } from '../ui/Toast';
import { FloatingQuickAI } from './FloatingQuickAI';
import { ActiveCallOverlay } from '../calls/ActiveCallOverlay';

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Breadcrumb />
          {children}
        </main>
      </div>
      <Footer />
      <ToastContainer />
      <FloatingQuickAI />
      <ActiveCallOverlay />
    </div>
  );
}
