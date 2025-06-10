export type Game = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  buildUrl: string;
};

export const games: Game[] = [
  {
    slug: "spinning-roles",
    title: "Spinning Roles",
    description: "A fun Unity WebGL game demo.",
    tags: ["Unity", "WebGL", "Demo"],
    thumbnail: "/games/spinning-roles/thumb.jpg",
    buildUrl: "/games/spinning-roles/index.html",
  },  
  // Add more games here
]; 