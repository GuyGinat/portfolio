"use client";
import { useState, ReactNode } from "react";
import ThreeBackground from "./ThreeBackground";
import ControlPanel from "./ControlPanel";
import Link from "next/link";

const DEFAULT_COLOR1 = "#4338ca";
const DEFAULT_COLOR2 = "#7e22ce";
const DEFAULT_LIGHT_POSITION: [number, number, number] = [0, 6, 5];
const DEFAULT_WAVE_AMPLITUDE = 1.8;
const DEFAULT_WAVE_FREQUENCY = 0.3;
const DEFAULT_WAVE_SPEED = 4.5;
const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 0, 8];
const DEFAULT_CAMERA_FOV = 80;
const DEFAULT_SPACING_OFFSET = 0.1;

export default function BackgroundWithControls({ children }: { children: ReactNode }) {
  const [color1, setColor1] = useState(DEFAULT_COLOR1);
  const [color2, setColor2] = useState(DEFAULT_COLOR2);
  const [lightPosition, setLightPosition] = useState<[number, number, number]>(DEFAULT_LIGHT_POSITION);
  const [waveAmplitude, setWaveAmplitude] = useState(DEFAULT_WAVE_AMPLITUDE);
  const [waveFrequency, setWaveFrequency] = useState(DEFAULT_WAVE_FREQUENCY);
  const [waveSpeed, setWaveSpeed] = useState(DEFAULT_WAVE_SPEED);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(DEFAULT_CAMERA_POSITION);
  const [cameraFov, setCameraFov] = useState(DEFAULT_CAMERA_FOV);
  const [showMain, setShowMainState] = useState(true);
  const [spacingOffset, setSpacingOffset] = useState(DEFAULT_SPACING_OFFSET);
  const [customCubeColors, setCustomCubeColors] = useState<{ [key: string]: { color1: string; color2: string } }>({});

  const handleShowMain = (show: boolean) => {
    setShowMainState(show);
  };

  const handleSetCubeColor = (gridX: number, gridY: number, color1: string, color2: string) => {
    setCustomCubeColors(prev => ({ ...prev, [`${gridX}-${gridY}`]: { color1, color2 } }));
  };

  const resetAll = () => {
    setColor1(DEFAULT_COLOR1);
    setColor2(DEFAULT_COLOR2);
    setLightPosition(DEFAULT_LIGHT_POSITION);
    setWaveAmplitude(DEFAULT_WAVE_AMPLITUDE);
    setWaveFrequency(DEFAULT_WAVE_FREQUENCY);
    setWaveSpeed(DEFAULT_WAVE_SPEED);
    setCameraPosition(DEFAULT_CAMERA_POSITION);
    setCameraFov(DEFAULT_CAMERA_FOV);
    setShowMainState(true);
    setSpacingOffset(DEFAULT_SPACING_OFFSET);
    setCustomCubeColors({});
  };

  return (
    <>
      <ThreeBackground
        color1={color1}
        color2={color2}
        lightPosition={lightPosition}
        waveAmplitude={waveAmplitude}
        waveFrequency={waveFrequency}
        waveSpeed={waveSpeed}
        cameraPosition={cameraPosition}
        cameraFov={cameraFov}
        spacingOffset={spacingOffset}
        customCubeColors={customCubeColors}
      />
      <ControlPanel
        onColor1Change={setColor1}
        onColor2Change={setColor2}
        onLightPositionChange={setLightPosition}
        onWaveAmplitudeChange={setWaveAmplitude}
        onWaveFrequencyChange={setWaveFrequency}
        onWaveSpeedChange={setWaveSpeed}
        initialColor1={color1}
        initialColor2={color2}
        initialLightPosition={lightPosition}
        initialWaveAmplitude={waveAmplitude}
        initialWaveFrequency={waveFrequency}
        initialWaveSpeed={waveSpeed}
        cameraPosition={cameraPosition}
        setCameraPosition={setCameraPosition}
        cameraFov={cameraFov}
        setCameraFov={setCameraFov}
        showMain={showMain}
        setShowMain={handleShowMain}
        spacingOffset={spacingOffset}
        setSpacingOffset={setSpacingOffset}
        customCubeColors={customCubeColors}
        setCustomCubeColor={handleSetCubeColor}
        resetAll={resetAll}
      />
      {showMain && (
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-gray-200/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">Guy Ginat</Link>
            <div className="flex space-x-4">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/games" className="nav-link">Games</Link>
              <Link href="/tech" className="nav-link">Tech & Code</Link>
              <Link href="/writing" className="nav-link">Game Design</Link>
              <Link href="/about" className="nav-link">About</Link>
            </div>
          </div>
        </div>
      </nav>
      )}
      <div className="relative">
        {showMain && (
          <main className="pt-20 min-h-screen px-4 sm:px-8 pb-12">
            {children}
          </main>
        )}
      </div>
    </>
  );
} 