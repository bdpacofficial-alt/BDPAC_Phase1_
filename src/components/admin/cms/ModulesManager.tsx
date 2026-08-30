'use client';

import React, { useState } from 'react';
import { Layers, Plus, Edit3, Trash2, CheckCircle2, XCircle, Search, Shield, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsModule, updateCmsModule, deleteCmsModule } from '@/lib/supabase/cms/service';
import type { CmsModule, CmsStatus, CmsVisibility } from '@/lib/supabase/cms/types';

interface ModulesManagerProps {
  modules: CmsModule[];
  onRefresh: () => void;
}

export function ModulesManager({ modules, onRefresh }: ModulesManagerProps) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<CmsModule | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'Layers',
    route: '',
    category: 'member' as const,
    status: 'active' as CmsStatus,
    visibility: 'authenticated' as CmsVisibility,
    sort_order: 0,
    is_core: false
  });

  const handleOpenCreate = () => {
    setEditingModule(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: 'Layers',
      route: '',
      category: 'member',
      status: 'active',
      visibility: 'authenticated',
      sort_order: modules.length + 1,
      is_core: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (mod: CmsModule) => {
    setEditingModule(mod);
    setFormData({
      name: mod.name,
      slug: mod.slug,
      description: mod.description || '',
      icon: mod.icon || 'Layers',
      route: mod.route,
      category: mod.category,
      status: mod.status,
      visibility: mod.visibility,
      sort_order: mod.sort_order,
      is_core: mod.is_core
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingModule) {
      const res = await updateCmsModule(editingModule.id, formData);
      if (res.success) {
        addToast({ type: 'success', title: 'Module Updated', message: `${formData.name} updated successfully.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Update Failed', message: res.error });
      }
    } else {
      const res = await createCmsModule(formData);
      if (res.success) {
        addToast({ type: 'success', title: 'Module Created', message: `${formData.name} added to system modules.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Creation Failed', message: res.error });
      }
    }
  };

  const handleToggleStatus = async (mod: CmsModule) => {
    const nextStatus: CmsStatus = mod.status === 'active' ? 'disabled' : 'active';
    const res = await updateCmsModule(mod.id, { status: nextStatus });
    if (res.success) {
      addToast({ type: 'info', title: 'Status Changed', message: `${mod.name} is now ${nextStatus}.` });
      onRefresh();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete module "${name}"?`)) return;
    const res = await deleteCmsModule(id);
    if (res.success) {
      addToast({ type: 'info', title: 'Module Deleted', message: `${name} has been removed.` });
      onRefresh();
    }
  };

  const filtered = modules.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.slug.toLowerCase().includes(search.toLowerCase()) ||
    m.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-500" /> এক্সটেনসিবল মডিউল প্রশাসন (CMS Module Manager)
          </h2>
          <p className="text-[11px] text-slate-500">প্ল্যাটফর্মের সকল অভ্যন্তরীণ ও পাবলিক মডিউলের সক্রিয়তা ও দৃশ্যমানতা নিয়ন্ত্রণ করুন।</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="মডিউল খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition shadow shrink-0"
          >
            <Plus className="w-4 h-4" /> নতুন মডিউল
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">নাম ও স্ল্যাগ</th>
              <th className="py-2.5 px-3">ক্যাটাগরি</th>
              <th className="py-2.5 px-3">রাউট ইউআরএল</th>
              <th className="py-2.5 px-3">দৃশ্যমানতা (Visibility)</th>
              <th className="py-2.5 px-3">স্ট্যাটাস</th>
              <th className="py-2.5 px-3 text-right">পদক্ষেপ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((mod) => (
              <tr key={mod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{mod.name}</span>
                    {mod.is_core && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        CORE
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 block">{mod.slug}</span>
                </td>

                <td className="py-3 px-3 capitalize text-slate-600 dark:text-slate-300 font-medium">
                  {mod.category}
                </td>

                <td className="py-3 px-3 font-mono text-sky-500 font-semibold">
                  {mod.route}
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    {mod.visibility}
                  </span>
                </td>

                <td className="py-3 px-3">
                  <button
                    onClick={() => handleToggleStatus(mod)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                      mod.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
                    }`}
                  >
                    {mod.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span className="capitalize">{mod.status}</span>
                  </button>
                </td>

                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(mod)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="সম্পাদনা"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {!mod.is_core && (
                      <button
                        onClick={() => handleDelete(mod.id, mod.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingModule ? `মডিউল সম্পাদনা - ${editingModule.name}` : 'নতুন এক্সটেনসিবল মডিউল তৈরি'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">মডিউল নাম (Module Name) *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Grassroots Sentiment Polls"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
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
                placeholder="e.g. sentiment-polls"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">রাউট পাথ (Route Path) *</label>
              <input
                type="text"
                required
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                placeholder="e.g. /polls"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ক্যাটাগরি (Category)</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="public">Public</option>
                <option value="member">Member</option>
                <option value="governance">Governance</option>
                <option value="admin">Admin</option>
                <option value="tools">Tools</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">দৃশ্যমানতা (Visibility)</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as CmsVisibility })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="public">Public (সকল দর্শক)</option>
                <option value="authenticated">Authenticated (সকল লগইনকৃত ইউজার)</option>
                <option value="approved_members">Approved Members (অনুমোদিত সদস্য)</option>
                <option value="admin_only">Admin Only (শুধুমাত্র অ্যাডমিন)</option>
                <option value="owner_only">Owner Only (শুধুমাত্র সুপার অ্যাডমিন)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">বিবরণ (Description)</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white shadow"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
