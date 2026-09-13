'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/common/Navigation'
import Footer from '../../components/common/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { Gamepad2, Settings, Monitor, Database, Shield, Zap, Users, Check, Star } from 'lucide-react'

const technologies = [
  { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
  { name: 'Paper API', icon: 'https://assets.papermc.io/brand/papermc_logo.min.svg' },
  { name: 'MySQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg' },
  { name: 'Redis', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg' },
  { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
  { name: 'Linux', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg' },
  { name: 'Nginx', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg' },
]

const services = [
  {
    titleKey: 'services.serviceItems.pluginDevelopment.title',
    descriptionKey: 'services.serviceItems.pluginDevelopment.description',
    featuresKey: 'services.serviceItems.pluginDevelopment.features',
    color: 'from-primary-500 to-secondary-500',
    key: 'pluginDevelopment'
  },
  {
    titleKey: 'services.serviceItems.serverSetup.title',
    descriptionKey: 'services.serviceItems.serverSetup.description',
    featuresKey: 'services.serviceItems.serverSetup.features',
    color: 'from-secondary-500 to-danger-500',
    key: 'serverSetup'
  },
  {
    titleKey: 'services.serviceItems.database.title',
    descriptionKey: 'services.serviceItems.database.description',
    featuresKey: 'services.serviceItems.database.features',
    color: 'from-success-500 to-accent-600',
    key: 'database'
  },
  {
    titleKey: 'services.serviceItems.security.title',
    descriptionKey: 'services.serviceItems.security.description',
    featuresKey: 'services.serviceItems.security.features',
    color: 'from-danger-500 to-warning-500',
    key: 'security'
  },
  {
    titleKey: 'services.serviceItems.optimization.title',
    descriptionKey: 'services.serviceItems.optimization.description',
    featuresKey: 'services.serviceItems.optimization.features',
    color: 'from-warning-500 to-accent-500',
    key: 'optimization'
  },
  {
    titleKey: 'services.serviceItems.multiplayer.title',
    descriptionKey: 'services.serviceItems.multiplayer.description',
    featuresKey: 'services.serviceItems.multiplayer.features',
    color: 'from-primary-600 to-accent-500',
    key: 'multiplayer'
  }
]

const testimonials = [
  {
    nameKey: 'services.testimonialsItems.testimonial1.name',
    roleKey: 'services.testimonialsItems.testimonial1.role',
    contentKey: 'services.testimonialsItems.testimonial1.content',
    rating: 5
  },
  {
    nameKey: 'services.testimonialsItems.testimonial2.name',
    roleKey: 'services.testimonialsItems.testimonial2.role',
    contentKey: 'services.testimonialsItems.testimonial2.content',
    rating: 4
  }
]

export default function PortfolioServicesPage() {
  const { t } = useLanguage()
  
  const getFeatures = (key: string): string[] => {
    const features = t(key)
    return Array.isArray(features) ? features : (typeof features === 'string' ? [features] : [])
  }

  return (
    <div className="relative min-h-screen bg-base text-ink overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="aurora-bg" />
        <div className="absolute inset-0 grid-overlay" />
      </div>
      <Navigation />
      
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Gamepad2 className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h1 className="text-5xl md:text-6xl font-bold font-dev text-white mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {t('services.hero.subtitle')}
            </p>
            <motion.a
              href="#services"
              className="btn-press btn-press-dark px-8 py-4 text-lg"
            >
              {t('services.hero.cta')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-dev text-ink mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-ink-muted">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-press-elevated overflow-hidden h-full"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                    {index === 0 && <Settings className="w-8 h-8 text-white" />}
                    {index === 1 && <Monitor className="w-8 h-8 text-white" />}
                    {index === 2 && <Database className="w-8 h-8 text-white" />}
                    {index === 3 && <Shield className="w-8 h-8 text-white" />}
                    {index === 4 && <Zap className="w-8 h-8 text-white" />}
                    {index === 5 && <Users className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold font-dev text-ink mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-ink-muted mb-4">
                    {t(service.descriptionKey)}
                  </p>
                  <ul className="space-y-2">
                    {getFeatures(service.featuresKey).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-ink-muted">
                        <Check className="w-4 h-4 mr-2 text-accent-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-dev text-ink mb-4">
              {t('services.technologies.title')}
            </h2>
            <p className="text-xl text-ink-muted">
              {t('services.technologies.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
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
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-base">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold font-dev text-ink mb-4">
              {t('services.testimonials.title')}
            </h2>
            <p className="text-xl text-ink-muted">
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
                className="card p-6 shadow-card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-warning-500 w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <p className="text-ink-muted mb-4 italic">
                  "{t(testimonial.contentKey)}"
                </p>
                <div>
                  <p className="font-semibold font-dev text-ink">
                    {t(testimonial.nameKey)}
                  </p>
                  <p className="text-sm text-ink-faint">
                    {t(testimonial.roleKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-dev text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('services.cta.subtitle')}
            </p>
            <motion.a
              href="/#contact"
              className="btn-press btn-press-dark px-8 py-4 text-lg"
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
