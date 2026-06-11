import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, MapPin, Star, HelpCircle, FileText, LogOut } from 'lucide-react';
import useAuthStore from '../../stores/authStore';

const settings = [
  { icon: MapPin, label: 'Location', value: 'MG Road, Shillong' },
  { icon: Bell, label: 'Notifications', value: 'toggle' },
  { icon: Star, label: 'My Reviews', value: null },
  { icon: HelpCircle, label: 'Help & Support', value: null },
  { icon: FileText, label: 'Terms & Privacy', value: null },
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
          <div key={i} className="flex items-center justify-between p-4 cursor-pointer active:bg-surface-elevated transition-colors">
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">{item.label}</span>
            </div>
            {item.value === 'toggle' ? (
              <div className="w-10 h-5 rounded-full bg-brand relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
              </div>
            ) : item.value ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-text-tertiary">{item.value}</span>
                <ChevronRight size={14} className="text-text-tertiary" />
              </div>
            ) : (
              <ChevronRight size={14} className="text-text-tertiary" />
            )}
          </div>
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