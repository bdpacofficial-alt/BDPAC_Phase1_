export interface GeoDivision {
  id: string;
  nameEn: string;
  nameBn: string;
  code: string;
}

export interface GeoDistrict {
  id: string;
  divisionId: string;
  nameEn: string;
  nameBn: string;
  code: string;
}

export interface GeoUpazila {
  id: string;
  districtId: string;
  nameEn: string;
  nameBn: string;
}

export interface GeoUnion {
  id: string;
  upazilaId: string;
  nameEn: string;
  nameBn: string;
}

export interface GeoWard {
  id: string;
  unionId: string;
  wardNumber: string;
  nameEn: string;
  nameBn: string;
}

export const FALLBACK_DIVISIONS: GeoDivision[] = [
  { id: 'div-dhaka', nameEn: 'Dhaka Division', nameBn: 'ঢাকা বিভাগ', code: 'DHAKA' },
  { id: 'div-mymensingh', nameEn: 'Mymensingh Division', nameBn: 'ময়মনসিংহ বিভাগ', code: 'MYMENSINGH' },
  { id: 'div-chattogram', nameEn: 'Chattogram Division', nameBn: 'চট্টগ্রাম বিভাগ', code: 'CHATTOGRAM' },
  { id: 'div-rajshahi', nameEn: 'Rajshahi Division', nameBn: 'রাজশাহী বিভাগ', code: 'RAJSHAHI' },
  { id: 'div-khulna', nameEn: 'Khulna Division', nameBn: 'খুলনা বিভাগ', code: 'KHULNA' },
  { id: 'div-barishal', nameEn: 'Barishal Division', nameBn: 'বরিশাল বিভাগ', code: 'BARISHAL' },
  { id: 'div-sylhet', nameEn: 'Sylhet Division', nameBn: 'সিলেট বিভাগ', code: 'SYLHET' },
  { id: 'div-rangpur', nameEn: 'Rangpur Division', nameBn: 'রংপুর বিভাগ', code: 'RANGPUR' }
];

export const FALLBACK_DISTRICTS: Record<string, GeoDistrict[]> = {
  'div-mymensingh': [
    { id: 'dist-mymensingh', divisionId: 'div-mymensingh', nameEn: 'Mymensingh District', nameBn: 'ময়মনসিংহ জেলা', code: 'MYM' },
    { id: 'dist-netrokona', divisionId: 'div-mymensingh', nameEn: 'Netrokona District', nameBn: 'নেত্রকোণা জেলা', code: 'NET' },
    { id: 'dist-jamalpur', divisionId: 'div-mymensingh', nameEn: 'Jamalpur District', nameBn: 'জামালপুর জেলা', code: 'JAM' },
    { id: 'dist-sherpur', divisionId: 'div-mymensingh', nameEn: 'Sherpur District', nameBn: 'শেরপুর জেলা', code: 'SHE' }
  ],
  'div-dhaka': [
    { id: 'dist-dhaka', divisionId: 'div-dhaka', nameEn: 'Dhaka District', nameBn: 'ঢাকা জেলা', code: 'DHK' },
    { id: 'dist-gazipur', divisionId: 'div-dhaka', nameEn: 'Gazipur District', nameBn: 'গাজীপুর জেলা', code: 'GAZ' },
    { id: 'dist-narayanganj', divisionId: 'div-dhaka', nameEn: 'Narayanganj District', nameBn: 'নারায়ণগঞ্জ জেলা', code: 'NAR' },
    { id: 'dist-tangail', divisionId: 'div-dhaka', nameEn: 'Tangail District', nameBn: 'টাঙ্গাইল জেলা', code: 'TAN' },
    { id: 'dist-faridpur', divisionId: 'div-dhaka', nameEn: 'Faridpur District', nameBn: 'ফরিদপুর জেলা', code: 'FAR' }
  ],
  'div-chattogram': [
    { id: 'dist-chattogram', divisionId: 'div-chattogram', nameEn: 'Chattogram District', nameBn: 'চট্টগ্রাম জেলা', code: 'CTG' },
    { id: 'dist-coxsbazar', divisionId: 'div-chattogram', nameEn: 'Cox\'s Bazar District', nameBn: 'কক্সবাজার জেলা', code: 'COX' },
    { id: 'dist-cumilla', divisionId: 'div-chattogram', nameEn: 'Cumilla District', nameBn: 'কুমিল্লা জেলা', code: 'CUM' }
  ],
  'div-rajshahi': [
    { id: 'dist-rajshahi', divisionId: 'div-rajshahi', nameEn: 'Rajshahi District', nameBn: 'রাজশাহী জেলা', code: 'RAJ' },
    { id: 'dist-bogra', divisionId: 'div-rajshahi', nameEn: 'Bogura District', nameBn: 'বগুড়া জেলা', code: 'BOG' }
  ],
  'div-khulna': [
    { id: 'dist-khulna', divisionId: 'div-khulna', nameEn: 'Khulna District', nameBn: 'খুলনা জেলা', code: 'KHU' },
    { id: 'dist-jessore', divisionId: 'div-khulna', nameEn: 'Jashore District', nameBn: 'যশোর জেলা', code: 'JAS' }
  ],
  'div-barishal': [
    { id: 'dist-barishal', divisionId: 'div-barishal', nameEn: 'Barishal District', nameBn: 'বরিশাল জেলা', code: 'BAR' }
  ],
  'div-sylhet': [
    { id: 'dist-sylhet', divisionId: 'div-sylhet', nameEn: 'Sylhet District', nameBn: 'সিলেট জেলা', code: 'SYL' }
  ],
  'div-rangpur': [
    { id: 'dist-rangpur', divisionId: 'div-rangpur', nameEn: 'Rangpur District', nameBn: 'রংপুর জেলা', code: 'RAN' }
  ]
};

export const FALLBACK_UPAZILAS: Record<string, GeoUpazila[]> = {
  'dist-mymensingh': [
    { id: 'upz-mym-sadar', districtId: 'dist-mymensingh', nameEn: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর' },
    { id: 'upz-muktagacha', districtId: 'dist-mymensingh', nameEn: 'Muktagacha', nameBn: 'মুক্তাগাছা' },
    { id: 'upz-trishal', districtId: 'dist-mymensingh', nameEn: 'Trishal', nameBn: 'ত্রিশাল' },
    { id: 'upz-bhaluka', districtId: 'dist-mymensingh', nameEn: 'Bhaluka', nameBn: 'ভালুকা' },
    { id: 'upz-fulbaria', districtId: 'dist-mymensingh', nameEn: 'Fulbaria', nameBn: 'ফুলবাড়িয়া' },
    { id: 'upz-gafargaon', districtId: 'dist-mymensingh', nameEn: 'Gafargaon', nameBn: 'গফরগাঁও' },
    { id: 'upz-ishwarganj', districtId: 'dist-mymensingh', nameEn: 'Ishwarganj', nameBn: 'ঈশ্বরগঞ্জ' },
    { id: 'upz-nandail', districtId: 'dist-mymensingh', nameEn: 'Nandail', nameBn: 'নান্দাইল' },
    { id: 'upz-gauripur', districtId: 'dist-mymensingh', nameEn: 'Gauripur', nameBn: 'গৌরীপুর' },
    { id: 'upz-haluaghat', districtId: 'dist-mymensingh', nameEn: 'Haluaghat', nameBn: 'হালুয়াঘাট' },
    { id: 'upz-dhobaura', districtId: 'dist-mymensingh', nameEn: 'Dhobaura', nameBn: 'ধোবাউড়া' },
    { id: 'upz-taraikanda', districtId: 'dist-mymensingh', nameEn: 'Taraikanda', nameBn: 'তারাকান্দা' }
  ],
  'dist-netrokona': [
    { id: 'upz-net-sadar', districtId: 'dist-netrokona', nameEn: 'Netrokona Sadar', nameBn: 'নেত্রকোণা সদর' },
    { id: 'upz-kendua', districtId: 'dist-netrokona', nameEn: 'Kendua', nameBn: 'কেন্দুয়া' },
    { id: 'upz-madan', districtId: 'dist-netrokona', nameEn: 'Madan', nameBn: 'মদন' },
    { id: 'upz-mohanganj', districtId: 'dist-netrokona', nameEn: 'Mohanganj', nameBn: 'মোহনগঞ্জ' },
    { id: 'upz-barhatta', districtId: 'dist-netrokona', nameEn: 'Barhatta', nameBn: 'বারহাট্টা' },
    { id: 'upz-durgapur', districtId: 'dist-netrokona', nameEn: 'Durgapur', nameBn: 'দুর্গাপুর' },
    { id: 'upz-kalmakanda', districtId: 'dist-netrokona', nameEn: 'Kalmakanda', nameBn: 'কলমাকান্দা' },
    { id: 'upz-purbadhala', districtId: 'dist-netrokona', nameEn: 'Purbadhala', nameBn: 'পূর্বধলা' },
    { id: 'upz-atpara', districtId: 'dist-netrokona', nameEn: 'Atpara', nameBn: 'আটপাড়া' },
    { id: 'upz-khaliajuri', districtId: 'dist-netrokona', nameEn: 'Khaliajuri', nameBn: 'খালিয়াজুড়ি' }
  ],
  'dist-dhaka': [
    { id: 'upz-keraniganj', districtId: 'dist-dhaka', nameEn: 'Keraniganj', nameBn: 'কেরানীগঞ্জ' },
    { id: 'upz-savar', districtId: 'dist-dhaka', nameEn: 'Savar', nameBn: 'সাভার' },
    { id: 'upz-dhamrai', districtId: 'dist-dhaka', nameEn: 'Dhamrai', nameBn: 'ধামরাই' },
    { id: 'upz-dohar', districtId: 'dist-dhaka', nameEn: 'Dohar', nameBn: 'দোহার' },
    { id: 'upz-nawabganj', districtId: 'dist-dhaka', nameEn: 'Nawabganj', nameBn: 'নবাবগঞ্জ' }
  ]
};

export const FALLBACK_UNIONS: Record<string, GeoUnion[]> = {
  'upz-muktagacha': [
    { id: 'un-kashimpur', upazilaId: 'upz-muktagacha', nameEn: 'Kashimpur Union', nameBn: 'কাশিমপুর ইউনিয়ন' },
    { id: 'un-kumargata', upazilaId: 'upz-muktagacha', nameEn: 'Kumargata Union', nameBn: 'কুমারগাতা ইউনিয়ন' },
    { id: 'un-ghoga', upazilaId: 'upz-muktagacha', nameEn: 'Ghoga Union', nameBn: 'ঘোগা ইউনিয়ন' }
  ],
  'upz-mym-sadar': [
    { id: 'un-dapunia', upazilaId: 'upz-mym-sadar', nameEn: 'Dapunia Union', nameBn: 'দাপুনিয়া ইউনিয়ন' },
    { id: 'un-bhabakhali', upazilaId: 'upz-mym-sadar', nameEn: 'Bhabakhali Union', nameBn: 'ভাবখালী ইউনিয়ন' }
  ],
  'upz-net-sadar': [
    { id: 'un-challisha', upazilaId: 'upz-net-sadar', nameEn: 'Challisha Union', nameBn: 'চল্লিশা ইউনিয়ন' },
    { id: 'un-rouha', upazilaId: 'upz-net-sadar', nameEn: 'Rouha Union', nameBn: 'রৌহা ইউনিয়ন' },
    { id: 'un-madankati', upazilaId: 'upz-net-sadar', nameEn: 'Madankati Union', nameBn: 'মদনকাটি ইউনিয়ন' }
  ],
  'upz-kendua': [
    { id: 'un-ashujia', upazilaId: 'upz-kendua', nameEn: 'Ashujia Union', nameBn: 'আশুজিয়া ইউনিয়ন' },
    { id: 'un-sandikona', upazilaId: 'upz-kendua', nameEn: 'Sandikona Union', nameBn: 'সান্দিকোনা ইউনিয়ন' }
  ],
  'upz-keraniganj': [
    { id: 'un-kolatia', upazilaId: 'upz-keraniganj', nameEn: 'Kolatia Union', nameBn: 'কলাতিয়া ইউনিয়ন' },
    { id: 'un-hazratpur', upazilaId: 'upz-keraniganj', nameEn: 'Hazratpur Union', nameBn: 'হযরতপুর ইউনিয়ন' },
    { id: 'un-taranagar', upazilaId: 'upz-keraniganj', nameEn: 'Taranagar Union', nameBn: 'তারানগর ইউনিয়ন' }
  ],
  'upz-savar': [
    { id: 'un-savar-union', upazilaId: 'upz-savar', nameEn: 'Savar Union', nameBn: 'সাভার ইউনিয়ন' },
    { id: 'un-dhamsona', upazilaId: 'upz-savar', nameEn: 'Dhamsona Union', nameBn: 'ধামসোনা ইউনিয়ন' }
  ]
};

export const FALLBACK_WARDS: Record<string, GeoWard[]> = {
  'un-kolatia': [
    { id: 'ward-kol-01', unionId: 'un-kolatia', wardNumber: 'Ward 01', nameEn: 'Ward 01 (Kolatia)', nameBn: '১ নং ওয়ার্ড (কলাতিয়া)' },
    { id: 'ward-kol-02', unionId: 'un-kolatia', wardNumber: 'Ward 02', nameEn: 'Ward 02 (Kolatia)', nameBn: '২ নং ওয়ার্ড (কলাতিয়া)' },
    { id: 'ward-kol-03', unionId: 'un-kolatia', wardNumber: 'Ward 03', nameEn: 'Ward 03 (Kolatia)', nameBn: '৩ নং ওয়ার্ড (কলাতিয়া)' }
  ],
  'un-kashimpur': [
    { id: 'ward-kas-01', unionId: 'un-kashimpur', wardNumber: 'Ward 01', nameEn: 'Ward 01 (Kashimpur)', nameBn: '১ নং ওয়ার্ড (কাশিমপুর)' },
    { id: 'ward-kas-02', unionId: 'un-kashimpur', wardNumber: 'Ward 02', nameEn: 'Ward 02 (Kashimpur)', nameBn: '২ নং ওয়ার্ড (কাশিমপুর)' }
  ],
  'un-challisha': [
    { id: 'ward-cha-01', unionId: 'un-challisha', wardNumber: 'Ward 01', nameEn: 'Ward 01 (Challisha)', nameBn: '১ নং ওয়ার্ড (চল্লিশা)' }
  ]
};
