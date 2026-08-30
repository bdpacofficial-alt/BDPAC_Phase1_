import { Member } from '@/data/membersData';
import { MemberStatus } from './supabase/types';

export interface MemberFilterState {
  search: string;
  status: MemberStatus | 'all';
  division: string;
  district: string;
  upazila: string;
  position: string;
}

export function filterMembers(members: Member[], filters: MemberFilterState): Member[] {
  return members.filter(member => {
    // Search query match
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        member.name.toLowerCase().includes(q) ||
        member.id.toLowerCase().includes(q) ||
        member.mobile.includes(q) ||
        member.email.toLowerCase().includes(q) ||
        member.district.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Status filter
    if (filters.status !== 'all') {
      if (filters.status === 'approved' && !member.isVerified) return false;
      if (filters.status === 'pending' && member.isVerified) return false;
    }

    // Division filter
    if (filters.division && member.division !== filters.division) {
      return false;
    }

    // District filter
    if (filters.district && member.district !== filters.district) {
      return false;
    }

    // Upazila filter
    if (filters.upazila && member.thana !== filters.upazila) {
      return false;
    }

    // Position filter
    if (filters.position && member.partyPosition !== filters.position) {
      return false;
    }

    return true;
  });
}
