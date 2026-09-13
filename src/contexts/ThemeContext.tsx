"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, PaletteId, PALETTES } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setPalette: (palette: PaletteId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const PALETTE_IDS = PALETTES.map(p => p.id);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ mode: 'light', palette: 'cyber' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('theme');
    const savedPalette = localStorage.getItem('theme-palette');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const mode = savedMode ? (savedMode as 'light' | 'dark') : (prefersDark ? 'dark' : 'light');
    const palette = PALETTE_IDS.includes(savedPalette as PaletteId) ? savedPalette as PaletteId : 'cyber';

    setTheme({ mode, palette });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.dataset.palette = theme.palette;

    localStorage.setItem('theme', theme.mode);
    localStorage.setItem('theme-palette', theme.palette);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };

  const setPalette = (palette: PaletteId) => {
    setTheme(prev => ({ ...prev, palette }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
};