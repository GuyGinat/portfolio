"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThreeBackground from "./ThreeBackground";
import ControlPanel from "./ControlPanel";
import { BackgroundConfig, backgroundConfigMaps } from "@/data/backgroundConfig";
import { linear } from "@/data/easingFunctions";
import { GRID_SIZE_X, GRID_SIZE_Y } from "./ThreeBackground";
import { useScrollBackground } from "@/hooks/useScrollBackground";

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
  const pathname = usePathname();
  const router = useRouter();
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
  const [customCubeOffsets, setCustomCubeOffsets] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [currentConfig, setCurrentConfig] = useState<BackgroundConfig>(backgroundConfigMaps["start"]);
  const [nextConfig, setNextConfig] = useState<BackgroundConfig>(backgroundConfigMaps["start"]);
  const [opacity, setOpacity] = useState(0);
  const [finishedIntro, setFinishedIntro] = useState(false);

  // Use scroll-based background hook (only on home page)
  const isHomePage = pathname === '/';
  const { currentConfig: scrollConfig } = useScrollBackground();

  useEffect(() => {
    // set the custom cube offsets to x:0 y:0 for all cubes
    const newOffsets: { [key: string]: { x: number; y: number } } = {};
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let y = 0; y < GRID_SIZE_Y; y++) {
        newOffsets[`${x}-${y}`] = { x: 0, y: 0 };
      }
    }
    setCustomCubeOffsets(newOffsets);
  }, []);

  const handleShowMain = (show: boolean) => {    
    setShowMainState(show);
    // Tween opacity when showing/hiding main content
  };

  const showMainTween = () => {
    setShowMainState(true);
    tweenOpacity(opacity, 90, 1000, setOpacity);
  };

  const handleSetCubeColor = (gridX: number, gridY: number, color1: string, color2: string) => {
    setCustomCubeColors(prev => ({ ...prev, [`${gridX}-${gridY}`]: { color1, color2 } }));
  };

  const handleSetCubeOffset = (offsets: { [key: string]: { x: number; y: number } }) => {
    setCustomCubeOffsets(offsets);
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
    setCustomCubeOffsets({});
  };

  const writeTextRef = useRef<{ writeText: (text: string, x: number, y: number, c1: string, c2: string) => void }>(null);

  // Track if update is from scroll
  const [isScrollUpdate, setIsScrollUpdate] = useState(false);
  
  // Handle pathname-based background config (for game/tech detail pages)
  useEffect(() => {
    if (finishedIntro && !isHomePage) {
      // Apply different configs based on route
      if (pathname.startsWith('/games/')) {
        setNextConfig(backgroundConfigMaps["games"]);
      } else if (pathname.startsWith('/tech/')) {
        setNextConfig(backgroundConfigMaps["tech"]);
      } else if (pathname === '/tower') {
        setNextConfig(backgroundConfigMaps["games"]);
      }
    }
  }, [pathname, finishedIntro, isHomePage]);
  
  // Handle hash navigation on page load (when navigating from another page with hash)
  useEffect(() => {
    if (isHomePage && finishedIntro && window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [isHomePage, finishedIntro]);
  
  // Update background when scroll config changes (only on home page, after intro is finished)
  useEffect(() => {
    if (finishedIntro && isHomePage && scrollConfig) {
      setIsScrollUpdate(true);
      setNextConfig(scrollConfig);
      // Keep flag active - don't reset it, let it stay true for scroll updates
    }
  }, [scrollConfig, finishedIntro, isHomePage]);
  
  // Helper function to handle navigation with scroll
  const handleNavClick = (sectionId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== '/') {
      // If not on home page, navigate to home first
      router.push('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If element not found yet, try again after a bit more time
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 200);
        }
      }, 300);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      screenLoadSequence();
      localStorage.setItem('hasVisited', 'true');
    } else {
      showMainTween();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        customCubeOffsets={customCubeOffsets}
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
        customCubeOffsets={customCubeOffsets}
        setCustomCubeOffsets={handleSetCubeOffset}
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
        isScrollUpdate={isScrollUpdate}
      />
      {showMain && (
        <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-gray-200/20 z-50" style={{ opacity: opacity / 100 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <a 
                href="/#hero" 
                className="text-xl font-bold text-indigo-600 cursor-pointer"
                onClick={(e) => handleNavClick('hero', e)}
              >
                Guy Ginat
              </a>
              <div className="flex space-x-4">
                <a 
                  href="/#hero" 
                  className="nav-link text-gray-200 cursor-pointer"
                  onClick={(e) => handleNavClick('hero', e)}
                >
                  Home
                </a>
                <a 
                  href="/#games" 
                  className="nav-link text-gray-200 cursor-pointer"
                  onClick={(e) => handleNavClick('games', e)}
                >
                  Games
                </a>
                <a 
                  href="/#tech" 
                  className="nav-link text-gray-200 cursor-pointer"
                  onClick={(e) => handleNavClick('tech', e)}
                >
                  Tech & Tools
                </a>
                <a 
                  href="/#contact" 
                  className="nav-link text-gray-200 cursor-pointer"
                  onClick={(e) => handleNavClick('contact', e)}
                >
                  Contact
                </a>
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