'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Copy, Check, Search, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsMediaRecord, deleteCmsMedia } from '@/lib/supabase/cms/service';
import type { CmsMedia } from '@/lib/supabase/cms/types';

interface MediaLibraryProps {
  media: CmsMedia[];
  onRefresh: () => void;
}

export function MediaLibrary({ media, onRefresh }: MediaLibraryProps) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    file_name: '',
    url: '',
    alt_text: '',
    file_type: 'image/jpeg',
    visibility: 'public' as const
  });

  const defaultSampleMedia: CmsMedia[] = media.length > 0 ? media : [
    {
      id: 'med-01',
      file_name: 'bdpac-banner-hero.jpg',
      file_path: 'banners/bdpac-banner-hero.jpg',
      file_type: 'image/jpeg',
      file_size: 240000,
      alt_text: 'BDPAC Hero Banner 2026',
      caption: 'Main landing page banner',
      visibility: 'public',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'med-02',
      file_name: 'political-symposium.jpg',
      file_path: 'news/political-symposium.jpg',
      file_type: 'image/jpeg',
      file_size: 185000,
      alt_text: 'National Executive Symposium',
      caption: 'Party congress meeting banner',
      visibility: 'public',
      url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast({ type: 'success', title: 'URL Copied', message: 'Image link copied to clipboard.' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createCmsMediaRecord({
      file_name: formData.file_name,
      file_path: `media/${formData.file_name}`,
      url: formData.url,
      alt_text: formData.alt_text,
      file_type: formData.file_type,
      file_size: 150000,
      visibility: formData.visibility
    });

    if (res.success) {
      addToast({ type: 'success', title: 'Media Added', message: `${formData.file_name} added to library.` });
      setIsModalOpen(false);
      onRefresh();
    } else {
      addToast({ type: 'error', title: 'Error', message: res.error });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media record?')) return;
    const res = await deleteCmsMedia(id);
    if (res.success) {
      addToast({ type: 'info', title: 'Media Deleted', message: 'Item removed.' });
      onRefresh();
    }
  };

  const filtered = defaultSampleMedia.filter(m =>
    m.file_name.toLowerCase().includes(search.toLowerCase()) ||
    (m.alt_text && m.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-500" /> মিডিয়া লাইব্রেরি ও অ্যাসেট স্টোরেজ (Media Library)
          </h2>
          <p className="text-[11px] text-slate-500">ব্যানার, পেজ, নিউজ এবং প্রোফাইলে ব্যবহারের জন্য ইমেজ স্টোরেজ ও লিংক সংগ্রহ।</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ছবি খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            onClick={() => {
              setFormData({ file_name: '', url: '', alt_text: '', file_type: 'image/jpeg', visibility: 'public' });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow shrink-0"
          >
            <Plus className="w-4 h-4" /> নতুন মিডিয়া লিংক
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden space-y-2 flex flex-col justify-between"
          >
            <div className="h-40 w-full bg-slate-900 overflow-hidden relative group">
              <img src={item.url} alt={item.alt_text || item.file_name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  className="p-2 rounded-xl bg-white text-slate-900 font-bold shadow hover:bg-sky-50"
                  title="Copy URL"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white text-slate-900 font-bold shadow hover:bg-sky-50"
                  title="Open Image"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="p-3 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white truncate text-xs">{item.file_name}</p>
              <p className="text-[10px] text-slate-400 truncate">{item.alt_text || item.caption || 'Public Image'}</p>
            </div>

            <div className="p-3 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 text-[10px] text-slate-400">
              <span className="capitalize">{item.visibility}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-red-500 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="মিডিয়া লাইব্রেরিতে ছবি যুক্ত করুন"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ফাইলের নাম (File Name) *</label>
            <input
              type="text"
              required
              placeholder="e.g. rally-dhaka-2026.jpg"
              value={formData.file_name}
              onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ইমেজ পাবলিক ইউআরএল (Image URL) *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">অল্টারনেট টেক্সট (Alt Text)</label>
            <input
              type="text"
              placeholder="ছবির বর্ণনা..."
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
