import type { HTMLAttributes, ReactNode } from 'react'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'accent' | 'outlined' | 'subtle' | 'web' | 'graphic'
  dot?: boolean
  leftIcon?: ReactNode
}

const variants = {
  accent:
    'bg-gradient-to-r from-category-ui-start to-category-ui-end text-white',
  outlined: 'border border-white/10 bg-surface text-text-primary',
  subtle: 'bg-orange-500/10 text-orange-300',
  web: 'bg-gradient-to-r from-category-web-start to-category-web-end text-white',
  graphic:
    'bg-gradient-to-r from-category-graphic-start to-category-graphic-end text-white',
}

function Badge({
  children,
  variant = 'outlined',
  dot = false,
  leftIcon,
  className = '',
  ...props
}: BadgeProps) {
  const dotColors = {
    accent: 'bg-white',
    outlined: 'bg-primary',
    subtle: 'bg-orange-300',
    web: 'bg-white',
    graphic: 'bg-white',
  }

  return (
    <span
      {...props}
      className={[
        'inline-flex w-fit items-center rounded-md font-general font-medium',
        variants[variant],
        className,
      ].join(' ')}
      style={{
        padding: '5px 10px',
        gap: '6px',
        fontSize: '12px',
        lineHeight: '16px',
        ...props.style,
      }}
    >
      {leftIcon}

      {dot && (
        <span
          aria-hidden="true"
          className={`block size-1.5 shrink-0 rounded-full ${dotColors[variant]}`}
        />
      )}

      {children}
    </span>
  )
}

export default Badge