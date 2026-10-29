import { useEffect, useRef, useState } from "react";

type TickerProps = {
  items: string[];
  duration?: number;
};

export default function Ticker({
  items,
  duration = 25,
}: TickerProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    const container = containerRef.current;

    if (!group || !container) return;

    const observer = new ResizeObserver(() => {
      setGroupWidth(group.getBoundingClientRect().width);
      setContainerWidth(container.getBoundingClientRect().width);
    });

    observer.observe(group);
    observer.observe(container);

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const repeatCount =
    groupWidth > 0
      ? Math.max(2, Math.ceil(containerWidth / groupWidth) + 1)
      : 4;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-white/10 bg-white/0.03 py-5 md:py-6"
      aria-label="Bidang keahlian"
    >
      <div
        className="ticker-track flex w-max"
        style={{
            "--ticker-duration": `${duration}s`,
            "--ticker-distance": `-${groupWidth}px`,
        } as React.CSSProperties}
      >
        <div
          ref={groupRef}
          className="flex shrink-0 items-center"
        >
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-4 px-6 md:gap-5 md:px-10"
            >
              <span className="size-2 shrink-0 rounded-full bg-orange-500 md:size-2.5" />
              <span className="whitespace-nowrap text-base font-semibold text-slate-300 md:text-lg">
                {item}
              </span>
            </div>
          ))}
        </div>

        {Array.from({ length: repeatCount - 1 }, (_, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center"
            aria-hidden="true"
          >
            {items.map((item, itemIndex) => (
              <div
                key={`${index}-${itemIndex}-${item}`}
                className="flex shrink-0 items-center gap-4 px-6 md:gap-5 md:px-10"
              >
                <span className="size-2 shrink-0 rounded-full bg-orange-500 md:size-2.5" />
                <span className="whitespace-nowrap text-base font-semibold text-slate-300 md:text-lg">
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}