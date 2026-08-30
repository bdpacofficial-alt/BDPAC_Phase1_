'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  fetchCmsModules, 
  fetchCmsFeatures, 
  fetchCmsFeatureFlags, 
  fetchCmsSections, 
  fetchCmsBanners, 
  fetchCmsMenuItems, 
  fetchCmsSettings,
  fetchCmsPages,
  fetchCmsNews,
  fetchCmsMedia
} from '@/lib/supabase/cms/service';
import type { 
  CmsModule, 
  CmsFeature, 
  CmsFeatureFlag, 
  CmsSection, 
  CmsBanner, 
  CmsMenuItem, 
  CmsSetting,
  CmsPage,
  CmsNews,
  CmsMedia
} from '@/lib/supabase/cms/types';

interface CmsContextType {
  modules: CmsModule[];
  features: CmsFeature[];
  featureFlags: CmsFeatureFlag[];
  sections: CmsSection[];
  banners: CmsBanner[];
  menuItems: CmsMenuItem[];
  settings: CmsSetting[];
  pages: CmsPage[];
  news: CmsNews[];
  media: CmsMedia[];
  isLoading: boolean;
  isFeatureEnabled: (key: string) => boolean;
  getSetting: (key: string, defaultValue?: any) => any;
  refreshCms: () => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<CmsModule[]>([]);
  const [features, setFeatures] = useState<CmsFeature[]>([]);
  const [featureFlags, setFeatureFlags] = useState<CmsFeatureFlag[]>([]);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [banners, setBanners] = useState<CmsBanner[]>([]);
  const [menuItems, setMenuItems] = useState<CmsMenuItem[]>([]);
  const [settings, setSettings] = useState<CmsSetting[]>([]);
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [news, setNews] = useState<CmsNews[]>([]);
  const [media, setMedia] = useState<CmsMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllCms = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        modRes,
        featRes,
        flagsRes,
        secRes,
        banRes,
        menuRes,
        settRes,
        pagesRes,
        newsRes,
        mediaRes
      ] = await Promise.all([
        fetchCmsModules(),
        fetchCmsFeatures(),
        fetchCmsFeatureFlags(),
        fetchCmsSections(),
        fetchCmsBanners(),
        fetchCmsMenuItems(),
        fetchCmsSettings(),
        fetchCmsPages(),
        fetchCmsNews(),
        fetchCmsMedia()
      ]);

      setModules(modRes);
      setFeatures(featRes);
      setFeatureFlags(flagsRes);
      setSections(secRes);
      setBanners(banRes);
      setMenuItems(menuRes);
      setSettings(settRes);
      setPages(pagesRes);
      setNews(newsRes);
      setMedia(mediaRes);
    } catch (e) {
      console.warn('Error loading CMS data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllCms();
  }, [loadAllCms]);

  const isFeatureEnabled = (key: string): boolean => {
    const flag = featureFlags.find(f => f.key === key);
    return flag ? flag.enabled : true;
  };

  const getSetting = (key: string, defaultValue: any = null): any => {
    const s = settings.find(st => st.key === key);
    return s ? s.value : defaultValue;
  };

  return (
    <CmsContext.Provider
      value={{
        modules,
        features,
        featureFlags,
        sections,
        banners,
        menuItems,
        settings,
        pages,
        news,
        media,
        isLoading,
        isFeatureEnabled,
        getSetting,
        refreshCms: loadAllCms
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) throw new Error('useCms must be used within CmsProvider');
  return context;
}
