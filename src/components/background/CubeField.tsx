"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { bg, Sweep } from "@/lib/bgStore";

// The grid sits on a plane this far in front of the camera (camera looks down -z).
const DEPTH = -50;
// How long a colour change takes to sweep across the whole grid, in seconds.
const SWEEP_SECONDS = 1.1;
// Cubes are flattened in depth, and the camera uses a long lens (see Scene), so
// side faces never show. Under a wide lens they draw hard seams along the
// screen's centre lines, where the visible side flips from one face to the other.
const DEPTH_SCALE = 0.3;
// How far the wave tilts each cube, in radians per unit of amplitude. The tilt
// is what makes the light ripple across the grid.
const TILT = 0.22;
// Colour the cubes start at before the load sweep, matching the page background.
const START_COLOR = "#151130";

function sweepDelay(sweep: Sweep, u: number, v: number) {
  // u, v in [0, 1]: column and row position across the grid (v = 0 at the top)
  switch (sweep) {
    case "ltr": return u;
    case "rtl": return 1 - u;
    case "ttb": return v;
    case "btt": return 1 - v;
    case "center": return Math.min(1, Math.hypot(u - 0.5, v - 0.5) * 1.5);
    case "edges": return 1 - Math.min(1, Math.hypot(u - 0.5, v - 0.5) * 1.5);
  }
}

function useGridLayout() {
  const { camera, size } = useThree();
  return useMemo(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z - DEPTH;
    const viewH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * dist;
    const viewW = viewH * (size.width / size.height);
    // Aim for cubes roughly 34 css px tall, within sane bounds.
    const visibleRows = THREE.MathUtils.clamp(Math.round(size.height / 34), 14, 36);
    const pitch = viewH / visibleRows;
    // One cube of overscan on every side so the wave never shows an edge.
    const rows = visibleRows + 2;
    const cols = Math.ceil(viewW / pitch) + 2;
    return { pitch, rows, cols, count: rows * cols, visibleRows, visibleCols: cols - 2 };
  }, [camera, size.width, size.height]);
}

export function CubeField() {
  const layout = useGridLayout();
  const { pitch, rows, cols, count } = layout;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Per-instance state, rebuilt only when the grid size changes (resize).
  const state = useMemo(() => {
    const start = new THREE.Color(START_COLOR);
    const baseX = new Float32Array(count);
    const baseY = new Float32Array(count);
    const colA = new Float32Array(count * 3);
    const colB = new Float32Array(count * 3);
    const paint = new Float32Array(count * 3);
    const paintLevel = new Float32Array(count);
    const paintUntil = new Float32Array(count);
    const arrival = new Float32Array(count);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const i = c * rows + r;
        baseX[i] = (c - (cols - 1) / 2) * pitch;
        baseY[i] = ((rows - 1) / 2 - r) * pitch;
        start.toArray(colA, i * 3);
        start.toArray(colB, i * 3);
      }
    }
    return {
      baseX, baseY, colA, colB, paint, paintLevel, paintUntil, arrival,
      transitionAt: -1,
      phase: 0,
      pointerLevel: 0,
      params: { ...bg.target },
    };
  }, [count, cols, rows, pitch]);

  // Expose the visible grid size so the control panel can place text.
  useEffect(() => {
    bg.grid = { cols: layout.visibleCols, rows: layout.visibleRows };
  }, [layout.visibleCols, layout.visibleRows]);

  const scratch = useMemo(() => ({
    m: new THREE.Matrix4(),
    pos: new THREE.Vector3(),
    quat: new THREE.Quaternion(),
    euler: new THREE.Euler(),
    scl: new THREE.Vector3(),
    tgtA: new THREE.Color(),
    tgtB: new THREE.Color(),
    tint: new THREE.Color(),
    ray: new THREE.Vector3(),
    hit: new THREE.Vector2(),
  }), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Allocate instanceColor once; the frame loop writes into its array directly.
    const c = new THREE.Color(START_COLOR);
    for (let i = 0; i < count; i++) mesh.setColorAt(i, c);
    // Kick off the load sweep from the centre.
    bg.transition = { at: performance.now() / 1000, sweep: "center" };
  }, [count]);

  useFrame(({ camera }, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !mesh.instanceColor) return;
    const dt = Math.min(delta, 0.05);
    const now = performance.now() / 1000;
    const s = state;
    const p = s.params;
    const t = bg.target;
    const reduced = bg.reducedMotion;

    // Ease the numeric parameters toward the target mood.
    const ease = 1 - Math.exp(-dt * 2.5);
    p.amplitude += ((reduced ? 0 : t.amplitude) - p.amplitude) * ease;
    p.frequency += (t.frequency - p.frequency) * ease;
    p.speed += ((reduced ? 0 : t.speed) - p.speed) * ease;
    p.gap += (t.gap - p.gap) * ease;
    s.phase += p.speed * dt;

    // Target colours, with the hover tint mixed in.
    scratch.tgtA.set(t.a);
    scratch.tgtB.set(t.b);
    if (bg.tint) {
      // Mix in sRGB so the tint strength matches how it looks, not linear light.
      scratch.tint.set(bg.tint).convertLinearToSRGB();
      scratch.tgtA.convertLinearToSRGB().lerp(scratch.tint, bg.tintStrength * 0.6).convertSRGBToLinear();
      scratch.tgtB.convertLinearToSRGB().lerp(scratch.tint, bg.tintStrength).convertSRGBToLinear();
    }

    // A new transition: give every cube its own arrival time along the sweep.
    if (bg.transition.at !== s.transitionAt) {
      s.transitionAt = bg.transition.at;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const d = sweepDelay(bg.transition.sweep, c / (cols - 1), r / (rows - 1));
          s.arrival[c * rows + r] = s.transitionAt + d * SWEEP_SECONDS;
        }
      }
    }

    // Queued paint commands (text written by the control panel).
    while (bg.paint.length) {
      const cmd = bg.paint.shift()!;
      scratch.tint.set(cmd.color);
      for (const [c, r] of cmd.cells) {
        if (c < 0 || r < 0 || c >= cols - 2 || r >= rows - 2) continue;
        const i = (c + 1) * rows + (r + 1);
        scratch.tint.toArray(s.paint, i * 3);
        s.paintUntil[i] = now + cmd.hold;
      }
    }

    // Pointer: intersect the camera ray with the grid plane.
    const pointerOn = bg.pointer.active && !reduced;
    s.pointerLevel += ((pointerOn ? 1 : 0) - s.pointerLevel) * (1 - Math.exp(-dt * 4));
    if (s.pointerLevel > 0.001) {
      scratch.ray.set(bg.pointer.x, bg.pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
      const k = (DEPTH - camera.position.z) / scratch.ray.z;
      scratch.hit.set(camera.position.x + scratch.ray.x * k, camera.position.y + scratch.ray.y * k);
    }

    const colorEase = 1 - Math.exp(-dt * 5);
    const paintEase = 1 - Math.exp(-dt * 6);
    const size = pitch * (1 - p.gap);
    const invPitch = 1 / pitch;
    const out = mesh.instanceColor.array as Float32Array;
    const tA = scratch.tgtA, tB = scratch.tgtB;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const i = c * rows + r;
        const i3 = i * 3;
        const x = s.baseX[i];
        const y = s.baseY[i];

        const wave = Math.sin(c * p.frequency + r * p.frequency * 0.35 + s.phase);
        let z = DEPTH + wave * p.amplitude * pitch;

        let glow = 0;
        if (s.pointerLevel > 0.001) {
          const dx = (x - scratch.hit.x) * invPitch;
          const dy = (y - scratch.hit.y) * invPitch;
          glow = Math.exp(-(dx * dx + dy * dy) / 10) * s.pointerLevel;
          z += glow * pitch;
        }

        if (now >= s.arrival[i]) {
          s.colA[i3] += (tA.r - s.colA[i3]) * colorEase;
          s.colA[i3 + 1] += (tA.g - s.colA[i3 + 1]) * colorEase;
          s.colA[i3 + 2] += (tA.b - s.colA[i3 + 2]) * colorEase;
          s.colB[i3] += (tB.r - s.colB[i3]) * colorEase;
          s.colB[i3 + 1] += (tB.g - s.colB[i3 + 1]) * colorEase;
          s.colB[i3 + 2] += (tB.b - s.colB[i3 + 2]) * colorEase;
        }

        const m = (wave + 1) / 2;
        let cr = s.colA[i3] + (s.colB[i3] - s.colA[i3]) * m;
        let cg = s.colA[i3 + 1] + (s.colB[i3 + 1] - s.colA[i3 + 1]) * m;
        let cb = s.colA[i3 + 2] + (s.colB[i3 + 2] - s.colA[i3 + 2]) * m;

        const pl = s.paintLevel[i] + ((now < s.paintUntil[i] ? 1 : 0) - s.paintLevel[i]) * paintEase;
        s.paintLevel[i] = pl;
        if (pl > 0.001) {
          cr += (s.paint[i3] - cr) * pl;
          cg += (s.paint[i3 + 1] - cg) * pl;
          cb += (s.paint[i3 + 2] - cb) * pl;
        }

        const lift = 1 + glow * 0.35;
        out[i3] = cr * lift;
        out[i3 + 1] = cg * lift;
        out[i3 + 2] = cb * lift;

        const tilt = wave * p.amplitude * TILT;
        scratch.euler.set(tilt, tilt * 0.6, 0);
        scratch.quat.setFromEuler(scratch.euler);
        const grow = size * (1 + glow * 0.18);
        scratch.scl.set(grow, grow, grow * DEPTH_SCALE);
        scratch.pos.set(x, y, z);
        scratch.m.compose(scratch.pos, scratch.quat, scratch.scl);
        mesh.setMatrixAt(i, scratch.m);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh key={count} ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.35} roughness={0.55} />
    </instancedMesh>
  );
}
