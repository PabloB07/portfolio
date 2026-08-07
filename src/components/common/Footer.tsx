import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { personalInfo } from '../../data/portfolio';

const Footer: React.FC = () => {
  const { tString } = useLanguage();

  return (
    <footer className="bg-white/60 dark:bg-discord-bg-darker/60 backdrop-blur-md border-t border-primary-500/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PB</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Pablo Blanco Navarro
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Game Developer especializado en crear experiencias digitales 
              excepcionales con tecnologías modernas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold font-dev text-gray-900 dark:text-white">
              Enlaces rápidos
            </h3>
            <div className="space-y-2">
              {[
                { href: '#home', label: tString('nav.home') },
                { href: '#about', label: tString('nav.about') },
                { href: '#projects', label: tString('nav.projects') },
                { href: '#contact', label: tString('nav.contact') },
              ].map((link) => (
                <motion.button
                  key={link.href}
                  whileHover={{ x: 5 }}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold font-dev text-gray-900 dark:text-white">
              Conectemos
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                {personalInfo.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {personalInfo.location}
              </p>
              
              <div className="flex space-x-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  <Github size={20} />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  <Linkedin size={20} />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
          © 2026 Pablo Blanco Navarro. {tString('footer.rights')}.
          </p>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm flex items-center space-x-1 mt-4 md:mt-0"
          >
            <span>{tString('footer.madeWith')}</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
            <span>{tString('footer.and')} Pablo Blanco Navarro</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
