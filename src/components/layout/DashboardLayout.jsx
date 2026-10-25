// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar (drawer) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-40 lg:hidden">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Main column: header + content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen((s) => !s)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}