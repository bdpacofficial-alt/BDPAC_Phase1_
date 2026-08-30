-- ==============================================================================
-- BDPAC (Bangladesh Political Analysis Centre) Location & Org Seed Data
-- ==============================================================================

-- 1. Seed All 8 Divisions of Bangladesh
INSERT INTO public.divisions (id, name_en, name_bn, code) VALUES
('div-dhaka', 'Dhaka Division', 'ঢাকা বিভাগ', 'DHAKA'),
('div-mymensingh', 'Mymensingh Division', 'ময়মনসিংহ বিভাগ', 'MYMENSINGH'),
('div-chattogram', 'Chattogram Division', 'চট্টগ্রাম বিভাগ', 'CHATTOGRAM'),
('div-rajshahi', 'Rajshahi Division', 'রাজশাহী বিভাগ', 'RAJSHAHI'),
('div-khulna', 'Khulna Division', 'খুলনা বিভাগ', 'KHULNA'),
('div-barishal', 'Barishal Division', 'বরিশাল বিভাগ', 'BARISHAL'),
('div-sylhet', 'Sylhet Division', 'সিলেট বিভাগ', 'SYLHET'),
('div-rangpur', 'Rangpur Division', 'রংপুর বিভাগ', 'RANGPUR')
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_bn = EXCLUDED.name_bn,
    code = EXCLUDED.code;

-- 2. Seed Districts
INSERT INTO public.districts (id, division_id, name_en, name_bn, code) VALUES
-- Mymensingh Division Districts
('dist-mymensingh', 'div-mymensingh', 'Mymensingh District', 'ময়মনসিংহ জেলা', 'MYM'),
('dist-netrokona', 'div-mymensingh', 'Netrokona District', 'নেত্রকোণা জেলা', 'NET'),
('dist-jamalpur', 'div-mymensingh', 'Jamalpur District', 'জামালপুর জেলা', 'JAM'),
('dist-sherpur', 'div-mymensingh', 'Sherpur District', 'শেরপুর জেলা', 'SHE'),

-- Dhaka Division Districts
('dist-dhaka', 'div-dhaka', 'Dhaka District', 'ঢাকা জেলা', 'DHK'),
('dist-gazipur', 'div-dhaka', 'Gazipur District', 'গাজীপুর জেলা', 'GAZ'),
('dist-narayanganj', 'div-dhaka', 'Narayanganj District', 'নারায়ণগঞ্জ জেলা', 'NAR'),
('dist-tangail', 'div-dhaka', 'Tangail District', 'টাঙ্গাইল জেলা', 'TAN'),
('dist-faridpur', 'div-dhaka', 'Faridpur District', 'ফরিদপুর জেলা', 'FAR'),

-- Chattogram Division Districts
('dist-chattogram', 'div-chattogram', 'Chattogram District', 'চট্টগ্রাম জেলা', 'CTG'),
('dist-coxsbazar', 'div-chattogram', 'Cox's Bazar District', 'কক্সবাজার জেলা', 'COX'),
('dist-cumilla', 'div-chattogram', 'Cumilla District', 'কুমিল্লা জেলা', 'CUM'),

-- Rajshahi Division Districts
('dist-rajshahi', 'div-rajshahi', 'Rajshahi District', 'রাজশাহী জেলা', 'RAJ'),
('dist-bogra', 'div-rajshahi', 'Bogura District', 'বগুড়া জেলা', 'BOG'),

-- Khulna Division Districts
('dist-khulna', 'div-khulna', 'Khulna District', 'খুলনা জেলা', 'KHU'),
('dist-jessore', 'div-khulna', 'Jashore District', 'যশোর জেলা', 'JAS'),

-- Barishal Division Districts
('dist-barishal', 'div-barishal', 'Barishal District', 'বরিশাল জেলা', 'BAR'),

-- Sylhet Division Districts
('dist-sylhet', 'div-sylhet', 'Sylhet District', 'সিলেট জেলা', 'SYL'),

-- Rangpur Division Districts
('dist-rangpur', 'div-rangpur', 'Rangpur District', 'রংপুর জেলা', 'RAN')
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_bn = EXCLUDED.name_bn,
    code = EXCLUDED.code;

-- 3. Seed Upazilas (Detailed for Mymensingh, Netrokona, Dhaka)
INSERT INTO public.upazilas (id, district_id, name_en, name_bn, code) VALUES
-- Mymensingh District Upazilas
('upz-mym-sadar', 'dist-mymensingh', 'Mymensingh Sadar', 'ময়মনসিংহ সদর', 'MYM-SAD'),
('upz-muktagacha', 'dist-mymensingh', 'Muktagacha', 'মুক্তাগাছা', 'MUK'),
('upz-trishal', 'dist-mymensingh', 'Trishal', 'ত্রিশাল', 'TRI'),
('upz-bhaluka', 'dist-mymensingh', 'Bhaluka', 'ভালুকা', 'BHA'),
('upz-fulbaria', 'dist-mymensingh', 'Fulbaria', 'ফুলবাড়িয়া', 'FUL'),
('upz-gafargaon', 'dist-mymensingh', 'Gafargaon', 'গফরগাঁও', 'GAF'),
('upz-ishwarganj', 'dist-mymensingh', 'Ishwarganj', 'ঈশ্বরগঞ্জ', 'ISH'),
('upz-nandail', 'dist-mymensingh', 'Nandail', 'নান্দাইল', 'NAN'),
('upz-gauripur', 'dist-mymensingh', 'Gauripur', 'গৌরীপুর', 'GAU'),
('upz-haluaghat', 'dist-mymensingh', 'Haluaghat', 'হালুয়াঘাট', 'HAL'),
('upz-dhobaura', 'dist-mymensingh', 'Dhobaura', 'ধোবাউড়া', 'DHO'),
('upz-taraikanda', 'dist-mymensingh', 'Taraikanda', 'তারাকান্দা', 'TAR'),

-- Netrokona District Upazilas
('upz-net-sadar', 'dist-netrokona', 'Netrokona Sadar', 'নেত্রকোণা সদর', 'NET-SAD'),
('upz-kendua', 'dist-netrokona', 'Kendua', 'কেন্দুয়া', 'KEN'),
('upz-madan', 'dist-netrokona', 'Madan', 'মদন', 'MAD'),
('upz-mohanganj', 'dist-netrokona', 'Mohanganj', 'মোহনগঞ্জ', 'MOH'),
('upz-barhatta', 'dist-netrokona', 'Barhatta', 'বারহাট্টা', 'BAR'),
('upz-durgapur', 'dist-netrokona', 'Durgapur', 'দুর্গাপুর', 'DUR'),
('upz-kalmakanda', 'dist-netrokona', 'Kalmakanda', 'কলমাকান্দা', 'KAL'),
('upz-purbadhala', 'dist-netrokona', 'Purbadhala', 'পূর্বধলা', 'PUR'),
('upz-atpara', 'dist-netrokona', 'Atpara', 'আটপাড়া', 'ATP'),
('upz-khaliajuri', 'dist-netrokona', 'Khaliajuri', 'খালিয়াজুড়ি', 'KHA'),

-- Dhaka District Upazilas
('upz-keraniganj', 'dist-dhaka', 'Keraniganj', 'কেরানীগঞ্জ', 'KER'),
('upz-savar', 'dist-dhaka', 'Savar', 'সাভার', 'SAV'),
('upz-dhamrai', 'dist-dhaka', 'Dhamrai', 'ধামরাই', 'DHA'),
('upz-dohar', 'dist-dhaka', 'Dohar', 'দোহার', 'DOH'),
('upz-nawabganj', 'dist-dhaka', 'Nawabganj', 'নবাবগঞ্জ', 'NAW')
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_bn = EXCLUDED.name_bn;

-- 4. Seed Unions
INSERT INTO public.unions (id, upazila_id, name_en, name_bn, code) VALUES
-- Mymensingh Muktagacha Unions
('un-kashimpur', 'upz-muktagacha', 'Kashimpur Union', 'কাশিমপুর ইউনিয়ন', 'KAS'),
('un-kumargata', 'upz-muktagacha', 'Kumargata Union', 'কুমারগাতা ইউনিয়ন', 'KUM'),
('un-ghoga', 'upz-muktagacha', 'Ghoga Union', 'ঘোগা ইউনিয়ন', 'GHO'),
('un-dapunia', 'upz-mym-sadar', 'Dapunia Union', 'দাপুনিয়া ইউনিয়ন', 'DAP'),
('un-bhabakhali', 'upz-mym-sadar', 'Bhabakhali Union', 'ভাবখালী ইউনিয়ন', 'BHA'),

-- Netrokona Sadar & Kendua Unions
('un-challisha', 'upz-net-sadar', 'Challisha Union', 'চল্লিশা ইউনিয়ন', 'CHA'),
('un-rouha', 'upz-net-sadar', 'Rouha Union', 'রৌহা ইউনিয়ন', 'ROU'),
('un-madankati', 'upz-net-sadar', 'Madankati Union', 'মদনকাটি ইউনিয়ন', 'MAD'),
('un-ashujia', 'upz-kendua', 'Ashujia Union', 'আশু his ইউনিয়ন', 'ASH'),
('un-sandikona', 'upz-kendua', 'Sandikona Union', 'সান্দিকোনা ইউনিয়ন', 'SAN'),

-- Keraniganj & Savar Unions
('un-kolatia', 'upz-keraniganj', 'Kolatia Union', 'কলাতিয়া ইউনিয়ন', 'KOL'),
('un-hazratpur', 'upz-keraniganj', 'Hazratpur Union', 'হযরতপুর ইউনিয়ন', 'HAZ'),
('un-taranagar', 'upz-keraniganj', 'Taranagar Union', 'তারানগর ইউনিয়ন', 'TAR'),
('un-savar-union', 'upz-savar', 'Savar Union', 'সাভার ইউনিয়ন', 'SAV-U'),
('un-dhamsona', 'upz-savar', 'Dhamsona Union', 'ধামসোনা ইউনিয়ন', 'DHA-U')
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_bn = EXCLUDED.name_bn;

-- 5. Seed Wards
INSERT INTO public.wards (id, union_id, upazila_id, ward_number, name_en, name_bn) VALUES
('ward-kol-01', 'un-kolatia', 'upz-keraniganj', 'Ward 01', 'Ward 01 (Kolatia)', '১ নং ওয়ার্ড (কলাতিয়া)'),
('ward-kol-02', 'un-kolatia', 'upz-keraniganj', 'Ward 02', 'Ward 02 (Kolatia)', '২ নং ওয়ার্ড (কলাতিয়া)'),
('ward-kol-03', 'un-kolatia', 'upz-keraniganj', 'Ward 03', 'Ward 03 (Kolatia)', '৩ নং ওয়ার্ড (কলাতিয়া)'),
('ward-kas-01', 'un-kashimpur', 'upz-muktagacha', 'Ward 01', 'Ward 01 (Kashimpur)', '১ নং ওয়ার্ড (কাশিমপুর)'),
('ward-kas-02', 'un-kashimpur', 'upz-muktagacha', 'Ward 02', 'Ward 02 (Kashimpur)', '২ নং ওয়ার্ড (কাশিমপুর)'),
('ward-cha-01', 'un-challisha', 'upz-net-sadar', 'Ward 01', 'Ward 01 (Challisha)', '১ নং ওয়ার্ড (চল্লিশা)')
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_bn = EXCLUDED.name_bn;

-- 6. Seed Organizations / Central & Divisional Units
INSERT INTO public.organizations (id, name_en, name_bn, level, description, status) VALUES
('a0000000-0000-0000-0000-000000000001', 'National Executive Committee', 'জাতীয় নির্বাহী কমিটি', 'national', 'Apex central governing council of BDPAC', 'active'),
('a0000000-0000-0000-0000-000000000002', 'Dhaka Division Steering Committee', 'ঢাকা বিভাগীয় স্টিয়ারিং কমিটি', 'division', 'Zonal management unit for Dhaka Division', 'active'),
('a0000000-0000-0000-0000-000000000003', 'Mymensingh Division Steering Committee', 'ময়মনসিংহ বিভাগীয় স্টিয়ারিং কমিটি', 'division', 'Zonal management unit for Mymensingh Division', 'active'),
('a0000000-0000-0000-0000-000000000004', 'Netrokona District Committee', 'নেত্রকোণা জেলা কমিটি', 'district', 'District operations committee for Netrokona', 'active'),
('a0000000-0000-0000-0000-000000000005', 'Mymensingh District Committee', 'ময়মনসিংহ জেলা কমিটি', 'district', 'District operations committee for Mymensingh', 'active')
ON CONFLICT (id) DO UPDATE SET
    name_en = EXCLUDED.name_en,
    name_bn = EXCLUDED.name_bn,
    level = EXCLUDED.level;
