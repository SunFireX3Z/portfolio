import type { ReactNode } from 'react'
import { CalendarDays, MapPin } from 'lucide-react'

export type TimelineItemProps = {
  title: string
  organization: string
  period: string
  description: string
  location?: string
  icon?: ReactNode
  isLast?: boolean
}

function TimelineItem({
  title,
  organization,
  period,
  description,
  location,
  icon,
  isLast = false,
}: TimelineItemProps) {
  return (
    <article className="flex gap-4 rounded-xl border border-white/10 bg-surface p-5">
      <div className="flex w-10 shrink-0 flex-col items-center">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          {icon ?? <CalendarDays size={18} />}
        </div>

        {!isLast && (
          <div className="mt-2 min-h-8 w-px flex-1 bg-linear-to-b from-primary/50 to-white/10" />
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-3 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <CalendarDays size={12} />
            {period}
          </span>

          {location && (
            <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
              <MapPin size={12} />
              {location}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-semibold text-text-primary">
            {title}
          </h3>
          <p className="text-sm font-medium text-primary">
            {organization}
          </p>
        </div>

        <p className="text-sm leading-6 text-text-secondary">
          {description}
        </p>
      </div>
    </article>
  )
}

export default TimelineItem