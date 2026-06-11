import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../../shared/components/Button';
import useAuthStore from '../../stores/authStore';

const slides = [
  {
    id: 1,
    eyebrow: 'THE PROBLEM',
    headline: 'Stop guessing\nthe wait.',
    body: 'Walking in blind wastes your time. SalonFi shows you who\'s busy and who\'s ready before you leave home.',
    color: '#3B6E61',
  },
  {
    id: 2,
    eyebrow: 'REAL-TIME QUEUE',
    headline: 'See the\nqueue live.',
    body: 'Every partner salon updates their queue in real time. Green means go. Red means wait.',
    color: '#CB9A6E',
  },
  {
    id: 3,
    eyebrow: 'BOOK & GO',
    headline: 'Your slot.\nYour time.',
    body: 'Book a time that works, get a reminder, and walk in exactly when you\'re expected.',
    color: '#3B6E61',
  },
];

export default function OnboardingScreen({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [step, setStep] = useState('slides'); // slides | phone | otp | name
  const [timer, setTimer] = useState(30);
  const { completeOnboarding, login } = useAuthStore();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowAuth(true);
      setStep('phone');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    login({ name: 'Guest', phone: '' });
    onComplete?.();
  };

  const handleGetOTP = () => {
    if (phone.length >= 10) {
      setStep('otp');
      setTimer(30);
      const interval = setInterval(() => {
        setTimer(t => { if (t <= 1) clearInterval(interval); return t - 1; });
      }, 1000);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.every(d => d !== '')) {
      setStep('name');
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    login({ name: name || 'User', phone });
    onComplete?.();
  };

  const slide = slides[currentSlide];

  // Illustration components
  const illustrations = [
    // Slide 1 - Clock/queue abstract shapes
    <svg key="ill1" width="200" height="200" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="80" stroke="#3B6E61" strokeWidth="2" opacity="0.3"/>
      <circle cx="100" cy="100" r="60" stroke="#3B6E61" strokeWidth="2" opacity="0.5"/>
      <circle cx="100" cy="100" r="40" stroke="#3B6E61" strokeWidth="2" opacity="0.7"/>
      <circle cx="100" cy="100" r="8" fill="#3B6E61"/>
      <line x1="100" y1="100" x2="100" y2="60" stroke="#3B6E61" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="100" x2="130" y2="90" stroke="#3B6E61" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="100" cy="100" r="85" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
    </svg>,
    // Slide 2 - Phone with queue rings
    <svg key="ill2" width="200" height="200" viewBox="0 0 200 200" fill="none">
      <rect x="65" y="30" width="70" height="140" rx="12" stroke="#3B6E61" strokeWidth="2"/>
      <rect x="72" y="40" width="56" height="25" rx="4" fill="#E6F2EF"/>
      <circle cx="100" cy="60" r="6" fill="#3B6E61"/>
      <circle cx="88" cy="95" r="18" stroke="#30A46C" strokeWidth="2.5" fill="none"/>
      <circle cx="88" cy="95" r="6" fill="#30A46C"/>
      <circle cx="115" cy="85" r="16" stroke="#E5A218" strokeWidth="2.5" fill="none"/>
      <circle cx="115" cy="85" r="5" fill="#E5A218"/>
      <circle cx="96" cy="120" r="14" stroke="#E54D2E" strokeWidth="2.5" fill="none"/>
      <circle cx="96" cy="120" r="4" fill="#E54D2E"/>
      <line x1="78" y1="145" x2="122" y2="145" stroke="#3B6E61" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="152" x2="110" y2="152" stroke="#E5E5E5" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    // Slide 3 - Calendar + checkmark
    <svg key="ill3" width="200" height="200" viewBox="0 0 200 200" fill="none">
      <rect x="45" y="50" width="110" height="120" rx="8" stroke="#3B6E61" strokeWidth="2" fill="#F9F9F7"/>
      <rect x="45" y="50" width="110" height="30" rx="8" fill="#3B6E61"/>
      <text x="100" y="70" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">MON 12</text>
      <text x="100" y="110" textAnchor="middle" fill="#3B6E61" fontSize="28" fontWeight="bold">2:30</text>
      <text x="100" y="130" textAnchor="middle" fill="#5C5C5C" fontSize="12">PM</text>
      <line x1="55" y1="145" x2="145" y2="145" stroke="#E5E5E5" strokeWidth="1"/>
      <line x1="55" y1="155" x2="130" y2="155" stroke="#E5E5E5" strokeWidth="1"/>
      <circle cx="155" cy="120" r="22" fill="#30A46C"/>
      <path d="M148 120L153 125L163 114" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ];

  if (showAuth) {
    return (
      <div className="min-h-screen bg-surface-base flex justify-center">
        <div className="w-full max-w-phone bg-surface-card min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col justify-end px-6 pb-8">
            {step === 'phone' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-text-primary mb-1">Enter your number</h2>
                <p className="text-sm text-text-secondary mb-8">We'll send a one-time code. No passwords.</p>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-1 px-3 py-3 border-b-2 border-border focus-within:border-brand">
                    <span className="text-base font-semibold text-text-primary">+91</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter phone"
                    className="flex-1 text-xl font-medium text-text-primary bg-transparent border-b-2 border-border focus:border-brand outline-none pb-3"
                    autoFocus
                  />
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={handleGetOTP} disabled={phone.length < 10}>
                  Get OTP
                </Button>
                <button onClick={handleSkip} className="w-full text-center mt-4 text-sm text-text-tertiary font-medium py-2">Skip for now</button>
              </div>
            )}

            {step === 'otp' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-text-primary mb-1">Enter OTP</h2>
                <p className="text-sm text-text-secondary mb-8">Code sent to +91 {phone}</p>
                <div className="flex gap-3 justify-center mb-8">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={e => {
                        const newOtp = [...otp];
                        newOtp[i] = e.target.value.replace(/\D/g, '');
                        setOtp(newOtp);
                        if (e.target.value && i < 3) {
                          const next = document.querySelector(`[data-otp="${i + 1}"]`);
                          next?.focus();
                        }
                      }}
                      data-otp={i}
                      className="w-14 h-14 text-center text-xl font-bold border-2 border-border rounded-xl focus:border-brand outline-none"
                      autoFocus={i === 0}
                      onKeyDown={e => {
                        if (e.key === 'Backspace' && !otp[i] && i > 0) {
                          const prev = document.querySelector(`[data-otp="${i - 1}"]`);
                          prev?.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={handleVerifyOTP} disabled={otp.some(d => d === '')}>
                  Verify
                </Button>
                <p className="text-center mt-4 text-sm text-text-tertiary">
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                </p>
              </div>
            )}

            {step === 'name' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-text-primary mb-1">What's your name?</h2>
                <p className="text-sm text-text-secondary mb-8">Your friends at the salon will know who to expect.</p>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full text-xl font-medium text-text-primary bg-transparent border-b-2 border-border focus:border-brand outline-none pb-3 mb-8"
                  autoFocus
                />
                <Button variant="primary" size="lg" fullWidth onClick={handleComplete}>
                  {name ? `Let's go, ${name}!` : 'Skip'}
                </Button>
              </div>
            )}
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fadeIn 0.3s ease-out; }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base flex justify-center">
      <div className="w-full max-w-phone bg-white min-h-screen flex flex-col">
        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center bg-[#F9F9F7] relative overflow-hidden">
          <div className="transform scale-90">
            {illustrations[currentSlide]}
          </div>
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute top-14 right-6 text-sm text-text-tertiary font-semibold touch-target px-3"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pt-8 pb-12 bg-white">
          <p className="text-xs font-semibold tracking-widest text-brand-muted uppercase mb-3">{slide.eyebrow}</p>
          <h1 className="text-3xl font-extrabold text-text-primary leading-tight tracking-tight mb-4" style={{ letterSpacing: '-0.025em' }}>
            {slide.headline.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h1>
          <p className="text-base text-text-secondary leading-relaxed mb-10">{slide.body}</p>

          {/* Progress dots + Next */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === currentSlide ? slide.color : '#E5E5E5',
                    width: i === currentSlide ? 24 : 8,
                    borderRadius: i === currentSlide ? 4 : 8,
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all active:scale-95"
              style={{ backgroundColor: slide.color }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}