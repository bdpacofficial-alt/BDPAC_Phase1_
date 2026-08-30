/**
 * BDPAC Location Hierarchy Data Service - Phase 1 Production
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { 
  FALLBACK_DIVISIONS, 
  FALLBACK_DISTRICTS, 
  FALLBACK_UPAZILAS, 
  FALLBACK_UNIONS, 
  FALLBACK_WARDS,
  GeoDivision,
  GeoDistrict,
  GeoUpazila,
  GeoUnion,
  GeoWard
} from '@/data/locationData';

export async function fetchDivisions(): Promise<GeoDivision[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('divisions')
        .select('*')
        .order('name_en', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          nameEn: d.name_en,
          nameBn: d.name_bn,
          code: d.code || ''
        }));
      }
    } catch (e) {
      console.warn('Using fallback divisions data:', e);
    }
  }
  return FALLBACK_DIVISIONS;
}

export async function fetchDistricts(divisionId: string): Promise<GeoDistrict[]> {
  if (!divisionId) return [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('districts')
        .select('*')
        .eq('division_id', divisionId)
        .order('name_en', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          divisionId: d.division_id,
          nameEn: d.name_en,
          nameBn: d.name_bn,
          code: d.code || ''
        }));
      }
    } catch (e) {
      console.warn('Using fallback districts data for', divisionId, e);
    }
  }
  return FALLBACK_DISTRICTS[divisionId] || [];
}

export async function fetchUpazilas(districtId: string): Promise<GeoUpazila[]> {
  if (!districtId) return [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('upazilas')
        .select('*')
        .eq('district_id', districtId)
        .order('name_en', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((u: any) => ({
          id: u.id,
          districtId: u.district_id,
          nameEn: u.name_en,
          nameBn: u.name_bn
        }));
      }
    } catch (e) {
      console.warn('Using fallback upazilas data for', districtId, e);
    }
  }
  return FALLBACK_UPAZILAS[districtId] || [];
}

export async function fetchUnions(upazilaId: string): Promise<GeoUnion[]> {
  if (!upazilaId) return [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('unions')
        .select('*')
        .eq('upazila_id', upazilaId)
        .order('name_en', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((un: any) => ({
          id: un.id,
          upazilaId: un.upazila_id,
          nameEn: un.name_en,
          nameBn: un.name_bn
        }));
      }
    } catch (e) {
      console.warn('Using fallback unions data for', upazilaId, e);
    }
  }
  return FALLBACK_UNIONS[upazilaId] || [];
}

export async function fetchWards(unionId: string): Promise<GeoWard[]> {
  if (!unionId) return [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('wards')
        .select('*')
        .eq('union_id', unionId)
        .order('ward_number', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((w: any) => ({
          id: w.id,
          unionId: w.union_id || '',
          wardNumber: w.ward_number,
          nameEn: w.name_en,
          nameBn: w.name_bn
        }));
      }
    } catch (e) {
      console.warn('Using fallback wards data for', unionId, e);
    }
  }
  return FALLBACK_WARDS[unionId] || [
    { id: `${unionId}-w01`, unionId, wardNumber: 'Ward 01', nameEn: 'Ward 01', nameBn: '১ নং ওয়ার্ড' },
    { id: `${unionId}-w02`, unionId, wardNumber: 'Ward 02', nameEn: 'Ward 02', nameBn: '২ নং ওয়ার্ড' },
    { id: `${unionId}-w03`, unionId, wardNumber: 'Ward 03', nameEn: 'Ward 03', nameBn: '৩ নং ওয়ার্ড' }
  ];
}
