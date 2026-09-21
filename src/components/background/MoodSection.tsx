"use client";
import { useEffect, useRef } from "react";
import { MoodName, Sweep, setMood } from "@/lib/bgStore";

type Props = React.HTMLAttributes<HTMLElement> & {
  mood: MoodName;
  sweep?: Sweep;
};

// A <section> that switches the background mood when it crosses the middle of the viewport.
export default function MoodSection({ mood, sweep = "ttb", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMood(mood, sweep); },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mood, sweep]);

  return <section ref={ref} {...rest}>{children}</section>;
}
