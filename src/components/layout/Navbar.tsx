import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import useActiveSection from '@/hooks/useActiveSection'

type NavItem = {
  label: string
  href: string
}

type NavbarProps = {
  name?: string
  items?: NavItem[]
  activeItem?: string
}

const defaultItems: NavItem[] = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Kontak', href: '#contact' },
]

function Navbar({
  items = defaultItems,
  activeItem = 'Beranda',
}: NavbarProps) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const sectionIds = items
    .map((item) => {
      if (item.href.startsWith('#')) {
        return item.href.slice(1)
      }

      if (item.href === '/projects') {
        return 'projects'
      }

      return null
    })
    .filter((id): id is string => id !== null)

  const activeSection = useActiveSection(
    pathname === '/' ? sectionIds : [],
  )

  const active =
    pathname === '/projects'
      ? 'Proyek'
      : items.find((item) => {
          const sectionId = item.href.startsWith('#')
            ? item.href.slice(1)
            : item.href === '/projects'
              ? 'projects'
              : null

          return sectionId === activeSection
        })?.label ?? activeItem

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-b from-background via-background/90 to-transparent backdrop-blur-xs">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8 lg:py-5"
      >
        <Link
          to="/#home"
          className="flex shrink-0 items-center gap-3"
        >
          <img
            src="/logo.svg"
            alt=""
            className="size-11 object-contain"
          />

          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                SunFire
              </span>
              <span className="text-text-primary">X3Z</span>
            </span>

            <span className="text-xs font-medium tracking-wide text-text-secondary">
              Randy Saputra
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex lg:gap-4 xl:gap-6">
          {items.map((item) => {
            const isActive = active === item.label
            const isSectionLink = item.href.startsWith('#')

            return (
              <Link
                key={item.href}
                to={isSectionLink ? `/${item.href}` : item.href}
                aria-current={isActive ? 'location' : undefined}
                className={[
                  'group relative flex min-h-11 items-center px-3 py-2',
                  'text-base font-medium transition-colors duration-200',
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {item.label}

                <span
                  aria-hidden="true"
                  className={[
                    'absolute inset-x-3 bottom-1 h-0.5 rounded-full',
                    'bg-linear-to-r from-primary to-accent',
                    'origin-left transition-transform duration-300 ease-out',
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100',
                  ].join(' ')}
                />
              </Link>
            )
          })}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="flex size-11 items-center justify-center rounded-xl border border-white/10 text-text-primary transition-colors hover:border-orange-400/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
        >
          <span className="relative flex size-5 items-center justify-center">
            <Menu
              aria-hidden="true"
              className={`absolute size-5 transition-[opacity,transform] duration-200 ${
                menuOpen
                  ? 'rotate-90 scale-50 opacity-0'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
            />

            <X
              aria-hidden="true"
              className={`absolute size-5 transition-[opacity,transform] duration-200 ${
                menuOpen
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-50 opacity-0'
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`absolute inset-x-0 top-full z-50 grid overflow-hidden border-t border-white/5 bg-background/95 shadow-xl backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none lg:hidden ${
          menuOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-3 lg:px-8">
            {items.map((item, index) => {
              const isActive = active === item.label
              const isSectionLink = item.href.startsWith('#')

              return (
                <Link
                  key={item.href}
                  to={isSectionLink ? `/${item.href}` : item.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 35}ms`
                      : '0ms',
                  }}
                  className={[
                    'flex min-h-11 items-center justify-between rounded-xl px-4 py-3',
                    'text-sm font-medium transition-[color,background-color,opacity,transform] duration-200',
                    isActive
                      ? 'bg-orange-400/10 text-primary'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-2 opacity-0',
                  ].join(' ')}
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full bg-primary transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar