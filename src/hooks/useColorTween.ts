import { useRef, useEffect } from 'react';
import Tween from '@tweenjs/tween.js';

function lerpColor(color1: string, color2: string, t: number) {
  // lerp between hex colors
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
}

export function useColorTween() {
  const group = useRef(new Tween.Group());

  useEffect(() => {
    function animate() {
      requestAnimationFrame(animate);
      group.current.update();
    }
    animate();
  }, []);

  const tweenCubeColors = (
    x: number, 
    y: number, 
    fromColor1: string, 
    fromColor2: string,
    toColor1: string, 
    toColor2: string,
    duration: number = 1000,
    onUpdate: (color1: string, color2: string) => void
  ) => {
    const colorTweenObj = { t: 0 };
    new Tween.Tween(colorTweenObj, group.current)
      .to({ t: 1 }, duration)
      .easing(Tween.Easing.Quadratic.InOut)
      .onUpdate((obj) => {
        const interpolatedColor1 = lerpColor(fromColor1, toColor1, obj.t);
        const interpolatedColor2 = lerpColor(fromColor2, toColor2, obj.t);
        onUpdate(interpolatedColor1, interpolatedColor2);
      })
      .start();
  };

  return { tweenCubeColors };
} 