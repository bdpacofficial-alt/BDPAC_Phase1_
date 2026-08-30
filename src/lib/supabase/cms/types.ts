/**
 * BDPAC CMS Extensible Architecture TypeScript Types
 */

import { AppRole } from '../types';

export type CmsStatus = 'draft' | 'active' | 'published' | 'disabled' | 'archived';
export type CmsVisibility = 'public' | 'authenticated' | 'approved_members' | 'admin_only' | 'owner_only';

export interface CmsModule {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  route: string;
  category: 'public' | 'member' | 'admin' | 'governance' | 'tools';
  status: CmsStatus;
  visibility: CmsVisibility;
  sort_order: number;
  is_core: boolean;
  settings: Record<string, any>;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsFeature {
  id: string;
  module_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  status: CmsStatus;
  visibility: CmsVisibility;
  route: string | null;
  icon: string;
  sort_order: number;
  configuration: Record<string, any>;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: CmsStatus;
  visibility: CmsVisibility;
  seo_title: string | null;
  seo_description: string | null;
  featured_image: string | null;
  template: string;
  sort_order: number;
  published_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsSection {
  id: string;
  section_key: string;
  title: string;
  subtitle: string | null;
  status: CmsStatus;
  visibility: CmsVisibility;
  sort_order: number;
  configuration: Record<string, any>;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  mobile_image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  status: CmsStatus;
  visibility: CmsVisibility;
  sort_order: number;
  start_at?: string | null;
  end_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsNews {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string;
  tags: string[];
  featured_image: string | null;
  is_announcement: boolean;
  is_pinned: boolean;
  status: CmsStatus;
  visibility: CmsVisibility;
  published_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsMenuItem {
  id: string;
  menu_location: 'header' | 'sidebar' | 'footer' | 'admin';
  label: string;
  route: string;
  icon: string | null;
  parent_id: string | null;
  sort_order: number;
  visibility: CmsVisibility;
  status: 'active' | 'disabled';
  required_role: AppRole | null;
  module_id: string | null;
  feature_id: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsFeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string | null;
  enabled: boolean;
  visibility: CmsVisibility;
  configuration: Record<string, any>;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsMedia {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  alt_text: string | null;
  caption: string | null;
  visibility: 'public' | 'authenticated' | 'admin_only';
  url: string;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CmsSetting {
  id: string;
  category: 'general' | 'branding' | 'contact' | 'homepage' | 'security' | 'features';
  key: string;
  value: Record<string, any>;
  description: string | null;
  is_public: boolean;
  updated_by?: string | null;
  created_at: string;
  updated_at: string;
}
