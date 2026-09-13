import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { experiences } from '../../data/portfolio';
import { GraduationCap, Briefcase, Calendar, Wrench } from 'lucide-react';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-dev text-ink mb-6">
            {t('experience.title')}
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-base shadow-glow z-10" />

                <motion.div
                  className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="card-press p-6 group">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-500">
                          {experience.type === 'education' ? <GraduationCap className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                        </span>
                        <span className="font-semibold font-dev text-ink">
                          {experience.company}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ring-1 ${
                          experience.type === 'education' 
                            ? 'bg-primary-500/15 text-primary-600 dark:text-primary-300 ring-primary-500/30'
                            : 'bg-success-500/15 text-success-600 dark:text-success-300 ring-success-500/30'
                        }`}>
                          {experience.type === 'education' ? 'Educación' : 'Trabajo'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-ink-muted text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{experience.period}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold font-dev text-ink mb-3 group-hover:text-primary-500 transition-colors duration-300">
                      {experience.position}
                    </h3>

                    <p className="text-ink-muted mb-4 leading-relaxed text-sm">
                      {experience.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold font-dev text-ink flex items-center">
                        <Wrench className="w-4 h-4 mr-1" />
                        {t('experience.technologies')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1.5 rounded-lg border border-primary-500/20 bg-primary-500/10 text-primary-600 dark:text-primary-300 text-xs font-medium hover:shadow-md transition-all duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
