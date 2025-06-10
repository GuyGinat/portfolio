"use client";

import { timeline } from "@/data/timeline";
import { useState, useEffect } from "react";
import Image from "next/image";

// Add fade-in animation to Tailwind if not present
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none;} }
// .animate-fade-in { animation: fade-in 0.25s ease; }

export default function AboutPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [linePercent, setLinePercent] = useState(0); // For line animation
  const [visibleEvents, setVisibleEvents] = useState(0); // For sequential event fade-in

  // Animate the timeline line and events
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 900; // ms
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = Math.min(1, elapsed / duration);
      setLinePercent(percent);
      setVisibleEvents(Math.floor(percent * timeline.length) + 1);
      if (percent < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div>
      <div className="container-custom py-12">
        <h1 className="section-title">About Me</h1>
        <p className="mb-10 text-lg text-gray-700 max-w-2xl">
          Here's a timeline of my journey with games—both playing and making them. Hover over each year to see more!
        </p>
        <div className="relative flex flex-col items-center">
          {/* Timeline line (animated width) */}
          <div className="absolute top-1/2 left-0 h-1 bg-indigo-400 rounded-full z-0 transition-all duration-700" style={{ width: `${linePercent * 100}%`, transform: 'translateY(-50%)' }} />
          <div className="flex w-full justify-between items-center relative z-10">
            {timeline.map((event, idx) => {
              const markerImg = event.gamesPlayed?.[0]?.image || event.gamesMade?.[0]?.image || event.image || "/timeline/fallback.jpg";
              const show = idx < visibleEvents;
              return (
                <div
                  key={event.year}
                  className={`flex flex-col items-center group relative transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}
                  style={{ minWidth: 80 }}
                >
                  {/* Square marker */}
                  <div
                    className="w-12 h-12 bg-white border-2 border-indigo-400 shadow overflow-hidden flex items-center justify-center cursor-pointer"
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    tabIndex={0}
                    onFocus={() => setHovered(idx)}
                    onBlur={() => setHovered(null)}
                    aria-label={event.title}
                  >
                    <Image
                      src={markerImg}
                      alt={event.title}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-indigo-700">{event.year}</span>
                  {/* Popover above or below */}
                  {hovered === idx && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 ${event.direction === 'up' ? 'bottom-16' : 'top-16'} bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[220px] max-w-xs z-30 animate-fade-in`}
                    >
                      <div className="font-bold text-lg mb-1">{event.title}</div>
                      <div className="text-gray-600 mb-2 text-sm">{event.description}</div>
                      {event.gamesPlayed && (
                        <div className="mb-2">
                          <div className="font-semibold text-xs text-gray-500 mb-1">Games Played:</div>
                          <div className="flex gap-2 flex-wrap">
                            {event.gamesPlayed.map((g) => (
                              <div key={g.title} className="flex flex-col items-center">
                                {g.image && (
                                  <Image src={g.image} alt={g.title} width={40} height={40} className="rounded mb-1" />
                                )}
                                <span className="text-xs text-gray-700">{g.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {event.gamesMade && (
                        <div>
                          <div className="font-semibold text-xs text-gray-500 mb-1">Games Made:</div>
                          <div className="flex gap-2 flex-wrap">
                            {event.gamesMade.map((g) => (
                              <div key={g.title} className="flex flex-col items-center">
                                {g.image && (
                                  <Image src={g.image} alt={g.title} width={40} height={40} className="rounded mb-1" />
                                )}
                                <span className="text-xs text-gray-700">{g.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 