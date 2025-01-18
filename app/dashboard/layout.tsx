'use client';
import { Authenticated } from 'convex/react';
import React from 'react';
import Header from '@/components/Header';
import { NavigationProvider } from '@/lib/NavigationContext';
import SideBar from '@/components/SideBar';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="flex h-screen">
        <Authenticated>
          <SideBar />
        </Authenticated>
        <div className="flex-1">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
}
