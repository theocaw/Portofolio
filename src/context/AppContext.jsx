import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state: 'light' or 'dark'
  // Defaults to time-of-day (06:00–17:59 -> light, 18:00–05:59 -> dark) if user hasn't manually toggled yet.
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      const hour = new Date().getHours();
      return hour >= 18 || hour < 6 ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Language state: 'en' or 'id'
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'en' || saved === 'id') return saved;
      return 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch {
      // storage unavailable
    }
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('portfolio_theme', next);
      } catch {
        // storage unavailable
      }
      return next;
    });
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
