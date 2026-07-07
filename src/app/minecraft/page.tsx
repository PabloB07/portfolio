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
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main className="px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold font-dev text-white">
            {t('minecraft.title')}
          </h1>
          <p className="mt-4 text-gray-300">
            {t('minecraft.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-bold font-dev text-white mb-6 text-center">
            {t('minecraft.technologies')}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className="h-10 w-auto object-contain mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-sm font-medium text-gray-300">
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10 transition-colors"
          >
            <h2 className="text-2xl font-semibold font-dev text-white">
              {t('minecraft.projects.townyFaith')}
            </h2>
            <p className="mt-2 text-gray-300 break-all">
              https://townyfaith.vercel.app/
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-white/80 group-hover:text-white">
              {t('minecraft.projects.visit')}
            </span>
          </motion.a>

          <motion.a
            href="https://hytalechile.vercel.app/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10 transition-colors"
          >
            <h2 className="text-2xl font-semibold font-dev text-white">
              {t('minecraft.projects.hytaleChile')}
            </h2>
            <p className="mt-2 text-gray-300 break-all">
              https://hytalechile.vercel.app/
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-white/80 group-hover:text-white">
              {t('minecraft.projects.visit')}
            </span>
          </motion.a>
        </div>
      </main>
      <Footer />
    </div>
  )
}


