
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type SharedProps = {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg' | 'display'
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: never
  }

type AnchorButtonProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string
    loading?: never
    disabled?: never
    type?: never
  }

type ButtonProps = NativeButtonProps | AnchorButtonProps

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-white hover:brightness-110',
  secondary:
    'border border-primary bg-transparent text-primary hover:bg-primary/10',
  tertiary:
    'bg-transparent text-primary hover:bg-primary/10',
}

const sizeStyles = {
  sm: 'min-h-8 px-3 text-sm',
  md: 'min-h-10 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
  display: 'min-h-14 px-7 text-lg',
}

function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    ...elementProps
  } = props

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href !== undefined) {
    const {
      href,
      target,
      rel,
      ...anchorProps
    } = elementProps as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof SharedProps
    >

    return (
      <a
        {...anchorProps}
        href={href}
        target={target}
        rel={rel}
        className={classes}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    )
  }

  const buttonProps = elementProps as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof SharedProps
  >

  return (
    <button
      {...buttonProps}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      type={props.type ?? 'button'}
      className={classes}
    >
      {loading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
}

export default Button
