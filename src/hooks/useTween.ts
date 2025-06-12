import { useEffect, useRef } from 'react';

type EasingFunction = (t: number) => number;

const linear: EasingFunction = t => t;

export function useTween(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  easing: EasingFunction = linear,
  onComplete?: () => void
) {
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1); // Clamp [0, 1]
      const eased = easing(t);
      const value = from + (to - from) * eased;
      onUpdate(value);

      if (t < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = undefined;
    };
  }, [from, to, duration, easing]);
}
