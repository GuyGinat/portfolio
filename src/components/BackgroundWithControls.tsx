"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import ThreeBackground from "./ThreeBackground";
import ControlPanel from "./ControlPanel";
import Link from "next/link";
import { BackgroundConfig, backgroundConfigMaps } from "@/data/backgroundConfig";
import { linear } from "@/data/easingFunctions";

const DEFAULT_COLOR1 = "#eeeeee";
const DEFAULT_COLOR2 = "#eeeeee";
const DEFAULT_LIGHT_POSITION: [number, number, number] = [0, 6, 5];
const DEFAULT_WAVE_AMPLITUDE = 0;
const DEFAULT_WAVE_FREQUENCY = 1.3;
const DEFAULT_WAVE_SPEED = 4.5;
const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 0, 8];
const DEFAULT_CAMERA_FOV = 80;
const DEFAULT_SPACING_OFFSET = 0;

function tweenOpacity(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
) {
  const startTime = performance.now();
  const animate = (time: number) => {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const value = from + (to - from) * linear(t);
    onUpdate(value);
    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };
  requestAnimationFrame(animate);
}

export default function BackgroundWithControls({ children }: { children: ReactNode }) {
  const [color1, setColor1] = useState(DEFAULT_COLOR1);
  const [color2, setColor2] = useState(DEFAULT_COLOR2);
  const [lightPosition, setLightPosition] = useState<[number, number, number]>(DEFAULT_LIGHT_POSITION);
  const [waveAmplitude, setWaveAmplitude] = useState(DEFAULT_WAVE_AMPLITUDE);
  const [waveFrequency, setWaveFrequency] = useState(DEFAULT_WAVE_FREQUENCY);
  const [waveSpeed, setWaveSpeed] = useState(DEFAULT_WAVE_SPEED);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(DEFAULT_CAMERA_POSITION);
  const [cameraFov, setCameraFov] = useState(DEFAULT_CAMERA_FOV);
  const [showMain, setShowMainState] = useState(false);
  const [spacingOffset, setSpacingOffset] = useState(DEFAULT_SPACING_OFFSET);
  const [customCubeColors, setCustomCubeColors] = useState<{ [key: string]: { color1: string; color2: string } }>({});
  const [currentConfig, setCurrentConfig] = useState<BackgroundConfig>(backgroundConfigMaps["start"]);
  const [nextConfig, setNextConfig] = useState<BackgroundConfig>(backgroundConfigMaps["start"]);
  const [opacity, setOpacity] = useState(0);
  const [finishedIntro, setFinishedIntro] = useState(false);

  const handleShowMain = (show: boolean) => {    
    setShowMainState(show);
    // Tween opacity when showing/hiding main content
  };

  const showMainTween = () => {
    setShowMainState(true);
    tweenOpacity(opacity, 90, 1000, setOpacity);
  };
  const hideMainTween = () => {
    tweenOpacity(opacity, 0, 1000, setOpacity, () => {
      setShowMainState(false);
    });
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

  const writeTextRef = useRef<{ writeText: (text: string, x: number, y: number, c1: string, c2: string) => void }>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      screenLoadSequence();
      localStorage.setItem('hasVisited', 'true');
    } else {
      showMainTween();
      // setNextConfig(backgroundConfigMaps["base"]);
      setFinishedIntro(true);
    }

    function screenLoadSequence() {
      setTimeout(() => {
        writeTextRef.current?.writeText("Hey!", 2, 2, "#aaaaaa", "#111111");
      }, 3000);
      setTimeout(() => {
        setNextConfig(backgroundConfigMaps["purple"]);        
      }, 7000);
      setTimeout(() => {
        writeTextRef.current?.writeText("My Name", 2, 2, "#dddddd", "#ffffff");
        writeTextRef.current?.writeText("Is Guy", 2, 9, "#dddddd", "#ffffff");
      }, 11000);
      setTimeout(() => {
        setNextConfig(backgroundConfigMaps["beach"]);        
      }, 15000);
      setTimeout(() => {
        writeTextRef.current?.writeText("I Make", 2, 2, "#777777", "#111111");
        writeTextRef.current?.writeText("Games", 2, 9, "#777777", "#111111");
      }, 19000);
      setTimeout(() => {
        setNextConfig(backgroundConfigMaps["games2"]);        
      }, 23000);
      setTimeout(() => {
        writeTextRef.current?.writeText("+ More", 2, 2, "#dddddd", "#ffffff");
        writeTextRef.current?.writeText("Stuff", 2, 9, "#dddddd", "#ffffff");
      }, 27000);
      setTimeout(() => {
        setNextConfig(backgroundConfigMaps["base"]);
      }, 31000);
      // After all sequences are done, fade in the main content
      setTimeout(() => {
        showMainTween();
        setFinishedIntro(true);
      }, 35000);
    }
  }, []);

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
        currentConfig={currentConfig}
        nextConfig={nextConfig}
        setCurrentConfig={setCurrentConfig}
        waveAmplitude={waveAmplitude}
        setWaveAmplitude={setWaveAmplitude}
        waveFrequency={waveFrequency}
        setWaveFrequency={setWaveFrequency}
        waveSpeed={waveSpeed}
        setWaveSpeed={setWaveSpeed}
        ref={writeTextRef}
        finishedIntro={finishedIntro}
        setFinishedIntro={setFinishedIntro}
      />
      {showMain && (
        <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-gray-200/20 z-50" style={{ opacity: opacity / 100 }}>
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
          <main className="pt-20 min-h-screen px-4 sm:px-8 pb-12" style={{ opacity: opacity / 100 }}>
            {children}
          </main>
        )}
      </div>
    </>
  );
} 