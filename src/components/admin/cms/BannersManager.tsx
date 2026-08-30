'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Edit3, Trash2, CheckCircle2, XCircle, Link2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsBanner, updateCmsBanner, deleteCmsBanner } from '@/lib/supabase/cms/service';
import type { CmsBanner, CmsStatus, CmsVisibility } from '@/lib/supabase/cms/types';

interface BannersManagerProps {
  banners: CmsBanner[];
  onRefresh: () => void;
}

export function BannersManager({ banners, onRefresh }: BannersManagerProps) {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<CmsBanner | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    mobile_image_url: '',
    button_text: '',
    button_url: '',
    status: 'active' as CmsStatus,
    visibility: 'public' as CmsVisibility,
    sort_order: 0
  });

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      mobile_image_url: '',
      button_text: 'বিস্তারিত দেখুন',
      button_url: '/registration',
      status: 'active',
      visibility: 'public',
      sort_order: banners.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ban: CmsBanner) => {
    setEditingBanner(ban);
    setFormData({
      title: ban.title,
      subtitle: ban.subtitle || '',
      image_url: ban.image_url,
      mobile_image_url: ban.mobile_image_url || '',
      button_text: ban.button_text || '',
      button_url: ban.button_url || '',
      status: ban.status,
      visibility: ban.visibility,
      sort_order: ban.sort_order
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      const res = await updateCmsBanner(editingBanner.id, formData);
      if (res.success) {
        addToast({ type: 'success', title: 'Banner Updated', message: 'Banner saved successfully.' });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Save Failed', message: res.error });
      }
    } else {
      const res = await createCmsBanner(formData);
      if (res.success) {
        addToast({ type: 'success', title: 'Banner Added', message: 'New banner published.' });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Creation Failed', message: res.error });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    const res = await deleteCmsBanner(id);
    if (res.success) {
      addToast({ type: 'info', title: 'Banner Removed', message: 'Banner deleted.' });
      onRefresh();
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-rose-500" /> ব্যানার ও প্রচার স্লাইডার (Banners Manager)
          </h2>
          <p className="text-[11px] text-slate-500">হোমপেজ ও প্ল্যাটফর্মের শীর্ষ ব্যানার, প্রচার ফটো এবং কল-টু-অ্যাকশন লিংক পরিচালনা করুন।</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow shrink-0"
        >
          <Plus className="w-4 h-4" /> নতুন ব্যানার আপলোড
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((ban) => (
          <div
            key={ban.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden space-y-3 flex flex-col justify-between"
          >
            <div className="relative h-44 w-full bg-slate-900">
              <img
                src={ban.image_url}
                alt={ban.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  ban.status === 'active'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {ban.status}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs">{ban.title}</h3>
              {ban.subtitle && <p className="text-[11px] text-slate-500 line-clamp-2">{ban.subtitle}</p>}
              {ban.button_text && (
                <div className="flex items-center gap-1 text-sky-500 font-bold text-[11px]">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{ban.button_text} ({ban.button_url})</span>
                </div>
              )}
            </div>

            <div className="p-4 pt-0 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(ban)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(ban.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? 'ব্যানার সম্পাদনা' : 'নতুন ব্যানার যুক্ত করুন'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ব্যানার শিরোনাম (Title) *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সাবটাইটেল / বর্ণনা</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ইমেজ ইউআরএল (Desktop Image URL) *</label>
            <input
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">বোতাম টেক্সট (Button Text)</label>
              <input
                type="text"
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                placeholder="e.g. সদস্যপদ আবেদন"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">বোতাম ইউআরএল (Button URL)</label>
              <input
                type="text"
                value={formData.button_url}
                onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                placeholder="e.g. /registration"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">স্ট্যাটাস</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CmsStatus })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="active">Active (সক্রিয়)</option>
                <option value="disabled">Disabled (নিষ্ক্রিয়)</option>
                <option value="draft">Draft</option>
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
                <option value="authenticated">Authenticated Only</option>
                <option value="approved_members">Approved Members Only</option>
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
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white shadow"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
