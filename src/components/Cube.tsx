"use client";
import { Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { CUBE_SIZE, FloatingLabel } from "./ThreeBackground";


export function Cube({
  position, gridX, gridY, time, color1, color2, waveAmplitude, waveFrequency, waveSpeed, customCubeColors
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
  customCubeColors: { [key: string]: { color1: string; color2: string } };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // const [isTextVisible, setIsTextVisible] = useState(false);
  // const [text, setText] = useState("G");

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
    // setIsTextVisible(!isTextVisible);
  };

  // Calculate Y position based on sine wave using useMemo to prevent unnecessary recalculations
  const currentPosition = useMemo(() => {
    const yOffset = Math.sin(gridX * waveFrequency + time) * waveAmplitude;
    return [
      position[0],
      position[1] + yOffset,
      position[2]
    ] as [number, number, number];
  }, [position, gridX, waveFrequency, time, waveAmplitude]);

  // Calculate smooth color transition using useMemo
  const color = useMemo(() => {
    const customColor = customCubeColors[`${gridX}-${gridY}`];
    const threeColor1 = new THREE.Color(color1);
    const threeColor2 = new THREE.Color(color2);
    const threeCustomColor1 = new THREE.Color(customColor?.color1);
    const threeCustomColor2 = new THREE.Color(customColor?.color2);
    const waveValue = (Math.sin(gridX * waveFrequency + time) + 1) / 2;
    
    const mixedColor = new THREE.Color().lerpColors(threeColor1, threeColor2, waveValue);
    const mixedCustomColor = customColor ? new THREE.Color().lerpColors(threeCustomColor1, threeCustomColor2, waveValue) : null;  
    
    return customColor ? mixedCustomColor?.getStyle() : mixedColor.getStyle();
  }, [color1, color2, customCubeColors, gridX, gridY, waveFrequency, time]);

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
        transparent />
      {/* {isTextVisible && <Text
        position={[0, 0, CUBE_SIZE / 2 + 0.01]} // Slightly in front of the face
        rotation={[0, 0, 0]}
        fontSize={CUBE_SIZE * 0.3}
        color="White"
        anchorX="center"
        anchorY="middle"
      >
        
      </Text>} */}
      <FloatingLabel isVisible={isHovered} x={gridX} y={gridY} />
    </mesh>
  );
}
