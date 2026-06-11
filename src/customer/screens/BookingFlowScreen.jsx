import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Button from '../../shared/components/Button';
import { salons } from '../../shared/data/salons';
import { generateSlots, holdSlot } from '../../shared/data/queueLogic';
import useBookingStore from '../../stores/bookingStore';

export default function BookingFlowScreen() {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const salon = salons.find(s => s.id === salonId);
  const { addBooking } = useBookingStore();

  const [step, setStep] = useState(1); // 1: Service, 2: Date/Time, 3: Confirm, 4: Success
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  if (!salon) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">Salon not found</p>
          <Button variant="ghost" onClick={() => navigate('/')}>Go home</Button>
        </div>
      </div>
    );
  }

  // Generate dates for next 7 days
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slots = selectedDate ? generateSlots(salon, selectedDate.toISOString().split('T')[0]) : [];

  const dateStr = selectedDate
    ? `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`
    : '';

  const handleConfirm = () => {
    const booking = {
      salonId: salon.id,
      salonName: salon.name,
      salonImage: salon.photos[0],
      service: selectedService,
      date: selectedDate?.toISOString(),
      dateStr,
      time: selectedTime,
      note,
      total: selectedService?.price || 0,
    };
    const result = addBooking(booking);
    setBookingResult(result);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-surface-base pb-8">
      {/* Header */}
      <div className="bg-surface-card px-4 pt-2 pb-3 flex items-center gap-3 border-b border-border">
        <button onClick={() => {
          if (step > 1 && step < 4) setStep(step - 1);
          else navigate(-1);
        }} className="p-1 touch-target">
          <ChevronLeft size={22} className="text-text-primary" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold text-text-primary">{salon.name}</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 px-4 py-4">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s ? 'bg-brand text-white' : 'bg-surface-elevated text-text-tertiary'
            }`}>
              {step > s ? <Check size={16} /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 max-w-12 ${step > s ? 'bg-brand' : 'bg-border'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="px-4">
          <h2 className="text-lg font-bold text-text-primary mb-4">What do you need?</h2>
          <div className="space-y-2">
            {salon.services.map(service => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  selectedService?.id === service.id
                    ? 'border-brand bg-brand-light'
                    : 'border-border bg-surface-card hover:border-border-strong'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{service.name}</span>
                    {service.popular && (
                      <span className="text-2xs font-semibold px-1.5 py-0.5 rounded-full bg-accent-light text-accent">Popular</span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary mt-0.5">{service.duration} min</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-brand">₹{service.price}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedService?.id === service.id ? 'border-brand bg-brand' : 'border-border'
                  }`}>
                    {selectedService?.id === service.id && <Check size={12} className="text-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            disabled={!selectedService}
            onClick={() => setStep(2)}
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Pick Date & Time */}
      {step === 2 && (
        <div className="px-4">
          <h2 className="text-lg font-bold text-text-primary mb-4">When works for you?</h2>

          {/* Date Row */}
          <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
            {dates.map((d, i) => {
              const isToday = i === 0;
              const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`flex-shrink-0 w-14 py-2.5 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-brand text-white'
                      : isToday
                        ? 'bg-brand-light text-brand'
                        : 'bg-surface-card border border-border text-text-secondary'
                  }`}
                >
                  <p className="text-2xs font-semibold">{isToday ? 'TODAY' : dayNames[d.getDay()].substring(0, 3)}</p>
                  <p className="text-base font-bold mt-0.5">{d.getDate()}</p>
                </button>
              );
            })}
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-text-tertiary mb-3">
                Available slots for {dateStr}
              </p>
              {slots.length === 0 ? (
                <p className="text-sm text-text-tertiary text-center py-8">No slots available</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedTime === slot.time
                          ? 'bg-brand text-white'
                          : slot.available
                            ? 'bg-surface-card border border-border text-text-primary hover:border-border-strong'
                            : 'bg-surface-elevated text-text-tertiary line-through cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            disabled={!selectedDate || !selectedTime}
            onClick={() => setStep(3)}
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 3: Confirm Booking */}
      {step === 3 && (
        <div className="px-4">
          <h2 className="text-lg font-bold text-text-primary mb-4">Review your booking</h2>
          <div className="bg-surface-card rounded-xl shadow-md p-5 mb-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <img src={salon.photos[0]} alt={salon.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="text-base font-bold text-text-primary">{salon.name}</p>
                <p className="text-xs text-text-tertiary">{salon.address}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Service</span>
                <span className="font-semibold text-text-primary">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Duration</span>
                <span className="font-semibold text-text-primary">{selectedService?.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date</span>
                <span className="font-semibold text-text-primary">{dateStr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Time</span>
                <span className="font-semibold text-text-primary">{selectedTime}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-border flex justify-between">
                <span className="text-base font-bold text-text-primary">Total</span>
                <span className="text-base font-bold text-brand">₹{selectedService?.price}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-text-tertiary mb-2 block">Note to salon (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              placeholder="Any special requests?"
              className="w-full px-4 py-3 bg-surface-elevated rounded-xl text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand resize-none"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 mb-6">
            <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-brand focus:ring-brand" />
            <span className="text-xs text-text-secondary">I'll show up on time or cancel 1 hour before</span>
          </label>

          <Button variant="primary" size="lg" fullWidth onClick={handleConfirm}>
            Confirm Booking
          </Button>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Animated Checkmark */}
          <div className="w-20 h-20 rounded-full bg-status-empty-bg flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M12 20l5 5 11-11" stroke="#30A46C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 50,
                  strokeDashoffset: 0,
                  animation: 'drawCheck 0.6s ease-out',
                }}
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">You're booked!</h2>
          <p className="text-sm text-text-secondary mb-8">
            {salon.name} · {dateStr} · {selectedTime}
          </p>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/bookings')}>
            View Booking
          </Button>
          <Button variant="ghost" size="md" fullWidth className="mt-2" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}