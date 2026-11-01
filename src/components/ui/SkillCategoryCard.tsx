import { Check, Code2, Palette, PenTool } from 'lucide-react'
import Card from './Card'
import type { SkillCategory } from '@/data/skills'

type SkillCategoryCardProps = {
  category: SkillCategory
  index: number
}

const categoryIcons = {
  orange: Code2,
  amber: PenTool,
  palette: Palette,
}

const accentStyles = {
  orange: {
    number: 'text-orange-400',
    badge: 'border-orange-500/25 bg-orange-500/10 text-orange-300',
    icon: 'border-orange-500/25 bg-orange-500/10 text-orange-400',
    check: 'text-orange-400',
  },
  amber: {
    number: 'text-amber-700',
    badge: 'border-amber-700/30 bg-amber-800/15 text-amber-500',
    icon: 'border-amber-700/30 bg-amber-800/15 text-amber-500',
    check: 'text-amber-600',
  },
  palette: {
    number: 'text-orange-500',
    badge: 'border-orange-600/25 bg-orange-600/10 text-orange-400',
    icon: 'border-orange-600/25 bg-orange-600/10 text-orange-500',
    check: 'text-orange-500',
  },
}

function SkillCategoryCard({
  category,
}: SkillCategoryCardProps) {
  const Icon = categoryIcons[category.accent]
  const accent = accentStyles[category.accent]

  return (
    <Card
      variant="tilt"
      padding="none"
      className="h-full rounded-2xl transition-colors duration-300 hover:border-orange-500/30"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-orange-600" />
          <span className="size-2.5 rounded-full bg-orange-500/70" />
          <span className="size-2.5 rounded-full bg-amber-800/80" />
        </div>

        <span
          className={`font-general text-sm font-semibold tracking-widest ${accent.number}`}
        >
          {category.number}
        </span>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-xl border md:size-16 ${accent.icon}`}
          >
            <Icon size={30} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h3 className="font-clash text-xl font-bold leading-snug text-white md:text-2xl">
              {category.title}
            </h3>

            <p className="font-general mt-2 text-base leading-7 text-slate-400">
              {category.description}
            </p>
          </div>
        </div>

        <div className="mb-4 mt-7 flex items-center gap-3 font-general text-sm font-semibold uppercase tracking-wider text-orange-400">
          <span className="shrink-0">Kemampuan Utama</span>
          <span className="h-px flex-1 bg-linear-to-r from-orange-600/60 via-amber-800/40 to-transparent" />
        </div>

        <ul className="flex flex-wrap gap-2.5">
          {category.skills.map((skill) => (
            <li
              key={skill}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-general text-sm font-medium md:text-base ${accent.badge}`}
            >
              <Check
                size={16}
                className={`shrink-0 ${accent.check}`}
              />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default SkillCategoryCard