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
  {
    slug: "jjj",
    title: "Jiggle Jaggle Juggling",
    description: "A fun Unity WebGL game demo.",
    tags: ["Unity", "WebGL", "Demo"],
    thumbnail: "/games/jjj/jjj-cover.jpg",
    buildUrl: "/games/jjj/index.html",
  },
  {
    slug: "pusher",
    title: "Pusher",
    description: "A fun Unity WebGL game demo.",
    tags: ["Unity", "WebGL", "Demo"],
    thumbnail: "/games/pusher/DamnPusher.png",
    buildUrl: "/games/pusher/index.html",
  },  
  {
    slug: "berto",
    title: "Berto",
    description: "A fun Unity WebGL game demo.",
    tags: ["Unity", "WebGL", "Demo"],
    thumbnail: "/games/berto/berto.jpg",
    buildUrl: "/games/berto/index.html",
  },  
  // Add more games here
]; 