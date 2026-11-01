import Card from './Card'
import Badge from './Badge'
import Button from './Button'
import { ArrowRight } from 'lucide-react'
import type { Project } from '../../data/projects/project-types'
import { Link } from 'react-router'

type ProjectCardProps = Project

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

function getStatusStyle(status: string) {
  switch (status.trim().toLowerCase()) {
    case 'selesai':
      return 'bg-emerald-500 text-white'
    case 'dalam pengembangan':
      return 'bg-amber-500 text-black'
    case 'konsep':
      return 'bg-violet-500 text-white'
    default:
      return 'bg-slate-600 text-white'
  }
}

function ProjectCard({
  slug,
  image,
  title,
  description,
  category,
  status,
}: ProjectCardProps) {
  return (
    <Card
      variant="interactive"
      padding="none"
      className="flex h-full flex-col rounded-2xl"
      image={
        <>
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-primary" />
              <span className="size-2.5 rounded-full bg-primary" />
              <span className="size-2.5 rounded-full bg-primary" />
            </div>

            <div aria-hidden="true" className="flex gap-4">
              <span className="h-0.5 w-5 rounded-full bg-primary" />
              <span className="h-0.5 w-5 rounded-full bg-primary" />
              <span className="h-0.5 w-5 rounded-full bg-primary" />
            </div>

            <div
              aria-hidden="true"
              className="flex items-center gap-1 font-general text-sm font-medium tracking-tight text-primary"
            >
              <span>/</span>
              <span>/</span>
              <span>/</span>
              <span>/</span>
              <span>/</span>
            </div>
          </div>

          <div className="relative overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={`Pratinjau ${title}`}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-white/5">
                <span className="font-general text-sm text-text-secondary">
                  Gambar belum tersedia
                </span>
              </div>
            )}                 
            {status && (
              <div
                className="pointer-events-none absolute right-0 top-0 z-10 size-28 overflow-hidden"
                aria-label={`Status proyek: ${status}`}
              >
                <span
                  className={[
                    'absolute -right-36px top-20px w-145px rotate-45',
                    'px-2 py-1.5 text-center font-general text-[10px] font-bold uppercase tracking-wider',
                    'whitespace-nowrap shadow-lg',
                    getStatusStyle(status),
                  ].join(' ')}
                >
                  {status}
                </span>
              </div>
            )}
          </div>
        </>
      }
    >
      <div className="flex flex-1 flex-col">
        {/* Konten utama */}
        <div className="flex flex-col gap-2">
          <h3 className="font-clash text-xl font-bold text-text-primary">
            {title}
          </h3>

          <p className="font-general line-clamp-3 text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>

        {/* Selalu didorong ke dasar area konten */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Badge variant={getCategoryVariant(category)}>
            {category}
          </Badge>

          <Link to={`/projects/${slug}`}>
            <Button
              variant="tertiary"
              size="sm"
              rightIcon={<ArrowRight size={16} />}
            >
              Lihat Proyek
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard