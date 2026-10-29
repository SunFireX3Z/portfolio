import { Check, Code2, Palette, Server } from 'lucide-react'
import type { SkillCategory } from '@/data/skills'

type SkillCardProps = {
  skill: SkillCategory
}

const categoryIcons = {
  orange: Code2,
  red: Server,
  amber: Palette,
}

function SkillCard({ skill }: SkillCardProps) {
  const Icon = categoryIcons[skill.accent]

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition-colors hover:border-orange-400/30">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-orange-500" />
          <span className="size-2.5 rounded-full bg-orange-500/70" />
          <span className="size-2.5 rounded-full bg-orange-500/40" />
        </div>

        <span className="text-sm font-semibold tracking-widest text-orange-400">
          {skill.number}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-orange-400/20 bg-linear-to-br from-orange-500/20 to-red-500/10 text-orange-400 md:size-16">
            <Icon size={30} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
              {skill.title}
            </h3>

            <p className="mt-2 text-base leading-7 text-slate-400">
              {skill.description}
            </p>
          </div>
        </div>

        <div className="mb-4 mt-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-orange-400">
          <span className="shrink-0">Kemampuan Utama</span>
          <span className="h-px flex-1 bg-linear-to-r from-orange-500/50 to-white/5" />
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {skill.skills.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-base leading-6 text-slate-300"
            >
              <Check
                size={18}
                className="mt-1 shrink-0 text-orange-400"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default SkillCard