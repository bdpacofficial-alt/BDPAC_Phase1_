'use client';

import React, { useState } from 'react';
import { Newspaper, Plus, Edit3, Trash2, CheckCircle2, Clock, Pin, Tag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsNews, updateCmsNews, deleteCmsNews } from '@/lib/supabase/cms/service';
import type { CmsNews, CmsStatus, CmsVisibility } from '@/lib/supabase/cms/types';

interface NewsManagerProps {
  news: CmsNews[];
  onRefresh: () => void;
}

export function NewsManager({ news, onRefresh }: NewsManagerProps) {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<CmsNews | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'Official Circular',
    tags: 'circular, political-analysis, bdpac',
    featured_image: '',
    is_announcement: true,
    is_pinned: false,
    status: 'published' as CmsStatus,
    visibility: 'public' as CmsVisibility
  });

  const handleOpenCreate = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      slug: '',
      content: '# Official Notice / News Item\n\nEnter news text here...',
      excerpt: '',
      category: 'Official Circular',
      tags: 'circular, political-analysis, bdpac',
      featured_image: '',
      is_announcement: true,
      is_pinned: false,
      status: 'published',
      visibility: 'public'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsNews) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      content: item.content,
      excerpt: item.excerpt || '',
      category: item.category || 'General',
      tags: (item.tags || []).join(', '),
      featured_image: item.featured_image || '',
      is_announcement: item.is_announcement,
      is_pinned: item.is_pinned,
      status: item.status,
      visibility: item.visibility
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      tags: tagArray,
      featured_image: formData.featured_image || null,
      is_announcement: formData.is_announcement,
      is_pinned: formData.is_pinned,
      status: formData.status,
      visibility: formData.visibility,
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    };

    if (editingNews) {
      const res = await updateCmsNews(editingNews.id, payload);
      if (res.success) {
        addToast({ type: 'success', title: 'News Saved', message: `"${formData.title}" updated.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Save Failed', message: res.error });
      }
    } else {
      const res = await createCmsNews(payload);
      if (res.success) {
        addToast({ type: 'success', title: 'News Created', message: `"${formData.title}" published.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Creation Failed', message: res.error });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this news item?')) return;
    const res = await deleteCmsNews(id);
    if (res.success) {
      addToast({ type: 'info', title: 'News Removed', message: 'Item deleted.' });
      onRefresh();
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-cyan-500" /> নিউজ ও সার্কুলার প্রকাশনা (News & Announcements)
          </h2>
          <p className="text-[11px] text-slate-500">অফিসিয়াল সার্কুলার, প্রেস রিলিজ ও রাজনৈতিক বিশ্লেষণ প্রকাশনা পরিচালনা করুন।</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow shrink-0"
        >
          <Plus className="w-4 h-4" /> নতুন সার্কুলার / নিউজ
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">শিরোনাম ও ক্যাটাগরি</th>
              <th className="py-2.5 px-3">টাইপ</th>
              <th className="py-2.5 px-3">দৃশ্যমানতা</th>
              <th className="py-2.5 px-3">স্ট্যাটাস</th>
              <th className="py-2.5 px-3">তারিখ</th>
              <th className="py-2.5 px-3 text-right">পদক্ষেপ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    {item.is_pinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{item.category} • /{item.slug}</span>
                </td>

                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.is_announcement ? 'bg-amber-500/10 text-amber-500' : 'bg-sky-500/10 text-sky-500'
                  }`}>
                    {item.is_announcement ? 'Announcement' : 'News'}
                  </span>
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500">
                    {item.visibility}
                  </span>
                </td>

                <td className="py-3 px-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {item.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span className="capitalize">{item.status}</span>
                  </span>
                </td>

                <td className="py-3 px-3 text-slate-400 text-[11px]">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* News Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNews ? 'সার্কুলার/নিউজ সম্পাদনা' : 'নতুন সার্কুলার বা প্রেস বিজ্ঞপ্তি প্রকাশ'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">শিরোনাম (Headline) *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">স্ল্যাগ (Slug) *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\\s+/g, '-') })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ক্যাটাগরি</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">কন্টেন্ট (Full Content Markdown) *</label>
            <textarea
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পাবলিকেশন স্ট্যাটাস</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CmsStatus })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="published">Published (প্রকাশিত)</option>
                <option value="draft">Draft (খসড়া)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">দৃশ্যমানতা</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as CmsVisibility })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="public">Public</option>
                <option value="authenticated">Authenticated</option>
                <option value="approved_members">Approved Members Only</option>
                <option value="admin_only">Admin Only</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_announcement}
                onChange={(e) => setFormData({ ...formData, is_announcement: e.target.checked })}
                className="rounded text-cyan-600"
              />
              <span className="font-bold text-slate-700 dark:text-slate-300">অফিসিয়াল সার্কুলার / নোটিস</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_pinned}
                onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
                className="rounded text-amber-500"
              />
              <span className="font-bold text-slate-700 dark:text-slate-300">পিন পোস্ট (Pin to Top)</span>
            </label>
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
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white shadow"
            >
              প্রকাশ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
