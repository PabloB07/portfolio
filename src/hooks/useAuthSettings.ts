import { useState, useEffect } from 'react';

interface AuthSettings {
  enableRegistration: boolean;
  requireEmailVerification: boolean;
  enablePasswordReset: boolean;
  enableSocialLogin: boolean;
}

const defaultSettings: AuthSettings = {
  enableRegistration: true,
  requireEmailVerification: true,
  enablePasswordReset: true,
  enableSocialLogin: false
};

export const useAuthSettings = () => {
  const [settings, setSettings] = useState<AuthSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('authSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading auth settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (newSettings: Partial<AuthSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('authSettings', JSON.stringify(updatedSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('authSettings');
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading
  };
};