"use client";
import { useState } from "react";
import { bg, moods, paintCells, updateTarget } from "@/lib/bgStore";
import { tinyFont } from "@/data/tinyFont";

type Num = "amplitude" | "frequency" | "speed" | "gap";

const sliders: { key: Num; label: string; min: number; max: number; step: number }[] = [
  { key: "amplitude", label: "Wave height", min: 0, max: 3, step: 0.05 },
  { key: "frequency", label: "Wave length", min: 0.02, max: 0.8, step: 0.01 },
  { key: "speed", label: "Wave speed", min: -4, max: 4, step: 0.05 },
  { key: "gap", label: "Gap", min: 0, max: 0.5, step: 0.01 },
];

// Lays text out in the 3x5 pixel font, centred on the visible grid.
function textCells(text: string): [number, number][] {
  const chars = text.toUpperCase().split("");
  const width = chars.length * 4 - 1;
  const left = Math.floor((bg.grid.cols - width) / 2);
  const top = Math.floor((bg.grid.rows - 5) / 2);
  const cells: [number, number][] = [];
  chars.forEach((ch, i) => {
    const rows = tinyFont[ch];
    if (!rows) return;
    rows.forEach((bits, r) => {
      for (let col = 0; col < 3; col++) {
        if ((bits >> (2 - col)) & 1) cells.push([left + i * 4 + col, top + r]);
      }
    });
  });
  return cells;
}

// The old control panel, kept as an easter egg: tweak the grid, write on it.
export default function GridPanel() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(() => ({ ...bg.target }));
  const [text, setText] = useState("hello");

  const change = (patch: Partial<typeof values>) => {
    bg.locked = true;
    setValues((v) => ({ ...v, ...patch }));
    updateTarget(patch, "center");
  };

  const reset = () => {
    bg.locked = false;
    const next = { ...moods.hero };
    setValues(next);
    updateTarget(next, "edges");
  };

  const write = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    paintCells({ cells: textCells(text), color: "#3fd6e0", hold: 4 });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 text-sm">
      {open && (
        <div
          id="grid-panel"
          className="absolute bottom-14 right-0 w-72 rounded-md border border-line bg-surface/95 p-4 text-ink shadow-2xl backdrop-blur"
        >
          <p className="mb-3 font-semibold">Play with the grid</p>
          <div className="mb-3 flex gap-3">
            <label className="flex flex-1 items-center justify-between gap-2 text-muted">
              Trough
              <input type="color" value={values.a} onChange={(e) => change({ a: e.target.value })} className="h-7 w-10 cursor-pointer bg-transparent" />
            </label>
            <label className="flex flex-1 items-center justify-between gap-2 text-muted">
              Crest
              <input type="color" value={values.b} onChange={(e) => change({ b: e.target.value })} className="h-7 w-10 cursor-pointer bg-transparent" />
            </label>
          </div>
          {sliders.map((s) => (
            <label key={s.key} className="mb-2 block text-muted">
              <span className="flex justify-between">
                {s.label}
                <span className="tabular-nums text-ink">{values[s.key].toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={values[s.key]}
                onChange={(e) => change({ [s.key]: parseFloat(e.target.value) })}
                className="w-full accent-accent"
              />
            </label>
          ))}
          <form onSubmit={write} className="mt-3 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 12))}
              aria-label="Text to write on the grid"
              className="min-w-0 flex-1 rounded border border-line bg-scene px-2 py-1 text-ink"
            />
            <button type="submit" className="rounded bg-accent px-3 py-1 font-semibold text-scene">Write</button>
          </form>
          <button onClick={reset} className="mt-3 text-muted underline underline-offset-4 hover:text-ink">
            Reset the grid
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="grid-panel"
        aria-label={open ? "Close grid controls" : "Open grid controls"}
        className="grid h-11 w-11 grid-cols-3 gap-[3px] rounded-md border border-line bg-surface/80 p-[9px] backdrop-blur transition-colors hover:border-accent"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className={`rounded-[1px] ${open && i % 2 === 0 ? "bg-accent" : "bg-muted/70"}`} />
        ))}
      </button>
    </div>
  );
}
