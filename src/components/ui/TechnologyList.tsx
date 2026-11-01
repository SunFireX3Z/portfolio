import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TechnologyRow from '@/components/ui/TechnologyRow'
import type { Technology } from '@/data/skills'

type TechnologyListProps = {
  technologies: Technology[]
}

const INITIAL_HEIGHT = '19rem'

function TechnologyList({ technologies }: TechnologyListProps) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const hasMore = technologies.length > 8

  return (
    <div>
      <div
        className="overflow-hidden transition-[max-height] duration-250 ease-out"
        style={{
          maxHeight: expanded || !hasMore
            ? `${contentRef.current?.scrollHeight ?? 3000}px`
            : INITIAL_HEIGHT,
          maskImage:
            !expanded && hasMore
              ? 'linear-gradient(to bottom, black 75%, transparent 100%)'
              : 'none',
          WebkitMaskImage:
            !expanded && hasMore
              ? 'linear-gradient(to bottom, black 75%, transparent 100%)'
              : 'none',
        }}
      >
        <div
          ref={contentRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {technologies.map((technology) => (
            <TechnologyRow
              key={technology.name}
              technology={technology}
            />
          ))}
        </div>
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-general text-sm font-medium text-orange-400 transition-colors hover:bg-orange-500/10 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            {expanded ? 'Lihat Lebih Sedikit' : 'Lihat Lebih'}

            {expanded ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default TechnologyList