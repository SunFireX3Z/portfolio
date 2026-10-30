import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

import App from './App'
import ScrollToTop from './components/ScrollToTop'
import MDXProvider from './components/ui/MDXProvider'
import '@/styles/index.css'

const initParticles = async (
  engine: Parameters<typeof loadSlim>[0],
) => {
  await loadSlim(engine)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParticlesProvider init={initParticles}>
      <BrowserRouter>
        <MDXProvider>
          <ScrollToTop />
          <App />
        </MDXProvider>
      </BrowserRouter>
    </ParticlesProvider>
  </StrictMode>,
)