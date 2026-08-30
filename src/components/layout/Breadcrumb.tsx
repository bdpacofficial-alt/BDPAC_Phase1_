'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
      <Link href="/" className="hover:text-sky-500 flex items-center gap-1 transition">
        <Home className="w-3.5 h-3.5" /> Home
      </Link>
      {segments.map((segment, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/');
        const isLast = idx === segments.length - 1;
        const formatted = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={href}>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            {isLast ? (
              <span className="font-bold text-slate-900 dark:text-white capitalize">{formatted}</span>
            ) : (
              <Link href={href} className="hover:text-sky-500 capitalize transition">
                {formatted}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
