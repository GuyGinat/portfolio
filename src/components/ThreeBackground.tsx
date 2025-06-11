"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { CubeGrid } from "./CubeGrid";
import { PerspectiveCamera } from "three";
import { tinyFont } from "../data/tinyFont";

// Configuration
export const GRID_SIZE_Y = 16; // Number of cubes in each row/column
export const GRID_SIZE_X = Math.ceil(GRID_SIZE_Y * 16 / 9); // Number of cubes in each row/column
const CAMERA_DISTANCE = 8; // How far the camera is from the center
export const CUBE_SIZE = 6.2; // Size of each cube (1.0 is the default size)
const CUBE_SPACING = CUBE_SIZE + 0.2; // Space between cubes

// Default animation configuration
const DEFAULT_WAVE_AMPLITUDE = 1.8;
const DEFAULT_WAVE_FREQUENCY = 0.3;
const DEFAULT_WAVE_SPEED = 4.5;

export function FloatingLabel({ isVisible, x, y }: { isVisible: boolean; x: number; y: number }) {
  if (!isVisible) return null;
  const getLabelText = (x: number, y: number) => `Cube (${x}, ${y})`;
  return (
    <Html
      position={[0, CUBE_SIZE + 1, 0]}
      center
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '6px 10px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        transform: 'translate3d(-50%, -50%, 0)',
      }}
    >
      {getLabelText(x, y)}
    </Html>
  );
}

function CameraUpdater({ position, fov }: { position: [number, number, number]; fov: number }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    (camera as PerspectiveCamera).fov = fov;
    camera.updateProjectionMatrix();
  }, [position, fov, camera]);
  return null;
}

export default function ThreeBackground({
  color1,
  color2,
  lightPosition,
  waveAmplitude,
  waveFrequency,
  waveSpeed,
  cameraPosition,
  cameraFov,
  spacingOffset,
  customCubeColors
}: {
  color1: string;
  color2: string;
  lightPosition: [number, number, number];
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  cameraPosition: [number, number, number];
  cameraFov: number;
  spacingOffset: number;
  customCubeColors: { [key: string]: { color1: string; color2: string } };
}) {
  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 pointer-events-none">
        <Canvas 
          camera={{ 
            position: cameraPosition, 
            fov: cameraFov 
          }} 
          shadows
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={lightPosition} intensity={0.7} castShadow />
          <directionalLight position={[0, -5, -5]} intensity={0.7} />
          <Suspense fallback={null}>
            <CubeGrid 
              color1={color1}
              color2={color2}
              waveAmplitude={waveAmplitude}
              waveFrequency={waveFrequency}
              waveSpeed={waveSpeed}
              spacingOffset={spacingOffset}
              customCubeColors={customCubeColors}
            />
          </Suspense>
          {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} /> */}
          <CameraUpdater position={cameraPosition} fov={cameraFov} />
        </Canvas>
      </div>
    </div>
  );
} 