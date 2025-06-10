"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

// Configuration
const GRID_SIZE = 20; // Number of cubes in each row/column
const CAMERA_DISTANCE = 8; // How far the camera is from the center
const CUBE_SIZE = 5; // Size of each cube (1.0 is the default size)
const CUBE_SPACING = CUBE_SIZE + 0.2; // Space between cubes

// Default animation configuration
const DEFAULT_WAVE_AMPLITUDE = 1.8;
const DEFAULT_WAVE_FREQUENCY = 0.3;
const DEFAULT_WAVE_SPEED = 4.5;

function FloatingLabel({ isVisible, x, y }: { isVisible: boolean; x: number; y: number }) {
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

function Cube({ 
  position, 
  gridX, 
  gridY, 
  time,
  color1,
  color2,
  waveAmplitude,
  waveFrequency,
  waveSpeed
}: { 
  position: [number, number, number]; 
  gridX: number; 
  gridY: number;
  time: number;
  color1: string;
  color2: string;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
    setIsAnimating(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(false);
    setIsAnimating(false);
  };

  // Calculate Y position based on sine wave
  const yOffset = Math.sin(gridX * waveFrequency + time) * waveAmplitude;
  const currentPosition: [number, number, number] = [
    position[0],
    position[1] + yOffset,
    position[2]
  ];

  // Calculate smooth color transition
  const threeColor1 = new THREE.Color(color1);
  const threeColor2 = new THREE.Color(color2);
  const waveValue = (Math.sin(gridX * waveFrequency + time) + 1) / 2; // 0 to 1
  const mixedColor = new THREE.Color().lerpColors(threeColor1, threeColor2, waveValue);
  const color = isHovered ? "#818cf8" : mixedColor.getStyle();

  return (
    <mesh
      ref={meshRef}
      position={currentPosition}
      castShadow
      receiveShadow
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={isAnimating ? 1.1 : 1}
    >
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8} 
        roughness={0.2}
        transparent
      />
      <FloatingLabel isVisible={isHovered} x={gridX} y={gridY} />
    </mesh>
  );
}

function CubeGrid({
  color1,
  color2,
  waveAmplitude,
  waveFrequency,
  waveSpeed
}: {
  color1: string;
  color2: string;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setTime(prev => prev + waveSpeed * 0.01);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [waveSpeed]);

  const cubes = [];
  const offset = (GRID_SIZE * CUBE_SPACING) / 2 - CUBE_SPACING / 2;
  const xAdd = Math.floor(GRID_SIZE / 4);

  for (let x = 0 - xAdd; x < GRID_SIZE + xAdd; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      const position: [number, number, number] = [
        x * CUBE_SPACING - offset,
        y * CUBE_SPACING - offset,
        -50 - y,
      ];
      cubes.push(
        <Cube 
          key={`${x}-${y}`} 
          position={position} 
          gridX={x} 
          gridY={y}
          time={time}
          color1={color1}
          color2={color2}
          waveAmplitude={waveAmplitude}
          waveFrequency={waveFrequency}
          waveSpeed={waveSpeed}
        />
      );
    }
  }
  return <>{cubes}</>;
}

export default function ThreeBackground({
  color1,
  color2,
  lightPosition,
  waveAmplitude,
  waveFrequency,
  waveSpeed
}: {
  color1: string;
  color2: string;
  lightPosition: [number, number, number];
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
}) {
  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }}>
      <div className="absolute inset-0 pointer-events-none">
        <Canvas 
          camera={{ 
            position: [0, 0, CAMERA_DISTANCE], 
            fov: 60 
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
            />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>
    </div>
  );
} 