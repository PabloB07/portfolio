'use client'

import React from 'react'
import Navigation from '../../components/common/Navigation'
import Footer from '../../components/common/Footer'
import MinecraftWorldCanvas from '../../components/minecraft/MinecraftWorld'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

export default function MinecraftPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="relative">
        <MinecraftWorldCanvas />
        
        {/* Overlay de información */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white p-6 rounded-lg max-w-2xl"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">
            🎮 {t('minecraft.title')}
          </h1>
          <p className="text-center text-gray-300">
            {t('minecraft.description')}
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

