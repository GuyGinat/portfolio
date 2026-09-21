"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Media } from "@/data/work";
import { PipelineDiagram } from "./PipelineDiagram";
import { SlotsStrip } from "./SlotsStrip";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function LoopVideo({ src, poster, alt, className = "" }: { src: string; poster: string; alt: string; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <Image src={poster} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className={`object-cover ${className}`} />;
  }
  return (
    <video
      src={src}
      poster={poster}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

export function Cover({ media, priority = false }: { media: Media; priority?: boolean }) {
  switch (media.kind) {
    case "video":
      return <LoopVideo src={media.src} poster={media.poster} alt={media.alt} />;
    case "image":
      return <Image src={media.src} alt={media.alt} fill priority={priority} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />;
    case "pipeline":
      return <PipelineDiagram className="absolute inset-0 h-full w-full p-4" />;
    case "slots":
      return <SlotsStrip />;
  }
}
