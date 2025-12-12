'use client'

import Navigation from '../components/common/Navigation';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Certificates from '../components/sections/Certificates';
import Contact from '../components/sections/Contact';
import Footer from '../components/common/Footer';
import AIAssistant from '../components/ai/AIAssistant';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  )
}