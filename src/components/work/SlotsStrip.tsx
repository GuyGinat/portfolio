// Local Multi-Control's core idea: one player, up to 12 party slots, Tab to switch.
export function SlotsStrip({ active = 2, className = "" }: { active?: number; className?: string }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-5 p-6 ${className}`} aria-hidden>
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`flex aspect-[3/4] w-9 items-end justify-center rounded-sm border pb-1 text-xs tabular-nums sm:w-11 ${
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
      <p className="text-sm text-muted">
        <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 text-ink">Tab</kbd> to switch character
      </p>
    </div>
  );
}
