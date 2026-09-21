"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { bg } from "@/lib/bgStore";
import GridPanel from "./GridPanel";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Background() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => { bg.reducedMotion = motion.matches; };
    applyMotion();
    motion.addEventListener("change", applyMotion);

    // The canvas ignores pointer events (content sits on top), so track the
    // mouse on the window instead. Touch input doesn't drive the glow.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      bg.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      bg.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      bg.pointer.active = true;
    };
    const onLeave = () => { bg.pointer.active = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      motion.removeEventListener("change", applyMotion);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none bg-scene transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Scene onReady={() => setReady(true)} />
      </div>
      <GridPanel />
    </>
  );
}
