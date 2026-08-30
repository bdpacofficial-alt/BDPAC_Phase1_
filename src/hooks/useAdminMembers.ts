import { useState, useEffect, useCallback } from 'react';
import { Member } from '@/data/membersData';
import { fetchMembers, updateMemberStatus, updateMemberProfile } from '@/lib/supabase/members';
import { MemberStatus } from '@/lib/supabase/types';
import { useToast } from '@/context/ToastContext';

export function useAdminMembers(initialFilters = {}) {
  const { addToast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromSupabase, setIsFromSupabase] = useState(false);

  const loadMembers = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchMembers({ ...initialFilters, ...filters });
      setMembers(res.members);
      setTotal(res.total);
      setIsFromSupabase(res.fromSupabase);
      if (res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load members');
    } finally {
      setIsLoading(false);
    }
  }, [initialFilters]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleApprove = async (memberId: string, memberName: string) => {
    try {
      const res = await updateMemberStatus(memberId, 'approved');
      if (res.success) {
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, isVerified: true } : m));
        addToast({
          type: 'success',
          title: 'Member Approved',
          message: `${memberName} (${memberId}) has been successfully approved and activated.`
        });
        return true;
      } else {
        addToast({
          type: 'error',
          title: 'Approval Failed',
          message: res.error || 'Could not approve member.'
        });
        return false;
      }
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  const handleReject = async (memberId: string, memberName: string, reason?: string) => {
    try {
      const res = await updateMemberStatus(memberId, 'rejected', reason);
      if (res.success) {
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, isVerified: false } : m));
        addToast({
          type: 'info',
          title: 'Application Rejected',
          message: `Application for ${memberName} rejected.`
        });
        return true;
      } else {
        addToast({ type: 'error', title: 'Action Failed', message: res.error });
        return false;
      }
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  const handleSuspend = async (memberId: string, memberName: string) => {
    try {
      const res = await updateMemberStatus(memberId, 'suspended');
      if (res.success) {
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, isVerified: false } : m));
        addToast({
          type: 'warning',
          title: 'Member Suspended',
          message: `${memberName} has been suspended.`
        });
        return true;
      } else {
        addToast({ type: 'error', title: 'Action Failed', message: res.error });
        return false;
      }
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  const handleUpdate = async (memberId: string, updates: any) => {
    try {
      const res = await updateMemberProfile(memberId, updates);
      if (res.success && res.data) {
        setMembers(prev => prev.map(m => m.id === memberId ? res.data! : m));
        addToast({
          type: 'success',
          title: 'Member Updated',
          message: 'Member details successfully updated.'
        });
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message });
      return false;
    }
  };

  return {
    members,
    total,
    isLoading,
    error,
    isFromSupabase,
    refresh: loadMembers,
    handleApprove,
    handleReject,
    handleSuspend,
    handleUpdate
  };
}
