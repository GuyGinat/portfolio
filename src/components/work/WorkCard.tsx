"use client";
import Link from "next/link";
import type { CaseStudy } from "@/data/work";
import { setTint } from "@/lib/bgStore";
import { Cover } from "./Cover";

type Layout = "feature" | "wide" | "half";

// Hovering or focusing a card tints the background grid in the project's colour.
export function WorkCard({ study, layout }: { study: CaseStudy; layout: Layout }) {
  const tintOn = () => setTint(study.tint);
  const tintOff = () => setTint(null);

  const grid =
    layout === "feature"
      ? "lg:grid-cols-[1.6fr_1fr]"
      : layout === "wide"
        ? "lg:grid-cols-[1fr_1.3fr]"
        : "";

  const cover = (
    <div className={`relative aspect-video overflow-hidden bg-scene ${layout === "wide" ? "lg:order-2" : ""}`}>
      <Cover media={study.cover} priority={layout === "feature"} />
    </div>
  );

  return (
    <Link
      href={`/work/${study.slug}`}
      onMouseEnter={tintOn}
      onMouseLeave={tintOff}
      onFocus={tintOn}
      onBlur={tintOff}
      className={`group grid overflow-hidden rounded-md border border-line bg-surface/85 backdrop-blur-sm transition-colors hover:border-accent/70 ${grid}`}
    >
      {cover}
      <div className={`flex flex-col gap-3 p-5 sm:p-6 ${layout === "feature" ? "lg:justify-end lg:p-8" : ""}`}>
        <h3 className={`type-heading text-ink ${layout === "feature" ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {study.title}
        </h3>
        <p className="text-ink/85">{study.summary}</p>
        <p className="text-sm text-muted">{study.role}</p>
        <p className="mt-auto pt-2 text-sm font-medium text-accent underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
          Read the case study
        </p>
      </div>
    </Link>
  );
}
