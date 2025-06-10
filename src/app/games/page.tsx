import { games } from "@/data/games";
import Link from "next/link";
import Image from "next/image";

export default function GamesPage() {
  return (
    <div>
      <div className="container-custom py-12">
        <h1 className="section-title">Game Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="card group transform hover:-translate-y-1 transition-all duration-200"
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{game.title}</h3>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <div className="flex gap-2 flex-wrap">
                {game.tags.map((tag) => (
                  <span key={tag} className="tag bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 