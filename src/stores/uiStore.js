import { create } from 'zustand';

const UI_STORAGE_KEY = 'salonfi_ui_preferences';

function readPreferences() {
  try {
    return JSON.parse(localStorage.getItem(UI_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function persistPreferences(state) {
  localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({
    theme: state.theme,
    notificationsEnabled: state.notificationsEnabled,
  }));
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

const useUiStore = create((set, get) => ({
  theme: 'light',
  notificationsEnabled: true,

  initialize: () => {
    const preferences = readPreferences();
    const theme = preferences.theme || 'light';
    const notificationsEnabled = preferences.notificationsEnabled ?? true;
    applyTheme(theme);
    set({ theme, notificationsEnabled });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    set({ theme: nextTheme });
    persistPreferences({ ...get(), theme: nextTheme });
  },

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
    persistPreferences({ ...get(), theme });
  },

  toggleNotifications: () => {
    const notificationsEnabled = !get().notificationsEnabled;
    set({ notificationsEnabled });
    persistPreferences({ ...get(), notificationsEnabled });
  },
}));

export default useUiStore;