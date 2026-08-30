'use client';

import React from 'react';
import { DUMMY_MEDIA } from '@/data/mediaData';
import { Image, Video, FileText, Upload, Download, Folder } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function MediaPage() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Folder className="w-6 h-6 text-sky-400" /> Enterprise Media Center & Digital Asset Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Google Drive / Canva Brand Hub inspired media library, event banners, meeting recordings, and AI tags.
          </p>
        </div>

        <button
          onClick={() => addToast({ type: 'success', title: 'Asset Uploaded', message: 'Demo asset added to Media Vault.' })}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2"
        >
          <Upload className="w-4 h-4" /> Upload New Media
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DUMMY_MEDIA.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-3">
            <span className="text-[10px] font-bold text-sky-500 uppercase">{item.category} • {item.size}</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.name}</h3>
            <p className="text-xs text-slate-400">Uploaded by {item.uploadedBy} on {item.uploadDate}</p>
            <button
              onClick={() => addToast({ type: 'info', title: 'Downloading', message: `Downloading ${item.name}` })}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Asset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
