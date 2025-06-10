"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransitionMask() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show mask when pathname changes
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      className={`fixed inset-0 bg-white/30 backdrop-blur-sm z-50 pointer-events-none transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
} 