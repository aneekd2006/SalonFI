import React, { useState } from 'react';
import Button from '../../shared/components/Button';
import useSalonStore from '../../stores/salonStore';

export default function RegistrationScreen() {
  const { addSalon } = useSalonStore();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    activeChairs: 3,
    avgServiceTime: 25,
    hours: { open: '09:00', close: '20:00' },
    services: [],
  });

  const handleAddService = () => {
    setForm({
      ...form,
      services: [...form.services, { id: `s${Date.now()}`, name: '', duration: 30, price: 0 }],
    });
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = form.services.map((s, i) =>
      i === index ? { ...s, [field]: value } : s,
    );
    setForm({ ...form, services: newServices });
  };

  const submit = () => {
    const salon = {
      ...form,
      id: `salon-${Date.now()}`,
      isVerified: true,
      isOpen: true,
      rating: 0,
      reviewCount: 0,
      totalBookings: 0,
      photos: [],
      queue: { status: 'EMPTY', currentCount: 0, estimatedWait: 0, lastUpdated: 'just now' },
      staff: [],
    };
    addSalon(salon);
    alert('Salon registered!');
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-text-primary mb-6">Salon Registration</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Salon name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Active chairs"
            value={form.activeChairs}
            onChange={e => setForm({ ...form, activeChairs: Number(e.target.value) })}
            className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
          />
          <input
            type="number"
            placeholder="Avg service time (min)"
            value={form.avgServiceTime}
            onChange={e => setForm({ ...form, avgServiceTime: Number(e.target.value) })}
            className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            placeholder="Open"
            value={form.hours.open}
            onChange={e => setForm({ ...form, hours: { ...form.hours, open: e.target.value } })}
            className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
          />
          <input
            type="time"
            placeholder="Close"
            value={form.hours.close}
            onChange={e => setForm({ ...form, hours: { ...form.hours, close: e.target.value } })}
            className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
          />
        </div>
        <h2 className="text-lg font-bold text-text-primary mt-6">Services</h2>
        {form.services.map((svc, i) => (
          <div key={svc.id} className="grid grid-cols-3 gap-2 items-center">
            <input
              type="text"
              placeholder="Name"
              value={svc.name}
              onChange={e => handleServiceChange(i, 'name', e.target.value)}
              className="col-span-2 px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none"
            />
            <input
              type="number"
              placeholder="Dur (min)"
              value={svc.duration}
              onChange={e => handleServiceChange(i, 'duration', Number(e.target.value))}
              className="px-2 py-1 bg-surface-elevated rounded-xl text-sm outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={svc.price}
              onChange={e => handleServiceChange(i, 'price', Number(e.target.value))}
              className="px-2 py-1 bg-surface-elevated rounded-xl text-sm outline-none"
            />
          </div>
        ))}
        <Button variant="secondary" size="md" onClick={handleAddService}>Add Service</Button>
      </div>
      <Button variant="primary" size="lg" className="mt-6" onClick={submit}>Register Salon</Button>
    </div>
  );
}
