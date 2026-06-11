import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from '../../shared/components/StatusBadge';

const demoBookings = [
  { id: 1, time: '2:30 PM', name: 'Aneek Das', service: 'Haircut (Men)', price: 150, status: 'confirmed' },
  { id: 2, time: '3:00 PM', name: 'Priya Roy', service: 'Hair Wash', price: 200, status: 'pending' },
  { id: 3, time: '3:30 PM', name: 'Riya M.', service: 'Haircut (Women)', price: 300, status: 'confirmed' },
  { id: 4, time: '4:00 PM', name: 'Arjun K.', service: 'Beard Trim', price: 80, status: 'pending' },
  { id: 5, time: '4:30 PM', name: 'Sneha P.', service: 'Threading', price: 30, status: 'cancelled' },
  { id: 6, time: '5:00 PM', name: 'Amit R.', service: 'Haircut (Men)', price: 150, status: 'confirmed' },
  { id: 7, time: '5:30 PM', name: 'Neha S.', service: 'Manicure', price: 250, status: 'confirmed' },
  { id: 8, time: '6:00 PM', name: 'Vikram S.', service: 'Fade Cut', price: 180, status: 'pending' },
  { id: 9, time: '6:30 PM', name: 'Kavya M.', service: 'Pedicure', price: 300, status: 'confirmed' },
  { id: 10, time: '7:00 PM', name: 'Rahul D.', service: 'Hair Color', price: 800, status: 'confirmed' },
  { id: 11, time: '7:30 PM', name: 'Ananya K.', service: 'Facial', price: 400, status: 'confirmed' },
  { id: 12, time: '8:00 PM', name: 'Meera J.', service: 'Haircut (Women)', price: 300, status: 'pending' },
];

const tabs = ['All', 'Confirmed', 'Pending', 'Cancelled'];

export default function BookingsListScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const [date, setDate] = useState(new Date());

  const filtered = demoBookings.filter(b => {
    if (activeTab === 'All') return true;
    return b.status === activeTab.toLowerCase();
  });

  const totalRevenue = demoBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0);

  const changeDate = (days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d);
  };

  const statusColors = {
    confirmed: 'bg-status-empty-bg text-status-empty',
    pending: 'bg-warning-bg text-warning',
    cancelled: 'bg-status-busy-bg text-status-busy',
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeDate(-1)} className="p-1 touch-target"><ChevronLeft size={20} className="text-text-secondary" /></button>
        <h2 className="text-base font-bold text-text-primary">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        <button onClick={() => changeDate(1)} className="p-1 touch-target"><ChevronRight size={20} className="text-text-secondary" /></button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
              activeTab === tab ? 'bg-brand text-white' : 'bg-surface-elevated text-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl shadow-xs overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map(bk => (
            <div key={bk.id} className="flex items-center gap-4 p-4 hover:bg-surface-elevated transition-colors cursor-pointer">
              <span className="text-sm font-bold text-text-primary w-16">{bk.time}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-text-primary">{bk.name}</span>
                <p className="text-xs text-text-tertiary">{bk.service}</p>
              </div>
              <span className="text-sm font-bold text-brand">₹{bk.price}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[bk.status] || 'bg-surface-elevated text-text-tertiary'}`}>
                {bk.status.charAt(0).toUpperCase() + bk.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-text-secondary">
        <span className="font-bold text-text-primary">{demoBookings.length} bookings</span> · ₹{totalRevenue} expected today
      </div>
    </div>
  );
}