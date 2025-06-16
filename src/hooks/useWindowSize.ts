'use client';
import { useState, useEffect } from 'react';

export enum ScreenType {
  SM = 'sm',      // 640px
  MD = 'md',      // 768px
  LG = 'lg',      // 1024px
  XL = 'xl',      // 1280px
  '2XL' = '2xl',  // 1536px
  MOBILE = 'mobile' // < 640px
}

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  screenType: ScreenType | undefined;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    screenType: undefined,
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let screenType: ScreenType;

      if (width < 640) {
        screenType = ScreenType.MOBILE;
      } else if (width < 768) {
        screenType = ScreenType.SM;
      } else if (width < 1024) {
        screenType = ScreenType.MD;
      } else if (width < 1280) {
        screenType = ScreenType.LG;
      } else if (width < 1536) {
        screenType = ScreenType.XL;
      } else {
        screenType = ScreenType['2XL'];
      }

      setWindowSize({
        width,
        height: window.innerHeight,
        screenType,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
export { useWindowSize }; 