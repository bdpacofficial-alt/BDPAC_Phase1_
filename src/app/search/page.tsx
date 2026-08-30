'use client';

import React, { useState } from 'react';
import { Search, Sparkles, User, FileText, Calendar } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl space-y-4">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Search className="w-6 h-6 text-sky-400" /> Universal Global Search & Discovery
        </h1>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across 5,000,000+ indexed records (Members, Circulars, Meetings, Audits)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-400 outline-none focus:border-sky-500"
          />
        </div>
      </div>
    </div>
  );
}
