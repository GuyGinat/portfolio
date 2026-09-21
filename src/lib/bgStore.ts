// Mutable store for the cube-field background.
// Nothing here is React state: the field reads it every frame inside useFrame,
// and page sections / hover handlers write to it directly. That is the whole
// point of the rewrite: changing the background never re-renders React.

export type Sweep = "ltr" | "rtl" | "ttb" | "btt" | "center" | "edges";

export type Mood = {
  a: string; // wave trough colour
  b: string; // wave crest colour
  amplitude: number; // how far the wave lifts and tilts a cube, in cube pitches
  frequency: number; // radians per column
  speed: number; // radians per second
  gap: number; // gap between cubes, fraction of the pitch
};

export const moods = {
  hero: { a: "#221b4d", b: "#4b3a9c", amplitude: 1.1, frequency: 0.22, speed: 0.9, gap: 0.06 },
  work: { a: "#1a1540", b: "#271f5c", amplitude: 0.5, frequency: 0.16, speed: 0.6, gap: 0.05 },
  quiet: { a: "#16122f", b: "#1d173e", amplitude: 0.25, frequency: 0.12, speed: 0.4, gap: 0.04 },
  contact: { a: "#211a4a", b: "#46379a", amplitude: 0.9, frequency: 0.3, speed: -0.8, gap: 0.06 },
} satisfies Record<string, Mood>;

export type MoodName = keyof typeof moods;

export type PaintCommand = {
  cells: [number, number][]; // [col, row] from the top-left of the visible grid
  color: string;
  hold: number; // seconds before the cells fade back
};

type Transition = { at: number; sweep: Sweep };

export const bg = {
  target: { ...moods.hero } as Mood,
  // A tint laid over the mood while a project card is hovered.
  tint: null as string | null,
  tintStrength: 0.38,
  // Pointer in normalised device coordinates; the field raycasts it itself.
  pointer: { x: 0, y: 0, active: false },
  transition: { at: 0, sweep: "center" } as Transition,
  paint: [] as PaintCommand[],
  reducedMotion: false,
  // Visible grid size in cells, published by the field for text placement.
  grid: { cols: 0, rows: 0 },
  // Set by the control panel; overrides moods until reset.
  locked: false,
};

export function setMood(name: MoodName, sweep: Sweep = "ttb") {
  if (bg.locked) return;
  const next = moods[name];
  if (bg.target.a === next.a && bg.target.b === next.b && bg.target.amplitude === next.amplitude) return;
  bg.target = { ...next };
  bg.transition = { at: performance.now() / 1000, sweep };
}

export function setTint(color: string | null) {
  bg.tint = color;
}

export function updateTarget(patch: Partial<Mood>, sweep: Sweep = "center") {
  bg.target = { ...bg.target, ...patch };
  if (patch.a || patch.b) bg.transition = { at: performance.now() / 1000, sweep };
}

export function paintCells(cmd: PaintCommand) {
  bg.paint.push(cmd);
}

