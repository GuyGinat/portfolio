import { useState } from 'react';

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
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [color1, setColor1] = useState(initialColor1);
  const [color2, setColor2] = useState(initialColor2);
  const [lightX, setLightX] = useState(initialLightPosition[0]);
  const [lightY, setLightY] = useState(initialLightPosition[1]);
  const [lightZ, setLightZ] = useState(initialLightPosition[2]);
  const [waveAmplitude, setWaveAmplitude] = useState(initialWaveAmplitude);
  const [waveFrequency, setWaveFrequency] = useState(initialWaveFrequency);
  const [waveSpeed, setWaveSpeed] = useState(initialWaveSpeed);

  const handleColor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor1(e.target.value);
    onColor1Change(e.target.value);
  };

  const handleColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor2(e.target.value);
    onColor2Change(e.target.value);
  };

  const handleLightPositionChange = () => {
    onLightPositionChange([lightX, lightY, lightZ]);
  };

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
        <div className="absolute bottom-16 right-0 w-64 bg-white/10 backdrop-blur-md rounded-lg p-4 
                        border border-white/20 shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white mb-1">Color 1</label>
              <input
                type="color"
                value={color1}
                onChange={handleColor1Change}
                className="w-full h-8 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Color 2</label>
              <input
                type="color"
                value={color2}
                onChange={handleColor2Change}
                className="w-full h-8 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Light Position X</label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={lightX}
                onChange={(e) => {
                  setLightX(parseFloat(e.target.value));
                  handleLightPositionChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Light Position Y</label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={lightY}
                onChange={(e) => {
                  setLightY(parseFloat(e.target.value));
                  handleLightPositionChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Light Position Z</label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={lightZ}
                onChange={(e) => {
                  setLightZ(parseFloat(e.target.value));
                  handleLightPositionChange();
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Wave Amplitude</label>
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
              <label className="block text-sm text-white mb-1">Wave Frequency</label>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.01"
                value={waveFrequency}
                onChange={handleWaveFrequencyChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-white mb-1">Wave Speed</label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={waveSpeed}
                onChange={handleWaveSpeedChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 