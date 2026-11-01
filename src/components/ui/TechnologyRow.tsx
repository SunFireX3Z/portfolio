import Card from '@/components/ui/Card'
import type { Technology } from '@/data/skills'

type TechnologyRowProps = {
  technology: Technology
}

function TechnologyRow({ technology }: TechnologyRowProps) {
  const Icon = technology.Icon

  const iconColor =
    technology.name === 'Affinity'
      ? '#C8F31D'
      : technology.iconColor

  return (
    <Card
      variant="interactive"
      padding="md"
      className="min-h-24 md:min-h-28"
      contentClassName="flex-row items-center gap-4 md:gap-5"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950 p-2.5 md:size-14 md:p-3">
        <Icon
          className="size-full"
          color={iconColor}
          aria-label={technology.name}
        />
      </div>

      <div className="min-w-0">
        <h4 className="font-clash wrap-break-words text-base font-semibold leading-snug text-white md:text-lg">
          {technology.name}
        </h4>

        <p className="mt-1 font-general text-sm leading-5 text-slate-400 md:text-base">
          {technology.category}
        </p>
      </div>
    </Card>
  )
}

export default TechnologyRow