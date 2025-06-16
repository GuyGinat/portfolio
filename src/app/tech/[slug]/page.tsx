"use client";
import { techs } from "@/data/techs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "@/components/ContentBlock";
import useWindowSize, { ScreenType } from "@/hooks/useWindowSize";

export default function TechPage({ params }: { params: { slug: string } }) {
  const tech = techs.find((t) => t.slug === params.slug);
  const { screenType } = useWindowSize();
  const isMobile = screenType === ScreenType.MOBILE || screenType === ScreenType.SM;

  if (!tech) {
    notFound();
  }

  return (
    <div>
      <div className="container-custom py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-200 rounded-md">  
        <h1 className="text-4xl font-bold mb-4">{tech.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{tech.description}</p>

        <div className="flex gap-2 mb-8">
          {tech.tags.map((tag) => (
            <span key={tag} className="tag bg-indigo-100 text-indigo-800">
              {tag}
            </span>
          ))}
        </div>

        <div className="prose max-w-none">
          {tech.content.map((block, index) => {
            // Check if this block and the next one should be side by side
            const nextBlock = tech.content[index + 1];
            const isSideBySide = block.sideBySide && nextBlock && !isMobile;

            if (isSideBySide) {
              return (
                <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <ContentBlock block={block} isSideBySide={true} />
                  <ContentBlock block={nextBlock} isSideBySide={true} />
                </div>
              );
            }

            // Skip the next block if it was rendered in the side-by-side layout
            if (index > 0 && tech.content[index - 1]?.sideBySide && !isMobile) {
              return null;
            }

            return <ContentBlock key={index} block={block} />;
          })}
        </div>
      </div>
    </div>
  );
} 