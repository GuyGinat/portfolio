"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type WaveParameterCallback = (amplitude: number, frequency: number, speed: number) => void;

interface AudioContextType {
  setWaveParameters: (callback: WaveParameterCallback) => void;
  updateWaveParameters: (amplitude: number, frequency: number, speed: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [waveCallback, setWaveCallback] = useState<WaveParameterCallback | null>(null);

  const setWaveParameters = useCallback((callback: WaveParameterCallback) => {
    setWaveCallback(() => callback);
  }, []);

  const updateWaveParameters = useCallback((amplitude: number, frequency: number, speed: number) => {
    waveCallback?.(amplitude, frequency, speed);
  }, [waveCallback]);

  return (
    <AudioContext.Provider value={{ setWaveParameters, updateWaveParameters }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
} 