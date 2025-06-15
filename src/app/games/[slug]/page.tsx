"use client";
import { games } from "@/data/games";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ContentBlock } from "@/components/ContentBlock";
import { useState } from "react";

type GamePageProps = {
  params: {
    slug: string;
  };
};

export default function GamePage({ params }: GamePageProps) {
  const game = games.find((g) => g.slug === params.slug);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  
  if (!game) return notFound();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">{game.title}</h1>
      <p className="text-gray-600 mb-6 text-center max-w-2xl">{game.description}</p>
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {game.tags.map((tag) => (
          <span key={tag} className="tag bg-blue-100 text-blue-800">
            {tag}
          </span>
        ))}
      </div>
      <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-6">
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

      {/* Content Blocks Section */}
      {game.content && game.content.length > 0 && (
        <div className="w-full max-w-4xl mt-12 space-y-8">
          {game.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>
      )}
    </div>
  );
} 