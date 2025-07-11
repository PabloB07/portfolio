import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const languages: Language[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]); // Default to Spanish
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = languages.find(lang => lang.code === browserLang) || languages[0];
    
    setCurrentLanguage(savedLang ? languages.find(lang => lang.code === savedLang) || defaultLang : defaultLang);
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    if (mounted) {
      localStorage.setItem('language', language.code);
      document.documentElement.lang = language.code;
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: typeof translations[keyof typeof translations] = translations[currentLanguage.code as keyof typeof translations];
    
    for (const k of keys) {
      value = (value as any)?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};