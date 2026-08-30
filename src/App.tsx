import React from 'react';
import { usePathname } from './next-shims/navigation';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CallProvider } from './context/CallContext';
import { LanguageProvider } from './context/LanguageContext';
import { CmsProvider } from './context/CmsContext';
import { ShellLayout } from './components/layout/ShellLayout';

import HomePage from './app/page';
import AboutPage from './app/about/page';
import AdminPage from './app/admin/page';
import AdminCmsPage from './app/admin/cms/page';
import AdminMembersPage from './app/admin/members/page';
import AdminOrganizationPage from './app/admin/organization/page';
import AIPage from './app/ai/page';
import AuditPage from './app/audit/page';
import CalendarPage from './app/calendar/page';
import CallsPage from './app/calls/page';
import ChatPage from './app/chat/page';
import ContactPage from './app/contact/page';
import DashboardPage from './app/dashboard/page';
import DeveloperPage from './app/developer/page';
import DirectoryPage from './app/directory/page';
import DocumentsPage from './app/documents/page';
import EventsPage from './app/events/page';
import FeaturesPage from './app/features/page';
import FeedPage from './app/feed/page';
import IdentityPage from './app/identity/page';
import LaunchPage from './app/launch/page';
import LoginPage from './app/login/page';
import MediaPage from './app/media/page';
import MeetingsPage from './app/meetings/page';
import MobileAppPage from './app/mobile-app/page';
import NotificationsPage from './app/notifications/page';
import OrganizationPage from './app/organization/page';
import PollsPage from './app/polls/page';
import ProfilePage from './app/profile/page';
import RegistrationPage from './app/registration/page';
import ReportsPage from './app/reports/page';
import SearchPage from './app/search/page';
import SecurityPage from './app/security/page';
import SecuritySocPage from './app/security-soc/page';
import SettingsPage from './app/settings/page';
import SuperAdminPage from './app/super-admin/page';
import SupportPage from './app/support/page';
import TasksPage from './app/tasks/page';
import TrainingPage from './app/training/page';
import VerificationPage from './app/verification/page';

export function Router() {
  const pathname = usePathname();

  const renderPage = () => {
    switch (pathname) {
      // 1. PUBLIC WEBSITE
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/features':
        return <FeaturesPage />;
      case '/security':
        return <SecurityPage />;
      case '/mobile-app':
        return <MobileAppPage />;
      case '/contact':
        return <ContactPage />;
      case '/login':
        return <LoginPage />;
      case '/registration':
        return <RegistrationPage />;

      // 2. MEMBER PORTAL
      case '/dashboard':
        return <DashboardPage />;
      case '/feed':
        return <FeedPage />;
      case '/directory':
        return <DirectoryPage />;
      case '/chat':
        return <ChatPage />;
      case '/calls':
      case '/communication':
      case '/communication/voice':
      case '/communication/video':
        return <CallsPage />;
      case '/meetings':
        return <MeetingsPage />;
      case '/ai':
        return <AIPage />;
      case '/tasks':
        return <TasksPage />;
      case '/events':
        return <EventsPage />;
      case '/documents':
        return <DocumentsPage />;
      case '/polls':
        return <PollsPage />;
      case '/training':
        return <TrainingPage />;
      case '/reports':
        return <ReportsPage />;
      case '/notifications':
        return <NotificationsPage />;
      case '/identity':
        return <IdentityPage />;
      case '/profile':
        return <ProfilePage />;

      // 3. ADMIN CMS & GOVERNANCE
      case '/admin/cms':
      case '/admin/cms/modules':
      case '/admin/cms/features':
      case '/admin/cms/pages':
      case '/admin/cms/sections':
      case '/admin/cms/banners':
      case '/admin/cms/navigation':
      case '/admin/cms/media':
      case '/admin/cms/settings':
      case '/admin/cms/audit-logs':
        return <AdminCmsPage />;

      case '/admin':
        return <AdminPage />;
      case '/admin/members':
      case '/admin/registration':
        return <AdminMembersPage />;
      case '/admin/organization':
        return <AdminOrganizationPage />;
      case '/organization':
        return <OrganizationPage />;
      case '/verification':
        return <VerificationPage />;

      // 4. SUPER ADMIN
      case '/super-admin':
      case '/super-admin/infrastructure':
      case '/super-admin/database':
      case '/super-admin/storage':
      case '/super-admin/security':
      case '/super-admin/backup':
      case '/super-admin/apis':
      case '/super-admin/ai':
      case '/super-admin/config':
        return <SuperAdminPage />;
      case '/developer':
        return <DeveloperPage />;
      case '/settings':
        return <SettingsPage />;
      case '/security-soc':
        return <SecuritySocPage />;

      // Additional Tools
      case '/audit':
        return <AuditPage />;
      case '/calendar':
        return <CalendarPage />;
      case '/search':
        return <SearchPage />;
      case '/media':
        return <MediaPage />;
      case '/support':
        return <SupportPage />;
      case '/launch':
        return <LaunchPage />;

      default:
        return <HomePage />;
    }
  };

  return <ShellLayout>{renderPage()}</ShellLayout>;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CmsProvider>
            <ToastProvider>
              <CallProvider>
                <Router />
              </CallProvider>
            </ToastProvider>
          </CmsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
