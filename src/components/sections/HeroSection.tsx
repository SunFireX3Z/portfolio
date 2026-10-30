import { ArrowUpRight } from 'lucide-react'
import {
  SiGithub,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiFigma
} from '@icons-pack/react-simple-icons'
import { VscVscode } from 'react-icons/vsc'
import profileImage from '@/assets/images/profile/profile.png'

import SectionBadge from '../ui/SectionBadge'
import Button from '../ui/Button'
import Ticker from '../ui/Ticker'

const technologies = [
  { name: 'GitHub', Icon: SiGithub },
  { name: 'CSS', Icon: SiCss },
  { name: 'Figma', Icon: SiFigma },
  { name: 'React', Icon: SiReact },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'VS Code', Icon: VscVscode },
]

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex scroll-mt-24 flex-col overflow-hidden"
      style={{ minHeight: 'calc(100svh - 73px)' }}
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-12 lg:px-8">
        <div className="relative z-10 space-y-6">
          <SectionBadge>
            Frontend Dev • UI/UX • Graphic Designer
          </SectionBadge>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Halo, Saya{' '}
              <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Randy.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-text-secondary md:text-lg">
              Saya seorang Frontend Developer dan Graphic Designer yang suka memadukan kreativitas visual dengan teknologi untuk membangun antarmuka web yang interaktif, elegan, dan fungsional
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              rightIcon={<ArrowUpRight size={18} />}
              className="rounded-xl"
            >
              Lihat Proyek Saya
            </Button>

            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              className="rounded-xl"
            >
              Hubungi Saya
            </Button>
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-sm text-text-secondary">
              Tools &amp; Teknologi
            </p>

            <div className="flex flex-wrap gap-3">
              {technologies.map(({ name, Icon }) => (
                <div
                  key={name}
                  title={name}
                  aria-label={name}
                  className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-secondary transition-colors duration-200 hover:border-orange-500/50 hover:text-orange-400"
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg profile-float">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-3xl border border-orange-500/20"
          />

          <div
            aria-hidden="true"
            className="profile-corners pointer-events-none absolute -inset-3"
          >
            <span className="profile-corner profile-corner-tl" />
            <span className="profile-corner profile-corner-tr" />
            <span className="profile-corner profile-corner-br" />
            <span className="profile-corner profile-corner-bl" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400/20 via-orange-500/10 to-red-600/20 blur-2xl"
          />

          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <img
              src={profileImage}
              alt="Randy Saputra"
              className="absolute inset-0 size-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="mt-1 font-semibold text-white">
                Randy Saputra
              </p>

              <p className="text-sm text-white/70">
                UI/UX Designer &amp; Graphic Designer
              </p>
            </div>
          </div>
        </div>
      </div>

      <Ticker
        items={[
          'UI/UX Design',
          'Graphic Design',
          'Frontend Developer',
        ]}
      />
    </section>
  )
}

export default HeroSection