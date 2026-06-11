import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Zap, Calendar, Scissors, Settings, LogOut, Menu, X } from 'lucide-react';

const sidebarItems = [
  { to: '/partner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/partner/queue', icon: Zap, label: 'Live Queue' },
  { to: '/partner/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/partner/services', icon: Scissors, label: 'Services' },
  { to: '/partner/settings', icon: Settings, label: 'Settings' },
];

export default function PartnerShell() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    navigate('/partner/login');
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6">
        <h2 className="text-white text-lg font-bold tracking-tight">🌿 SalonFi</h2>
        <p className="text-brand-muted text-xs font-medium mt-0.5">Partner</p>
      </div>

      {/* Salon Info */}
      <div className="px-6 pb-4 border-b border-white/10">
        <p className="text-white text-sm font-semibold">Studio Verde</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-status-empty" />
          <span className="text-status-empty text-xs font-medium">Open</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 w-full transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-base flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0" style={{ backgroundColor: '#1A1A1A' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64" style={{ backgroundColor: '#1A1A1A' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="touch-target p-1">
            <Menu size={22} className="text-text-primary" />
          </button>
          <h2 className="text-sm font-bold text-text-primary">🌿 SalonFi Partner</h2>
          <div className="w-8" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}