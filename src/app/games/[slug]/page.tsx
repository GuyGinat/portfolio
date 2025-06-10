import { games } from "@/data/games";
import { notFound } from "next/navigation";
import Image from "next/image";

type GamePageProps = {
  params: { slug: string };
};

export default function GamePage({ params }: GamePageProps) {
  const game = games.find((g) => g.slug === params.slug);
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
        {/* Unity WebGL build iframe */}
        <iframe
          src={game.buildUrl}
          title={game.title}
          className="w-full h-full min-h-[400px]"
          allowFullScreen
        />
      </div>
      <Image
        src={game.thumbnail}
        alt={game.title}
        width={320}
        height={180}
        className="rounded shadow-md mb-4"
      />
    </div>
  );
} 