'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  Edit3, 
  Eye, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/admin/StatusBadges';
import { EditMemberModal } from '@/components/admin/EditMemberModal';
import { MemberProfileModal } from '@/components/directory/MemberProfileModal';
import { useAdminMembers } from '@/hooks/useAdminMembers';
import { Member } from '@/data/membersData';
import { MemberStatus } from '@/lib/supabase/types';
import { AdminRoute } from '@/components/admin/AdminRoute';

export default function AdminMembersPage() {
  return (
    <AdminRoute>
      <AdminMembersPageContent />
    </AdminRoute>
  );
}

function AdminMembersPageContent() {
  const {
    members,
    total,
    isLoading,
    isFromSupabase,
    refresh,
    handleApprove,
    handleReject,
    handleSuspend,
    handleUpdate
  } = useAdminMembers();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [previewMember, setPreviewMember] = useState<Member | null>(null);
  const [rejectPromptId, setRejectPromptId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Filter members locally from current page/load
  const filteredMembers = members.filter(m => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.mobile.includes(q) ||
        m.district.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedStatus !== 'all') {
      if (selectedStatus === 'approved' && !m.isVerified) return false;
      if (selectedStatus === 'pending' && m.isVerified) return false;
      if (selectedStatus === 'suspended' && !m.partyPosition.includes('Suspended')) return false;
    }

    if (selectedDivision && m.division !== selectedDivision) return false;
    if (selectedPosition && m.partyPosition !== selectedPosition) return false;

    return true;
  });

  const pendingCount = members.filter(m => !m.isVerified).length;
  const approvedCount = members.filter(m => m.isVerified).length;

  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Designation,Division,District,Status\n';
    const rows = filteredMembers.map(m =>
      `"${m.id}","${m.name}","${m.email}","${m.mobile}","${m.partyPosition}","${m.division}","${m.district}","${m.isVerified ? 'Approved' : 'Pending'}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bdpac-members-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" /> কেন্দ্রীয় ও আঞ্চলিক সদস্য প্রশাসন
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            সদস্য অনুমোদন ও পরিচালনা ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            নতুন সদস্য আবেদন যাচাই, এক ক্লিকে অনুমোদন/বাতিল এবং দলীয় পদবী নির্ধারণ করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition shadow"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> এক্সপোর্ট CSV
          </button>

          <button
            onClick={() => refresh()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> রিফ্রেশ
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-bold">মোট লোডকৃত সদস্য</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{total.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400">{isFromSupabase ? 'Supabase Database' : 'Local Fallback State'}</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-bold">অপেক্ষমান আবেদন (Pending)</p>
          <p className="text-2xl font-black text-amber-500">{pendingCount}</p>
          <p className="text-[10px] text-amber-500 font-medium">পর্যালোচনা প্রয়োজন</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-bold">অনুমোদিত সদস্য (Approved)</p>
          <p className="text-2xl font-black text-emerald-500">{approvedCount}</p>
          <p className="text-[10px] text-emerald-500 font-medium">সক্রিয় ডিজিটাল আইডি কার্ড</p>
        </Card>

        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs text-slate-400 font-bold">ডেটাবেজ স্ট্যাটাস</p>
          <p className="text-2xl font-black text-sky-500">RLS Active</p>
          <p className="text-[10px] text-sky-500 font-medium">নিরাপদ পলিসি এনফোর্সড</p>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="নাম বা আইডি দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            >
              <option value="all">সকল স্ট্যাটাস (All Status)</option>
              <option value="pending">অপেক্ষমান (Pending Review)</option>
              <option value="approved">অনুমোদিত (Approved & Active)</option>
              <option value="suspended">স্থগিত (Suspended)</option>
            </select>
          </div>

          <div>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            >
              <option value="">সকল বিভাগ (All Divisions)</option>
              <option value="Dhaka Division">Dhaka Division (ঢাকা)</option>
              <option value="Mymensingh Division">Mymensingh Division (ময়মনসিংহ)</option>
              <option value="Chattogram Division">Chattogram Division (চট্টগ্রাম)</option>
              <option value="Rajshahi Division">Rajshahi Division (রাজশাহী)</option>
              <option value="Khulna Division">Khulna Division (খুলনা)</option>
              <option value="Barishal Division">Barishal Division (বরিশাল)</option>
              <option value="Sylhet Division">Sylhet Division (সিলেট)</option>
              <option value="Rangpur Division">Rangpur Division (রংপুর)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            >
              <option value="">সকল পদবী (All Designations)</option>
              <option value="Ward Secretary">Ward Secretary</option>
              <option value="Ward President">Ward President</option>
              <option value="Union President">Union President</option>
              <option value="District President">District President</option>
              <option value="Division Organizer">Division Organizer</option>
              <option value="General Member">General Member</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Members Management Table */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-500" /> সদস্য রেকর্ড তালিকা ({filteredMembers.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4 font-semibold">সদস্য আইডি</th>
                <th className="py-3 px-4 font-semibold">নাম ও ছবি</th>
                <th className="py-3 px-4 font-semibold">মোবাইল ও ইমেইল</th>
                <th className="py-3 px-4 font-semibold">এলাকা (District/Thana)</th>
                <th className="py-3 px-4 font-semibold">সাংগঠনিক পদবী</th>
                <th className="py-3 px-4 font-semibold">স্ট্যাটাস</th>
                <th className="py-3 px-4 font-semibold text-right">পদক্ষেপ (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    কোন সদস্য তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">
                      {m.id}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={m.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                        />
                        <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      <div>{m.mobile}</div>
                      <div className="text-[10px] text-slate-400">{m.email}</div>
                    </td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      <div>{m.district}</div>
                      <div className="text-[10px] text-slate-400">{m.thana} • {m.division}</div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {m.partyPosition}
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={m.isVerified ? 'approved' : 'pending'} isVerified={m.isVerified} />
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!m.isVerified ? (
                          <button
                            onClick={() => handleApprove(m.id, m.name)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow transition"
                            title="অনুমোদন করুন"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSuspend(m.id, m.name)}
                            className="px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-[11px] font-bold transition"
                            title="স্থগিত করুন"
                          >
                            Suspend
                          </button>
                        )}

                        <button
                          onClick={() => setEditingMember(m)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          title="সম্পাদনা"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setPreviewMember(m)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          title="প্রোফাইল দেখুন"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Member Modal */}
      {editingMember && (
        <EditMemberModal
          isOpen={Boolean(editingMember)}
          onClose={() => setEditingMember(null)}
          member={editingMember}
          onSave={async (id, updates) => {
            const ok = await handleUpdate(id, updates);
            if (ok) setEditingMember(null);
            return ok;
          }}
        />
      )}

      {/* Member Profile Preview Modal */}
      {previewMember && (
        <MemberProfileModal
          member={previewMember}
          onClose={() => setPreviewMember(null)}
        />
      )}
    </div>
  );
}
