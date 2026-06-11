import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  hasSeenOnboarding: false,
  isPartner: false,

  initialize: () => {
    const stored = localStorage.getItem('salonfi_auth');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        set({
          user: data.user,
          isAuthenticated: data.isAuthenticated || false,
          hasSeenOnboarding: data.hasSeenOnboarding || false,
          isPartner: data.isPartner || false,
        });
      } catch {}
    }
  },

  completeOnboarding: () => {
    set({ hasSeenOnboarding: true });
    localStorage.setItem('salonfi_auth', JSON.stringify({ ...get(), hasSeenOnboarding: true }));
  },

  login: (userData) => {
    set({ user: userData, isAuthenticated: true });
    localStorage.setItem('salonfi_auth', JSON.stringify({
      user: userData,
      isAuthenticated: true,
      hasSeenOnboarding: true,
      isPartner: false,
    }));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('salonfi_auth');
  },

  partnerLogin: (data) => {
    set({ user: data, isAuthenticated: true, isPartner: true });
    localStorage.setItem('salonfi_auth', JSON.stringify({
      user: data,
      isAuthenticated: true,
      hasSeenOnboarding: true,
      isPartner: true,
    }));
  },

  partnerLogout: () => {
    set({ user: null, isAuthenticated: false, isPartner: false });
    localStorage.removeItem('salonfi_auth');
  },
}));

export default useAuthStore;