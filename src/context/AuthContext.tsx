'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, DUMMY_MEMBERS } from '@/data/membersData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { signInMember, signUpMember, signOutMember, SignUpData } from '@/lib/supabase/auth';
import { mapProfileToMember } from '@/lib/supabase/mapMember';
import type { AppRole, UserRoleRow, ProfileRow } from '@/lib/supabase/types';

interface AuthContextType {
  user: Member | null;
  profile: ProfileRow | null;
  roles: UserRoleRow[];
  primaryRole: AppRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: SignUpData) => Promise<{ success: boolean; error?: string; member?: Member }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<ProfileRow>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [roles, setRoles] = useState<UserRoleRow[]>([]);
  const [primaryRole, setPrimaryRole] = useState<AppRole>('member');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = isSupabaseConfigured();

  const fetchProfileAndRoles = async (userId: string) => {
    try {
      const [profileRes, rolesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_roles').select('*').eq('user_id', userId)
      ]);

      if (profileRes.data) {
        const p = profileRes.data as ProfileRow;
        setProfile(p);
        setUser(mapProfileToMember(p));
        setPrimaryRole(p.primary_role || 'member');
      }

      if (rolesRes.data) {
        const rList = rolesRes.data as UserRoleRow[];
        setRoles(rList);
        if (rList.some(r => r.role === 'super_admin')) {
          setPrimaryRole('super_admin');
        } else if (rList.some(r => r.role === 'national_admin')) {
          setPrimaryRole('national_admin');
        } else if (rList.length > 0) {
          setPrimaryRole(rList[0].role);
        }
      }
    } catch (e) {
      console.warn('Error fetching profile and roles:', e);
    }
  };

  useEffect(() => {
    if (!isConfigured) {
      // In unconfigured mode, use default demo user for safe local UI review
      setUser(DUMMY_MEMBERS[0]);
      setPrimaryRole('super_admin');
      setIsLoading(false);
      return;
    }

    // Check active session in Supabase Auth
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchProfileAndRoles(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err: any) {
        console.warn('Supabase Auth init error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen to Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchProfileAndRoles(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setRoles([]);
        setPrimaryRole('member');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const login = async (email: string, password = 'password123') => {
    setError(null);
    setIsLoading(true);

    if (!isConfigured) {
      // Fallback in unconfigured mode
      const found = DUMMY_MEMBERS.find(
        m => m.email.toLowerCase() === email.toLowerCase() || m.id.toLowerCase() === email.toLowerCase()
      );
      if (found) {
        setUser(found);
        setIsLoading(false);
        return { success: true };
      }
      setUser(DUMMY_MEMBERS[0]);
      setIsLoading(false);
      return { success: true };
    }

    const res = await signInMember(email, password);
    setIsLoading(false);

    if (res.success && res.data) {
      if (res.data.profile) {
        setProfile(res.data.profile);
        setUser(mapProfileToMember(res.data.profile));
      } else {
        await fetchProfileAndRoles(res.data.user.id);
      }
      return { success: true };
    } else {
      setError(res.error || 'Invalid credentials');
      return { success: false, error: res.error || 'Login failed.' };
    }
  };

  const register = async (data: SignUpData) => {
    setError(null);
    setIsLoading(true);

    if (!isConfigured) {
      const newMember = {
        ...DUMMY_MEMBERS[0],
        id: `BDPAC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        name: data.fullName,
        email: data.email,
        mobile: data.mobile,
        isVerified: false
      };
      setUser(newMember);
      setIsLoading(false);
      return { success: true, member: newMember };
    }

    const res = await signUpMember(data);
    setIsLoading(false);

    if (res.success && res.data) {
      if (res.data.profile) {
        const mapped = mapProfileToMember(res.data.profile);
        setProfile(res.data.profile);
        setUser(mapped);
        return { success: true, member: mapped };
      }
      return { success: true };
    } else {
      setError(res.error || 'Registration failed');
      return { success: false, error: res.error || 'Registration failed.' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await signOutMember();
    setUser(null);
    setProfile(null);
    setRoles([]);
    setPrimaryRole('member');
    setIsLoading(false);
  };

  const refreshUser = async () => {
    if (isConfigured) {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await fetchProfileAndRoles(authUser.id);
      }
    }
  };

  const updateUserProfile = async (updates: Partial<ProfileRow>) => {
    if (!profile && !user) return { success: false, error: 'Not logged in' };
    const targetId = profile?.id || user?.id;

    if (isConfigured && targetId) {
      try {
        const { data, error: err } = await supabase
          .from('profiles')
          .update(updates as any)
          .eq('id', targetId)
          .select()
          .single();

        if (err) return { success: false, error: err.message };
        if (data) {
          setProfile(data as ProfileRow);
          setUser(mapProfileToMember(data as ProfileRow));
          return { success: true };
        }
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    }

    // Local state update fallback
    if (user) {
      setUser({ ...user, ...updates } as any);
      return { success: true };
    }
    return { success: false };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        roles,
        primaryRole,
        isAuthenticated: Boolean(user),
        isLoading,
        isConfigured,
        error,
        login,
        register,
        logout,
        refreshUser,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
