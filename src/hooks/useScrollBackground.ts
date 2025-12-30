"use client";
import { useState, useEffect, useRef } from 'react';
import { BackgroundConfig, backgroundConfigMaps, scrollBreakpoints } from '@/data/backgroundConfig';

export function useScrollBackground() {
  const [currentConfig, setCurrentConfig] = useState<BackgroundConfig | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Helper function to interpolate between two background configs
    const interpolateConfigs = (
      from: BackgroundConfig,
      to: BackgroundConfig,
      t: number
    ): BackgroundConfig => {
      const lerp = (a: number, b: number) => a + (b - a) * t;
      const lerpVec3 = (a: [number, number, number], b: [number, number, number]) =>
        [0, 1, 2].map(i => lerp(a[i], b[i])) as [number, number, number];
      
      const lerpColor = (color1: string, color2: string) => {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        const toHex = (n: number) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      };

      return {
        color1: lerpColor(from.color1, to.color1),
        color2: lerpColor(from.color2, to.color2),
        lightPosition: lerpVec3(from.lightPosition, to.lightPosition),
        waveAmplitude: lerp(from.waveAmplitude, to.waveAmplitude),
        waveFrequency: lerp(from.waveFrequency, to.waveFrequency),
        waveSpeed: lerp(from.waveSpeed, to.waveSpeed),
        cameraPosition: lerpVec3(from.cameraPosition, to.cameraPosition),
        cameraFov: lerp(from.cameraFov, to.cameraFov),
        spacingOffset: lerp(from.spacingOffset, to.spacingOffset),
        customColorsMap: t < 0.5 ? from.customColorsMap : to.customColorsMap,
        delayType: t < 0.5 ? from.delayType : to.delayType,
        delay: lerp(from.delay || 0, to.delay || 0),
      };
    };

    // Get configs for breakpoints
    const getConfigForPercentage = (percentage: number): BackgroundConfig | null => {
      const sortedBreakpoints = Object.keys(scrollBreakpoints)
        .map(Number)
        .sort((a, b) => a - b);
      
      // Find the two breakpoints we're between
      let lowerBreakpoint: number | null = null;
      let upperBreakpoint: number | null = null;
      
      for (let i = 0; i < sortedBreakpoints.length; i++) {
        if (percentage <= sortedBreakpoints[i]) {
          upperBreakpoint = sortedBreakpoints[i];
          lowerBreakpoint = i > 0 ? sortedBreakpoints[i - 1] : sortedBreakpoints[i];
          break;
        }
      }
      
      // If we're past all breakpoints, use the last one
      if (lowerBreakpoint === null || upperBreakpoint === null) {
        const lastBreakpoint = sortedBreakpoints[sortedBreakpoints.length - 1];
        const configName = scrollBreakpoints[lastBreakpoint];
        return backgroundConfigMaps[configName] || null;
      }
      
      // If we're exactly on a breakpoint, return that config
      if (percentage === lowerBreakpoint || percentage === upperBreakpoint) {
        const configName = scrollBreakpoints[lowerBreakpoint === upperBreakpoint ? lowerBreakpoint : (percentage === lowerBreakpoint ? lowerBreakpoint : upperBreakpoint)];
        return backgroundConfigMaps[configName] || null;
      }
      
      // Interpolate between the two breakpoints
      const lowerConfigName = scrollBreakpoints[lowerBreakpoint];
      const upperConfigName = scrollBreakpoints[upperBreakpoint];
      const lowerConfig = backgroundConfigMaps[lowerConfigName];
      const upperConfig = backgroundConfigMaps[upperConfigName];
      
      if (!lowerConfig || !upperConfig) return null;
      
      const range = upperBreakpoint - lowerBreakpoint;
      const t = (percentage - lowerBreakpoint) / range;
      
      return interpolateConfigs(lowerConfig, upperConfig, t);
    };

    // Scroll handler for continuous background updates
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
        
        const clampedPercentage = Math.max(0, Math.min(100, scrollPercentage));
        const config = getConfigForPercentage(clampedPercentage);
        
        if (config) {
          setCurrentConfig(config);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    currentConfig,
  };
}
