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
        <section id="certificates" className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('certificates.title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {t('certificates.subtitle')}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
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
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                {/* Certificate Image */}
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

                                {/* Certificate Details */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {tString(`certificatesData.${cert.translationKey}.courseName`)}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">{t('certificates.issuedBy')}:</span> {cert.institution}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">{t('certificates.completedIn')}:</span> {cert.date}
                                        </p>
                                    </div>

                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={cert.certificateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 text-sm font-semibold w-full justify-center"
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
