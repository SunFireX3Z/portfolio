import { Routes, Route } from 'react-router'
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

function App() {
  return (
    <div className="relative isolate min-h-screen bg-background text-text-primary">
      <BackgroundEffects />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/projects/:slug"
              element={<ProjectDetail />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App