import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Cuboid,
} from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import type { Project } from '../../data/projects/project-types'

type FeaturedProjectCardProps = {
  projects: Project[]
}

type SlideDirection = 'next' | 'previous'

function getCategoryVariant(category: string) {
  switch (category.trim().toLowerCase()) {
    case 'ui/ux design':
      return 'accent' as const
    case 'web development':
      return 'web' as const
    case 'graphic design':
      return 'graphic' as const
    default:
      return 'outlined' as const
  }
}

function FeaturedProjectCard({
  projects,
}: FeaturedProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<SlideDirection>('next')
  const AUTO_SLIDE_INTERVAL = 10_000

  if (projects.length === 0) {
    return null
  }

  const project = projects[currentIndex]

  const changeProject = (
    nextIndex: number,
    slideDirection: SlideDirection,
  ) => {
    setDirection(slideDirection)
    setCurrentIndex(nextIndex)
  }

  const goToPrevious = () => {
    changeProject(
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1,
      'previous',
    )
  }

  const goToNext = () => {
    changeProject(
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1,
      'next',
    )
  }

  const goToProject = (index: number) => {
    if (index === currentIndex) return

    changeProject(
      index,
      index > currentIndex ? 'next' : 'previous',
    )
  }

  useEffect(() => {
    if (projects.length <= 1) return

    const timer = window.setTimeout(() => {
      setDirection('next')
      setCurrentIndex((previousIndex) =>
        previousIndex === projects.length - 1
          ? 0
          : previousIndex + 1,
      )
    }, AUTO_SLIDE_INTERVAL)

    return () => window.clearTimeout(timer)
  }, [currentIndex, projects.length])

  return (
    <Card
      variant="interactive"
      padding="none"
      className="overflow-hidden rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div
          className="flex items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="size-2.5 rounded-full bg-primary" />
          <span className="size-2.5 rounded-full bg-primary" />
          <span className="size-2.5 rounded-full bg-primary" />
        </div>

        <span className="font-clash text-xs font-medium tracking-wider text-text-secondary">
          PROYEK UNGGULAN
        </span>
      </div>

      {/* Animated project content */}
      <div
        key={project.slug}
        className={`project-slide-${direction}`}
      >
        {/* Project image and carousel controls */}
        <div className="border-b border-white/5 bg-slate-950/60 p-3 sm:p-5">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            {project.image ? (
              <img
                src={project.image}
                alt={`Pratinjau ${project.title}`}
                className="absolute inset-0 size-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-general text-sm text-text-secondary">
                  Gambar belum tersedia
                </span>
              </div>
            )}

            {projects.length > 1 && (
              <>
                {/* Image overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-black/35"
                />

                {/* Previous button */}
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Proyek sebelumnya"
                  className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:left-5 sm:size-14"
                >
                  <ArrowLeft size={24} />
                </button>

                {/* Next button */}
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Proyek berikutnya"
                  className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-xl border border-primary bg-black/60 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-5 sm:size-14"
                >
                  <ArrowRight size={24} />
                </button>

                {/* Carousel indicators */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  <div className="flex max-w-[65%] items-center gap-2 rounded-lg border border-white/15 bg-black/60 px-3 py-3 backdrop-blur-sm">
                    {projects.map((item, index) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => goToProject(index)}
                        aria-label={`Lihat proyek ${index + 1}: ${item.title}`}
                        aria-current={
                          index === currentIndex ? 'true' : undefined
                        }
                        className={`size-2.5 shrink-0 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          index === currentIndex
                            ? 'scale-110 bg-primary'
                            : 'bg-white/40 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  key={project.slug}
                  className="absolute inset-x-0 bottom-0 z-20 h-1 overflow-hidden bg-white/20"
                  role="progressbar"
                  aria-label="Durasi proyek ditampilkan"
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-valuenow={10}
                >
                  <div className="project-progress-bar h-full bg-primary" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Project information */}
        <div className="grid grid-cols-1 items-stretch gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:p-8">
          <div className="flex min-w-0 flex-col gap-5">
            <div>
              <Badge variant={getCategoryVariant(project.category)}>
                {project.category}
              </Badge>
            </div>

            <div className="space-y-3">
              <h3 className="font-clash text-2xl font-bold leading-tight text-text-primary md:text-3xl">
                {project.title}
              </h3>

              <p className="font-general text-base leading-7 text-text-secondary">
                {project.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-auto flex flex-wrap gap-3 pt-1">
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary bg-transparent px-4 font-general text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Lihat Detail
                <ArrowUpRight size={16} />
              </Link>

              <button
                type="button"
                disabled={!project.demoLink}
                onClick={() => {
                  if (project.demoLink) {
                    window.open(
                      project.demoLink,
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }
                }}
                className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 font-general text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${
                  project.demoLink
                    ? 'bg-linear-to-r from-primary to-accent text-white hover:brightness-110'
                    : 'bg-linear-to-r from-primary/40 to-accent/40 text-white'
                }`}
              >
                Demo Langsung
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Project metadata */}
          <div className="flex h-full flex-col gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <h4 className="font-general text-lg font-bold text-text-primary sm:text-xl">
              Informasi Proyek
            </h4>

            <div className="h-px w-full bg-linear-to-r from-primary/60 via-white/10 to-transparent" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex min-w-0 items-start gap-3">
                <Cuboid
                  size={22}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <div className="min-w-0">
                  <p className="font-general text-sm text-text-secondary">Peran</p>
                  <p className="font-general mt-1 wrap-break-words text-base font-semibold leading-6 text-text-primary">
                    {project.role ?? '—'}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <CalendarDays
                  size={22}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <div className="min-w-0">
                  <p className="font-general text-sm text-text-secondary">Teknologi</p>
                  <p className="font-general mt-1 wrap-break-words text-base font-semibold leading-6 text-text-primary">
                    {project.technologies?.join(', ') || '—'}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <Clock3
                  size={22}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <div className="min-w-0">
                  <p className="font-general text-sm text-text-secondary">Durasi</p>
                  <p className="font-general mt-1 wrap-break-words text-base font-semibold leading-6 text-text-primary">
                    {project.duration ?? '—'}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <div className="min-w-0">
                  <p className="font-general text-sm text-text-secondary">Status</p>
                  <p className="font-general mt-1 wrap-break-words text-base font-semibold leading-6 text-text-primary">
                    {project.status ?? '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default FeaturedProjectCard