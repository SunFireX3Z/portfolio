import {
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'outlined' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  image?: ReactNode
}

type GlowStyle = CSSProperties & {
  '--mouse-x': string
  '--mouse-y': string
}

const variants = {
  default: 'border border-white/5 bg-surface',
  outlined: 'border border-white/10 bg-transparent',
  interactive: 'border border-white/10 bg-surface',
}

const paddings = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

function Card({
  children,
  variant = 'default',
  padding = 'md',
  image,
  className = '',
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [glowPosition, setGlowPosition] = useState({
    x: 50,
    y: 50,
  })

  const isInteractive = variant === 'interactive'

  const glowStyle: GlowStyle = {
    '--mouse-x': `${glowPosition.x}%`,
    '--mouse-y': `${glowPosition.y}%`,
  }

  return (
    <div
      {...props}
      style={{
        ...style,
        ...(isInteractive ? glowStyle : {}),
      }}
      onMouseMove={(event) => {
        onMouseMove?.(event)

        const rect = event.currentTarget.getBoundingClientRect()

        setGlowPosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        })

        setIsHovered(true)
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
        setIsHovered(false)
      }}
      className={[
        'relative h-full overflow-hidden rounded-2xl',
        variants[variant],
        isInteractive && 'card-mouse-glow',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-glow={isInteractive && isHovered ? 'active' : 'inactive'}
    >
      {image}

      <div
        className={[
          'flex h-full flex-col',
          paddings[padding],
          image && 'flex-1',
          image && padding === 'none' && 'p-5',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

export default Card