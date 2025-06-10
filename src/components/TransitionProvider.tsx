"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const TransitionContext = createContext({});

export function useTransitionOverlay() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<React.ReactNode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevChildren = useRef<React.ReactNode>(null);
  const prevPath = useRef<string>(pathname);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      // Start transition: capture previous page as overlay
      setOverlay(prevChildren.current);
      setIsTransitioning(true);
      setOverlayOpacity(1);

      // Remove overlay after animation
      const timeout = setTimeout(() => {
        setOverlayOpacity(0);
        const removeTimeout = setTimeout(() => {
          setOverlay(null);
          setIsTransitioning(false);
        }, 300);
        return () => clearTimeout(removeTimeout);
      }, 300);

      prevPath.current = pathname;
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  // Always keep the latest children for overlay
  useEffect(() => {
    prevChildren.current = children;
  }, [children]);

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      {/* Overlay for outgoing page */}
      {overlay && (
        <div
          className="fixed inset-0 z-50 bg-gray-50 bg-opacity-90 transition-opacity duration-300"
          style={{ 
            pointerEvents: "none",
            opacity: overlayOpacity
          }}
        >
          {overlay}
        </div>
      )}
      {/* New page content */}
      {children}
    </TransitionContext.Provider>
  );
} 