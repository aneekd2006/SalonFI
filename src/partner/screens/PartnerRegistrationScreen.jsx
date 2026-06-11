import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Check, Eye, EyeOff } from 'lucide-react';
import Button from '../../shared/components/Button';
import useAuthStore from '../../stores/authStore';
import { salons } from '../../shared/data/salons';

export default function PartnerRegistrationScreen() {
  const navigate = useNavigate();
  const { partnerLogin } = useAuthStore();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Account info
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    // Salon info
    salonName: '',
    salonAddress: '',
    salonCategory: 'Unisex Salon',
    openTime: '09:00',
    closeTime: '20:00',
    chairs: '2',
    avgServiceTime: '30',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => {
    if (!form.email || !form.password || !form.salonName) {
      setError('Please fill in all required fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Save to localStorage as a registered partner
    const partnerData = {
      id: `partner-${Date.now()}`,
      ...form,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('salonfi_partners') || '[]');
    existing.push(partnerData);
    localStorage.setItem('salonfi_partners', JSON.stringify(existing));

    // Auto-login
    partnerLogin({ name: form.fullName || form.salonName, email: form.email, salon: form.salonName });
    navigate('/partner/dashboard');
  };

  const categories = ['Barbershop', 'Ladies Salon', 'Unisex Salon', 'Premium Barbershop', 'Nail Studio', 'Spa'];

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-surface-card rounded-2xl shadow-md p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/partner/login')} className="p-1 touch-target">
              <ChevronLeft size={22} className="text-text-primary" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-text-primary">Register Your Salon</h1>
              <p className="text-sm text-text-tertiary">Step {step} of 2</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 mb-6">
            <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-brand' : 'bg-border'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-brand' : 'bg-border'}`} />
          </div>

          {error && (
            <p className="text-xs text-status-busy bg-status-busy-bg px-3 py-2 rounded-lg mb-4">{error}</p>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-text-primary">Account Information</h2>

              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Full Name *</label>
                <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your name" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Phone Number *</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="9876543210" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Email Address *</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@salon.com" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Password *</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min. 6 characters" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand pr-10" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Confirm Password *</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Repeat password" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand pr-10" />
                  <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button variant="primary" size="lg" fullWidth className="mt-2" onClick={() => setStep(2)}>
                Continue → Salon Details
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-text-primary">Salon Information</h2>

              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Salon Name *</label>
                <input type="text" value={form.salonName} onChange={e => update('salonName', e.target.value)} placeholder="e.g. Studio Verde" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Address *</label>
                <input type="text" value={form.salonAddress} onChange={e => update('salonAddress', e.target.value)} placeholder="e.g. 14 MG Road, Sector 4" className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">Category *</label>
                <select value={form.salonCategory} onChange={e => update('salonCategory', e.target.value)} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1 block">Opens at</label>
                  <input type="time" value={form.openTime} onChange={e => update('openTime', e.target.value)} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1 block">Closes at</label>
                  <input type="time" value={form.closeTime} onChange={e => update('closeTime', e.target.value)} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1 block">Active Chairs</label>
                  <input type="number" value={form.chairs} onChange={e => update('chairs', e.target.value)} min={1} max={10} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1 block">Avg Service Time (min)</label>
                  <input type="number" value={form.avgServiceTime} onChange={e => update('avgServiceTime', e.target.value)} min={15} step={5} className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand" />
                </div>
              </div>

              {/* Preview card */}
              <div className="p-4 bg-brand-light rounded-xl mt-2">
                <p className="text-xs font-semibold text-text-tertiary tracking-wider mb-2">PREVIEW</p>
                <p className="text-base font-bold text-text-primary">{form.salonName || 'Your Salon Name'}</p>
                <p className="text-xs text-text-tertiary">{form.salonCategory} · {form.openTime}–{form.closeTime}</p>
                <p className="text-xs text-text-tertiary">{form.chairs} chairs · ~{form.avgServiceTime} min/service</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="secondary" size="lg" fullWidth onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" fullWidth onClick={handleSubmit}>
                  Register & Go to Dashboard
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-xs text-text-tertiary">
              Already registered?{' '}
              <Link to="/partner/login" className="text-brand font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}