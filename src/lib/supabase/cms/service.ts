/**
 * BDPAC Extensible Admin CMS Service Layer - Phase 1 Production
 */

import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import type {
  CmsModule,
  CmsFeature,
  CmsPage,
  CmsSection,
  CmsBanner,
  CmsNews,
  CmsMenuItem,
  CmsFeatureFlag,
  CmsMedia,
  CmsSetting
} from './types';

// ==========================================
// 1. MODULES MANAGEMENT
// ==========================================

export async function fetchCmsModules(category?: string): Promise<CmsModule[]> {
  if (isSupabaseConfigured()) {
    try {
      let q = supabase.from('cms_modules').select('*').order('sort_order', { ascending: true });
      if (category) q = q.eq('category', category);
      const { data, error } = await q;
      if (!error && data) return data as CmsModule[];
    } catch (e) {
      console.warn('fetchCmsModules fallback:', e);
    }
  }
  return [];
}

export async function createCmsModule(payload: Partial<CmsModule>): Promise<{ success: boolean; data?: CmsModule; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_modules').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('create_module', 'cms_module', data.id, { name: data.name, slug: data.slug });
    return { success: true, data: data as CmsModule };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsModule(id: string, updates: Partial<CmsModule>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_modules').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_module', 'cms_module', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsModule(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_modules').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_module', 'cms_module', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 2. FEATURES MANAGEMENT
// ==========================================

export async function fetchCmsFeatures(moduleId?: string): Promise<CmsFeature[]> {
  if (isSupabaseConfigured()) {
    try {
      let q = supabase.from('cms_features').select('*').order('sort_order', { ascending: true });
      if (moduleId) q = q.eq('module_id', moduleId);
      const { data, error } = await q;
      if (!error && data) return data as CmsFeature[];
    } catch (e) {
      console.warn('fetchCmsFeatures fallback:', e);
    }
  }
  return [];
}

export async function createCmsFeature(payload: Partial<CmsFeature>): Promise<{ success: boolean; data?: CmsFeature; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_features').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('create_feature', 'cms_feature', data.id, { name: data.name, slug: data.slug });
    return { success: true, data: data as CmsFeature };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsFeature(id: string, updates: Partial<CmsFeature>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_features').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_feature', 'cms_feature', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsFeature(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_features').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_feature', 'cms_feature', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 3. PAGES MANAGEMENT
// ==========================================

export async function fetchCmsPages(): Promise<CmsPage[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_pages').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data as CmsPage[];
    } catch (e) {
      console.warn('fetchCmsPages fallback:', e);
    }
  }
  return [];
}

export async function fetchCmsPageBySlug(slug: string): Promise<CmsPage | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_pages').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) return data as CmsPage;
    } catch (e) {
      console.warn('fetchCmsPageBySlug error:', e);
    }
  }
  return null;
}

export async function createCmsPage(payload: Partial<CmsPage>): Promise<{ success: boolean; data?: CmsPage; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_pages').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('create_page', 'cms_page', data.id, { title: data.title, slug: data.slug });
    return { success: true, data: data as CmsPage };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsPage(id: string, updates: Partial<CmsPage>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_pages').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_page', 'cms_page', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsPage(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_pages').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_page', 'cms_page', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 4. SECTIONS MANAGEMENT
// ==========================================

export async function fetchCmsSections(): Promise<CmsSection[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_sections').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data as CmsSection[];
    } catch (e) {
      console.warn('fetchCmsSections fallback:', e);
    }
  }
  return [];
}

export async function updateCmsSection(id: string, updates: Partial<CmsSection>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_sections').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_section', 'cms_section', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 5. BANNERS MANAGEMENT
// ==========================================

export async function fetchCmsBanners(): Promise<CmsBanner[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_banners').select('*').order('sort_order', { ascending: true });
      if (!error && data) return data as CmsBanner[];
    } catch (e) {
      console.warn('fetchCmsBanners fallback:', e);
    }
  }
  return [];
}

export async function createCmsBanner(payload: Partial<CmsBanner>): Promise<{ success: boolean; data?: CmsBanner; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_banners').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('create_banner', 'cms_banner', data.id, { title: data.title });
    return { success: true, data: data as CmsBanner };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsBanner(id: string, updates: Partial<CmsBanner>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_banners').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_banner', 'cms_banner', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsBanner(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_banners').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_banner', 'cms_banner', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 6. NEWS & ANNOUNCEMENTS
// ==========================================

export async function fetchCmsNews(): Promise<CmsNews[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_news').select('*').order('published_at', { ascending: false });
      if (!error && data) return data as CmsNews[];
    } catch (e) {
      console.warn('fetchCmsNews fallback:', e);
    }
  }
  return [];
}

export async function createCmsNews(payload: Partial<CmsNews>): Promise<{ success: boolean; data?: CmsNews; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_news').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('create_news', 'cms_news', data.id, { title: data.title });
    return { success: true, data: data as CmsNews };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsNews(id: string, updates: Partial<CmsNews>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_news').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_news', 'cms_news', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsNews(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_news').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_news', 'cms_news', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 7. MENU & NAVIGATION ITEMS
// ==========================================

export async function fetchCmsMenuItems(location?: 'header' | 'sidebar' | 'footer' | 'admin'): Promise<CmsMenuItem[]> {
  if (isSupabaseConfigured()) {
    try {
      let q = supabase.from('cms_menu_items').select('*').order('sort_order', { ascending: true });
      if (location) q = q.eq('menu_location', location);
      const { data, error } = await q;
      if (!error && data) return data as CmsMenuItem[];
    } catch (e) {
      console.warn('fetchCmsMenuItems fallback:', e);
    }
  }
  return [];
}

export async function createCmsMenuItem(payload: Partial<CmsMenuItem>): Promise<{ success: boolean; data?: CmsMenuItem; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_menu_items').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('create_menu_item', 'cms_menu_item', data.id, { label: data.label, route: data.route });
    return { success: true, data: data as CmsMenuItem };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsMenuItem(id: string, updates: Partial<CmsMenuItem>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_menu_items').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_menu_item', 'cms_menu_item', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsMenuItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_menu_items').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_menu_item', 'cms_menu_item', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 8. FEATURE FLAGS
// ==========================================

export async function fetchCmsFeatureFlags(): Promise<CmsFeatureFlag[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_feature_flags').select('*').order('name', { ascending: true });
      if (!error && data) return data as CmsFeatureFlag[];
    } catch (e) {
      console.warn('fetchCmsFeatureFlags fallback:', e);
    }
  }
  return [];
}

export async function toggleCmsFeatureFlag(key: string, enabled: boolean): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_feature_flags').update({ enabled } as any).eq('key', key);
    if (error) return { success: false, error: error.message };
    await logCmsAction('toggle_feature_flag', 'cms_feature_flag', key, { enabled });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateCmsFeatureFlag(id: string, updates: Partial<CmsFeatureFlag>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_feature_flags').update(updates as any).eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_feature_flag', 'cms_feature_flag', id, updates);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 9. MEDIA LIBRARY
// ==========================================

export async function fetchCmsMedia(): Promise<CmsMedia[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_media').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as CmsMedia[];
    } catch (e) {
      console.warn('fetchCmsMedia fallback:', e);
    }
  }
  return [];
}

export async function createCmsMediaRecord(payload: Partial<CmsMedia>): Promise<{ success: boolean; data?: CmsMedia; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { data, error } = await supabase.from('cms_media').insert([payload as any]).select().single();
    if (error) return { success: false, error: error.message };
    await logCmsAction('upload_media', 'cms_media', data.id, { file_name: data.file_name, url: data.url });
    return { success: true, data: data as CmsMedia };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCmsMedia(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_media').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    await logCmsAction('delete_media', 'cms_media', id, {});
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 10. CMS SETTINGS
// ==========================================

export async function fetchCmsSettings(): Promise<CmsSetting[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('cms_settings').select('*').order('category', { ascending: true });
      if (!error && data) return data as CmsSetting[];
    } catch (e) {
      console.warn('fetchCmsSettings fallback:', e);
    }
  }
  return [];
}

export async function updateCmsSetting(key: string, value: Record<string, any>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase configuration missing.' };
  try {
    const { error } = await supabase.from('cms_settings').update({ value, updated_at: new Date().toISOString() } as any).eq('key', key);
    if (error) return { success: false, error: error.message };
    await logCmsAction('update_setting', 'cms_setting', key, { key, value });
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ==========================================
// 11. AUDIT LOGS
// ==========================================

export async function logCmsAction(action: string, entity_type: string, entity_id: string, details: Record<string, any> = {}) {
  if (isSupabaseConfigured()) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('audit_logs').insert([{
        actor_id: user?.id || null,
        action,
        entity_type,
        entity_id,
        details
      } as any]);
    } catch (e) {
      console.warn('Could not record audit log:', e);
    }
  }
}

export async function fetchCmsAuditLogs(limit = 50): Promise<any[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (!error && data) return data;
    } catch (e) {
      console.warn('fetchCmsAuditLogs fallback:', e);
    }
  }
  return [];
}
