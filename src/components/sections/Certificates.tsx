import React from 'react';

import { motion } from 'framer-motion';

import { useInView } from 'react-intersection-observer';

import { ExternalLink, Award } from 'lucide-react';

import { useLanguage } from '../../contexts/LanguageContext';

import { certificatesBase } from '../../data/portfolio';

const Certificates: React.FC = () => {
  const { t, tString } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certificates" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-dev text-ink mb-6">
            {t('certificates.title')}
          </h2>
          <p className="text-lg text-ink-muted mb-6">
            {t('certificates.subtitle')}
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificatesBase.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-press-elevated overflow-hidden h-full">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
                  <img
                    src={cert.imageUrl}
                    alt={tString(`certificatesData.${cert.translationKey}.courseName`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Award className="text-white" size={32} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold font-dev text-ink mb-2 line-clamp-2">
                    {tString(`certificatesData.${cert.translationKey}.courseName`)}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-ink-muted">
                      <span className="font-semibold text-ink">{t('certificates.issuedBy')}:</span> {cert.institution}
                    </p>
                    <p className="text-sm text-ink-muted">
                      <span className="font-semibold text-ink">{t('certificates.completedIn')}:</span> {cert.date}
                    </p>
                  </div>

                  <motion.a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press btn-press-primary w-full justify-center text-sm"
                  >
                    <ExternalLink size={16} />
                    {t('certificates.viewCertificate')}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;