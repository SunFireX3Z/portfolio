import type { CSSProperties } from 'react'

type BrandIconProps = {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

function BrandIcon({
  src,
  alt,
  className = 'size-7',
  style,
}: BrandIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden="true"
      draggable={false}
      className={`${className} shrink-0 object-contain`}
      style={style}
    />
  )
}

export default BrandIcon