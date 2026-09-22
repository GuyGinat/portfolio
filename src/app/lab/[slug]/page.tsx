import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockList, ContentBlock } from "@/components/ContentBlock";
import { DetailShell } from "@/components/DetailShell";
import { games } from "@/data/games";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = games.find((g) => g.slug === params.slug);
  return game ? { title: game.title, description: game.description } : {};
}

export default function LabPage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) notFound();

  return (
    <DetailShell back="/#lab" backLabel="All lab projects" title={game.title} description={game.description} tags={game.tags}>
      {game.buildUrl && (
        <ContentBlock block={{ type: "build", url: game.buildUrl, thumbnail: game.thumbnail, referenceText: game.title, minHeight: 560 }} />
      )}
      {game.externalUrl && (
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-md border border-line bg-scene">
          <iframe src={game.externalUrl} title={game.title} className="absolute inset-0 h-full w-full" allowFullScreen />
        </div>
      )}
      {game.links && (
        <div className="mb-10 flex flex-wrap gap-3">
          {game.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn">{l.label}</a>
          ))}
        </div>
      )}
      {game.content && (
        <div className="rounded-md border border-line bg-surface/90 px-5 py-8 backdrop-blur-sm sm:px-10">
          <BlockList blocks={game.content} />
        </div>
      )}
    </DetailShell>
  );
}
