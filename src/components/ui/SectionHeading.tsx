type SectionHeadingProps = {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

function SectionHeading({
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: align === 'center' ? 'center' : 'flex-start',
            textAlign: align,
            gap: '12px',
        }}
    >
      {label && (
        <span className="inline-flex items-center gap-2 font-general text-sm font-semibold uppercase tracking-wider text-primary">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-linear-to-r from-primary to-accent"
          />
          {label}
        </span>
      )}

      <h2 className="font-clash text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="font-general max-w-2xl text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading