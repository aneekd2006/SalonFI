// Salon store – manages list of salons (default + user‑added)
import { create } from 'zustand';
import { salons as defaultSalons } from '../shared/data/salons';

const useSalonStore = create((set, get) => ({
  salons: [],

  // Load from localStorage or fall back to bundled data
  initialize: () => {
    const stored = localStorage.getItem('salonfi_salons');
    if (stored) {
      try {
        set({ salons: JSON.parse(stored) });
      } catch {
        set({ salons: defaultSalons });
      }
    } else {
      set({ salons: defaultSalons });
    }
  },

  // Add a new salon (called from registration page)
  addSalon: (salon) => {
    const salons = [...get().salons, salon];
    set({ salons });
    localStorage.setItem('salonfi_salons', JSON.stringify(salons));
    return salon;
  },
}));

export default useSalonStore;
