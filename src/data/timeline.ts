export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  direction: "up" | "down";
  gamesPlayed?: { title: string; image?: string }[];
  gamesMade?: { title: string; image?: string }[];
  image?: string;
};

export const timeline: TimelineEvent[] = [
  {
    year: "2010",
    title: "Discovered Portal 2",
    description: "Played Portal 2 and fell in love with puzzle games.",
    direction: "up",
    gamesPlayed: [
      { title: "Portal 2", image: "/timeline/portal2.jpg" },
    ],
  },
  {
    year: "2012-2015",
    title: "Started Making Games",
    description: "Began experimenting with game engines and made my first platformer.",
    direction: "down",
    gamesMade: [
      { title: "First Platformer", image: "/timeline/platformer.jpg" },
    ],
  },
  {
    year: "2012-2015",
    title: "Started Making Games",
    description: "Began experimenting with game engines and made my first platformer.",
    direction: "down",
    gamesMade: [
      { title: "First Platformer", image: "/timeline/platformer.jpg" },
    ],
  },
  {
    year: "2018",
    title: "Unity Projects",
    description: "Released my first Unity WebGL game online.",
    direction: "up",
    gamesMade: [
      { title: "WebGL Demo", image: "/timeline/webgldemo.jpg" },
    ],
  },
  // Add more events as desired
]; 