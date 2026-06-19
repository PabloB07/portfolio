'use client'

import Navigation from '../components/common/Navigation';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Certificates from '../components/sections/Certificates';
import Contact from '../components/sections/Contact';
import Footer from '../components/common/Footer';
export default function Home() {
  return (
    <div className="relative min-h-screen bg-discord-bg dark:bg-discord-bg-darkest text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Ambient background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="aurora-bg" />
        <div className="absolute inset-0 grid-overlay" />
      </div>

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
    </div>
  )
}