'use client'

import React from 'react'
import Navigation from '../../components/common/Navigation'
import Footer from '../../components/common/Footer'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const technologies = [
  { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
  { name: 'Paper', icon: 'https://assets.papermc.io/brand/papermc_logo.min.svg' },
  { name: 'MySQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },
  { name: 'Redis', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg' },
  { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
]

export default function MinecraftPage() {
  const { t } = useLanguage()
  
  return (
    <div className="relative min-h-screen bg-base text-ink overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="aurora-bg" />
        <div className="absolute inset-0 grid-overlay" />
      </div>
      <Navigation />
      <main className="px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold font-dev text-ink">
            {t('minecraft.title')}
          </h1>
          <p className="mt-4 text-ink-muted">
            {t('minecraft.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-bold font-dev text-ink mb-6 text-center">
            {t('minecraft.technologies')}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="card-press flex flex-col items-center p-4 h-full"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className="h-10 w-auto object-contain mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-sm font-medium text-ink-muted">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            href="https://townyfaith.vercel.app/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-press p-6 text-left group"
          >
            <h2 className="text-2xl font-semibold font-dev text-ink">
              {t('minecraft.projects.townyFaith')}
            </h2>
            <p className="mt-2 text-ink-muted break-all">
              https://townyfaith.vercel.app/
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-500 dark:text-primary-400 group-hover:text-primary-600">
              {t('minecraft.projects.visit')}
            </span>
          </motion.a>

          <motion.a
            href="https://hytalechile.vercel.app/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-press p-6 text-left group"
          >
            <h2 className="text-2xl font-semibold font-dev text-ink">
              {t('minecraft.projects.hytaleChile')}
            </h2>
            <p className="mt-2 text-ink-muted break-all">
              https://hytalechile.vercel.app/
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-500 dark:text-primary-400 group-hover:text-primary-600">
              {t('minecraft.projects.visit')}
            </span>
          </motion.a>
        </div>
      </main>
      <Footer />
    </div>
  )
}


