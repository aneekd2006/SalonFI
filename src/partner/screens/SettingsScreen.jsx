import React, { useState } from 'react';
import Button from '../../shared/components/Button';
import { Camera } from 'lucide-react';

export default function SettingsScreen() {
  const [form, setForm] = useState({
    name: 'Studio Verde',
    address: '14 MG Road, Sector 4',
    phone: '+91 98765 43210',
    activeChairs: 3,
    avgServiceTime: 25,
  });

  return (
    <div className="p-4 lg:p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-text-primary mb-6">Settings</h1>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-text-tertiary mb-2 block">Salon Photos</label>
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-xl bg-surface-elevated flex flex-col items-center justify-center text-text-tertiary cursor-pointer hover:bg-border transition-colors">
            <Camera size={20} />
            <span className="text-2xs mt-1">Upload</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-card rounded-xl shadow-xs p-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1 block">Salon Name</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1 block">Address</label>
          <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1 block">Phone</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1 block">Active Chairs</label>
            <input type="number" value={form.activeChairs} onChange={e => setForm({ ...form, activeChairs: Number(e.target.value) || 1 })} min={1} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1 block">Avg Service Time (min)</label>
            <input type="number" value={form.avgServiceTime} onChange={e => setForm({ ...form, avgServiceTime: Number(e.target.value) || 15 })} min={5} step={5} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="primary" size="lg">Save Changes</Button>
      </div>
    </div>
  );
}