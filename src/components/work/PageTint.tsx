"use client";
import { useEffect } from "react";
import { bg, setTint } from "@/lib/bgStore";

// Keeps a light project tint on the grid while a case study is open.
export function PageTint({ color }: { color: string }) {
  useEffect(() => {
    bg.tintStrength = 0.22;
    setTint(color);
    return () => {
      setTint(null);
      bg.tintStrength = 0.38;
    };
  }, [color]);
  return null;
}
