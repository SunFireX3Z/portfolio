import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { publishedProjects } from '../data/projects'
import ProjectCard from '../components/ui/ProjectCard'
import Pagination from '../components/ui/Pagination'

type SortOption = 'newest' | 'title-asc' | 'title-desc'
type SlideDirection = 'right' | 'left'

const PROJECTS_PER_PAGE = 9

const categoryColors: Record<string, string> = {
  'UI/UX Design':
    'data-[active=true]:bg-gradient-to-r data-[active=true]:from-category-ui-start data-[active=true]:to-category-ui-end data-[active=true]:text-white',
  'Web Development':
    'data-[active=true]:bg-gradient-to-r data-[active=true]:from-category-web-start data-[active=true]:to-category-web-end data-[active=true]:text-white',
  'Graphic Design':
    'data-[active=true]:bg-gradient-to-r data-[active=true]:from-category-graphic-start data-[active=true]:to-category-graphic-end data-[active=true]:text-white',
}

function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [slideDirection, setSlideDirection] =
    useState<SlideDirection>('right')

  const categories = useMemo(
    () => [
      'Semua',
      ...Array.from(
        new Set(publishedProjects.map((project) => project.category)),
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [],
  )

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const result = publishedProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'Semua' ||
        project.category === selectedCategory

      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...(project.technologies ?? []),
      ]
        .join(' ')
        .toLowerCase()

      return matchesCategory && searchableText.includes(query)
    })

    return result.sort((a, b) => {
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title)
      }

      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title)
      }

      const dateA = Date.parse(a.startDate ?? '') || 0
      const dateB = Date.parse(b.startDate ?? '') || 0

      return dateB - dateA
    })
  }, [searchQuery, selectedCategory, sortBy])

  const totalPages = Math.ceil(
    filteredProjects.length / PROJECTS_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage(1)
    setSlideDirection('right')
  }, [searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE

  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  )

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'Semua'

  function handlePageChange(page: number) {
    if (page === currentPage || page < 1 || page > totalPages) {
      return
    }

    setSlideDirection(page > currentPage ? 'left' : 'right')
    setCurrentPage(page)
  }

  function resetFilters() {
    setSearchQuery('')
    setSelectedCategory('Semua')
    setSortBy('newest')
    setCurrentPage(1)
    setSlideDirection('right')
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-8">
      {/* Header */}
      <header>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 font-general text-sm text-text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </Link>

        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Judul dan deskripsi */}
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-0.5 w-8 rounded-full bg-primary" />

              <span className="font-general text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Portofolio
              </span>
            </div>

            <h1 className="font-clash text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              Semua Proyek
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-4 max-w-2xl font-general text-base leading-8 text-text-secondary md:text-lg">
              Jelajahi berbagai proyek yang saya kerjakan, mulai dari desain
              UI/UX, pengembangan web, hingga desain grafis.
            </p>
          </div>

          {/* Statistik */}
          <div className="grid shrink-0 grid-cols-2 gap-3 md:w-64">
            <div className="rounded-xl border border-white/10 bg-surface px-4 py-4">
              <p className="font-clash text-2xl font-bold text-text-primary">
                {publishedProjects.length}
              </p>
              <p className="mt-1 font-general text-xs text-text-secondary">
                Total proyek
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface px-4 py-4">
              <p className="font-clash text-2xl font-bold text-text-primary">
                {categories.length - 1}
              </p>
              <p className="mt-1 font-general text-xs text-text-secondary">
                Kategori
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Pencarian dan filter */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-surface p-4 md:p-6">
        <div className="flex flex-col gap-5">
          {/* Pencarian */}
          <div>
            <label
              htmlFor="project-search"
              className="mb-2 block font-general text-sm font-medium text-text-primary"
            >
              Cari proyek
            </label>

            <div className="relative">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
              />

              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari judul, teknologi, atau kategori..."
                className="font-general min-h-12 w-full rounded-xl border border-white/10 bg-background py-3 pl-11 pr-11 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/70 focus:border-primary"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-secondary transition-colors hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filter kategori */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <SlidersHorizontal
                size={16}
                className="text-primary"
                aria-hidden="true"
              />

              <span className="font-general text-sm font-medium text-text-primary">
                Kategori proyek
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    data-active={isActive}
                    aria-pressed={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={[
                      'rounded-lg border px-4 py-2.5 font-general text-sm font-medium transition-colors',
                      isActive
                        ? 'border-transparent bg-linear-to-r from-primary to-accent text-white'
                        : 'border-white/10 bg-background text-text-secondary hover:border-white/20 hover:text-text-primary',
                      categoryColors[category] ?? '',
                    ].join(' ')}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Jumlah hasil dan pengurutan */}
          <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
            <p aria-live="polite" className="font-general text-sm text-text-secondary">
              Menampilkan{' '}
              <span className="font-general font-semibold text-text-primary">
                {filteredProjects.length}
              </span>{' '}
              dari {publishedProjects.length} proyek
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="project-sort"
                className="flex items-center gap-2 font-general text-sm text-text-secondary"
              >
                <ArrowUpDown size={15} aria-hidden="true" />
                Urutkan
              </label>

              <div className="relative">
                <select
                  id="project-sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  className="font-general min-h-10 appearance-none rounded-lg border border-white/10 bg-background py-2 pl-3 pr-10 text-sm text-text-primary outline-none transition-colors focus:border-primary"
                >
                  <option value="newest">Terbaru</option>
                  <option value="title-asc">Judul A–Z</option>
                  <option value="title-desc">Judul Z–A</option>
                </select>

                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 font-general text-sm font-medium text-primary transition-colors hover:text-orange-300"
                >
                  <X size={15} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid proyek */}
      <div
        key={currentPage}
        className={`project-page-slide-in-${slideDirection} mt-8`}
      >
        {paginatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-surface">
              <Search size={24} className="text-text-secondary" />
            </div>

            <h2 className="mt-5 font-clash text-xl font-semibold text-text-primary">
              Proyek tidak ditemukan
            </h2>

            <p className="mx-auto mt-2 max-w-md font-general text-sm leading-6 text-text-secondary">
              Tidak ada proyek yang cocok dengan pencarian atau kategori
              yang dipilih. Coba kata kunci lain atau reset filter.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-linear-to-r from-primary to-accent px-5 py-2.5 font-general text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <X size={16} />
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        firstItem={filteredProjects.length === 0 ? 0 : startIndex + 1}
        lastItem={Math.min(
          startIndex + PROJECTS_PER_PAGE,
          filteredProjects.length,
        )}
        totalItems={filteredProjects.length}
        onPageChange={handlePageChange}
      />
    </section>
  )
}

export default Projects