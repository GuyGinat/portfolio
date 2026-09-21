import Image from "next/image";
import Link from "next/link";
import MoodSection from "@/components/background/MoodSection";
import { WorkCard } from "@/components/work/WorkCard";
import { experience, profile, tools } from "@/data/site";
import { work } from "@/data/work";
import { games } from "@/data/games";

function SectionHeading({ id, children, intro }: { id: string; children: React.ReactNode; intro?: string }) {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 id={id} className="type-heading scroll-mt-20 text-3xl sm:text-4xl">{children}</h2>
      {intro && <p className="mt-3 max-w-prose text-muted">{intro}</p>}
    </div>
  );
}

export default function Home() {
  const [catchup, swipers, mod, tower] = work;

  return (
    <>
      <MoodSection mood="hero" sweep="center" aria-labelledby="hero-name" className="relative">
        {/* Left-side scrim keeps the text readable over the brightest part of the grid. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-scene/90 via-scene/70 to-scene/40 sm:from-scene/85 sm:via-scene/40 sm:to-transparent" />
        <div className="page relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-end pb-16 pt-24 sm:pb-24">
          <h1 id="hero-name" className="type-display text-[clamp(3.25rem,11vw,8.5rem)]">
            Guy
            <br />
            Ginat
          </h1>
          <p className="type-title mt-6 text-xl text-ink sm:text-2xl">{profile.title}.</p>
          <p className="mt-2 max-w-prose text-lg text-ink/90">{profile.intro}</p>
          <p className="mt-4 max-w-prose text-muted">{profile.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.links.steam} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Wishlist CatchUp
            </a>
            <a href={`mailto:${profile.email}`} className="btn">Email me</a>
            {profile.resume && <a href={profile.resume} className="btn">Résumé (PDF)</a>}
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub</a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
          </div>
        </div>
      </MoodSection>

      <MoodSection mood="work" aria-labelledby="work" className="py-14 sm:py-20">
        <div className="page">
          <SectionHeading id="work">Selected work</SectionHeading>
          <div className="flex flex-col gap-6">
            <WorkCard study={catchup} layout="feature" />
            <WorkCard study={swipers} layout="wide" />
            <div className="grid gap-6 md:grid-cols-2">
              <WorkCard study={mod} layout="half" />
              <WorkCard study={tower} layout="half" />
            </div>
          </div>
        </div>
      </MoodSection>

      <MoodSection mood="quiet" aria-labelledby="experience" className="py-14 sm:py-20">
        <div className="page">
          <SectionHeading id="experience">Experience</SectionHeading>
          <ol className="border-t border-line">
            {experience.map((role) => (
              <li key={role.org} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[7rem_1fr] sm:gap-6 lg:grid-cols-[7rem_minmax(0,22rem)_1fr]">
                <p className="text-sm tabular-nums text-muted sm:pt-1">
                  {role.start} to {role.end}
                </p>
                <div>
                  <p className="type-title text-ink">{role.org}</p>
                  <p className="text-sm text-muted">{role.title}, {role.place}</p>
                </div>
                <p className="max-w-prose text-ink/85 sm:col-start-2 lg:col-start-auto">{role.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </MoodSection>

      <MoodSection mood="quiet" aria-labelledby="tools" className="py-14 sm:py-20">
        <div className="page">
          <SectionHeading id="tools" intro="Tools I've built for designers and for myself.">
            Tools and systems
          </SectionHeading>
          <dl className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {tools.map((tool) => (
              <div key={tool.name} className="border-l-2 border-line pl-5">
                <dt className="type-title text-lg text-ink">{tool.name}</dt>
                <dd className="mt-1 text-sm text-muted">{tool.stack}</dd>
                <dd className="mt-3 max-w-prose text-ink/85">{tool.description}</dd>
                {tool.href && (
                  <dd className="mt-3">
                    <Link href={tool.href} className="link text-sm font-medium text-accent">{tool.linkLabel}</Link>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </MoodSection>

      <MoodSection mood="quiet" aria-labelledby="lab" className="py-14 sm:py-20">
        <div className="page">
          <SectionHeading id="lab" intro="Short experiments in input, physics and systems, each built in days. Most are playable in the browser.">
            Lab
          </SectionHeading>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {games.map((game) => (
              <li key={game.slug}>
                <Link href={`/lab/${game.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden rounded-md border border-line bg-surface transition-colors group-hover:border-accent/70">
                    <Image src={game.thumbnail} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                  <p className="type-title mt-3 text-ink">{game.title}</p>
                  <p className="mt-1 text-sm text-muted">{game.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MoodSection>

      <MoodSection mood="contact" sweep="btt" aria-labelledby="contact" className="py-16 sm:py-24">
        <div className="page">
          <h2 id="contact" className="type-heading scroll-mt-20 text-3xl sm:text-4xl">Get in touch</h2>
          <p className="mt-3 max-w-prose text-muted">Email is the fastest way to reach me.</p>
          <a href={`mailto:${profile.email}`} className="type-heading mt-6 inline-block break-all text-2xl text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent sm:text-4xl">
            {profile.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <li><a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className="link" href={profile.links.itch} target="_blank" rel="noopener noreferrer">itch.io</a></li>
            <li><a className="link" href={profile.links.steam} target="_blank" rel="noopener noreferrer">CatchUp on Steam</a></li>
          </ul>
        </div>
      </MoodSection>
    </>
  );
}
