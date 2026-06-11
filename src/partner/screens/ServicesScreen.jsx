import React, { useState } from 'react';
import { Plus, ToggleLeft, ToggleRight, Clock, DollarSign } from 'lucide-react';
import Button from '../../shared/components/Button';
import { salons } from '../../shared/data/salons';

const demoSalon = salons[0];

export default function ServicesScreen() {
  const [services, setServices] = useState(demoSalon.services.map(s => ({ ...s, active: true })));
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newService, setNewService] = useState({ name: '', duration: 30, price: 100 });

  const toggleActive = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [hours, setHours] = useState(days.map(d => ({ day: d, active: d !== 'Sunday', open: '09:00', close: '20:00' })));

  return (
    <div className="p-4 lg:p-6 max-w-3xl">
      <h1 className="text-xl font-bold text-text-primary mb-6">Services</h1>

      {/* Services List */}
      <div className="bg-surface-card rounded-xl shadow-xs divide-y divide-border mb-8">
        {services.map(service => (
          <div key={service.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">{service.name}</span>
                  {service.popular && (
                    <span className="text-2xs font-semibold px-1.5 py-0.5 rounded-full bg-accent-light text-accent">Popular</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-text-secondary"><Clock size={12} className="inline mr-0.5" />{service.duration} min</span>
                  <span className="text-xs text-text-secondary"><DollarSign size={12} className="inline mr-0.5" />₹{service.price}</span>
                </div>
              </div>
              <button onClick={() => toggleActive(service.id)} className="text-text-tertiary">
                {service.active ? <ToggleRight size={22} className="text-brand" /> : <ToggleLeft size={22} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="secondary" size="md" className="mb-8" onClick={() => setShowAdd(true)}>
        <Plus size={16} className="mr-1" /> Add Service
      </Button>

      {/* Business Hours */}
      <h2 className="text-base font-bold text-text-primary mb-4">Business Hours</h2>
      <div className="bg-surface-card rounded-xl shadow-xs divide-y divide-border">
        {hours.map((h, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setHours(hours.map((d, idx) => idx === i ? { ...d, active: !d.active } : d))}>
                {h.active ? <ToggleRight size={20} className="text-brand" /> : <ToggleLeft size={20} className="text-text-tertiary" />}
              </button>
              <span className={`text-sm font-medium ${h.active ? 'text-text-primary' : 'text-text-tertiary'}`}>{h.day}</span>
            </div>
            {h.active && (
              <div className="flex items-center gap-2 text-sm">
                <input type="time" value={h.open} onChange={e => setHours(hours.map((d, idx) => idx === i ? { ...d, open: e.target.value } : d))} className="bg-surface-elevated rounded-lg px-2 py-1 text-xs outline-none" />
                <span className="text-text-tertiary">to</span>
                <input type="time" value={h.close} onChange={e => setHours(hours.map((d, idx) => idx === i ? { ...d, close: e.target.value } : d))} className="bg-surface-elevated rounded-lg px-2 py-1 text-xs outline-none" />
              </div>
            )}
            {!h.active && <span className="text-xs text-text-tertiary font-medium">Closed</span>}
          </div>
        ))}
      </div>
    </div>
  );
}