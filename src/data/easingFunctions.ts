export type EasingFunction = (t: number) => number;

export const linear: EasingFunction = t => t;

export const easeInOutQuad: EasingFunction = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
export const easeInOutCubic: EasingFunction = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
export const easeInOutQuart: EasingFunction = t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1);
export const easeInOutQuint: EasingFunction = t => t < 0.5 ? 16 * t * t * t * t * t : 1 - 16 * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1);

export const easeInOutSine: EasingFunction = t => t < 0.5 ? 1 - Math.cos(Math.PI * t) : Math.cos(Math.PI * (t - 0.5));
export const easeInOutExpo: EasingFunction = t => t < 0.5 ? 2 * Math.pow(2, 10 * (t - 1)) : -Math.pow(2, -10 * (t - 1)) + 2;