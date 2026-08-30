'use client';

import React, { useState } from 'react';
import { Sliders, Edit3, CheckCircle2, XCircle, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { updateCmsSection } from '@/lib/supabase/cms/service';
import type { CmsSection, CmsStatus } from '@/lib/supabase/cms/types';

interface SectionsManagerProps {
  sections: CmsSection[];
  onRefresh: () => void;
}

export function SectionsManager({ sections, onRefresh }: SectionsManagerProps) {
  const { addToast } = useToast();
  const [editingSection, setEditingSection] = useState<CmsSection | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    status: 'published' as CmsStatus,
    configJson: '{}'
  });

  const handleOpenEdit = (sec: CmsSection) => {
    setEditingSection(sec);
    setFormData({
      title: sec.title,
      subtitle: sec.subtitle || '',
      status: sec.status,
      configJson: JSON.stringify(sec.configuration || {}, null, 2)
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    let parsedConfig = {};
    try {
      parsedConfig = JSON.parse(formData.configJson || '{}');
    } catch {
      alert('Invalid JSON configuration');
      return;
    }

    const res = await updateCmsSection(editingSection.id, {
      title: formData.title,
      subtitle: formData.subtitle,
      status: formData.status,
      configuration: parsedConfig
    });

    if (res.success) {
      addToast({ type: 'success', title: 'Section Updated', message: `${formData.title} settings saved.` });
      setEditingSection(null);
      onRefresh();
    } else {
      addToast({ type: 'error', title: 'Update Failed', message: res.error });
    }
  };

  const handleToggleStatus = async (sec: CmsSection) => {
    const nextStatus: CmsStatus = sec.status === 'published' ? 'disabled' : 'published';
    const res = await updateCmsSection(sec.id, { status: nextStatus });
    if (res.success) {
      addToast({ type: 'info', title: 'Status Changed', message: `${sec.title} is now ${nextStatus}.` });
      onRefresh();
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-500" /> হোমপেজ সেকশন ও ব্লক বিন্যাস (Section Layouts)
        </h2>
        <p className="text-[11px] text-slate-500">হোমপেজের বিভিন্ন ব্লকের সক্রিয়তা, শিরোনাম এবং কনফিগারেশন ডায়নামিকালি কাস্টমাইজ করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">
                  {sec.section_key}
                </span>

                <button
                  onClick={() => handleToggleStatus(sec)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                    sec.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {sec.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span className="capitalize">{sec.status}</span>
                </button>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-xs">{sec.title}</h3>
              {sec.subtitle && <p className="text-[11px] text-slate-500 line-clamp-2">{sec.subtitle}</p>}
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">Order: #{sec.sort_order}</span>

              <button
                onClick={() => handleOpenEdit(sec)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:border-emerald-500 transition shadow-xs"
              >
                <Edit3 className="w-3 h-3 text-emerald-500" /> সম্পাদনা
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <Modal
          isOpen={Boolean(editingSection)}
          onClose={() => setEditingSection(null)}
          title={`সেকশন সম্পাদনা - ${editingSection.section_key}`}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সেকশন শিরোনাম (Title) *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">সাবটাইটেল / বিবরণ</label>
              <textarea
                rows={2}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">কনফিগারেশন (JSON Settings)</label>
              <textarea
                rows={5}
                value={formData.configJson}
                onChange={(e) => setFormData({ ...formData, configJson: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono text-[11px]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Card>
  );
}
