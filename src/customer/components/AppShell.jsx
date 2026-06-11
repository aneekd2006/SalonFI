import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Search, CalendarCheck, User } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Search, label: 'Explore' },
  { to: '/bookings', icon: CalendarCheck, label: 'My Bookings' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function CustomerAppShell() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/salon/') || location.pathname.startsWith('/book/');

  if (isDetailPage) {
    return (
      <div className="min-h-screen bg-surface-base flex justify-center">
        <div className="w-full max-w-phone bg-surface-card shadow-phone relative min-h-screen" style={{ maxWidth: '390px' }}>
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base flex justify-center">
      <div className="w-full max-w-phone bg-surface-card shadow-phone relative min-h-screen flex flex-col" style={{ maxWidth: '390px' }}>
        {/* Status Bar */}
        <div className="h-11 bg-surface-card flex items-center justify-between px-6 text-2xs text-text-tertiary font-medium flex-shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="2.5" y="3.5" width="3" height="5" rx="0.5" fill="currentColor" opacity="0.4"/>
              <rect x="6.5" y="4" width="1" height="4" rx="0.3" fill="currentColor" opacity="0.6"/>
              <rect x="8" y="4.5" width="1" height="3" rx="0.3" fill="currentColor" opacity="0.8"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0.5" y="1" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <text x="8" y="8.5" textAnchor="middle" fontSize="5" fill="currentColor" fontWeight="bold">Fi</text>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex-shrink-0 bg-surface-card border-t border-border px-2 pt-1.5 pb-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}>
          <div className="flex items-center justify-around">
            {navItems.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-150"
                  style={{ minHeight: '44px', minWidth: '56px' }}
                >
                  <div className={`p-1.5 rounded-lg transition-colors duration-150 ${isActive ? 'bg-brand-light' : 'bg-transparent'}`}>
                    <Icon size={20} className={isActive ? 'text-brand' : 'text-text-tertiary'} />
                  </div>
                  <span className={`text-2xs font-semibold ${isActive ? 'text-brand' : 'text-text-tertiary'}`}>
                    {label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}