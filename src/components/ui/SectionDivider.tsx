function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-6 top-0 flex items-center lg:inset-x-8"
    >
      <span className="h-0.5 w-20 shrink-0 bg-primary" />

      <span className="divider-track relative h-px flex-1 overflow-visible bg-zinc-600">
        <span className="divider-light" />
      </span>

      <span className="h-0.5 w-20 shrink-0 bg-accent" />
    </div>
  )
}

export default SectionDivider