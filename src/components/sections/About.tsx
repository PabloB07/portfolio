import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { Rocket, Lightbulb, Settings, Laptop, Smile, Globe } from 'lucide-react';

const technologies = [
  { name: 'Ruby', color: '#CC342D', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg' },
  { name: 'Ruby on Rails', color: '#CC0000', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/rails/rails-original-wordmark.svg' },
  { name: 'Java', color: '#ED8B00', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
  { name: 'Next.js', name2: 'React', color: '#000000', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg', icon2: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
  { name: 'TypeScript', color: '#3178C6', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
  { name: 'PostgreSQL', color: '#336791', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg' },
  { name: 'Supabase', color: '#3ECF8E', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg' },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git', color: '#F05032', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
  { name: 'Docker', color: '#2496ED', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg' },
];

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-dev text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              {t('about.description')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {t('about.additionalText')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white dark:bg-discord-card-dark rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <Rocket className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold font-dev text-gray-900 dark:text-white mb-2">
                {t('about.fastDelivery')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('about.fastDeliveryDesc')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-discord-card-dark rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <Lightbulb className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold font-dev text-gray-900 dark:text-white mb-2">
                {t('about.innovativeSolutions')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('about.innovativeSolutionsDesc')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold font-dev text-gray-900 dark:text-white mb-6 text-center">
              {t('about.technologies') || 'Tecnologías'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-discord-card-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-2 h-12">
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      className="h-10 w-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {tech.icon2 && (
                      <img 
                        src={tech.icon2} 
                        alt={tech.name2}
                        className="h-10 w-auto object-contain ml-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {([
              { icon: Settings, value: '5+', label: 'Años de experiencia' },
              { icon: Laptop, value: '20+', label: 'Proyectos completados' },
              { icon: Smile, value: '15+', label: 'Clientes satisfechos' },
              { icon: Globe, value: '4', label: 'Idiomas' },
            ] as { icon: React.ComponentType<{ className?: string }>; value: string; label: string }[]).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="bg-white dark:bg-discord-card-dark rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700"
              >
                <stat.icon className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
