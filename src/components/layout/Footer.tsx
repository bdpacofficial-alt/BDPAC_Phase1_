import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-lg py-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-xs">P</div>
          <span className="font-bold text-slate-800 dark:text-white">Political Private Network</span>
          <span>© 2026. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-sky-500 transition">About</Link>
          <Link href="/features" className="hover:text-sky-500 transition">Features</Link>
          <Link href="/security" className="hover:text-sky-500 transition">Security</Link>
          <Link href="/contact" className="hover:text-sky-500 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
