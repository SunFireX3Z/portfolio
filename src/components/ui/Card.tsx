import {
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'outlined' | 'interactive' | 'tilt'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  image?: ReactNode
  contentClassName?: string
}

type GlowStyle = CSSProperties & {
  '--mouse-x': string
  '--mouse-y': string
  '--rotate-x': string
  '--rotate-y': string
}

const variants = {
  default: 'border border-white/5 bg-surface',
  outlined: 'border border-white/10 bg-transparent',
  interactive: 'border border-white/10 bg-surface',
  tilt: 'border border-white/10 bg-surface',
}

const paddings = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

const MAX_TILT = 6

function Card({
  children,
  variant = 'default',
  padding = 'md',
  image,
  contentClassName = '',
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
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  })

  const hasGlow = variant === 'interactive' || variant === 'tilt'
  const hasTilt = variant === 'tilt'

  const glowStyle: GlowStyle = {
    '--mouse-x': `${glowPosition.x}%`,
    '--mouse-y': `${glowPosition.y}%`,
    '--rotate-x': `${tilt.x}deg`,
    '--rotate-y': `${tilt.y}deg`,
  }

  return (
    <div
      {...props}
      style={{
        ...style,
        ...(hasGlow ? glowStyle : {}),
      }}
      onMouseMove={(event) => {
        onMouseMove?.(event)

        if (!hasGlow) return

        const rect = event.currentTarget.getBoundingClientRect()

        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height

        setGlowPosition({
          x: x * 100,
          y: y * 100,
        })

        if (hasTilt) {
          setTilt({
            x: (0.5 - y) * MAX_TILT * 2,
            y: (x - 0.5) * MAX_TILT * 2,
          })
        }

        setIsHovered(true)
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
        setIsHovered(false)
        setTilt({ x: 0, y: 0 })
      }}
      className={[
        'relative h-full overflow-hidden rounded-2xl',
        variants[variant],
        hasGlow && 'card-mouse-glow',
        hasTilt && 'card-tilt',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-glow={hasGlow && isHovered ? 'active' : 'inactive'}
    >
      {image}

      <div
        className={[
          'flex h-full flex-col',
          paddings[padding],
          image && 'flex-1',
          image && padding === 'none' && 'p-5',
          contentClassName,
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