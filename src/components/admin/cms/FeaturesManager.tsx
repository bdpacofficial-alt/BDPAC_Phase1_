'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, Edit3, Trash2, CheckCircle2, XCircle, Search, Shield, Layers, Settings2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsFeature, updateCmsFeature, deleteCmsFeature } from '@/lib/supabase/cms/service';
import type { CmsFeature, CmsModule, CmsStatus, CmsVisibility } from '@/lib/supabase/cms/types';

interface FeaturesManagerProps {
  features: CmsFeature[];
  modules: CmsModule[];
  onRefresh: () => void;
}

export function FeaturesManager({ features, modules, onRefresh }: FeaturesManagerProps) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<CmsFeature | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    module_id: '' as string | null,
    icon: 'Sparkles',
    route: '',
    status: 'active' as CmsStatus,
    visibility: 'authenticated' as CmsVisibility,
    sort_order: 0,
    configJson: '{}'
  });

  const handleOpenCreate = () => {
    setEditingFeature(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      module_id: modules[0]?.id || null,
      icon: 'Sparkles',
      route: '',
      status: 'active',
      visibility: 'authenticated',
      sort_order: features.length + 1,
      configJson: '{\n  "enabled": true\n}'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (feat: CmsFeature) => {
    setEditingFeature(feat);
    setFormData({
      name: feat.name,
      slug: feat.slug,
      description: feat.description || '',
      module_id: feat.module_id,
      icon: feat.icon || 'Sparkles',
      route: feat.route || '',
      status: feat.status,
      visibility: feat.visibility,
      sort_order: feat.sort_order,
      configJson: JSON.stringify(feat.configuration || {}, null, 2)
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let parsedConfig = {};
    try {
      parsedConfig = JSON.parse(formData.configJson || '{}');
    } catch {
      alert('Invalid JSON in Configuration field.');
      return;
    }

    const payload = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      module_id: formData.module_id || null,
      icon: formData.icon,
      route: formData.route || null,
      status: formData.status,
      visibility: formData.visibility,
      sort_order: formData.sort_order,
      configuration: parsedConfig
    };

    if (editingFeature) {
      const res = await updateCmsFeature(editingFeature.id, payload);
      if (res.success) {
        addToast({ type: 'success', title: 'Feature Updated', message: `${formData.name} settings saved.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Update Failed', message: res.error });
      }
    } else {
      const res = await createCmsFeature(payload);
      if (res.success) {
        addToast({ type: 'success', title: 'Feature Created', message: `${formData.name} added to system features.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Creation Failed', message: res.error });
      }
    }
  };

  const handleToggleStatus = async (feat: CmsFeature) => {
    const nextStatus: CmsStatus = feat.status === 'active' ? 'disabled' : 'active';
    const res = await updateCmsFeature(feat.id, { status: nextStatus });
    if (res.success) {
      addToast({ type: 'info', title: 'Status Changed', message: `${feat.name} is now ${nextStatus}.` });
      onRefresh();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete feature "${name}"?`)) return;
    const res = await deleteCmsFeature(id);
    if (res.success) {
      addToast({ type: 'info', title: 'Feature Deleted', message: `${name} has been removed.` });
      onRefresh();
    }
  };

  const filtered = features.filter(f => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.slug.toLowerCase().includes(search.toLowerCase()) ||
      (f.route && f.route.toLowerCase().includes(search.toLowerCase()));
    const matchesModule = !selectedModuleFilter || f.module_id === selectedModuleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> ফিচার ও সাব-সিস্টেম ব্যবস্থাপনা (Feature Manager)
          </h2>
          <p className="text-[11px] text-slate-500">বিভিন্ন মডিউলের অন্তর্গত স্পেসিফিক ফিচার ও টুলস সক্রিয়/নিষ্ক্রিয় ও কনফিগার করুন।</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <select
            value={selectedModuleFilter}
            onChange={(e) => setSelectedModuleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
          >
            <option value="">সকল প্যারেন্ট মডিউল (All Modules)</option>
            {modules.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <div className="relative flex-1 sm:w-48">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="ফিচার খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition shadow shrink-0"
          >
            <Plus className="w-4 h-4" /> নতুন ফিচার
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">ফিচার নাম ও স্ল্যাগ</th>
              <th className="py-2.5 px-3">প্যারেন্ট মডিউল</th>
              <th className="py-2.5 px-3">রাউট / ইউআরএল</th>
              <th className="py-2.5 px-3">দৃশ্যমানতা</th>
              <th className="py-2.5 px-3">স্ট্যাটাস</th>
              <th className="py-2.5 px-3 text-right">পদক্ষেপ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((feat) => {
              const parentModule = modules.find(m => m.id === feat.module_id);
              return (
                <tr key={feat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 dark:text-white block">{feat.name}</span>
                    <span className="font-mono text-[10px] text-slate-400 block">{feat.slug}</span>
                  </td>

                  <td className="py-3 px-3">
                    {parentModule ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                        <Layers className="w-3 h-3" /> {parentModule.name}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Unassigned</span>
                    )}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300 font-medium">
                    {feat.route || '—'}
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                      {feat.visibility}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleToggleStatus(feat)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                        feat.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
                      }`}
                    >
                      {feat.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span className="capitalize">{feat.status}</span>
                    </button>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(feat)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="কনফিগারেশন সম্পাদনা"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(feat.id, feat.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Feature Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFeature ? `ফিচার কনফিগারেশন - ${editingFeature.name}` : 'নতুন ফিচার যুক্ত করুন'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ফিচার নাম (Feature Name) *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Member Digital ID Card"
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
                placeholder="e.g. digital-id-card"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">প্যারেন্ট মডিউল (Module)</label>
              <select
                value={formData.module_id || ''}
                onChange={(e) => setFormData({ ...formData, module_id: e.target.value || null })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="">কোনো মডিউল নেই (Stand-alone)</option>
                {modules.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">রাউট / ইউআরএল</label>
              <input
                type="text"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                placeholder="e.g. /profile"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">দৃশ্যমানতা (Visibility)</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as CmsVisibility })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="public">Public</option>
                <option value="authenticated">Authenticated</option>
                <option value="approved_members">Approved Members Only</option>
                <option value="admin_only">Admin Only</option>
                <option value="owner_only">Owner Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              ফিচার সেটিংস ও কনফিগারেশন (JSON Configuration)
            </label>
            <textarea
              rows={4}
              value={formData.configJson}
              onChange={(e) => setFormData({ ...formData, configJson: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono text-[11px]"
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
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold text-white shadow"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
