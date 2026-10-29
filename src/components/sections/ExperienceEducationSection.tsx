import { useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import {
  education,
  experiences,
  type TimelineItem,
} from '@/data/experience-education'
import Card from '../ui/Card'
import SectionBadge from '../ui/SectionBadge'
import SectionDivider from '../ui/SectionDivider'

function TimelineItemCard({
  item,
  category,
}: {
  item: TimelineItem
  category: 'Pendidikan' | 'Pengalaman'
}) {
  const [expanded, setExpanded] = useState(false)
  const contentId = useId()

  return (
    <article className="relative pl-8 sm:pl-10">
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 size-3 rounded-full border-2 border-orange-400 bg-background"
      />

      <Card variant="interactive" padding="md">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 p-1.5 sm:size-14">
            <img
              src={item.logo}
              alt={item.logoAlt}
              className="size-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-2.5 py-1 text-xs font-medium text-orange-300">
                {category}
              </span>

              <span className="text-xs text-text-secondary">
                {item.period}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold text-text-primary sm:text-xl">
              {item.title}
            </h3>

            <p className="mt-1 text-sm font-medium text-text-secondary">
              {item.institution}
            </p>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              {item.description}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((previous) => !previous)}
            className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-orange-300 transition-colors hover:text-orange-200"
          >
            <span>
              {expanded ? 'Sembunyikan detail' : 'Lihat detail'}
            </span>

            <span className="relative flex size-6 shrink-0 items-center justify-center">
              <Plus
                aria-hidden="true"
                className={`absolute size-4 transition-[opacity,transform] duration-200 ${
                  expanded
                    ? 'rotate-90 scale-50 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />

              <Minus
                aria-hidden="true"
                className={`absolute size-4 transition-[opacity,transform] duration-200 ${
                  expanded
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-50 opacity-0'
                }`}
              />
            </span>
          </button>

          <div
            id={contentId}
            aria-hidden={!expanded}
            inert={!expanded}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
              expanded
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <ul className="space-y-3 pt-4">
                {item.details.map((detail, index) => (
                  <li
                    key={detail}
                    style={{
                      transitionDelay: expanded
                        ? `${index * 60}ms`
                        : '0ms',
                    }}
                    className={`flex items-start gap-3 text-sm leading-6 text-text-secondary transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                      expanded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-2 opacity-0'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-400"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </article>
  )
}

export default function ExperienceEducationSection() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-22 border-t border-white/5 px-6 py-20 text-text-primary lg:px-8 lg:py-28"
    >
      <SectionDivider />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionBadge>Perjalanan Saya</SectionBadge>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Pendidikan &amp; Pengalaman
          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Perjalanan saya dalam mempelajari pengembangan perangkat lunak,
            membangun aplikasi web, dan mengembangkan keterampilan desain.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="mb-7 text-xl font-semibold text-text-primary">
              Pendidikan
            </h3>

            <div className="relative space-y-6 before:absolute before:bottom-4 before:left-5px before:top-6 before:w-px before:bg-white/10">
              {education.map((item) => (
                <TimelineItemCard
                  key={item.id}
                  item={item}
                  category="Pendidikan"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-7 text-xl font-semibold text-text-primary">
              Pengalaman
            </h3>

            <div className="relative space-y-6 before:absolute before:bottom-4 before:left-5px before:top-6 before:w-px before:bg-white/10">
              {experiences.map((item) => (
                <TimelineItemCard
                  key={item.id}
                  item={item}
                  category="Pengalaman"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}