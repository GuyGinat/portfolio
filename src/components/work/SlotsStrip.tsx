// Local Multi-Control's core idea: one player, up to 12 party slots, Tab to switch.
export function SlotsStrip({ active = 2, className = "" }: { active?: number; className?: string }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-[4%] p-[6%] ${className}`} aria-hidden>
      <div className="grid w-full max-w-[19rem] grid-cols-6 gap-[3%]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`flex aspect-[3/4] w-full items-end justify-center rounded-sm border pb-[4%] text-[min(2.2vw,0.75rem)] tabular-nums ${
              i === active
                ? "border-accent bg-accent/20 text-accent"
                : i < 4
                  ? "border-line bg-surface text-muted"
                  : "border-line/60 text-muted/50"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <p className="text-[min(2.4vw,0.875rem)] text-muted">
        <kbd className="rounded border border-line bg-surface px-1 py-0.5 text-ink">Tab</kbd> to switch character
      </p>
    </div>
  );
}
