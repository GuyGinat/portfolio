"use client";
import { useState } from "react";
import ThreeBackground from "./ThreeBackground";
import ControlPanel from "./ControlPanel";

const DEFAULT_COLOR1 = "#4338ca";
const DEFAULT_COLOR2 = "#7e22ce";
const DEFAULT_LIGHT_POSITION: [number, number, number] = [0, 5, 5];
const DEFAULT_WAVE_AMPLITUDE = 1.8;
const DEFAULT_WAVE_FREQUENCY = 0.3;
const DEFAULT_WAVE_SPEED = 4.5;

export default function BackgroundWithControls() {
  const [color1, setColor1] = useState(DEFAULT_COLOR1);
  const [color2, setColor2] = useState(DEFAULT_COLOR2);
  const [lightPosition, setLightPosition] = useState<[number, number, number]>(DEFAULT_LIGHT_POSITION);
  const [waveAmplitude, setWaveAmplitude] = useState(DEFAULT_WAVE_AMPLITUDE);
  const [waveFrequency, setWaveFrequency] = useState(DEFAULT_WAVE_FREQUENCY);
  const [waveSpeed, setWaveSpeed] = useState(DEFAULT_WAVE_SPEED);

  return (
    <>
      <ThreeBackground
        color1={color1}
        color2={color2}
        lightPosition={lightPosition}
        waveAmplitude={waveAmplitude}
        waveFrequency={waveFrequency}
        waveSpeed={waveSpeed}
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
      />
    </>
  );
} 