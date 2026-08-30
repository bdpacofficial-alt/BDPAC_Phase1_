'use client';

import React, { useState } from 'react';
import { Menu as MenuIcon, Plus, Edit3, Trash2, CheckCircle2, XCircle, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { createCmsMenuItem, updateCmsMenuItem, deleteCmsMenuItem } from '@/lib/supabase/cms/service';
import type { CmsMenuItem, CmsVisibility } from '@/lib/supabase/cms/types';
import { AppRole } from '@/lib/supabase/types';

interface NavigationManagerProps {
  menuItems: CmsMenuItem[];
  onRefresh: () => void;
}

export function NavigationManager({ menuItems, onRefresh }: NavigationManagerProps) {
  const { addToast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<'header' | 'sidebar' | 'footer' | 'admin'>('sidebar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CmsMenuItem | null>(null);

  const [formData, setFormData] = useState({
    menu_location: 'sidebar' as const,
    label: '',
    route: '',
    icon: 'Link',
    sort_order: 0,
    visibility: 'public' as CmsVisibility,
    status: 'active' as const,
    required_role: '' as AppRole | ''
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      menu_location: selectedLocation,
      label: '',
      route: '',
      icon: 'Link',
      sort_order: menuItems.length + 1,
      visibility: selectedLocation === 'admin' ? 'admin_only' : 'public',
      status: 'active',
      required_role: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsMenuItem) => {
    setEditingItem(item);
    setFormData({
      menu_location: item.menu_location,
      label: item.label,
      route: item.route,
      icon: item.icon || 'Link',
      sort_order: item.sort_order,
      visibility: item.visibility,
      status: item.status,
      required_role: item.required_role || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      required_role: formData.required_role || null
    };

    if (editingItem) {
      const res = await updateCmsMenuItem(editingItem.id, payload as any);
      if (res.success) {
        addToast({ type: 'success', title: 'Menu Item Saved', message: `"${formData.label}" updated.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Save Failed', message: res.error });
      }
    } else {
      const res = await createCmsMenuItem(payload as any);
      if (res.success) {
        addToast({ type: 'success', title: 'Menu Item Added', message: `"${formData.label}" added to menu.` });
        setIsModalOpen(false);
        onRefresh();
      } else {
        addToast({ type: 'error', title: 'Creation Failed', message: res.error });
      }
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Delete menu item "${label}"?`)) return;
    const res = await deleteCmsMenuItem(id);
    if (res.success) {
      addToast({ type: 'info', title: 'Item Deleted', message: `${label} removed.` });
      onRefresh();
    }
  };

  const filtered = menuItems.filter(m => m.menu_location === selectedLocation);

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MenuIcon className="w-5 h-5 text-purple-500" /> ওয়ার্ডপ্রেস-স্টাইল মেনু ও নেভিগেশন (Menu Builder)
          </h2>
          <p className="text-[11px] text-slate-500">হেডার, সাইডবার, ফুটার ও অ্যাডমিন মেনুর সকল লিংক, রোল পারমিশন ও ক্রমবিন্যাস সাজান।</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow shrink-0"
        >
          <Plus className="w-4 h-4" /> নতুন মেনু আইটেম
        </button>
      </div>

      {/* Location Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {(['sidebar', 'header', 'footer', 'admin'] as const).map((loc) => (
          <button
            key={loc}
            onClick={() => setSelectedLocation(loc)}
            className={`px-3 py-1.5 rounded-xl font-bold capitalize transition ${
              selectedLocation === loc
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {loc} Menu ({menuItems.filter(m => m.menu_location === loc).length})
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">মেনু লেবেল (Label)</th>
              <th className="py-2.5 px-3">রাউট / ইউআরএল</th>
              <th className="py-2.5 px-3">প্রয়োজনীয় রোল</th>
              <th className="py-2.5 px-3">দৃশ্যমানতা</th>
              <th className="py-2.5 px-3">ক্রম (Order)</th>
              <th className="py-2.5 px-3 text-right">পদক্ষেপ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  {item.label}
                </td>

                <td className="py-3 px-3 font-mono text-sky-500 font-semibold">
                  {item.route}
                </td>

                <td className="py-3 px-3">
                  {item.required_role ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {item.required_role}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">None (Open)</span>
                  )}
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-500">
                    {item.visibility}
                  </span>
                </td>

                <td className="py-3 px-3 font-mono text-slate-500">
                  #{item.sort_order}
                </td>

                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.label)}
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

      {/* Menu Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'মেনু আইটেম সম্পাদনা' : 'নতুন মেনু আইটেম যোগ করুন'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">মেনু লেবেল (Label) *</label>
            <input
              type="text"
              required
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. Member Directory"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">মেনু লোকেশন (Location) *</label>
              <select
                value={formData.menu_location}
                onChange={(e) => setFormData({ ...formData, menu_location: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="sidebar">Sidebar Menu</option>
                <option value="header">Header Menu</option>
                <option value="footer">Footer Menu</option>
                <option value="admin">Admin Menu</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">রাউট লিংক (Route URL) *</label>
              <input
                type="text"
                required
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                placeholder="e.g. /directory"
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">প্রয়োজনীয় রোল (Required Role)</label>
              <select
                value={formData.required_role}
                onChange={(e) => setFormData({ ...formData, required_role: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="">সকলের জন্য উন্মুক্ত (None)</option>
                <option value="member">General Member</option>
                <option value="ward_admin">Ward Admin</option>
                <option value="union_admin">Union Admin</option>
                <option value="upazila_admin">Upazila Admin</option>
                <option value="district_admin">District Admin</option>
                <option value="division_admin">Division Admin</option>
                <option value="national_admin">National Admin</option>
                <option value="super_admin">Super Admin Only</option>
              </select>
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
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white shadow"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
