"use client";
import { games } from "@/data/games";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ContentBlock } from "@/components/ContentBlock";
import { useState } from "react";
import useWindowSize, { ScreenType } from "@/hooks/useWindowSize";

type GamePageProps = {
  params: {
    slug: string;
  };
};

export default function GamePage({ params }: GamePageProps) {
  const game = games.find((g) => g.slug === params.slug);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const { screenType } = useWindowSize();
  const isMobile = screenType === ScreenType.MOBILE || screenType === ScreenType.SM;
  
  if (!game) return notFound();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] ">      
      <h1 className="text-3xl font-bold text-gray-300 mb-4">{game.title}</h1>
      {/* <p className="text-gray-600 mb-6 text-center max-w-2xl">{game.description}</p> */}
      {game.buildUrl ? (
      <div className="w-full max-w-6xl aspect-video bg-slate-200 rounded-lg rounded-b-none overflow-hidden shadow-lg p-2">
        {!isGameLoaded ? (
          <div 
            className="w-full h-full min-h-[400px] flex items-center justify-center relative"
            style={{
              backgroundImage: `url(${game.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <button
              onClick={() => setIsGameLoaded(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors relative z-10"
            >
              Play Game
            </button>
          </div>
        ) : (
          <iframe
            src={game.buildUrl}
            title={game.title}
            className="w-full h-full min-h-[400px]"
            allowFullScreen
          />
        )}      
      </div>
      ) : game.externalUrl ? (
        <div className="w-full max-w-6xl aspect-video bg-slate-200 rounded-lg rounded-b-none overflow-hidden shadow-lg p-2">
          <div 
            className="w-full h-full min-h-[400px] flex items-center justify-center relative"
            style={{
              backgroundImage: `url(${game.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <iframe
            src={game.externalUrl}
            title={game.title}
            className="w-full h-full min-h-[400px]"
            allowFullScreen
          />
              
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-slate-200 rounded-lg rounded-b-none overflow-hidden shadow-lg p-2"></div>
      )}
      {/* Content Blocks Section */}
      {game.content && game.content.length > 0 && (
        <div className="w-full max-w-6xl space-y-4 bg-slate-200 p-4 rounded-lg rounded-t-none">
          <div className="flex gap-2 mb-6 flex-wrap justify-start">
          {game.tags.map((tag) => (
            <span key={tag} className="tag bg-blue-100 text-blue-800 border-slate-300 border-2">
              {tag}
            </span>
          ))}
        </div>
          {game.content!.map((block, index) => {
            // Check if this block and the next one should be side by side
            const nextBlock = game.content![index + 1];
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
            if (index > 0 && game.content![index - 1]?.sideBySide && !isMobile) {
              return null;
            }

            return <ContentBlock key={index} block={block} />;
          })}
        </div>
      )}
    </div>
  );
} 