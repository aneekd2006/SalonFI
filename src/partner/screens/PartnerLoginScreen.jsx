import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../shared/components/Button';
import useAuthStore from '../../stores/authStore';

export default function PartnerLoginScreen() {
  const navigate = useNavigate();
  const { partnerLogin } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check demo credentials
    if (email === 'demo@studioverde.com' && password === 'demo123') {
      partnerLogin({ name: 'Arjun', email, salon: 'Studio Verde' });
      navigate('/partner/dashboard');
      return;
    }
    // Check registered partners from localStorage
    const partners = JSON.parse(localStorage.getItem('salonfi_partners') || '[]');
    const found = partners.find(p => p.email === email && p.password === password);
    if (found) {
      partnerLogin({ name: found.fullName || found.salonName, email: found.email, salon: found.salonName });
      navigate('/partner/dashboard');
    } else {
      setError('Invalid credentials. Try demo@studioverde.com / demo123, or register a new account.');
    }
  };

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-card rounded-2xl shadow-md p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">🌿 SalonFi</h1>
            <p className="text-sm text-text-tertiary mt-1">Partner Portal</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="demo@studioverde.com"
                className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-surface-elevated rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand pr-10"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-status-busy bg-status-busy-bg px-3 py-2 rounded-lg">{error}</p>
            )}

            <Button variant="primary" size="lg" fullWidth onClick={handleLogin}>
              Sign In
            </Button>

            <div className="text-center">
              <button className="text-xs text-brand font-semibold">Forgot password?</button>
            </div>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 text-center">
          <p className="text-xs text-text-tertiary">
            Not a partner yet?{' '}
            <Link to="/partner/register" className="text-brand font-semibold">Apply to join →</Link>
          </p>
          <p className="text-xs text-text-tertiary mt-2">
            Demo: <span className="font-mono text-text-secondary">demo@studioverde.com / demo123</span>
          </p>
        </div>
      </div>
    </div>
  );
}