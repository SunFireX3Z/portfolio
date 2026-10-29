import type { HTMLAttributes, ReactNode } from 'react'

type SectionBadgeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

function SectionBadge({
  children,
  className = '',
  ...props
}: SectionBadgeProps) {
  return (
    <div
      {...props}
      className={[
        'inline-flex items-center gap-2 rounded-full',
        'border border-orange-500/25 bg-orange-500/10',
        'px-4 py-2 text-sm font-semibold text-orange-300',
        className,
      ].join(' ')}
    >
      <span className="size-2 shrink-0 rounded-full bg-orange-400" />
      {children}
    </div>
  )
}

export default SectionBadge