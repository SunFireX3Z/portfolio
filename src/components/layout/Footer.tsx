
import {
  ArrowUpRight,
  Mail,
  MoveUpRight,
} from 'lucide-react'
import type { MouseEvent } from 'react'
import { SiGithub } from 'react-icons/si'
import { useNavigate } from 'react-router'
import Button from '../ui/Button'

const navigation = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang Saya', href: '#about' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Sertifikat', href: '#certificates' },
]

const contactLinks = [
  { label: 'Email', href: 'mailto:randysaputra1203@gmail.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com/SunFireX3Z', icon: SiGithub },
]

function Footer() {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()

  const handleContactClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
      return
    }

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return

    event.preventDefault()
    const targetId = href.slice(1)

    if (window.location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
        })
      }, 100)
      return
    }

    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0b0d]">
      <div className="pointer-events-none absolute -right-32 -top-40 size-28rem rounded-full bg-orange-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-8rem size-26rem rounded-full bg-red-600/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 py-16 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:py-20 lg:py-24">
          <div className="flex flex-col items-start">
            <a
              href="#home"
              onClick={(event) => handleNavigationClick(event, '#home')}
              className="group inline-flex items-center gap-3"
              aria-label="SunFireX3Z — kembali ke beranda"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-950/30 transition-transform group-hover:-translate-y-0.5">
                <span className="size-3 rounded-full bg-white" />
              </span>

              <span className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                SunFireX3Z
              </span>
            </a>

            <h2 className="mt-8 max-w-xl text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Mari ciptakan sesuatu yang{' '}
              <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                bermakna.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Menggabungkan desain visual, pengalaman pengguna, dan
              pengembangan web untuk membangun pengalaman digital yang
              fungsional sekaligus menarik.
            </p>

            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowUpRight size={18} />}
                onClick={handleContactClick}
                className="rounded-xl transition-colors"
              >
                Mari Terhubung
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Navigasi
              </h3>

              <ul className="mt-6 flex flex-col items-start gap-4">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) =>
                        handleNavigationClick(event, item.href)
                      }
                      className="group inline-flex items-center gap-2 text-base text-text-primary/80 transition-colors hover:text-orange-400 sm:text-lg"
                    >
                      {item.label}

                      <MoveUpRight
                        size={14}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Temukan Saya
              </h3>

              <ul className="mt-6 flex flex-col items-start gap-4">
                {contactLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={
                          item.label === 'GitHub' ? '_blank' : undefined
                        }
                        rel={
                          item.label === 'GitHub'
                            ? 'noreferrer'
                            : undefined
                        }
                        className="group inline-flex items-center gap-3 text-base text-text-primary/80 transition-colors hover:text-orange-400 sm:text-lg"
                      >
                        <Icon
                          size={19}
                          className="shrink-0 text-orange-400"
                        />

                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>

              <p className="mt-8 max-w-48 text-sm leading-6 text-text-secondary">
                Terbuka untuk kolaborasi dan kesempatan baru.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
          <p className="text-sm leading-6 text-text-secondary sm:text-base">
            © {currentYear}{' '}
            <span className="font-medium text-text-primary">
              Randy Saputra
            </span>
            . Hak cipta dilindungi.
          </p>

          <a
            href="#home"
            onClick={(event) => handleNavigationClick(event, '#home')}
            className="group inline-flex min-h-10 items-center gap-2 self-start text-sm font-medium text-text-secondary transition-colors hover:text-orange-400 sm:self-auto sm:text-base"
          >
            Kembali ke atas
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
