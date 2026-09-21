// Schematic of the Swipers level-generation order. Illustrative, not a generated level.

type Stage = { label: string };

export const pipelineStages: Stage[] = [
  { label: "Halls, most constrained first" },
  { label: "Perimeter loop corridor" },
  { label: "Rooms attach to halls" },
  { label: "Hallways: spanning tree plus loops, routed with A*" },
];

const halls = [
  { x: 20, y: 20, w: 40, h: 28, special: true },
  { x: 95, y: 15, w: 45, h: 24 },
  { x: 84, y: 58, w: 42, h: 24 },
];
const rooms = [
  { x: 20, y: 52, w: 18, h: 14 },
  { x: 40, y: 52, w: 20, h: 14 },
  { x: 62, y: 20, w: 14, h: 14 },
  { x: 128, y: 58, w: 14, h: 12 },
  { x: 128, y: 72, w: 14, h: 10 },
];
const hallways = [
  "M60 34 H80 V27 H95",
  "M112 39 V58",
  "M84 74 H66 V88",
  "M40 20 V9",
  "M140 27 H151",
];

function tone(stage: number, active: number) {
  if (stage > active) return "hidden";
  return stage === active ? "active" : "done";
}

export function PipelineDiagram({ stage = 3, className = "" }: { stage?: number; className?: string }) {
  const color = (s: number, accent = false) => {
    const t = tone(s, stage);
    if (t === "hidden") return "transparent";
    if (t === "done") return "rgb(var(--muted) / 0.45)";
    return accent ? "rgb(var(--accent))" : "rgb(var(--ink))";
  };
  return (
    <svg viewBox="0 0 160 100" className={className} role="img" aria-label={`Level generation, stage ${stage + 1}: ${pipelineStages[stage].label}`}>
      <defs>
        <pattern id="cells" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0H0V5" fill="none" stroke="rgb(var(--line) / 0.55)" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="160" height="100" fill="url(#cells)" />
      {/* 2: perimeter ring corridor */}
      <rect x="6" y="6" width="148" height="88" fill="none" stroke={color(1)} strokeWidth="3" />
      {/* 1: halls, the special one in accent */}
      {halls.map((h, i) => (
        <rect key={i} x={h.x} y={h.y} width={h.w} height={h.h} fill={color(0, h.special)} fillOpacity={tone(0, stage) === "active" ? 0.9 : 0.5} />
      ))}
      {/* 3: rooms */}
      {rooms.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={color(2)} strokeWidth="1.2" />
      ))}
      {/* 4: hallways */}
      {hallways.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color(3, true)} strokeWidth="2.4" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
