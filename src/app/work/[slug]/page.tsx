import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MoodSection from "@/components/background/MoodSection";
import { BlockList } from "@/components/ContentBlock";
import { Cover, LoopVideo } from "@/components/work/Cover";
import { PageTint } from "@/components/work/PageTint";
import { PipelineDiagram, pipelineStages } from "@/components/work/PipelineDiagram";
import { towerContent } from "@/data/tower-content";
import { getCase, work } from "@/data/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCase(params.slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCase(params.slug);
  if (!study) notFound();
  const index = work.indexOf(study);
  const next = work[(index + 1) % work.length];

  const facts: [string, React.ReactNode][] = [
    ["Role", study.role],
    ...(study.team ? [["Team", study.team] as [string, React.ReactNode]] : []),
    ["Timeline", study.timeline],
    ["Stack", study.stack.join(", ")],
  ];

  return (
    <MoodSection mood="quiet" className="pb-24 pt-10 sm:pt-14">
      <PageTint color={study.tint} />
      <div className="page">
        <Link href="/#work" className="link text-sm text-muted">All work</Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <h1 className="type-display text-[clamp(2.5rem,7vw,5.25rem)]">{study.title}</h1>
            {study.fullTitle && <p className="mt-3 text-muted">Released as {study.fullTitle}</p>}
            <p className="mt-5 max-w-prose text-lg text-ink/90">{study.summary}</p>
          </div>
          <dl className="grid gap-3 rounded-md border border-line bg-surface/85 p-5 text-sm backdrop-blur-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[5rem_1fr] gap-3">
                <dt className="text-muted">{label}</dt>
                <dd className="text-ink/90">{value}</dd>
              </div>
            ))}
            {study.links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {study.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn text-sm">{l.label}</a>
                ))}
              </div>
            )}
          </dl>
        </header>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-md border border-line bg-scene">
          <Cover media={study.cover} priority />
        </div>

        <article className="mt-10 rounded-md border border-line bg-surface/90 px-5 py-8 backdrop-blur-sm sm:px-10 sm:py-12">
          <div className="prose-case">
            {study.overview.map((p, i) => <p key={i} className={i === 0 ? "text-lg" : ""}>{p}</p>)}

            {study.slug === "swipers" && (
              <figure className="my-10">
                <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {pipelineStages.map((s, i) => (
                    <li key={s.label} className="!pl-0 before:!hidden">
                      <div className="overflow-hidden rounded border border-line bg-scene">
                        <PipelineDiagram stage={i} className="block w-full" />
                      </div>
                      <p className="mt-2 text-sm text-muted">
                        <span className="text-ink">{i + 1}.</span> {s.label}
                      </p>
                    </li>
                  ))}
                </ol>
                {study.note && <figcaption className="mt-3 text-sm text-muted">{study.note}</figcaption>}
              </figure>
            )}

            <h2>What I built</h2>
            {study.built.map((b) => (
              <section key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </section>
            ))}

            <h2>Result</h2>
            <p>{study.result}</p>
          </div>

          {study.gallery && (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {study.gallery.map((g) => (
                <li key={g.src}>
                  <div className="relative aspect-video overflow-hidden rounded border border-line bg-scene">
                    <LoopVideo src={g.src} poster={g.poster} alt={g.caption} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{g.caption}</p>
                </li>
              ))}
            </ul>
          )}

          {study.slug === "tower" && (
            <div className="mt-14 border-t border-line pt-4">
              <BlockList blocks={towerContent} />
            </div>
          )}
        </article>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-10 flex flex-col gap-1 rounded-md border border-line bg-surface/85 p-6 backdrop-blur-sm transition-colors hover:border-accent/70"
        >
          <span className="text-sm text-muted">Next case study</span>
          <span className="type-heading text-2xl text-ink group-hover:text-accent">{next.title}</span>
        </Link>
      </div>
    </MoodSection>
  );
}
