import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  bookings: [],
  currentBooking: null,

  initialize: () => {
    const stored = localStorage.getItem('salonfi_bookings');
    if (stored) {
      try {
        set({ bookings: JSON.parse(stored) });
      } catch {}
    }
  },

  addBooking: (booking) => {
    const newBooking = {
      ...booking,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    const bookings = [...get().bookings, newBooking];
    set({ bookings, currentBooking: newBooking });
    localStorage.setItem('salonfi_bookings', JSON.stringify(bookings));
    return newBooking;
  },

  cancelBooking: (bookingId) => {
    const bookings = get().bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    set({ bookings });
    localStorage.setItem('salonfi_bookings', JSON.stringify(bookings));
  },

  updateBookingStatus: (bookingId, status) => {
    const bookings = get().bookings.map(b =>
      b.id === bookingId ? { ...b, status } : b
    );
    set({ bookings });
    localStorage.setItem('salonfi_bookings', JSON.stringify(bookings));
  },

  getUpcoming: () => get().bookings.filter(b => b.status === 'confirmed').sort((a, b) => new Date(a.date) - new Date(b.date)),
  getPast: () => get().bookings.filter(b => b.status === 'completed' || b.status === 'cancelled'),
}));

export default useBookingStore;