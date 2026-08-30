import { Member, DUMMY_MEMBERS } from './membersData';
import { fetchMembers, updateMemberStatus } from '@/lib/supabase/members';
import { isSupabaseConfigured } from '@/lib/supabaseClient';
import { MemberStatus } from '@/lib/supabase/types';

class AdminMembersStore {
  private members: Member[] = [...DUMMY_MEMBERS];
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    if (isSupabaseConfigured()) {
      try {
        const res = await fetchMembers({ limit: 100 });
        if (res.fromSupabase && res.members.length > 0) {
          this.members = res.members;
        }
      } catch (e) {
        console.warn('Could not initialize admin members from Supabase:', e);
      }
    }
    this.isInitialized = true;
    this.notify();
  }

  getMembers(): Member[] {
    return this.members;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  async updateStatus(id: string, status: MemberStatus, notes?: string): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured()) {
      const res = await updateMemberStatus(id, status, notes);
      if (!res.success) return res;
    }

    this.members = this.members.map(m => {
      if (m.id === id) {
        return {
          ...m,
          isVerified: status === 'approved',
          partyPosition: status === 'suspended' ? `${m.partyPosition} (Suspended)` : m.partyPosition
        };
      }
      return m;
    });

    this.notify();
    return { success: true };
  }

  updateMember(id: string, updates: Partial<Member>) {
    this.members = this.members.map(m => m.id === id ? { ...m, ...updates } : m);
    this.notify();
  }
}

export const adminMembersStore = new AdminMembersStore();
