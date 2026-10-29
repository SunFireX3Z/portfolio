function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-6 top-0 flex items-center lg:inset-x-8"
    >
      <span className="h-0.5 w-20 shrink-0 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.65)]" />

      <span className="h-px flex-1 bg-zinc-600" />

      <span className="h-0.5 w-20 shrink-0 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.65)]" />
    </div>
  )
}

export default SectionDivider