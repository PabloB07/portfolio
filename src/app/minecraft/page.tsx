'use client'

import React from 'react'
import Navigation from '../../components/common/Navigation'
import Footer from '../../components/common/Footer'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

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
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {t('minecraft.title')}
          </h1>
          <p className="mt-4 text-gray-300">
            {t('minecraft.description')}
          </p>
        </motion.div>

        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            href="https://townyfaith.vercel.app/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/10 transition-colors"
          >
            <h2 className="text-2xl font-semibold text-white">
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
            <h2 className="text-2xl font-semibold text-white">
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

