import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Gamepad2, Briefcase } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const { theme, toggleTheme } = useTheme();
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
            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
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
                className="px-3 py-1.5 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white hover:bg-primary-500/10 dark:hover:bg-primary-500/20 transition-colors duration-200 text-sm font-medium"
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-white hover:border-primary-500/40 transition-all duration-200"
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
                    className="absolute top-full right-0 mt-2 bg-white/90 dark:bg-discord-card-dark/90 backdrop-blur-xl rounded-xl shadow-card border border-gray-200/70 dark:border-white/10 overflow-hidden min-w-[150px]"
                  >
                    {languages.map((language) => (
                      <motion.button
                        key={language.code}
                        whileHover={{ backgroundColor: 'rgba(88, 101, 242, 0.12)' }}
                        onClick={() => {
                          setLanguage(language);
                          setShowLanguages(false);
                        }}
                        className={`flex items-center space-x-2 w-full px-4 py-2.5 text-left transition-colors duration-200 ${
                          currentLanguage.code === language.code
                            ? 'text-primary-600 dark:text-primary-300 font-semibold bg-primary-500/10'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                        }`}
                      >
                        <span>{language.flag}</span>
                        <span className="text-sm">{language.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:bg-primary-500/10 hover:border-primary-500/40 transition-all duration-200"
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
              className="md:hidden p-2.5 rounded-xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:bg-primary-500/10 hover:border-primary-500/40 transition-all duration-200"
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
                className="md:hidden bg-white/90 dark:bg-discord-bg-darkest/90 backdrop-blur-xl border-t border-primary-500/10 dark:border-white/5 relative rounded-b-2xl"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.href}
                      whileHover={{ x: 10 }}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left px-4 py-3 mx-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white hover:bg-primary-500/10 dark:hover:bg-primary-500/20 transition-colors duration-200"
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