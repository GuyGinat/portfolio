import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockList } from "@/components/ContentBlock";
import { DetailShell } from "@/components/DetailShell";
import { techs } from "@/data/techs";

export function generateStaticParams() {
  return techs.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = techs.find((t) => t.slug === params.slug);
  return tool ? { title: tool.title, description: tool.description } : {};
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = techs.find((t) => t.slug === params.slug);
  if (!tool) notFound();

  return (
    <DetailShell back="/#tools" backLabel="All tools" title={tool.title} description={tool.description} tags={tool.tags}>
      <div className="rounded-md border border-line bg-surface/90 px-5 py-8 backdrop-blur-sm sm:px-10">
        <BlockList blocks={tool.content} />
      </div>
    </DetailShell>
  );
}
