'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { personalInfo } from '../../data/portfolio';
import dynamic from 'next/dynamic';

const MoaiModel = dynamic(() => import('../common/MoaiModel'), {
  ssr: false,
  loading: () => <div className="h-[380px] md:h-[500px] lg:h-[560px]" />,
});
import { MapPin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileImage, setProfileImage] = useState(personalInfo.avatar || '');
  const [o7Failed, setO7Failed] = useState(false);
  
  useEffect(() => {
    const handleAvatarUpdate = (event: CustomEvent) => {
      setProfileImage(event.detail);
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate as EventListener);

    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    };
  }, []);

  const texts = ['Full Stack Developer', 'Game Scripter'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[currentIndex];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-600 dark:text-accent-300 text-sm font-medium backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500" />
              </span>
              {t('hero.available')}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ink-muted mb-4"
            >
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-dev tracking-tight text-ink mb-6"
            >
              <span className="gradient-text">{personalInfo.name}</span>
              {!o7Failed ? (
                <motion.img
                  src="/o7.png"
                  alt="o7 salute"
                  onError={() => setO7Failed(true)}
                  animate={{ rotate: [0, -8, 0, -8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4 }}
                  className="inline-block ml-3 align-middle h-10 md:h-14 lg:h-16 w-auto origin-bottom-left drop-shadow-[0_0_12px_rgba(88,101,242,0.5)]"
                  title="o7"
                />
              ) : (
                <motion.span
                  animate={{ rotate: [0, 18, 0, 18, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4 }}
                  className="inline-block ml-3 align-middle font-mono text-2xl md:text-4xl lg:text-5xl text-primary-500 origin-bottom-left"
                  title="o7 — salute"
                >
                  o7
                </motion.span>
              )}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-ink mb-6 min-h-[3rem]"
            >
              <span className="typing-cursor">{displayText}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-ink-muted mb-8 max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <span className="chip px-4 py-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                {personalInfo.location}
              </span>
              <span className="chip px-4 py-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-500">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                {personalInfo.email}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-press btn-press-primary px-8 py-4 text-base"
              >
                {t('hero.cta')}
              </motion.button>

              <motion.a
                href="/api/download-cv"
                download="Pablo_Blanco_Navarro_CV.pdf"
                className="btn-press btn-press-dark px-8 py-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('hero.downloadCV')}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-elevated dark:bg-surface text-ink-muted rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-elevated dark:bg-surface text-ink-muted rounded-full hover:bg-[#0077b5] hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                href={`mailto:${personalInfo.email}`}
                className="p-3 bg-elevated dark:bg-surface text-ink-muted rounded-full hover:bg-danger-500 hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end pt-6 lg:pt-12"
          >
            <MoaiModel />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 text-ink-faint hover:text-primary-500 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
