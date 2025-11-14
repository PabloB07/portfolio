'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/common/Navigation'
import Footer from '../../components/common/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  Code, 
  Server, 
  Database, 
  Shield, 
  Zap, 
  Users, 
  Gamepad2,
  CheckCircle2,
  Star
} from 'lucide-react'

const technologies = [
  'Java', 'Paper API', 'Folia API', 'MySQL', 'Redis', 'Docker', 'Linux', 'Nginx', 'Velocity'
]

export default function PortfolioServicesPage() {
  const { t } = useLanguage()
  
  // Helper function to get features array
  const getFeatures = (key: string): string[] => {
    const features = t(`services.serviceItems.${key}.features`)
    return Array.isArray(features) ? features : (typeof features === 'string' ? [features] : [])
  }
  
  const services = [
    {
      icon: Code,
      title: t('services.serviceItems.pluginDevelopment.title'),
      description: t('services.serviceItems.pluginDevelopment.description'),
      features: getFeatures('pluginDevelopment'),
      color: 'from-blue-500 to-cyan-500',
      key: 'pluginDevelopment'
    },
    {
      icon: Server,
      title: t('services.serviceItems.serverSetup.title'),
      description: t('services.serviceItems.serverSetup.description'),
      features: getFeatures('serverSetup'),
      color: 'from-purple-500 to-pink-500',
      key: 'serverSetup'
    },
    {
      icon: Database,
      title: t('services.serviceItems.database.title'),
      description: t('services.serviceItems.database.description'),
      features: getFeatures('database'),
      color: 'from-green-500 to-emerald-500',
      key: 'database'
    },
    {
      icon: Shield,
      title: t('services.serviceItems.security.title'),
      description: t('services.serviceItems.security.description'),
      features: getFeatures('security'),
      color: 'from-red-500 to-orange-500',
      key: 'security'
    },
    {
      icon: Zap,
      title: t('services.serviceItems.optimization.title'),
      description: t('services.serviceItems.optimization.description'),
      features: getFeatures('optimization'),
      color: 'from-yellow-500 to-amber-500',
      key: 'optimization'
    },
    {
      icon: Users,
      title: t('services.serviceItems.multiplayer.title'),
      description: t('services.serviceItems.multiplayer.description'),
      features: getFeatures('multiplayer'),
      color: 'from-indigo-500 to-purple-500',
      key: 'multiplayer'
    }
  ]

  const testimonials = [
    {
      name: t('services.testimonialsItems.testimonial1.name'),
      role: t('services.testimonialsItems.testimonial1.role'),
      content: t('services.testimonialsItems.testimonial1.content'),
      rating: 5
    },
    {
      name: t('services.testimonialsItems.testimonial2.name'),
      role: t('services.testimonialsItems.testimonial2.role'),
      content: t('services.testimonialsItems.testimonial2.content'),
      rating: 4
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Gamepad2 className="w-20 h-20 mx-auto mb-6 text-white" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {t('services.hero.subtitle')}
            </p>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {t('services.hero.cta')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <div className="p-6">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.technologies.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('services.technologies.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold shadow-lg"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('services.testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('services.cta.subtitle')}
            </p>
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {t('services.cta.button')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
