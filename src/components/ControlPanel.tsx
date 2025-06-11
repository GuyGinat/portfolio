import { useState, useRef, useEffect } from 'react';
import { GRID_SIZE_X, GRID_SIZE_Y } from './ThreeBackground';
import Tween from '@tweenjs/tween.js';
import { useColorTween } from '../hooks/useColorTween';
import { tinyFont } from '@/data/tinyFont';
import { usePathname } from 'next/navigation';
import { BackgroundConfig, backgroundConfigMaps } from '@/data/backgroundConfig';

interface ControlPanelProps {
  onColor1Change: (color: string) => void;
  onColor2Change: (color: string) => void;
  onLightPositionChange: (position: [number, number, number]) => void;
  onWaveAmplitudeChange: (value: number) => void;
  onWaveFrequencyChange: (value: number) => void;
  onWaveSpeedChange: (value: number) => void;
  initialColor1: string;
  initialColor2: string;
  initialLightPosition: [number, number, number];
  initialWaveAmplitude: number;
  initialWaveFrequency: number;
  initialWaveSpeed: number;
  cameraPosition: [number, number, number];
  setCameraPosition: (pos: [number, number, number]) => void;
  cameraFov: number;
  setCameraFov: (fov: number) => void;
  showMain: boolean;
  setShowMain: (show: boolean) => void;
  spacingOffset: number;
  setSpacingOffset: (v: number) => void;
  customCubeColors: { [key: string]: { color1: string; color2: string } };
  setCustomCubeColor: (gridX: number, gridY: number, color1: string, color2: string) => void;
  resetAll: () => void;
}

// Helper for drag-to-change
function useDragNumber(value: number, setValue: (v: number) => void, step = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const startValue = useRef(0);

  const onMouseDown = () => {
    startValue.current = value;
    // Request pointer lock for infinite dragging
    if (ref.current) {
      ref.current.requestPointerLock = ref.current.requestPointerLock || 
        (ref.current as unknown as { mozRequestPointerLock?: () => void }).mozRequestPointerLock || 
        (ref.current as unknown as { webkitRequestPointerLock?: () => void }).webkitRequestPointerLock;
      if (ref.current.requestPointerLock) ref.current.requestPointerLock();
    }
    document.body.style.cursor = 'ew-resize';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    // Use movementX for relative movement
    if (document.pointerLockElement === ref.current) {
      setValue(parseFloat((startValue.current + e.movementX * step).toFixed(3)));
      startValue.current += e.movementX * step;
    }
  };
  const onMouseUp = () => {
    document.body.style.cursor = '';
    document.exitPointerLock();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  return { ref, onMouseDown };
}

type TabType = 'colors' | 'wave' | 'camera' | 'light';

// Add this custom hook at the top level of the file, before the ControlPanel component
function useBackgroundTween() {
  const [isTweening, setIsTweening] = useState(false);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const tweenConfig = (
    from: BackgroundConfig,
    to: BackgroundConfig,
    duration: number,
    onUpdate: (value: BackgroundConfig) => void,
    onComplete?: () => void
  ) => {
    setIsTweening(true);
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);

      const lerp = (a: number, b: number) => a + (b - a) * t;
      const lerpVec3 = (a: [number, number, number], b: [number, number, number]) =>
        [0, 1, 2].map(i => lerp(a[i], b[i])) as [number, number, number];

      const result: BackgroundConfig = {
        color1: from.color1,
        color2: from.color2,
        lightPosition: lerpVec3(from.lightPosition, to.lightPosition),
        waveAmplitude: lerp(from.waveAmplitude, to.waveAmplitude),
        waveFrequency: lerp(from.waveFrequency, to.waveFrequency),
        waveSpeed: lerp(from.waveSpeed, to.waveSpeed),
        cameraPosition: lerpVec3(from.cameraPosition, to.cameraPosition),
        cameraFov: lerp(from.cameraFov, to.cameraFov),
        spacingOffset: lerp(from.spacingOffset, to.spacingOffset),
        customColorsMap: from.customColorsMap
      };

      onUpdate(result);

      if (t < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setIsTweening(false);
        onComplete?.();
      }
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return { tweenConfig, isTweening };
}

export default function ControlPanel({
  onColor1Change,
  onColor2Change,
  onLightPositionChange,
  onWaveAmplitudeChange,
  onWaveFrequencyChange,
  onWaveSpeedChange,
  initialColor1,
  initialColor2,
  initialLightPosition,
  initialWaveAmplitude,
  initialWaveFrequency,
  initialWaveSpeed,
  cameraPosition,
  setCameraPosition,
  cameraFov,
  setCameraFov,
  showMain,
  setShowMain,
  spacingOffset,
  setSpacingOffset,
  customCubeColors,
  setCustomCubeColor,
  resetAll,
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [color1, setColor1] = useState(initialColor1);
  const [color2, setColor2] = useState(initialColor2);
  const [light, setLight] = useState<[number, number, number]>(initialLightPosition);
  const [waveAmplitude, setWaveAmplitude] = useState(initialWaveAmplitude);
  const [waveFrequency, setWaveFrequency] = useState(initialWaveFrequency);
  const [waveSpeed, setWaveSpeed] = useState(initialWaveSpeed);
  const [selectedGridX, setSelectedGridX] = useState(0);
  const [selectedGridY, setSelectedGridY] = useState(0);
  const selectedKey = `${selectedGridX}-${selectedGridY}`;
  const selectedColor1 = customCubeColors[selectedKey]?.color1 || "#ffffff";
  const selectedColor2 = customCubeColors[selectedKey]?.color2 || "#ffffff";
  const [fullLerpColor1, setFullLerpColor1] = useState("#ffffff");
  const [fullLerpColor2, setFullLerpColor2] = useState("#cccccc");
  const [activeTab, setActiveTab] = useState<TabType>('colors');
  const { tweenCubeColors } = useColorTween();
  const pathname = usePathname();
  const [currentConfig, setCurrentConfig] = useState<BackgroundConfig>(backgroundConfigMaps["default"]);
  const { tweenConfig } = useBackgroundTween();

  useEffect(() => {
    console.log(pathname);
    const config = backgroundConfigMaps[pathname.slice(1)] || backgroundConfigMaps["default"] ;
    if (config) {
      lerpAllCubesToColors(config.color1, config.color2);
      setBackgroundConfig(config);
    }
  }, [pathname]);

  // Drag controls for camera
  const camX = useDragNumber(cameraPosition[0], v => setCameraPosition([v, cameraPosition[1], cameraPosition[2]]));
  const camY = useDragNumber(cameraPosition[1], v => setCameraPosition([cameraPosition[0], v, cameraPosition[2]]));
  const camZ = useDragNumber(cameraPosition[2], v => setCameraPosition([cameraPosition[0], cameraPosition[1], v]));
  // Drag controls for light
  const lightX = useDragNumber(light[0], v => { const l: [number, number, number] = [v, light[1], light[2]]; setLight(l); onLightPositionChange(l); });
  const lightY = useDragNumber(light[1], v => { const l: [number, number, number] = [light[0], v, light[2]]; setLight(l); onLightPositionChange(l); });
  const lightZ = useDragNumber(light[2], v => { const l: [number, number, number] = [light[0], light[1], v]; setLight(l); onLightPositionChange(l); });

  const handleColor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor1(e.target.value);
    onColor1Change(e.target.value);
  };
  const handleColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor2(e.target.value);
    onColor2Change(e.target.value);
  };

  // Sine wave slider handlers
  const handleWaveAmplitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWaveAmplitude(value);
    onWaveAmplitudeChange(value);
  };
  const handleWaveFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWaveFrequency(value);
    onWaveFrequencyChange(value);
  };
  const handleWaveSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setWaveSpeed(value);
    onWaveSpeedChange(value);
  };
  const handleCameraFov = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCameraFov(parseFloat(e.target.value));
  };

  const setBackgroundConfig = (config: BackgroundConfig) => {
    tweenConfig(currentConfig, config, 1000, (newConfig) => {      
      setLight(newConfig.lightPosition);
      setSpacingOffset(newConfig.spacingOffset);
      setWaveAmplitude(newConfig.waveAmplitude);
      setWaveFrequency(newConfig.waveFrequency);
      setWaveSpeed(newConfig.waveSpeed);
      setCameraPosition(newConfig.cameraPosition);
      setCameraFov(newConfig.cameraFov);
    }, () => {
      setCurrentConfig(config);
    });
  };
  


  const group = useRef(new Tween.Group());

  useEffect(() => {
    function animate() {
      requestAnimationFrame(animate);
      group.current.update();
    }
    animate();
  }, []);

  function lerpCubeColors(x: number, y: number, c1: string, c2: string) {
    if (x < 0 || x >= GRID_SIZE_X || y < 0 || y >= GRID_SIZE_Y) return;
    const selectedKey = `${x}-${y}`;
    const selectedColor1 = customCubeColors[selectedKey]?.color1 || color1;
    const selectedColor2 = customCubeColors[selectedKey]?.color2 || color2;
    
    tweenCubeColors(
      x, y,
      selectedColor1, selectedColor2,
      c1, c2,
      1000,
      (newColor1, newColor2) => setCustomCubeColor(x, y, newColor1, newColor2)
    );
  }

  const lerpAllCubes = () => {
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let y = 0; y < GRID_SIZE_Y; y++) {
        setTimeout(() => {
          lerpCubeColors(x, y, fullLerpColor1, fullLerpColor2);
        }, 100 * x);
      }
    }
  }

  const lerpAllCubesToColors = (color1: string, color2: string) => {
    for (let x = 0; x < GRID_SIZE_X; x++) {
      for (let y = 0; y < GRID_SIZE_Y; y++) {
        setTimeout(() => {
          lerpCubeColors(x, y, color1, color2);
        }, 100 * x);
      }
    }
  }

  const writeLetter = (char: string, x: number, y: number) => {
    const rows = tinyFont[char.toUpperCase()];
    if (!rows) return;
    rows.forEach((row, rowIndex) => {
      for (let col = 0; col < 3; col++) {
        if ((row >> (2 - col)) & 1) {
          lerpCubeColors(x + col, GRID_SIZE_Y - 1 - rowIndex - y, fullLerpColor1, fullLerpColor2);
        }
      }
    });
  }

  const writeText = (text: string, x: number, y: number) => {
    for (let i = 0; i < text.length; i++) {
      writeLetter(text[i], x + i * 4, y);
    }
  }

  const floodFill = (x: number, y: number, color1: string, color2: string) => {
    const visited = new Set<string>();
    const queue: [number, number][] = [[x, y]];
    while (queue.length > 0) {
      const [nextX, nextY] = queue.shift()!;
      const selectedKey = `${nextX}-${nextY}`;
      if (visited.has(selectedKey)) continue;
      visited.add(selectedKey);
      const delay = (Math.abs(x - nextX) + Math.abs(y - nextY)) * 100;
      if (nextX < 0 || nextX >= GRID_SIZE_X || nextY < 0 || nextY >= GRID_SIZE_Y) continue;
      queue.push([nextX + 1, nextY], [nextX - 1, nextY], [nextX, nextY + 1], [nextX, nextY - 1]);
      setTimeout(() => lerpCubeColors(nextX, nextY, color1, color2), delay);
    }
  }

  const floodFillTest = () => {
    floodFill(14, 10, "#000000", "#ffffff");
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'colors':
        return (
          <>
            {/* Color pickers */}
            <div>
              <label className="block text-sm text-white mb-1">Color 1</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={color1}
                  onChange={handleColor1Change}
                  className="flex-1 h-8 rounded"
                />
                <button className='flex-4 h-8 rounded bg-black/30 text-white px-1'>Change</button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Color 2</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={color2}
                  onChange={handleColor2Change}
                  className="flex-1 h-8 rounded"
                />
                <button className='flex-4 h-8 rounded bg-black/30 text-white px-1'>Change</button>
              </div>
            </div>
            {/* Custom Cube Color Picker */}
            <div>
              <label className="block text-sm text-white mb-1">Set Cube Colors</label>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-white">X</span>
                <input type="number" min={0} max={19} value={selectedGridX} onChange={e => setSelectedGridX(Number(e.target.value))} className="w-12 rounded bg-black/30 text-white px-1" />
                <span className="text-xs text-white">Y</span>
                <input type="number" min={0} max={19} value={selectedGridY} onChange={e => setSelectedGridY(Number(e.target.value))} className="w-12 rounded bg-black/30 text-white px-1" />
                <input type="color" value={selectedColor1} onChange={e => setCustomCubeColor(selectedGridX, selectedGridY, e.target.value, selectedColor2)} />
                <input type="color" value={selectedColor2} onChange={e => setCustomCubeColor(selectedGridX, selectedGridY, selectedColor1, e.target.value)} />
              </div>
            </div>
            {/* All cubes lerp */}
            <div>
              <label className="block text-sm text-white mb-1">All cubes lerp</label>
              <div className="flex items-center space-x-2">
                <input className='flex-1' type="color" value={fullLerpColor1} onChange={e => setFullLerpColor1(e.target.value)} />
                <input className='flex-1'type="color" value={fullLerpColor2} onChange={e => setFullLerpColor2(e.target.value)} />
                <button onClick={() => lerpAllCubes()} className="flex-1 bg-black/30 text-white px-1">Lerp All</button>
              </div>
            </div>
            <div>
              <button onClick={() => floodFillTest()} className="w-full bg-black/30 text-white px-1">Flood Fill</button>
            </div>
            <div>
              <button onClick={() => writeText("what", 1, 1)} className="w-full bg-black/30 text-white px-1">Write Text</button>
            </div>
          </>
        );
      case 'wave':
        return (
          <>
            {/* Sine wave controls */}
            <div>
              <label className="block text-sm text-white mb-1">Wave Amplitude <span className="ml-2 text-xs text-white/70">{waveAmplitude}</span></label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={waveAmplitude}
                onChange={handleWaveAmplitudeChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Wave Frequency <span className="ml-2 text-xs text-white/70">{waveFrequency}</span></label>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={waveFrequency}
                onChange={handleWaveFrequencyChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Wave Speed <span className="ml-2 text-xs text-white/70">{waveSpeed}</span></label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={waveSpeed}
                onChange={handleWaveSpeedChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Spacing <span className="ml-2 text-xs text-white/70">{spacingOffset}</span></label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={spacingOffset}
                onChange={e => setSpacingOffset(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </>
        );
      case 'camera':
        return (
          <>
            {/* Camera Position */}
            <div>
              <label className="block text-sm text-white mb-1">Camera Position</label>
              <div className="flex items-center space-x-2">
                <div ref={camX.ref} onMouseDown={camX.onMouseDown} className="flex items-center cursor-ew-resize select-none">
                  <span className="w-4 text-xs font-bold text-red-400">X</span>
                  <input type="number" value={cameraPosition[0]} step={0.1} min={-20} max={20}
                    onChange={e => setCameraPosition([parseFloat(e.target.value), cameraPosition[1], cameraPosition[2]])}
                    className="w-16 mx-1 rounded bg-black/30 text-white px-1" />
                </div>
                <div ref={camY.ref} onMouseDown={camY.onMouseDown} className="flex items-center cursor-ew-resize select-none">
                  <span className="w-4 text-xs font-bold text-green-400">Y</span>
                  <input type="number" value={cameraPosition[1]} step={0.1} min={-20} max={20}
                    onChange={e => setCameraPosition([cameraPosition[0], parseFloat(e.target.value), cameraPosition[2]])}
                    className="w-16 mx-1 rounded bg-black/30 text-white px-1" />
                </div>
                <div ref={camZ.ref} onMouseDown={camZ.onMouseDown} className="flex items-center cursor-ew-resize select-none">
                  <span className="w-4 text-xs font-bold text-blue-400">Z</span>
                  <input type="number" value={cameraPosition[2]} step={0.1} min={1} max={30}
                    onChange={e => setCameraPosition([cameraPosition[0], cameraPosition[1], parseFloat(e.target.value)])}
                    className="w-16 mx-1 rounded bg-black/30 text-white px-1" />
                </div>
              </div>
            </div>
            {/* Camera FOV */}
            <div>
              <label className="block text-sm text-white mb-1">Camera FOV <span className="ml-2 text-xs text-white/70">{cameraFov}</span></label>
              <input
                type="range"
                min="10"
                max="120"
                step="1"
                value={cameraFov}
                onChange={handleCameraFov}
                className="w-full"
              />
            </div>
          </>
        );
      case 'light':
        return (
          <>
            {/* Light Position */}
            <div>
              <label className="block text-sm text-white mb-1">Light Position</label>
              <div className="flex items-center space-x-2">
                <div ref={lightX.ref} onMouseDown={lightX.onMouseDown} className="flex items-center cursor-ew-resize select-none">
                  <span className="w-4 text-xs font-bold text-red-400">X</span>
                  <input type="number" value={light[0]} step={0.1} min={-10} max={10}
                    onChange={e => { const v = parseFloat(e.target.value); setLight([v, light[1], light[2]]); onLightPositionChange([v, light[1], light[2]]); }}
                    className="w-16 mx-1 rounded bg-black/30 text-white px-1" />
                </div>
                <div ref={lightY.ref} onMouseDown={lightY.onMouseDown} className="flex items-center cursor-ew-resize select-none">
                  <span className="w-4 text-xs font-bold text-green-400">Y</span>
                  <input type="number" value={light[1]} step={0.1} min={-10} max={10}
                    onChange={e => { const v = parseFloat(e.target.value); setLight([light[0], v, light[2]]); onLightPositionChange([light[0], v, light[2]]); }}
                    className="w-16 mx-1 rounded bg-black/30 text-white px-1" />
                </div>
                <div ref={lightZ.ref} onMouseDown={lightZ.onMouseDown} className="flex items-center cursor-ew-resize select-none">
                  <span className="w-4 text-xs font-bold text-blue-400">Z</span>
                  <input type="number" value={light[2]} step={0.1} min={-10} max={10}
                    onChange={e => { const v = parseFloat(e.target.value); setLight([light[0], light[1], v]); onLightPositionChange([light[0], light[1], v]); }}
                    className="w-16 mx-1 rounded bg-black/30 text-white px-1" />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                   hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-black/30 backdrop-blur-md rounded-lg p-4 
                        border border-white/20 shadow-lg">
          <div className="space-y-4">
            {/* Reset All Button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={resetAll}
                className="px-3 py-1 rounded bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition"
              >
                Reset All
              </button>
            </div>
            {/* Show Main Content Toggle */}
            <div className="flex items-center mb-2">
              <input
                id="show-main-toggle"
                type="checkbox"
                checked={showMain}
                onChange={e => setShowMain(e.target.checked)}
                className="mr-2 accent-indigo-500"
              />
              <label htmlFor="show-main-toggle" className="text-white text-sm select-none cursor-pointer">
                Show Main Content
              </label>
            </div>
            {/* Tabs */}
            <div className="flex space-x-1 mb-4">
              {(['colors', 'wave', 'camera', 'light'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-colors
                    ${activeTab === tab 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-black/30 text-white/70 hover:bg-black/50'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="space-y-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 