"use client";
import { useState, useEffect } from "react";
import { GRID_SIZE_Y, GRID_SIZE_X, CUBE_SIZE } from "./ThreeBackground";
import { Cube } from "./Cube";

export function CubeGrid({
  color1, color2, waveAmplitude, waveFrequency, waveSpeed, spacingOffset, customCubeColors
}: {
  color1: string;
  color2: string;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  spacingOffset: number;
  customCubeColors: { [key: string]: { color1: string; color2: string } };
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
  // Center the grid
  const yOffset = (GRID_SIZE_Y * (CUBE_SIZE + spacingOffset)) / 2 - (CUBE_SIZE + spacingOffset) / 2;
  const xOffset = (GRID_SIZE_X * (CUBE_SIZE + spacingOffset)) / 2 - (CUBE_SIZE + spacingOffset) / 2;

  for (let x = 0; x < GRID_SIZE_X; x++) {
    cubeMap[x] = [];
    for (let y = 0; y < GRID_SIZE_Y; y++) {
      const position: [number, number, number] = [
        x * (CUBE_SIZE + spacingOffset) - xOffset,
        y * (CUBE_SIZE + spacingOffset) - yOffset,
        -50,
      ];
      const actualX = x;
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
        customCubeColors={customCubeColors} />;
      cubeMap[actualX][y] = cube;
      cubes.push(cube);
    }
  }
  return <>{cubes}</>;
}
