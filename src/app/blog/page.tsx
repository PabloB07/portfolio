'use client'

import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import Navigation from '../../components/common/Navigation';
import BlogPage from '../../components/pages/BlogPage';
import Footer from '../../components/common/Footer';

export default function Blog() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Navigation />
          <BlogPage />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}