import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, MapPin, Star, HelpCircle, FileText, LogOut, Store, Moon, Sun } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import useUiStore from '../../stores/uiStore';

function Toggle({ checked, onClick, label, theme }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={checked}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`relative h-7 w-12 rounded-full transition-all duration-300 ${theme ? 'theme-toggle-track' : checked ? 'bg-brand' : 'bg-surface-elevated border border-border'}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 flex items-center justify-center ${checked ? 'left-6' : 'left-1'}`}
      >
        {theme && (checked ? <Moon size={12} className="text-brand" /> : <Sun size={12} className="text-accent" />)}
      </span>
    </button>
  );
}

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, notificationsEnabled, toggleTheme, toggleNotifications } = useUiStore();
  const isDark = theme === 'dark';

  const settings = [
    { icon: MapPin, label: 'Location', value: 'MG Road, Shillong' },
    { icon: Store, label: 'Register your salon', value: 'Start partner setup', onClick: () => navigate('/register-salon') },
    { icon: Bell, label: 'Notifications', value: 'toggle', checked: notificationsEnabled, onClick: toggleNotifications },
    { icon: isDark ? Moon : Sun, label: 'Dark mode', value: 'theme', checked: isDark, onClick: toggleTheme },
    { icon: Star, label: 'My Reviews', value: null },
    { icon: HelpCircle, label: 'Help & Support', value: null },
    { icon: FileText, label: 'Terms & Privacy', value: null },
  ];

  return (
    <div className="px-4 pb-8">
      <h2 className="text-xl font-bold text-text-primary mb-6">Profile</h2>

      {/* Profile Card */}
      <div className="flex items-center gap-4 p-5 bg-surface-card rounded-xl shadow-xs mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand text-2xl font-bold">
          {user?.name?.charAt(0) || 'G'}
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">{user?.name || 'Guest'}</h3>
          <p className="text-sm text-text-tertiary">{user?.phone || 'No phone added'}</p>
          <button className="text-xs text-brand font-semibold mt-1">Edit</button>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-surface-card rounded-xl shadow-xs divide-y divide-border">
        {settings.map((item, i) => (
          <button
            type="button"
            key={i}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 text-left cursor-pointer active:bg-surface-elevated transition-colors min-h-[56px]"
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">{item.label}</span>
            </div>
            {item.value === 'toggle' ? (
              <Toggle checked={item.checked} onClick={item.onClick} label="Toggle notifications" />
            ) : item.value === 'theme' ? (
              <Toggle checked={item.checked} onClick={item.onClick} label="Toggle dark mode" theme />
            ) : item.value ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-text-tertiary">{item.value}</span>
                <ChevronRight size={14} className="text-text-tertiary" />
              </div>
            ) : (
              <ChevronRight size={14} className="text-text-tertiary" />
            )}
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <button
        onClick={() => { logout(); navigate('/'); }}
        className="w-full flex items-center justify-center gap-2 mt-6 py-3 text-sm font-semibold text-status-busy"
      >
        <LogOut size={16} />
        Sign Out
      </button>

      {/* App Info */}
      <div className="text-center mt-8">
        <p className="text-xs font-semibold text-text-tertiary">SalonFi v1.0</p>
        <p className="text-xs text-text-tertiary mt-1">Made for local salons</p>
      </div>
    </div>
  );
}