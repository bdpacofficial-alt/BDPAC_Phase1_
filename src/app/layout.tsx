import React from 'react';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { CallProvider } from '@/context/CallContext';
import { ShellLayout } from '@/components/layout/ShellLayout';

export const metadata = {
  title: 'Political Private Network Platform (PPN)',
  description: 'Enterprise Private Political Network Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <CallProvider>
                <ShellLayout>{children}</ShellLayout>
              </CallProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
