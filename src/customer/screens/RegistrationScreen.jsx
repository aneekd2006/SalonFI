import React, { useState } from 'react';
import Button from '../../shared/components/Button';
import useSalonStore from '../../stores/salonStore';

function Field({ label, helper, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">{label}</span>
      {children}
      {helper && <span className="block text-xs leading-relaxed text-text-tertiary">{helper}</span>}
    </label>
  );
}

const inputClass = 'w-full min-h-[44px] px-4 py-2.5 bg-surface-elevated rounded-xl text-sm text-text-primary outline-none border border-transparent focus:border-brand transition-colors';

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
    <div className="p-4 lg:p-6 max-w-2xl pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Salon Registration</h1>
        <p className="text-sm text-text-secondary mt-1">
          Fill in the details customers will see when they discover and book your salon.
        </p>
      </div>

      <div className="space-y-5">
        <section className="bg-surface-card rounded-2xl shadow-xs border border-border p-4 space-y-4">
          <div>
            <h2 className="text-md font-bold text-text-primary">Basic salon details</h2>
            <p className="text-xs text-text-tertiary mt-1">These details appear on your public SalonFi listing.</p>
          </div>

          <Field label="Salon name" helper="Example: Studio Verde or The Barber Republic.">
            <input
              type="text"
              placeholder="Enter your salon name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Salon address" helper="Add the full shop address customers should visit.">
            <input
              type="text"
              placeholder="Shop number, area, landmark"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Contact phone number" helper="Customers may use this for booking questions or directions.">
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </Field>
        </section>

        <section className="bg-surface-card rounded-2xl shadow-xs border border-border p-4 space-y-4">
          <div>
            <h2 className="text-md font-bold text-text-primary">Queue and working hours</h2>
            <p className="text-xs text-text-tertiary mt-1">SalonFi uses this to estimate live wait time for customers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Active chairs" helper="Number of chairs/staff serving customers at the same time.">
              <input
                type="number"
                min="1"
                placeholder="e.g. 3"
                value={form.activeChairs}
                onChange={e => setForm({ ...form, activeChairs: Number(e.target.value) })}
                className={inputClass}
              />
            </Field>

            <Field label="Average service time" helper="Typical time in minutes for one regular service.">
              <input
                type="number"
                min="1"
                placeholder="e.g. 25 minutes"
                value={form.avgServiceTime}
                onChange={e => setForm({ ...form, avgServiceTime: Number(e.target.value) })}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Opening time" helper="When customers can start booking or walking in.">
              <input
                type="time"
                value={form.hours.open}
                onChange={e => setForm({ ...form, hours: { ...form.hours, open: e.target.value } })}
                className={inputClass}
              />
            </Field>

            <Field label="Closing time" helper="Last visible operating hour for the day.">
              <input
                type="time"
                value={form.hours.close}
                onChange={e => setForm({ ...form, hours: { ...form.hours, close: e.target.value } })}
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        <section className="bg-surface-card rounded-2xl shadow-xs border border-border p-4 space-y-4">
          <div>
            <h2 className="text-md font-bold text-text-primary">Services and pricing</h2>
            <p className="text-xs text-text-tertiary mt-1">Add the services customers can book. Prices are shown with ₹ in the customer app.</p>
          </div>

          {form.services.length === 0 && (
            <div className="rounded-xl bg-brand-light px-4 py-3 text-sm text-text-secondary">
              No services added yet. Add your first service, such as Haircut, Beard Trim, Facial, or Hair Color.
            </div>
          )}

        {form.services.map((svc, i) => (
          <div key={svc.id} className="rounded-xl border border-border bg-surface-card p-3 space-y-3">
            <p className="text-xs font-bold text-text-tertiary uppercase tracking-[0.08em]">Service {i + 1}</p>
            <Field label="Service name" helper="What customers will select while booking.">
              <input
                type="text"
                placeholder="e.g. Haircut (Men)"
                value={svc.name}
                onChange={e => handleServiceChange(i, 'name', e.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Duration in minutes" helper="How long this service usually takes.">
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 20"
                  value={svc.duration}
                  onChange={e => handleServiceChange(i, 'duration', Number(e.target.value))}
                  className={inputClass}
                />
              </Field>

              <Field label="Price in ₹" helper="Amount customers will pay at the salon.">
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 150"
                  value={svc.price}
                  onChange={e => handleServiceChange(i, 'price', Number(e.target.value))}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        ))}

          <Button variant="secondary" size="md" onClick={handleAddService}>+ Add Service</Button>
        </section>
      </div>
      <Button variant="primary" size="lg" className="mt-6" onClick={submit}>Register Salon</Button>
    </div>
  );
}
