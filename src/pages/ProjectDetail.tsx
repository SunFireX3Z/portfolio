import type { ReactNode } from 'react'

import { Link, useParams } from 'react-router'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from 'lucide-react'

import { publishedProjects } from '../data/projects'
import Badge from '../components/ui/Badge'
import NotFound from './NotFound'

import AffinityIcon from '@/assets/icons/technologies/affinity.svg?url'
import CanvaIcon from '@/assets/icons/technologies/canva.svg?url'
import ChatGPTIcon from '@/assets/icons/technologies/chatgpt.svg?url'
import CSSIcon from '@/assets/icons/technologies/css.svg?url'
import FigmaIcon from '@/assets/icons/technologies/figma.svg?url'
import GeminiIcon from '@/assets/icons/technologies/gemini.svg?url'
import GitIcon from '@/assets/icons/technologies/git.svg?url'
import GitHubCopilotIcon from '@/assets/icons/technologies/github-copilot.svg?url'
import GitHubIcon from '@/assets/icons/technologies/github.svg?url'
import HTMLIcon from '@/assets/icons/technologies/html5.svg?url'
import JavaScriptIcon from '@/assets/icons/technologies/javascript.svg?url'
import PHPIcon from '@/assets/icons/technologies/php.svg?url'
import ReactIcon from '@/assets/icons/technologies/reactjs.svg?url'
import TailwindIcon from '@/assets/icons/technologies/tailwind.svg?url'
import TypeScriptIcon from '@/assets/icons/technologies/typescript.svg?url'
import VSCodeIcon from '@/assets/icons/technologies/vscode.svg?url'
import MySQLIcon from '@/assets/icons/technologies/mysql.svg?url'
import BootstrapIcon from '@/assets/icons/technologies/bootstrap.svg?url'
import PixellabIcon from '@/assets/icons/technologies/pixellab.svg?url'

type MetadataCardProps = {
  icon: ReactNode
  label: string
  value: string
}

const technologyLogos: Record<string, string> = {
  Affinity: AffinityIcon,
  Canva: CanvaIcon,
  ChatGPT: ChatGPTIcon,
  CSS: CSSIcon,
  Figma: FigmaIcon,
  Gemini: GeminiIcon,
  Git: GitIcon,
  'GitHub Copilot': GitHubCopilotIcon,
  GitHub: GitHubIcon,
  HTML: HTMLIcon,
  JavaScript: JavaScriptIcon,
  PHP: PHPIcon,
  React: ReactIcon,
  'Tailwind CSS': TailwindIcon,
  TypeScript: TypeScriptIcon,
  'Visual Studio Code': VSCodeIcon,
  MySQL: MySQLIcon,
  Bootstrap: BootstrapIcon,
  Pixellab: PixellabIcon,
}

function formatProjectDate(date: string): string {
  // Format yang disarankan: YYYY-MM-DD, contoh 2026-06-12.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

  if (!match) {
    return date
  }

  const [, year, month, day] = match
  const parsedDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day)),
  )

  // Pastikan tanggal yang dimasukkan benar-benar valid.
  if (
    parsedDate.getUTCFullYear() !== Number(year) ||
    parsedDate.getUTCMonth() !== Number(month) - 1 ||
    parsedDate.getUTCDate() !== Number(day)
  ) {
    return date
  }

  return parsedDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function MetadataCard({ icon, label, value }: MetadataCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/0.02 p-4">
      <div className="flex items-center gap-3">
        <div className="shrink-0 text-orange-400">{icon}</div>

        <div className="min-w-0">
          <p className="font-general text-sm text-text-secondary">{label}</p>
          <p className="mt-1 font-general font-medium text-text-primary">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

function ProjectNavigation() {
  return (
    <nav aria-label="Navigasi halaman" className="flex flex-wrap items-center gap-4">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-general text-sm font-medium text-text-secondary transition-colors hover:text-orange-400"
      >
        <ArrowLeft size={18} />
        Kembali ke Katalog Proyek
      </Link>

      <span
        aria-hidden="true"
        className="h-5 w-px bg-white/15"
      />

      <Link
        to="/"
        className="font-general text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        Beranda
      </Link>
    </nav>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = publishedProjects.find((item) => item.slug === slug)

  if (!project) {
    return <NotFound />
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <ProjectNavigation />

      {/* Header proyek */}
      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 font-general text-sm text-orange-300">
            {project.category}
          </span>

          <span className="font-general text-sm text-text-secondary">
            {project.projectType}
          </span>
        </div>

        <h1 className="mt-5 font-clash text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
          {project.title}
        </h1>

        <p className="mt-5 font-general text-base leading-8 text-text-secondary md:text-lg">
          {project.description}
        </p>
      </header>

      {/* Thumbnail proyek */}
      {project.image && (
        <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/0.02">
          <img
            src={project.image}
            alt={`Thumbnail ${project.title}`}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Ringkasan proyek */}
      {(project.role ||
        project.startDate ||
        project.status ||
        project.duration) && (
        <section className="mt-10">
          <h2 className="font-clash text-xl font-semibold text-text-primary">
            Ringkasan Proyek
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.role && (
              <MetadataCard
                icon={<UserRound size={20} />}
                label="Peran"
                value={project.role}
              />
            )}

            {project.startDate && (
              <MetadataCard
                icon={<CalendarDays size={20} />}
                label="Tanggal Mulai"
                value={formatProjectDate(project.startDate)}
              />
            )}

            {project.status && (
              <MetadataCard
                icon={<CheckCircle2 size={20} />}
                label="Status"
                value={project.status}
              />
            )}

            {project.duration && (
              <MetadataCard
                icon={<Clock3 size={20} />}
                label="Durasi"
                value={project.duration}
              />
            )}
          </div>
        </section>
      )}

      {/* Teknologi */}
      {project.technologies.length > 0 && (
        <section className="mt-10">
          <h2 className="font-clash text-xl font-semibold text-text-primary">
            Teknologi yang Digunakan
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {project.technologies.map((technology) => {
              const logo = technologyLogos[technology]

              return (
                <Badge
                  key={technology}
                  variant="outlined"
                  className="gap-2 rounded-lg px-3 py-2 text-sm"
                  leftIcon={
                    logo ? (
                      <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="size-5 shrink-0 object-contain"
                      />
                    ) : null
                  }
                >
                  {technology}
                </Badge>
              )
            })}
          </div>
        </section>
      )}

      {/* Isi studi kasus dari MDX */}
      <section className="mt-14 border-t border-white/10 pt-10">
        <div className="mb-8">
          <p className="font-general text-sm font-medium uppercase tracking-widest text-orange-400">
            Studi Kasus
          </p>

          <h2 className="mt-2 font-clash text-2xl font-bold text-text-primary md:text-3xl">
            Proses dan Dokumentasi Proyek
          </h2>
        </div>

        <article
          className="
            w-full min-w-0 space-y-5
            font-general text-base leading-7 text-text-secondary
            [&>h1]:pt-5 [&>h1]:font-clash [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:leading-tight [&>h1]:text-text-primary
            [&>h2]:border-b [&>h2]:border-white/10 [&>h2]:pb-3 [&>h2]:pt-8 [&>h2]:font-clash [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:leading-snug [&>h2]:text-text-primary
            [&>h3]:pt-4 [&>h3]:font-clash [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-text-primary
            [&_p]:leading-7
            [&_a]:text-orange-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-orange-300
            [&_strong]:font-semibold [&_strong]:text-text-primary
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
            [&_li]:pl-1
            [&_blockquote]:border-l-2 [&_blockquote]:border-orange-400 [&_blockquote]:bg-white/0.03 [&_blockquote]:px-5 [&_blockquote]:py-4
            [&_hr]:border-white/10
            [&_img]:my-6 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-white/10
            [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/30 [&_pre]:p-5
            [&_code]:rounded [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-orange-300
            [&_pre_code]:bg-transparent [&_pre_code]:p-0
            [&_table]:w-full [&_table]:border-collapse
            [&_th]:border-b [&_th]:border-white/10 [&_th]:p-3 [&_th]:text-left [&_th]:font-general [&_th]:font-semibold [&_th]:text-text-primary
            [&_td]:border-b [&_td]:border-white/10 [&_td]:p-3
          "
        >
          <project.Content />
        </article>
      </section>

      {/* Tombol demo */}
      {project.demoLink && (
        <div className="mt-12 border-t border-white/10 pt-8">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-orange-500 to-amber-400 px-5 py-3 font-general text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Lihat Demo Langsung
          </a>
        </div>
      )}
    </section>
  )
}

export default ProjectDetail