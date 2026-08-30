'use client';

import React, { useState } from 'react';
import { FileText, Plus, Edit3, Trash2, Globe, Eye, Search, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsPage, updateCmsPage, deleteCmsPage } from '@/lib/supabase/cms/service';
import type { CmsPage, CmsStatus, CmsVisibility } from '@/lib/supabase/cms/types';

interface PagesManagerProps {
  pages: CmsPage[];
  onRefresh: () => void;
}

export function PagesManager({ pages, onRefresh }: PagesManagerProps) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft' as CmsStatus,
    visibility: 'public' as CmsVisibility,
    seo_title: '',
    seo_description: '',
    featured_image: '',
    template: 'default'
  });

  const handleOpenCreate = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      slug: '',
      content: '# New Page Title\n\nEnter formatted markdown or HTML content here...',
      excerpt: '',
      status: 'draft',
      visibility: 'public',
      seo_title: '',
      seo_description: '',
      featured_image: '',
      template: 'default'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: CmsPage) => {
    setEditingPage(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      content: p.content,
      excerpt: p.excerpt || '',
      status: p.status,
      visibility: p.visibility,
      seo_title: p.seo_title || '',
      seo_description: p.seo_description || '',
      featured_image: p.featured_image || '',
      template: p.template || 'default'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    };

    if (editingPage) {
      const res = await updateCmsPage(editingPage.id, payload);
      if (res.success) {
        addToast({ type: 'success', title: 'Page Saved', message: `"${formData.title}" updated successfully.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Save Failed', message: res.error });
      }
    } else {
      const res = await createCmsPage(payload);
      if (res.success) {
        addToast({ type: 'success', title: 'Page Created', message: `"${formData.title}" published/drafted.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Creation Failed', message: res.error });
      }
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete page "${title}"?`)) return;
    const res = await deleteCmsPage(id);
    if (res.success) {
      addToast({ type: 'info', title: 'Page Removed', message: `${title} deleted.` });
      onRefresh();
    }
  };

  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> কন্টেন্ট ও পেজ পরিচালনা (Page Management)
          </h2>
          <p className="text-[11px] text-slate-500">ওয়ার্ডপ্রেস-স্টাইল কাস্টম পেজ তৈরি, এসইও মেটাডাটা ও পাবলিকেশন নিয়ন্ত্রণ।</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="পেজ খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow shrink-0"
          >
            <Plus className="w-4 h-4" /> নতুন পেজ
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">শিরোনাম (Title)</th>
              <th className="py-2.5 px-3">স্ল্যাগ / ইউআরএল</th>
              <th className="py-2.5 px-3">দৃশ্যমানতা</th>
              <th className="py-2.5 px-3">স্ট্যাটাস</th>
              <th className="py-2.5 px-3">সর্বশেষ আপডেট</th>
              <th className="py-2.5 px-3 text-right">পদক্ষেপ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((page) => (
              <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  {page.title}
                </td>

                <td className="py-3 px-3 font-mono text-sky-500 font-semibold">
                  /{page.slug}
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    {page.visibility}
                  </span>
                </td>

                <td className="py-3 px-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                    page.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  }`}>
                    {page.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span className="capitalize">{page.status}</span>
                  </span>
                </td>

                <td className="py-3 px-3 text-slate-400 text-[11px]">
                  {new Date(page.updated_at).toLocaleDateString()}
                </td>

                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(page)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="সম্পাদনা"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(page.id, page.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                      title="মুছে ফেলুন"
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

      {/* Page Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPage ? `পেজ সম্পাদনা - ${editingPage.title}` : 'নতুন ওয়ার্ডপ্রেস-স্টাইল পেজ তৈরি'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পেজের শিরোনাম (Title) *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Research Ethics & Data Methodology"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ইউআরএল স্ল্যাগ (Slug) *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\\s+/g, '-') })}
                placeholder="e.g. research-ethics"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পাবলিকেশন স্ট্যাটাস</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CmsStatus })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="draft">Draft (খসড়া)</option>
                <option value="published">Published (প্রকাশিত)</option>
                <option value="archived">Archived (আর্কাইভ)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">পেজ কন্টেন্ট (Markdown / HTML Content) *</label>
            <textarea
              rows={8}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">এসইও মেটা টাইটেল</label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                placeholder="SEO Browser Title..."
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">দৃশ্যমানতা (Visibility)</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as CmsVisibility })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="public">Public (উন্মুক্ত)</option>
                <option value="authenticated">Authenticated Members</option>
                <option value="approved_members">Approved Members Only</option>
                <option value="admin_only">Admin Only</option>
              </select>
            </div>
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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
