import React, { useState } from 'react';
import { Users, Clock, CheckCheck, XCircle, Calendar } from 'lucide-react';
import { salons } from '../../shared/data/salons';
import { statusConfig } from '../../shared/data/queueLogic';
import QueueRing from '../../shared/components/QueueRing';

const demoSalon = salons[0];
const queueItems = [
  { id: 1, name: 'Rohan Sharma', service: 'Haircut (Men)', time: '2:18 PM', status: 'serving' },
  { id: 2, name: 'Ananya Das', service: 'Beard Trim', time: '2:25 PM', status: 'waiting' },
  { id: 3, name: 'Vikram Singh', service: 'Hair Color', time: '2:40 PM', status: 'waiting' },
  { id: 4, name: 'Priya Mehta', service: 'Facial', time: '3:00 PM', status: 'waiting' },
];

const upcomingBookings = [
  { time: '3:30 PM', name: 'Riya M.', service: 'Haircut (Women)' },
  { time: '4:00 PM', name: 'Arjun K.', service: 'Hair Wash' },
  { time: '4:30 PM', name: 'Sneha P.', service: 'Threading' },
  { time: '5:00 PM', name: 'Amit R.', service: 'Beard Trim' },
  { time: '5:30 PM', name: 'Neha S.', service: 'Manicure' },
];

export default function PartnerDashboardScreen() {
  const [queueStatus, setQueueStatus] = useState(demoSalon.queue.status);
  const [queue, setQueue] = useState(queueItems);
  const statusCfg = statusConfig[queueStatus];

  const handleMarkDone = (id) => {
    setQueue(queue.filter(item => item.id !== id));
  };

  const stats = [
    { icon: Calendar, label: "Today's Bookings", value: '12', color: 'text-brand' },
    { icon: Users, label: 'Queue Right Now', value: queue.length.toString(), color: statusCfg.textColor },
    { icon: CheckCheck, label: 'Completed Today', value: '7', color: 'text-status-empty' },
    { icon: XCircle, label: 'No-show Today', value: '1', color: 'text-status-busy' },
  ];

  return (
    <div className="p-4 lg:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Good morning, Arjun 👋</h1>
          <p className="text-sm text-text-tertiary">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-status-empty-bg">
            <span className="w-2 h-2 rounded-full bg-status-empty" />
            <span className="text-xs font-semibold text-status-empty">Live</span>
          </div>
          <button className="text-xs font-semibold text-text-tertiary px-3 py-1.5 rounded-full border border-border hover:bg-surface-elevated">
            Mark as Closed
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-card rounded-xl shadow-xs p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={16} className={stat.color} />
              <span className="text-xs text-text-tertiary">{stat.label}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Live Queue Panel */}
        <div className="lg:col-span-3 bg-surface-card rounded-xl shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-text-primary">Live Queue</h2>
            <div className="flex gap-1">
              {['EMPTY', 'LIGHT', 'BUSY', 'FULL'].map(status => (
                <button
                  key={status}
                  onClick={() => setQueueStatus(status)}
                  className={`px-2.5 py-1 rounded-full text-2xs font-semibold transition-all ${
                    queueStatus === status
                      ? 'text-white shadow-sm'
                      : 'text-text-tertiary bg-surface-elevated hover:bg-border'
                  }`}
                  style={queueStatus === status ? { backgroundColor: statusConfig[status].textColor } : {}}
                >
                  {statusConfig[status].label}
                </button>
              ))}
            </div>
          </div>

          {/* Queue visualization */}
          <div className="space-y-2">
            {queue.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  idx === 0 ? 'bg-brand-light border border-brand/20' : 'bg-surface-card border border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-brand text-white' : 'bg-surface-elevated text-text-secondary'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{item.name}</span>
                    {idx === 0 && (
                      <span className="text-2xs font-semibold px-1.5 py-0.5 rounded-full bg-brand text-white">Serving now</span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary">{item.service} · Checked in {item.time}</p>
                </div>
                <div className="flex gap-1">
                  {idx === 0 ? (
                    <button
                      onClick={() => handleMarkDone(item.id)}
                      className="px-4 py-2 bg-brand text-white text-xs font-bold rounded-lg min-h-[44px] shadow-sm hover:bg-brand-dark transition-colors"
                    >
                      MARK DONE ✓
                    </button>
                  ) : (
                    <>
                      <button className="px-3 py-1.5 text-xs font-semibold text-status-empty bg-status-empty-bg rounded-lg hover:bg-status-empty/10">Arrived</button>
                      <button className="px-3 py-1.5 text-xs font-semibold text-status-busy bg-status-busy-bg rounded-lg hover:bg-status-busy/10">Remove</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2.5 text-sm font-semibold text-brand border-2 border-dashed border-brand/30 rounded-xl hover:bg-brand-light transition-colors">
            + Add Walk-in
          </button>
        </div>

        {/* Upcoming Bookings Panel */}
        <div className="lg:col-span-2 bg-surface-card rounded-xl shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-text-primary">Next up</h2>
            <button className="text-xs text-brand font-semibold">View all →</button>
          </div>
          <div className="space-y-2">
            {upcomingBookings.map((bk, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-elevated">
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-text-tertiary" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{bk.time}</p>
                    <p className="text-xs text-text-tertiary">{bk.name} · {bk.service}</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-brand px-2.5 py-1 rounded-full bg-brand-light hover:bg-brand/20 transition-colors">
                  Arrived
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}