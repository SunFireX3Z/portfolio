import { useRef } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackgroundEffects from './components/ui/BackgroundEffects'

import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceEducationSection from './components/sections/ExperienceEducationSection'
import CertificatesSection from './components/sections/CertificatesSection'
import ContactSection from './components/sections/ContactSection'

import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceEducationSection />
      <CertificatesSection />
      <ContactSection />
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef(location.pathname)

  const getDirection = () => {
    if (navigationType === 'POP') {
      return location.pathname === '/'
        ? 'right'
        : 'left'
    }

    const currentPath = location.pathname
    const lastPath = previousPath.current

    if (currentPath === '/') return 'right'
    if (lastPath === '/') return 'left'

    if (currentPath === '/projects') {
      return 'right'
    }

    return 'left'
  }

  const direction = getDirection()

  previousPath.current = location.pathname

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0,
          x: direction === 'left' ? 60 : -60,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: direction === 'left' ? -60 : 60,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetail />}
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="relative isolate min-h-screen bg-background text-text-primary">
      <BackgroundEffects />

      <div className="relative z-10">
        <Navbar />

        <main>
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App