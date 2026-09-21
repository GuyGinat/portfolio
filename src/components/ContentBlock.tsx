"use client";
import Image from "next/image";
import type { ContentBlock as ContentBlockType } from "@/types/content";
import dynamic from "next/dynamic";
import { useState } from "react";

// The syntax highlighter is heavy and only a few pages show code.
const CodeBlock = dynamic(() => import("./CodeBlock").then((m) => m.CodeBlock), { ssr: false });

interface ContentBlockProps {
  block: ContentBlockType;
  isSideBySide?: boolean;
}

// Older content marks callouts with a dark red background; everything else
// renders as plain text on the page surface.
const isCallout = (block: ContentBlockType) =>
  !!block.style?.backgroundColor && block.style.backgroundColor !== "white";

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="mt-2 text-sm text-muted">{text}</p>;
}

function TextWithLinks({ text, links }: { text: string; links?: ContentBlockType["links"] }) {
  if (!links || links.length === 0) return <>{text}</>;
  const parts: (string | JSX.Element)[] = [];
  let last = 0;
  links.forEach((link, i) => {
    const at = text.indexOf(link.text, last);
    if (at === -1) return;
    if (at > last) parts.push(text.slice(last, at));
    parts.push(
      link.isDownload ? (
        <a key={i} href={link.url} download={link.fileName} className="link text-ink">{link.text}</a>
      ) : (
        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link text-ink">{link.text}</a>
      ),
    );
    last = at + link.text.length;
  });
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Build({ block }: { block: ContentBlockType }) {
  const [loaded, setLoaded] = useState(false);
  const box = { minHeight: block.minHeight ?? 420, maxHeight: block.maxHeight };
  return (
    <figure className="mb-10">
      <div className="relative w-full overflow-hidden rounded-md border border-line bg-scene" style={box}>
        {loaded ? (
          <>
            <iframe
              src={block.url}
              title={block.referenceText || block.alt || "Playable build"}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
            />
            <button onClick={() => setLoaded(false)} className="btn absolute right-3 top-3 text-sm">
              Stop
            </button>
          </>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${block.thumbnail || "/images/tower/tower.png"})` }}
          >
            <div className="absolute inset-0 bg-scene/60" />
            <button onClick={() => setLoaded(true)} className="btn-primary relative">
              Play {block.referenceText || "the build"}
            </button>
          </div>
        )}
      </div>
      <Caption text={loaded ? "Runs best on a desktop browser, full screen." : undefined} />
    </figure>
  );
}

export function ContentBlock({ block, isSideBySide = false }: ContentBlockProps) {
  const flex = isSideBySide ? "flex-1 min-w-0" : "";
  const spacing: React.CSSProperties = {};
  if (block.style?.marginTop && block.style.marginTop > 40) spacing.marginTop = "3rem";

  switch (block.type) {
    case "text":
      if (isCallout(block)) {
        return (
          <div className={`mb-8 rounded-md border-l-2 border-accent bg-surface/90 p-4 ${flex}`} style={spacing}>
            <p className="whitespace-pre-line text-ink/90">
              <TextWithLinks text={block.content || ""} links={block.links} />
            </p>
          </div>
        );
      }
      return (
        <div className={`mb-8 ${flex}`} style={spacing}>
          {block.title && <h2 className="type-heading mb-3 mt-6 text-2xl">{block.title}</h2>}
          <p className="max-w-prose whitespace-pre-line text-ink/90">
            <TextWithLinks text={block.content || ""} links={block.links} />
          </p>
        </div>
      );

    case "image":
      return (
        <figure className={`mb-8 ${flex}`}>
          <div
            className="relative w-full overflow-hidden rounded-md border border-line bg-scene"
            style={{ height: block.minHeight ?? 300, maxHeight: block.maxHeight }}
          >
            <Image src={block.url!} alt={block.alt || ""} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
          </div>
          <Caption text={block.referenceText} />
        </figure>
      );

    case "video": {
      const youtube = block.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
      return (
        <figure className={`mb-8 ${flex}`}>
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-line bg-scene">
            {youtube ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtube[1]}`}
                title={block.referenceText || "Video"}
                className="absolute inset-0 h-full w-full"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={block.url} className="absolute inset-0 h-full w-full" controls preload="metadata" />
            )}
          </div>
          <Caption text={block.referenceText} />
        </figure>
      );
    }

    case "build":
      return <div className={flex}><Build block={block} /></div>;

    case "code":
      return (
        <figure className={`mb-8 ${flex}`}>
          {block.title && <h3 className="type-title mb-2">{block.title}</h3>}
          <CodeBlock codeFile={block.codeFile!} language={block.language} startLine={block.startLine} endLine={block.endLine} />
          <Caption text={block.referenceText} />
        </figure>
      );

    case "download":
      return (
        <div className={`mb-8 flex items-center justify-between gap-4 rounded-md border border-line bg-surface/90 p-4 ${flex}`}>
          <div>
            {block.title && <p className="font-semibold">{block.title}</p>}
            <p className="text-sm text-muted">{[block.fileType, block.fileSize].filter(Boolean).join(", ")}</p>
          </div>
          <a href={block.url} download={block.fileName} className="btn">Download</a>
        </div>
      );

    case "list":
      return (
        <div className={`mb-8 prose-case ${flex}`}>
          {block.title && <h2>{block.title}</h2>}
          {block.subheading && <h3 className="!mt-0">{block.subheading}</h3>}
          <ul>
            {block.items?.map((item, i) => (
              <li key={i}><TextWithLinks text={item} links={block.links} /></li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

// Renders a list of blocks, pairing any block marked sideBySide with the one after it.
export function BlockList({ blocks }: { blocks: ContentBlockType[] }) {
  const out: JSX.Element[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1];
    if (block.sideBySide && next) {
      out.push(
        <div key={i} className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <ContentBlock block={block} isSideBySide />
          <ContentBlock block={next} isSideBySide />
        </div>,
      );
      i++;
    } else {
      out.push(<ContentBlock key={i} block={block} />);
    }
  }
  return <>{out}</>;
}
