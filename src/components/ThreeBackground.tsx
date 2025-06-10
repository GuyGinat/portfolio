"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Text } from "@react-three/drei";
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
  waveSpeed,
  customCubeColors
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
  customCubeColors: { [key: string]: string };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [text, setText] = useState("G");

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

  const handleClick = () => {
    setIsTextVisible(!isTextVisible);
  };

  // Calculate Y position based on sine wave
  const yOffset = Math.sin(gridX * waveFrequency + time) * waveAmplitude;
  const currentPosition: [number, number, number] = [
    position[0],
    position[1] + yOffset,
    position[2]
  ];

  // Calculate smooth color transition
  const customColor = customCubeColors[`${gridX}-${gridY}`];
  const threeColor1 = new THREE.Color(color1);
  const threeColor2 = new THREE.Color(color2);
  const waveValue = (Math.sin(gridX * waveFrequency + time) + 1) / 2; // 0 to 1
  const mixedColor = new THREE.Color().lerpColors(threeColor1, threeColor2, waveValue);
  const color = customColor ? customColor : mixedColor.getStyle();

  return (
    <mesh
      ref={meshRef}
      position={currentPosition}
      castShadow
      receiveShadow
      onPointerOver={handlePointerOver}      
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      scale={isAnimating ? 1.1 : 1}
    >
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8} 
        roughness={0.2}
        transparent
      />
        {isTextVisible && <Text
          position={[0, 0, CUBE_SIZE / 2 + 0.01]} // Slightly in front of the face
          rotation={[0, 0, 0]}
          fontSize={CUBE_SIZE * 0.3}
          color="White"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>}
      <FloatingLabel isVisible={isHovered} x={gridX} y={gridY} />
    </mesh>
  );
}

function CubeGrid({
  color1,
  color2,
  waveAmplitude,
  waveFrequency,
  waveSpeed,
  spacingOffset,
  customCubeColors
}: {
  color1: string;
  color2: string;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  spacingOffset: number;
  customCubeColors: { [key: string]: string };
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
  const cubeMap: React.ReactElement[][] = [];
  const offset = (GRID_SIZE * (CUBE_SIZE + spacingOffset)) / 2 - (CUBE_SIZE + spacingOffset) / 2;
  const xAdd = Math.floor(GRID_SIZE / 4);

  for (let x = 0 - xAdd; x < GRID_SIZE + xAdd; x++) {
    cubeMap[x+xAdd] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const position: [number, number, number] = [
        x * (CUBE_SIZE + spacingOffset) - offset,
        y * (CUBE_SIZE + spacingOffset) - offset,
        -50,
      ];
      const actualX = x + Math.floor(GRID_SIZE / 4);
      let cube = <Cube 
      key={`${actualX}-${y}`} 
      position={position} 
      gridX={actualX} 
      gridY={y}
      time={time}
      color1={color1}
      color2={color2}
      waveAmplitude={waveAmplitude}
      waveFrequency={waveFrequency}
      waveSpeed={waveSpeed}
      customCubeColors={customCubeColors}
    />;
      cubeMap[actualX][y] = cube;
      cubes.push(cube);
    }
  }
  return <>{cubes}</>;
}

function CameraUpdater({ position, fov }: { position: [number, number, number]; fov: number }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    camera.fov = fov;
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
  customCubeColors: { [key: string]: string };
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
          <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
          <CameraUpdater position={cameraPosition} fov={cameraFov} />
        </Canvas>
      </div>
    </div>
  );
} 