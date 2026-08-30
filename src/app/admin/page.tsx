'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Building2, 
  UserCheck, 
  Newspaper, 
  Video, 
  CheckSquare, 
  Calendar, 
  FileText, 
  Vote, 
  Bot, 
  BarChart3, 
  ShieldAlert, 
  Settings, 
  Search, 
  Sliders, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Download, 
  RefreshCw, 
  AlertTriangle,
  Lock,
  Eye,
  Trash2,
  Edit,
  Send,
  Radio
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { AdminRoute } from '@/components/admin/AdminRoute';

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminPageContent />
    </AdminRoute>
  );
}

function AdminPageContent() {
  const { addToast } = useToast();
  const [role, setRole] = useState<string>('Central Admin');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isNewMemberModal, setIsNewMemberModal] = useState(false);
  const [isNewNoticeModal, setIsNewNoticeModal] = useState(false);
  const [isNewMeetingModal, setIsNewMeetingModal] = useState(false);

  // Form states
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Official Circular');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');

  const adminTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Shield },
    { id: 'members', name: 'Members', icon: Users },
    { id: 'organization', name: 'Organization', icon: Building2 },
    { id: 'registration', name: 'Registration', icon: UserCheck },
    { id: 'news', name: 'News & Feed', icon: Newspaper },
    { id: 'meetings', name: 'Meetings', icon: Video },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'polls', name: 'Polls', icon: Vote },
    { id: 'ai', name: 'AI Management', icon: Bot },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'security', name: 'Security', icon: ShieldAlert },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Dummy member data for management
  const [membersList, setMembersList] = useState([
    { id: 'PPN-2026-88492', name: 'MD Abir Hasan', position: 'Executive Member', division: 'Dhaka', status: 'Active', verified: true },
    { id: 'PPN-2026-10294', name: 'Tanvir Ahmed', position: 'District President', division: 'Chattogram', status: 'Active', verified: true },
    { id: 'PPN-2026-44019', name: 'Farhana Sultana', position: 'Ward Secretary', division: 'Rajshahi', status: 'Pending', verified: false },
    { id: 'PPN-2026-55912', name: 'Kamrul Islam', position: 'Thana Coordinator', division: 'Khulna', status: 'Active', verified: true },
    { id: 'PPN-2026-90214', name: 'Nadia Rahman', position: 'Union Joint Secretary', division: 'Sylhet', status: 'Suspended', verified: true },
  ]);

  const handleToggleMemberStatus = (id: string) => {
    setMembersList(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Suspended' : 'Active';
        addToast({ type: 'info', title: 'Member Status Changed', message: `${m.name} is now ${nextStatus}` });
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const handleApproveRegistration = (id: string, name: string) => {
    setMembersList(prev => prev.map(m => m.id === id ? { ...m, status: 'Active', verified: true } : m));
    addToast({
      type: 'success',
      title: 'Registration Approved',
      message: `Verified and issued Digital Member ID for ${name}`
    });
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewNoticeModal(false);
    addToast({
      type: 'success',
      title: 'Notice Published',
      message: `Circular "${noticeTitle}" broadcasted to all ${role} nodes.`
    });
    setNoticeTitle('');
  };

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewMeetingModal(false);
    addToast({
      type: 'success',
      title: 'Meeting Scheduled',
      message: `Conference "${meetingTitle}" added to official party calendar.`
    });
    setMeetingTitle('');
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold mb-2">
            <Shield className="w-4 h-4 text-sky-400" /> Enterprise Admin Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            প্রশাসনিক নিয়ন্ত্রণ ও পরিচালনা কেন্দ্র
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Complete role-based hierarchical governance suite for central, division, district, and grassroots committees.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/90 p-2 rounded-2xl border border-slate-700">
          <Sliders className="w-4 h-4 text-amber-400" />
          <div className="text-xs font-bold">
            <p className="text-[10px] text-slate-400 uppercase">Active Admin Scope</p>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                addToast({ type: 'info', title: 'Scope Switched', message: `Now viewing as ${e.target.value}` });
              }}
              className="bg-transparent text-white outline-none font-bold cursor-pointer"
            >
              <option value="Central Admin" className="bg-slate-900">Central Admin (বাংলাদেশ)</option>
              <option value="Division Admin" className="bg-slate-900">Division Admin (বিভাগ)</option>
              <option value="District Admin" className="bg-slate-900">District Admin (জেলা)</option>
              <option value="Thana Admin" className="bg-slate-900">Thana Admin (উপজেলা)</option>
              <option value="Union Admin" className="bg-slate-900">Union Admin (ইউনিয়ন)</option>
              <option value="Ward Admin" className="bg-slate-900">Ward Admin (ওয়ার্ড)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs (All 14 Modules) */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        {adminTabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-b-2 ${
                isActive
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-sky-50/60 dark:bg-sky-950/20 shadow-xs'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Dashboard Overview */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-xs text-slate-400 font-bold">মোট নিবন্ধিত সদস্য</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">125,840</p>
              <p className="text-[10px] text-emerald-500 font-semibold">↑ +2,450 এই মাসে</p>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-xs text-slate-400 font-bold">অপেক্ষমান আবেদন</p>
              <p className="text-2xl font-black text-amber-500">12 টি</p>
              <p className="text-[10px] text-slate-400 font-semibold">ভেরিফিকেশন অপেক্ষায়</p>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-xs text-slate-400 font-bold">সক্রিয় কমিটি</p>
              <p className="text-2xl font-black text-sky-500">8,420</p>
              <p className="text-[10px] text-slate-400 font-semibold">৮টি বিভাগজুড়ে</p>
            </Card>

            <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-xs text-slate-400 font-bold">সিকিউরিটি অডিট</p>
              <p className="text-2xl font-black text-emerald-500">100%</p>
              <p className="text-[10px] text-emerald-500 font-semibold">জিরো থ্রেট ডিটেক্টেড</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-500" /> সাম্প্রতিক ভেরিফিকেশন আবেদনসমূহ
                </h3>
                <button onClick={() => setActiveTab('registration')} className="text-xs font-bold text-sky-500 hover:underline">
                  সব দেখুন
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {membersList.filter(m => !m.verified).map(m => (
                  <div key={m.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.position} • {m.division}</p>
                    </div>
                    <button
                      onClick={() => handleApproveRegistration(m.id, m.name)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-sky-500" /> প্রশাসনিক দ্রুত পদক্ষেপ (Quick Actions)
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsNewNoticeModal(true)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/30 border border-slate-200 dark:border-slate-700 text-left transition space-y-1"
                >
                  <Newspaper className="w-4 h-4 text-sky-500" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">সার্কুলার প্রকাশ</p>
                  <p className="text-[10px] text-slate-400">নতুন সাংগঠনিক নির্দেশ জারি</p>
                </button>

                <button
                  onClick={() => setIsNewMeetingModal(true)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200 dark:border-slate-700 text-left transition space-y-1"
                >
                  <Video className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">মিটিং আহবান</p>
                  <p className="text-[10px] text-slate-400">জরুরি ভিডিও অধিবেশন</p>
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Members Management */}
      {activeTab === 'members' && (
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-500" /> সদস্য পরিচালনা তালিকা (Member Roster)
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="সদস্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">সদস্য আইডি</th>
                  <th className="py-2.5 px-3 font-semibold">নাম</th>
                  <th className="py-2.5 px-3 font-semibold">পদবী</th>
                  <th className="py-2.5 px-3 font-semibold">বিভাগ</th>
                  <th className="py-2.5 px-3 font-semibold">স্ট্যাটাস</th>
                  <th className="py-2.5 px-3 font-semibold text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {membersList.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase())).map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-500">{m.id}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{m.name}</td>
                    <td className="py-2.5 px-3 text-slate-500">{m.position}</td>
                    <td className="py-2.5 px-3 text-slate-500">{m.division}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleToggleMemberStatus(m.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        {m.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 3. Organization, 4. Registration, 5. News etc. (Placeholder rich interactive tab cards) */}
      {activeTab !== 'dashboard' && activeTab !== 'members' && (
        <Card className="p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto">
            {React.createElement(adminTabs.find(t => t.id === activeTab)?.icon || Shield, { className: 'w-6 h-6' })}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
            {adminTabs.find(t => t.id === activeTab)?.name} Control Suite
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Full administrative authority active under <strong>{role}</strong> jurisdiction. All changes propagate across all hierarchy levels in real-time.
          </p>
          <button
            onClick={() => addToast({ type: 'success', title: 'Sync Triggered', message: `Data synced for ${activeTab} module.` })}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition"
          >
            Sync {adminTabs.find(t => t.id === activeTab)?.name} Data
          </button>
        </Card>
      )}

      {/* New Notice Modal */}
      <Modal
        isOpen={isNewNoticeModal}
        onClose={() => setIsNewNoticeModal(false)}
        title="নতুন অফিসিয়াল সার্কুলার জারি (Publish Notice)"
      >
        <form onSubmit={handlePublishNotice} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">সার্কুলার শিরোনাম (Notice Title)</label>
            <input
              type="text"
              placeholder="উদাঃ কেন্দ্রীয় কার্যনির্বাহী সংসদের জরুরি নির্দেশনা..."
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 font-bold mb-1">ক্যাটাগরি</label>
            <select
              value={noticeCategory}
              onChange={(e) => setNoticeCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
            >
              <option value="Official Circular">অফিসিয়াল সার্কুলার</option>
              <option value="Emergency Announcement">জরুরি ঘোষণা</option>
              <option value="Press Release">প্রেস বিজ্ঞপ্তি</option>
              <option value="Organizational Guidelines">সাংগঠনিক নীতিমালা</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewNoticeModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white shadow-lg"
            >
              প্রকাশ করুন
            </button>
          </div>
        </form>
      </Modal>

      {/* New Meeting Modal */}
      <Modal
        isOpen={isNewMeetingModal}
        onClose={() => setIsNewMeetingModal(false)}
        title="নতুন ভার্চুয়াল মিটিং আহবান (Schedule Meeting)"
      >
        <form onSubmit={handleScheduleMeeting} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">মিটিং শিরোনাম (Meeting Subject)</label>
            <input
              type="text"
              placeholder="উদাঃ বিভাগীয় সমন্বয় ও কৌশল নির্ধারণী অধিবেশন..."
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 font-bold mb-1">তারিখ ও সময়</label>
            <input
              type="datetime-local"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewMeetingModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg"
            >
              তৈরি করুন
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
