import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, X, CalendarCheck } from 'lucide-react';
import Button from '../../shared/components/Button';
import BottomSheet from '../../shared/components/BottomSheet';
import useBookingStore from '../../stores/bookingStore';

function BookingCard({ booking, onCancel }) {
  const navigate = useNavigate();
  const isUpcoming = booking.status === 'confirmed';

  return (
    <div className="bg-surface-card rounded-xl shadow-xs p-4">
      <div className="flex gap-3">
        {booking.salonImage && (
          <img src={booking.salonImage} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" loading="lazy" />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-text-primary">{booking.salonName}</h3>
          <p className="text-xs text-text-secondary">{booking.dateStr} · {booking.time}</p>
          <p className="text-xs text-text-tertiary">{booking.service?.name} · ₹{booking.total}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          booking.status === 'confirmed' ? 'bg-status-empty-bg text-status-empty' :
          booking.status === 'cancelled' ? 'bg-status-busy-bg text-status-busy' :
          'bg-warning-bg text-warning'
        }`}>
          {booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'cancelled' ? 'Cancelled' : booking.status}
        </span>
        <div className="flex items-center gap-2">
          {isUpcoming && (
            <button
              onClick={() => onCancel(booking.id)}
              className="text-xs text-status-busy font-semibold px-3 py-1.5 rounded-full bg-status-busy-bg"
            >
              Cancel
            </button>
          )}
          {!isUpcoming && booking.status === 'completed' && (
            <span className="text-xs text-brand font-semibold">Rate your experience →</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsScreen() {
  const navigate = useNavigate();
  const { getUpcoming, getPast, cancelBooking } = useBookingStore();
  const [tab, setTab] = useState('upcoming');
  const [cancelTarget, setCancelTarget] = useState(null);

  const upcoming = getUpcoming();
  const past = getPast();
  const items = tab === 'upcoming' ? upcoming : past;

  const handleCancel = (id) => {
    cancelBooking(id);
    setCancelTarget(null);
  };

  return (
    <div className="px-4 pb-4">
      <h2 className="text-xl font-bold text-text-primary mb-4">My Bookings</h2>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-elevated rounded-full p-1 mb-5">
        <button
          onClick={() => setTab('upcoming')}
          className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
            tab === 'upcoming' ? 'bg-surface-card shadow-sm text-text-primary' : 'text-text-tertiary'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setTab('past')}
          className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
            tab === 'past' ? 'bg-surface-card shadow-sm text-text-primary' : 'text-text-tertiary'
          }`}
        >
          Past
        </button>
      </div>

      {/* Bookings */}
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map(booking => (
            <BookingCard key={booking.id} booking={booking} onCancel={setCancelTarget} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarCheck size={48} className="text-text-tertiary mb-4" />
          <h3 className="text-lg font-bold text-text-primary mb-1">No bookings yet</h3>
          <p className="text-sm text-text-secondary mb-6">Find a salon near you and book your first slot.</p>
          <Button variant="primary" onClick={() => navigate('/')}>Explore Salons</Button>
        </div>
      )}

      {/* Cancel confirmation */}
      <BottomSheet
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        title="Cancel booking?"
      >
        <p className="text-sm text-text-secondary mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setCancelTarget(null)}>Keep it</Button>
          <Button variant="danger" fullWidth onClick={() => handleCancel(cancelTarget)}>Cancel Booking</Button>
        </div>
      </BottomSheet>
    </div>
  );
}