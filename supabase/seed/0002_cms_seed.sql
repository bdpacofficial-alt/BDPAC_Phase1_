-- ==============================================================================
-- BDPAC CMS Core Seed Data - Phase 1 Extensibility
-- ==============================================================================

-- 1. Seed Core Modules
INSERT INTO public.cms_modules (id, name, slug, description, icon, route, category, status, visibility, sort_order, is_core) VALUES
('b0000000-0000-0000-0000-000000000001', 'Public Website', 'public-website', 'Main public-facing portal and landing pages', 'Globe', '/', 'public', 'active', 'public', 1, true),
('b0000000-0000-0000-0000-000000000002', 'Member Portal', 'member-portal', 'Authenticated member services and digital ID card', 'UserCircle', '/dashboard', 'member', 'active', 'authenticated', 2, true),
('b0000000-0000-0000-0000-000000000003', 'Member Directory', 'member-directory', 'Nationwide member roster search and verification', 'Users', '/directory', 'member', 'active', 'approved_members', 3, true),
('b0000000-0000-0000-0000-000000000004', 'Admin CMS Center', 'admin-cms', 'WordPress-style content and extensible module control center', 'Sliders', '/admin/cms', 'admin', 'active', 'admin_only', 4, true),
('b0000000-0000-0000-0000-000000000005', 'Member Governance', 'admin-members', 'Member approval, status verification and RBAC delegation', 'UserCheck', '/admin/members', 'governance', 'active', 'admin_only', 5, true),
('b0000000-0000-0000-0000-000000000006', 'Organization Hierarchy', 'organization-hierarchy', 'Central, Division, District and Ward committee administration', 'Building2', '/organization', 'governance', 'active', 'approved_members', 6, true),
('b0000000-0000-0000-0000-000000000007', 'News & Announcements', 'news-feed', 'Live political analysis feed, official circulars and press releases', 'Newspaper', '/feed', 'public', 'active', 'public', 7, false),
('b0000000-0000-0000-0000-000000000008', 'AI Research Assistant', 'ai-research-assistant', 'Political intelligence analysis & automated policy summarizer', 'Bot', '/ai', 'tools', 'active', 'approved_members', 8, false),
('b0000000-0000-0000-0000-000000000009', 'Event & Rally Management', 'events-management', 'Nationwide conference, rally and zonal gathering scheduler', 'Calendar', '/events', 'member', 'active', 'approved_members', 9, false),
('b0000000-0000-0000-0000-000000000010', 'Document Repository', 'document-repository', 'Constitutional documents, policy drafts and official whitepapers', 'FileText', '/documents', 'member', 'active', 'approved_members', 10, false),
('b0000000-0000-0000-0000-000000000011', 'Polling & Surveys', 'polling-surveys', 'Grassroots sentiment analysis and internal voting polls', 'Vote', '/polls', 'member', 'active', 'approved_members', 11, false),
('b0000000-0000-0000-0000-000000000012', 'Security SOC Operations', 'security-soc', 'Threat intelligence, audit log forensics and DDoS monitoring', 'ShieldAlert', '/security-soc', 'admin', 'active', 'owner_only', 12, true)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    status = EXCLUDED.status,
    visibility = EXCLUDED.visibility,
    sort_order = EXCLUDED.sort_order;

-- 2. Seed Core Features
INSERT INTO public.cms_features (id, module_id, name, slug, description, status, visibility, route, icon, sort_order, configuration) VALUES
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'Digital ID Card Generator', 'digital-id-card', 'Cryptographically verified dynamic member badge with QR verification', 'active', 'authenticated', '/profile', 'CreditCard', 1, '{"enable_qr": true, "enable_download": true, "show_blood_group": true}'::jsonb),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003', 'Cascading Location Search', 'cascading-location-search', 'Division, district, upazila and ward filter engine', 'active', 'approved_members', '/directory', 'MapPin', 2, '{"max_results": 100, "show_filters": true}'::jsonb),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000005', 'One-Click Member Approval', 'one-click-member-approval', 'Admin instant review, approve, suspend and reject with reason', 'active', 'admin_only', '/admin/members', 'CheckSquare', 3, '{"require_rejection_reason": true, "send_email_notification": true}'::jsonb),
('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000008', 'AI Policy Bot Chat', 'ai-policy-bot', 'Interactive research assistant grounded in BDPAC publications', 'active', 'approved_members', '/ai', 'Bot', 4, '{"model": "gemini-1.5-pro", "temperature": 0.3}'::jsonb),
('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000009', 'Event Scheduler', 'event-scheduler', 'Party conference organizer with RSVP and attendance', 'active', 'approved_members', '/events', 'Calendar', 5, '{"enable_rsvp": true}'::jsonb),
('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000011', 'Grassroots Poll Engine', 'grassroots-poll-engine', 'Secure single-choice and multi-choice member voting', 'active', 'approved_members', '/polls', 'Vote', 6, '{"allow_anonymous": false}'::jsonb),
('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 'WebRTC Video Conferencing', 'webrtc-video-conferencing', 'Virtual meeting room and live streaming gateway', 'draft', 'approved_members', '/meetings', 'Video', 7, '{"max_participants": 50, "status": "pending_external_sfu"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    status = EXCLUDED.status,
    visibility = EXCLUDED.visibility;

-- 3. Seed Core Pages
INSERT INTO public.cms_pages (id, title, slug, content, excerpt, status, visibility, seo_title, seo_description, template) VALUES
('d0000000-0000-0000-0000-000000000001', 'About BDPAC', 'about', '# About Bangladesh Political Analysis Centre\n\nBDPAC is an independent political analysis, research, and grassroots organizational management platform.', 'Overview of BDPAC mission, values, and democratic research.', 'published', 'public', 'About BDPAC • Bangladesh Political Analysis Centre', 'Learn about BDPAC research, political data analytics, and digital membership infrastructure.', 'default'),
('d0000000-0000-0000-0000-000000000002', 'Security Architecture', 'security', '# Security & Data Governance\n\nBDPAC employs enterprise-grade PostgreSQL Row Level Security (RLS), encrypted authentication sessions, and location-scoped administrative authorization.', 'Detailed overview of BDPAC security, encryption, and data protection architecture.', 'published', 'public', 'Security Architecture • BDPAC', 'Enterprise data security, encryption, and RBAC governance at BDPAC.', 'default'),
('d0000000-0000-0000-0000-000000000003', 'Code of Conduct & Constitution', 'code-of-conduct', '# Organizational Code of Conduct\n\nAll registered BDPAC members must adhere to the core principles of grassroots democracy, constitutional integrity, and transparent governance.', 'Official rules, ethics, and code of conduct for registered members.', 'published', 'public', 'Member Code of Conduct • BDPAC', 'Official ethical guidelines and member rules for BDPAC.', 'default'),
('d0000000-0000-0000-0000-000000000004', 'Privacy Policy', 'privacy-policy', '# Privacy Policy\n\nBDPAC respects member privacy. Personal data including National ID numbers and contact info are safeguarded with strict access controls.', 'Information on how member data is collected, stored, and protected.', 'published', 'public', 'Privacy Policy • BDPAC', 'Member privacy policy and data governance rules.', 'default')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    visibility = EXCLUDED.visibility;

-- 4. Seed Homepage Sections
INSERT INTO public.cms_sections (id, section_key, title, subtitle, status, visibility, sort_order, configuration) VALUES
('e0000000-0000-0000-0000-000000000001', 'hero', 'বাংলাদেশ পলিটিক্যাল অ্যানালাইসিস সেন্টার (BDPAC)', 'ডিজিটাল যুগে আধুনিক রাজনৈতিক বিশ্লেষণ, তৃণমূল ডেটাবেজ ও সুসংগঠিত নেতৃত্বের স্মার্ট নেটওয়ার্ক', 'published', 'public', 1, '{"button_primary_text": "সদস্যপদ নিবন্ধন করুন", "button_primary_url": "/registration", "button_secondary_text": "প্ল্যাটফর্ম পরিচিতি", "button_secondary_url": "/about", "badge_text": "জাতীয় রাজনৈতিক ডেটাবেজ ২০২৬"}'::jsonb),
('e0000000-0000-0000-0000-000000000002', 'features', 'প্ল্যাটফর্মের মূল সুবিধাসমূহ (Key Features)', 'রাজনৈতিক তথ্যের নিরাপত্তা, ডিজিটাল সদস্যপদ ও সুদৃঢ় সাংগঠনিক সমন্বয়', 'published', 'public', 2, '{"show_icons": true, "max_items": 6}'::jsonb),
('e0000000-0000-0000-0000-000000000003', 'stats', 'জাতীয় নেটওয়ার্ক পরিসংখ্যান (Real-Time Metrics)', 'সারাদেশে ছড়িয়ে থাকা নেতাকর্মী ও ডিজিটাল কার্যক্রমের রিয়েল-টাইম সারসংক্ষেপ', 'published', 'public', 3, '{"show_divisions": true, "live_counter": true}'::jsonb),
('e0000000-0000-0000-0000-000000000004', 'news_circulars', 'সর্বশেষ সংবাদ ও সার্কুলার (Latest Circulars)', 'কেন্দ্রীয় নীতি-নির্ধারণী ঘোষণা, প্রেস রিলিজ ও আঞ্চলিক কার্যক্রম', 'published', 'public', 4, '{"max_cards": 4, "show_announcements": true}'::jsonb),
('e0000000-0000-0000-0000-000000000005', 'ai_assistant', 'এআই রাজনৈতিক গবেষণা সহকারী (AI Assistant)', 'নির্বাচনী এলাকার ডেমোগ্রাফি, নীতি বিশ্লেষণ ও জনমত সমীক্ষায় কৃত্রিম বুদ্ধিমত্তা', 'published', 'public', 5, '{"enabled": true, "cta_url": "/ai"}'::jsonb),
('e0000000-0000-0000-0000-000000000006', 'security_trust', 'সাইবার নিরাপত্তা ও তথ্যের সুরক্ষা (Security Architecture)', 'আন্তর্জাতিক মানের এনক্রিপশন ও শতভাগ নিরাপদ ডাটাবেজ আর্কিটেকচার', 'published', 'public', 6, '{"compliance": "ISO/IEC 27001 standard aligned"}'::jsonb),
('e0000000-0000-0000-0000-000000000007', 'app_download', 'মোবাইল অ্যাপ সংস্করণ (BDPAC Mobile App)', 'যে কোনো স্থান থেকে সহজে দলীয় যোগাযোগ ও ডিজিটাল পরিচয়পত্র অ্যাক্সেস করুন', 'published', 'public', 7, '{"android_url": "#", "ios_url": "#"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    status = EXCLUDED.status,
    configuration = EXCLUDED.configuration;

-- 5. Seed Banners
INSERT INTO public.cms_banners (id, title, subtitle, image_url, button_text, button_url, status, visibility, sort_order) VALUES
('f0000000-0000-0000-0000-000000000001', 'BDPAC জাতীয় সদস্যপদ নবায়ন ও নিবন্ধন ২০২৬', 'সারাদেশের সকল জেলা ও উপজেলায় নতুন সদস্য নিবন্ধন কার্যক্রম চলমান রয়েছে।', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80', 'নিবন্ধন করুন', '/registration', 'active', 'public', 1),
('f0000000-0000-0000-0000-000000000002', 'ডিজিটাল আইডি কার্ড ও ভেরিফিকেশন সার্ভিস', 'আপনার নিজস্ব স্মার্ট মেম্বার কার্ড ও কিউআর কোড অ্যাক্সেস করুন।', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80', 'প্রোফাইল দেখুন', '/profile', 'active', 'authenticated', 2)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    image_url = EXCLUDED.image_url;

-- 6. Seed Feature Flags
INSERT INTO public.cms_feature_flags (id, key, name, description, enabled, visibility, configuration) VALUES
('g0000000-0000-0000-0000-000000000001', 'ai_assistant_enabled', 'AI Research Assistant', 'Enable or disable AI analysis suite across member dashboard', true, 'approved_members', '{"model": "gemini-1.5-pro"}'::jsonb),
('g0000000-0000-0000-0000-000000000002', 'public_registration_enabled', 'Public Member Registration', 'Allow new public visitors to register for membership online', true, 'public', '{"require_nid": true, "auto_approve": false}'::jsonb),
('g0000000-0000-0000-0000-000000000003', 'member_directory_public', 'Public Member Directory View', 'Allow unauthenticated guests to search approved directory', true, 'public', '{"mask_phone_numbers": true}'::jsonb),
('g0000000-0000-0000-0000-000000000004', 'polls_enabled', 'Voting & Polling Module', 'Enable member voting on policy and organizational issues', true, 'approved_members', '{}'::jsonb),
('g0000000-0000-0000-0000-000000000005', 'events_enabled', 'Events & Rallies Management', 'Calendar and conference scheduling module', true, 'approved_members', '{}'::jsonb),
('g0000000-0000-0000-0000-000000000006', 'documents_enabled', 'Document Library & Whitepapers', 'Official policy documents and research publication downloads', true, 'approved_members', '{}'::jsonb),
('g0000000-0000-0000-0000-000000000007', 'webrtc_calls_enabled', 'Live WebRTC Voice/Video Calling', 'Direct peer audio and video communications', false, 'approved_members', '{"reason": "pending_sfu_cluster"}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    enabled = EXCLUDED.enabled;

-- 7. Seed CMS Settings
INSERT INTO public.cms_settings (id, category, key, value, description, is_public) VALUES
('h0000000-0000-0000-0000-000000000001', 'general', 'site_identity', '{"name_en": "Bangladesh Political Analysis Centre", "name_bn": "বাংলাদেশ পলিটিক্যাল অ্যানালাইসিস সেন্টার", "short_code": "BDPAC", "tagline": "Data-Driven Grassroots Political Research Platform", "established": "2026"}'::jsonb, 'Site title, branding texts and established metadata', true),
('h0000000-0000-0000-0000-000000000002', 'branding', 'theme_colors', '{"primary": "#0284c7", "secondary": "#10b981", "accent": "#f59e0b", "dark_background": "#0f172a", "light_background": "#f8fafc"}'::jsonb, 'Primary, secondary, and accent theme color codes', true),
('h0000000-0000-0000-0000-000000000003', 'contact', 'headquarters', '{"address": "Central Office, Gulshan-2, Dhaka, Bangladesh", "email": "contact@bdpac.org", "phone": "+880 2-9880000", "emergency_helpline": "16263"}'::jsonb, 'Public contact numbers, email, and address info', true),
('h0000000-0000-0000-0000-000000000004', 'security', 'governance_policies', '{"require_admin_approval": true, "session_timeout_minutes": 120, "max_login_attempts": 5, "enforce_device_fingerprint": true}'::jsonb, 'Security threshold controls and login security policies', false)
ON CONFLICT (id) DO UPDATE SET
    value = EXCLUDED.value,
    is_public = EXCLUDED.is_public;
