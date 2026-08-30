'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Member } from '@/data/membersData';
import { fetchMembers } from '@/lib/supabase/members';
import { DirectoryHeader } from '@/components/directory/DirectoryHeader';
import { DirectoryFilters } from '@/components/directory/DirectoryFilters';
import { DirectoryPagination } from '@/components/directory/DirectoryPagination';
import { MemberCard } from '@/components/directory/MemberCard';
import { MemberProfileModal } from '@/components/directory/MemberProfileModal';
import { OrgTreeExplorer } from '@/components/directory/OrgTreeExplorer';
import { ContextMenu } from '@/components/directory/ContextMenu';
import { Users, Loader2 } from 'lucide-react';

const PAGE_SIZE = 24;

export default function DirectoryPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; member: Member } | null>(null);

  const loadDirectory = useCallback(async () => {
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * PAGE_SIZE;
      const res = await fetchMembers({
        search: searchQuery,
        status: selectedStatus as any,
        limit: PAGE_SIZE,
        offset
      });

      // Filter locally for division if needed
      let resultMembers = res.members;
      if (selectedDivision) {
        resultMembers = resultMembers.filter(m => m.division === selectedDivision);
      }

      setMembers(resultMembers);
      setTotalCount(res.total);
      setIsFromSupabase(res.fromSupabase);
    } catch (e) {
      console.warn('Error loading directory:', e);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedDivision, selectedStatus, currentPage]);

  useEffect(() => {
    loadDirectory();
  }, [loadDirectory]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  const handleReset = () => {
    setSearchQuery('');
    setSelectedDivision('');
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 py-4" onClick={() => setContextMenu(null)}>
      {/* Top Banner */}
      <DirectoryHeader totalCount={totalCount} fromSupabase={isFromSupabase} />

      {/* Filter Toolbar */}
      <DirectoryFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedDivision={selectedDivision}
        onDivisionChange={(div) => {
          setSelectedDivision(div);
          setCurrentPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(st) => {
          setSelectedStatus(st);
          setCurrentPage(1);
        }}
        onReset={handleReset}
      />

      {/* Main Content: Directory Grid & Org Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Org Tree Explorer */}
        <div className="lg:col-span-1">
          <OrgTreeExplorer onSelect={(div) => {
            setSelectedDivision(div);
            setCurrentPage(1);
          }} />
        </div>

        {/* Right Side: Members Grid */}
        <div className="lg:col-span-3 space-y-6">
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-sky-500 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-bold">সদস্য ডাটা লোড হচ্ছে...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <Users className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">কোন সদস্য রেকর্ড পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400">ফিল্টার পরিবর্তন করে পুনরায় অনুসন্ধান করুন।</p>
              <button onClick={handleReset} className="mt-2 px-4 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs">
                রিসেট ফিল্টার
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={() => setSelectedMember(member)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenu({ x: e.clientX, y: e.clientY, member });
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <DirectoryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalCount}
            pageSize={PAGE_SIZE}
          />
        </div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <MemberProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          member={contextMenu.member}
          onClose={() => setContextMenu(null)}
          onViewProfile={() => setSelectedMember(contextMenu.member)}
        />
      )}
    </div>
  );
}
