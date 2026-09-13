import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Gamepad2, Briefcase, Palette } from 'lucide-react';
import { PALETTES, PaletteId } from '../../types';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showPalettes, setShowPalettes] = useState(false);
  const { theme, toggleTheme, setPalette } = useTheme();
  const { currentLanguage, setLanguage, t, languages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '/minecraft', label: t('nav.minecraft'), icon: Gamepad2 },
    { href: '/portfolio-services', label: t('nav.services'), icon: Briefcase },
    { href: '#contact', label: t('nav.contact') },
  ];

  const currentPalette = PALETTES.find(p => p.id === theme.palette) ?? PALETTES[0];

  const handlePalette = (id: PaletteId) => {
    setPalette(id);
    setShowPalettes(false);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href === '/') {
      window.location.href = href;
    } else if (href.startsWith('/')) {
      window.location.href = href;
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-discord-bg-darkest/70 backdrop-blur-xl backdrop-saturate-150 shadow-lg border-b border-primary-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold shadow-glow">
              P
            </span>
            <span className="font-bold text-xl text-ink tracking-tight">
              Pablo<span className="gradient-text">.</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1 bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-md">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-1.5 rounded-full text-ink-muted hover:text-primary-500 dark:hover:text-white hover:bg-primary-500/10 transition-colors duration-200 text-sm font-medium"
              >
                {item.icon && <item.icon className="w-4 h-4 inline-block mr-1" />}
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLanguages(!showLanguages)}
                className="nav-icon-btn flex items-center gap-1.5 px-3 py-2"
              >
                <span className="text-base leading-none">{currentLanguage.flag}</span>
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </motion.button>

              <AnimatePresence>
                {showLanguages && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="nav-dropdown absolute top-full right-0 mt-2 min-w-[160px]"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setLanguage(language);
                          setShowLanguages(false);
                        }}
                        className={`dropdown-item ${currentLanguage.code === language.code ? 'dropdown-item-active' : ''}`}
                      >
                        <span>{language.flag}</span>
                        <span className="text-sm">{language.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPalettes(!showPalettes)}
                className="nav-icon-btn flex items-center gap-1.5 px-3 py-2"
                title="Color theme"
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: currentPalette.color }}
                />
                <Palette className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {showPalettes && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="nav-dropdown absolute top-full right-0 mt-2 min-w-[170px]"
                  >
                    {PALETTES.map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => handlePalette(palette.id)}
                        className={`dropdown-item ${currentPalette.id === palette.id ? 'dropdown-item-active' : ''}`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: palette.color }}
                        />
                        <span className="text-sm">{palette.label}</span>
                        {currentPalette.id === palette.id && (
                          <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="nav-icon-btn p-2.5"
            >
              {theme.mode === 'light' ? (
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="nav-icon-btn md:hidden p-2.5"
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-[-1] md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-elevated border-t border-subtle relative rounded-b-2xl"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.href}
                      whileHover={{ x: 10 }}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left px-4 py-3 mx-2 rounded-xl text-ink-muted hover:text-primary-500 dark:hover:text-white hover:bg-primary-500/10 transition-colors duration-200"
                    >
                      {item.icon && <item.icon className="w-4 h-4 inline-block mr-1" />}
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;