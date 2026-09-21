"use client";
import { Canvas } from "@react-three/fiber";
import { CubeField } from "./CubeField";

// Loaded lazily by Background so three.js stays out of the first paint.
// The narrow field of view is deliberate: a long lens flattens perspective so
// the grid reads as an even field with no seams (see CubeField).
export default function Scene({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 18 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      // Transparent canvas: the page background colour shows through the gaps.
      onCreated={() => onReady()}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[-6, 8, 6]} intensity={1.1} />
      <directionalLight position={[4, -6, 4]} intensity={0.25} />
      <CubeField />
    </Canvas>
  );
}
