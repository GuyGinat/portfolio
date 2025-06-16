import { ContentBlock } from '@/types/content';

export type Game = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  buildUrl?: string;
  content?: ContentBlock[];  // Optional array of content blocks
};

const textStyle = {
  backgroundColor: 'white',
  textColor: 'black',
  borderRadius: 5,
  padding: 15,
}

export const games: Game[] = [
  {
    slug: "belgrad",
    title: "Belgrad Park",
    description: "A fun Unity WebGL game demo.",
    tags: ["First Person", "Horror", "Puzzle", "Experimental"],
    thumbnail: "/images/belgrad/belgrad-cover.png",
    // buildUrl: "/games/spinning-roles/index.html",
    content: [
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=_2fwRaqJtes",
        referenceText: "A video that a very kind player made and posted on our itch page",
        sideBySide: true,
        minWidth: 500,
      },
      {
        type: "text",
        content: "Belgrad Park is a proof-of-concept project exploring a real-time-play horror game in a confined space. You are a true-crime podcaster investigating an abandoned Ranger Station in upstate New York where, twenty years ago, three park employees mysteriously vanished. In search of evidence that might bring this cold case back to life, you broke into the park for an overnight investigation and found yourself trapped in a never-ending time loop. Can you survive, escape the station, and uncover the terrible truth about what happened all those years ago?",
        style: textStyle
      },
      {
        type: "text",
        content: "The game was made in collaboration with the incredibley talented Amanda and Oyku!",
        style: textStyle,
        links: [
          {
            text: "Amanda",
            url: "https://mandap.itch.io/"
          },
          {
            text: "Oyku",
            url: "https://oykuyamako.itch.io/"
          }
        ]
      },
      {
        type: "text",
        content: "Build is available to download on itch.io",
        style: textStyle,
        links: [
          {
            text: "itch.io",
            url: "https://guyginat.itch.io/belgrad-park"
          }
        ]
      },
    ]
  },
  {
    slug: "spinning-roles",
    title: "Spinning Roles",
    description: "A fun Unity WebGL game demo.",
    tags: ["Physics", "Puzzle"],
    thumbnail: "/games/spinning-roles/thumb.jpg",
    buildUrl: "/games/spinning-roles/index.html",
    content: [
      {
        type: "text",
        content: "Spinning Roles is my submission to the 2022 GMTK Game Jam.\nBuilt around the theme of Roll Of The Dice.\n\nI wanted to build a game that does not use the classical definition of a dice, utilizing mechanics of randomness, but rather focus on what happens when the dice rolls, resulting in a gravity based 3D puzzle game",
        style: textStyle
      },
      {
        type: "image",
        url: "/images/spinning/roles-gif.gif",
        alt: "Spinning Roles",
        sideBySide: true,
        minHeight: 275,
        minWidth: 200,
      },
      {
        type: "image",
        url: "/images/spinning/roles3.PNG",
        alt: "Spinning Roles",
        minHeight: 275,
        minWidth: 200,
      }
    ]
  },
  {
    slug: "jjj",
    title: "Jiggle Jaggle Juggling",
    description: "A fun Unity WebGL game demo.",
    tags: ["Physics", "Juggling"],
    thumbnail: "/games/jjj/jjj-cover.jpg",
    buildUrl: "/games/jjj/index.html",
    content: [
      {
        type: "text",
        content: "Trying to simulate the physics of real life juggling, I built this game in an attempt to try an make an accurate representation of the hand movement and cognitive overload of juggling.\n\nMy advice when playing this (also when juggling) is to try and release balls at the peak of the height of the ball that is currently in the air, other then that this is just very hard, like juggling!",
        style: textStyle
      },
      
    ]
  },
  {
    slug: "pusher",
    title: "Pusher",
    description: "A fun Unity WebGL game demo.",
    tags: ["Multiplayer"],
    thumbnail: "/games/pusher/Pusher.png",
    buildUrl: "/games/pusher/index.html",
    content: [
      {
        type: "text",
        content: "Pusher is an experiment with same screen multiplayer with different control schemes, I wanted to make a game that you can pick up and play with a friend without any learning curve, trying to make it as polished as possible within a small time frame.\n\nTry playing the game with one player on a keyboard and the other with a controller (you can also do whatever 2 control schemes you want)",
        style: textStyle
      },
      
    ]
  },  
  {
    slug: "berto",
    title: "Berto",
    description: "A fun Unity WebGL game demo.",
    tags: ["Rage", "Keyboard Only", "Not Typing", "But Similar"],
    thumbnail: "/games/berto/berto.jpg",
    buildUrl: "/games/berto/index.html",
    content: [
      {
        type: "text",
        content: "Note: This game was made a couple of years ago and the unity web build from that time broke the build a bit, here is an itch windows build if you want to experience it as intended, but if you just want to see the mechanic in the game the web build is playable and functional",
        style: {...textStyle, backgroundColor: '#552222', textColor: 'white'},
        links: [
          {
            text: "itch",
            url: "https://guyginat.itch.io/berto"
          }
        ]
      },
      {
        type: "text",
        content: "Berto is a game where you control a small pink thing, moving him across pillars that correspond to keyboard keys, crossing difficult keyboard traversing gauntlets and badass boss fights.The idea came from trying to utilize the whole keyboard, making it some sort of playground for your fingers.\n\nIt is also the first game I made completely by myself, including sound and art, and I am very proud of myself for that.",
        style: textStyle
      },
      {
        type: "image",
        url: "/images/berto/berto1.png",
        alt: "Spinning Roles",
        sideBySide: true,
        minHeight: 275,
        minWidth: 200,
      },
      {
        type: "image",
        url: "/images/berto/berto2.png",
        alt: "Spinning Roles",
        minHeight: 275,
        minWidth: 200,
      }
    ]
  },  
  // Add more games here
]; 