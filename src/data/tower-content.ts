import type { ContentBlock } from "@/types/content";

export const towerContent: ContentBlock[] = [
  {
    type: 'text',
    title: 'Introduction',
    content: "For a long time I have been infatuated with systemic games, as a kid I played mostly games that were focused on systems, more than just systems, I really like grids (as you may have noticed from this website). They seem to fit very well with games as they offer a set of constraints by default, proximity and distance are discrete singular numbers, rows and columns have a unique relationship between each other and within themselves that doesn't exist in a continuous space and they offer tactility that lands itself well to turn based game design."
  },
  {
    type: 'text',
    content: ' When I started making games I was drawn into making grid based games (some of them you can play here!), after making a couple I wanted to mix things up, the thought was \"lets try and make a grid, but circle!\" and off we were to the races, resulting in this:'
  },
  {
    type: 'image',
    url: '/images/tower/tower.png',
    alt: 'Tower',
    minHeight: 300,
    sideBySide: true,
    referenceText: 'Tower'
  },
  {
    type: 'text',
    content: "No game yet, just a radial grid, or more accurately a way to create radial grids, by defining how many rings and how many segments each ring has, functionalities to rotate rings and push / pull segments, place walls between them and a bunch of other things.\n\nAnd, the start of my maddening trip over finding what is interesting about this thing. So lets take a look at some of the games I tried to make with this system."
  },
  {
    type: 'text',
    content: "A note before we start: play these in full screen on a desktop (phones aren't supported). Some have sound, some don't, and all of them are prototypes.\n\nThere is also a museum-style exhibition build of the whole project that you can download here.",
    style: {
      marginBottom: 100,
      backgroundColor: '#552222',
      textColor: 'white',
      borderRadius: 10,
      padding: 15,
    },
    links: [
      {
        text: 'download here',
        url: 'https://guyginat.itch.io/tower',
      }
    ]
  },
  {
    title: 'Rogue',
    type: 'text',
    content: "Welcome to our first attempt at a game. The thought was to make this strategic game where you have to collect a key (which is represented by a green sphere) and then reach some exit, it is mostly inspired by the original Rogue game."
  },

  {
    type: 'image',
    url: '/images/tower/rogue.jpg',
    alt: 'Rogue',
    minHeight: 200,
    sideBySide: true,
    referenceText: 'Rogue, 1980, developed by A.I. Design'
  },
  {
    type: 'text',
    content: "Each level was a random configuration of walls, enemies and keys. This project was abandoned pretty fast, there were a bit too many other ideas flowing through my mind when I started this and I wanted to get it right on first try for some reason. But the core of the radial grid system is there and looks kinda cool, it has walls, rotating rings, and things moving on it."
  },
  {
    title: 'Nurikabe',
    type: 'text',
    sideBySide: true,
    content: "Round 2\nThis one was not supposed to be a start of a full game I wanted to make, but more of an experiment to see how a constraint game would feel on this grid.\nI've been decompressing with a bunch of sudoku and other constraint games, so I thought it would be fun to try and make one.\nWhen I was done with this one I realized something that broke my spirit (just a bit), a radial grid is exactly the same as a square grid, if you just allow wrapping around.\nBut! The perspective shift is still interesting, perhaps just having a different view on something is meaningful enough to justify using a radial grid rather than a square one, even though this game is basically a classic Nurikabe puzzle the wrap around changes how the code with constraints works on this resulting in different puzzles and a different way to think of solutions"
  },
  {
    type: 'image',
    url: '/images/tower/nurikabe.png',
    alt: 'Nurikabe',
    minHeight: 400,
    referenceText: 'Nurikabe'
  },
  {
    type: 'build',
    url: '/games/tower/nurikabe/index.html',
    alt: 'Tower',
    minHeight: 500,
    referenceText: 'Nurikabe'
  },
  {
    title: 'Action Game',
    type: 'text',
    content: "Grids by nature are very tactile and strategic. When you think about the previous two games that I showed you, they pretty much all have this slow paced play by play gameplay loop to them.\nI got frustrated that all the games I have been attempting were slow paced and took place on the grid, so I wanted to take a different direction, an action game that uses the grid as a supporting system rather than the actual game.\nSo here you move around trying not to die by hitting these red triangles, the grid controls which of your items get activated, helping you take out the triangles on a steady rhythm, whenever you take out enough enemies you get to choose a new item to place on your grid."
  },
  {
    type: 'build',
    url: '/games/tower/Action/index.html',
    alt: 'Tower',
    minHeight: 500,
    minWidth: 200,
    referenceText: 'Action Game'
  },
  {
    type: 'text',
    content: "Now I am starting to get this feeling that the game is fun, but I am just stuck trying to think about more games. This is a cool idea, and it plays well, but I just want to move on to the next thing and make another game. The notion that there is some perfect concept out there that I am missing out on is sitting in the back of my mind, just not letting go."
  },
  {
    title: 'Quick Music Break',
    type: 'text',
    sideBySide: true,
    content: "That game came after I was thinking for a while about how rhythm connects with circles. Probably the first prototype I made with this system was a shot at a rhythm game, I am showing a video here since I never got to making a playable game out of this idea but I still very much find some cool things about this, it uses the Guitar Hero file format to activate each segment in the grid based on a different color for an instrument, in this video it is just the drums.\nThe idea that most of modern western music is built on repetitive divisions of 2 works well on a rotating grid that I can split and multiply looks like a promising vision for a rhythm game."
  },
  {
    type: 'video',
    url: '/videos/musicPrototype.mp4',
    alt: 'Music',
    minHeight: 300,
    minWidth: 400,
    referenceText: 'Song is "Out of the Black" by Royal Blood'
  },
  {
    title: 'Tactics',
    type: 'text',
    content: "This prototype is the one I spent the most time on.\nHeavily inspired by tactical games that have you planning your next move and then executing it. This go around, after making the core mechanics my assumption was that what is holding me back from sticking to working on this game was visuals, it just sucked looking at the same boring grid over and over again, so I thought why not just make the background scene more a bit interesting?\nIt does look cool, and it definitely helped my motivation. You played a warrior surviving a set number of turns while enemies spawned in waves, and you could manipulate the grid itself as an action: rotate a ring, or push and pull a line of segments, then confirm the move. The vibes were right, and it felt more like the actual start of a game than anything before it."
  },
  {
    type: 'text',
    content: "You probably noticed by this point that it is pretty janky, and so early into developing a game I found myself putting out fires everywhere in my code. I had this notion in mind that when it will be the right game it will be easy. I wanted this game to be that, but it was not. It was complicated and messy and I was not having fun, so I decided to move on, make something else.\nWhat do you think?"
  },
  {
    title: 'Tetris',
    type: 'text',
    content: "Welcome to Tetris!\nSo as you can see by now I was working on several different projects while trying to figure out what is this system made for. At some point I was so tired of forcing myself to come up with some brand new brilliant idea with groundbreaking game design, so I just wanted to make a game that already exists. This has been, to my surprise, a very fun project to work on, other than just playing Tetris which is a pretty amazing game, following the blueprint of the original design and just implementing it in my system was an extremely fun experience, maybe I'll just make more clones with my system, we can do breakout, and minesweeper, maybe pacman, and all the other classics."
  },
  {
    type: 'build',
    url: '/games/tower/Tetris/index.html',
    alt: 'Tower',
    minHeight: 700,
    referenceText: 'Tetris'
  },
  {
    title: 'Small Engine',
    type: 'text',
    content: "I was so frustrated from not finding the right game that I just thought about handing it out to other people. Pack everything up in a tool and let somebody else make the \"killer app\" with it, why not?\nI mean there are a bunch of cool little game engines that are very specific and niche out there, this can be another one, I like the tool itself, you can move around if you hit the \"Tab\" button, place objects on the grid and move them. I wanted to add a rule making system so that you can actually make a game on this but never got around to it. What do you think? Would you give this away to someone else? Your own system that you have worked on for over a year just so somebody else can be the \"one that made that cool game on a new system\"."
  },
  {
    type: 'build',
    url: '/games/tower/CreationTool/index.html',
    alt: 'Tower',
    minHeight: 800,
    referenceText: 'Small Game Engine',
    style: {
      marginBottom: 100,
    }
  },
  {
    title: 'Other Experiments',
    type: 'text',
    content: "After all of these I realized that I don't really have a strong urge to make something specific, but just mess around with the radial grid, so here are 2 other experiments I came up with to keep on researching how to make a radial grid game.",
    style: {
      marginBottom: 50,
    }
  },
  {
    title: 'Physical Edition',
    type: 'text',
    sideBySide: true,
    content: "Since I started working on this I really wanted to have a physical manifestation of the system I made, and since I already have the calculus of the system lodged into my brain so hard I knew how to bring this idea into life.\nUtilizing Adobe Illustrator's scripting capabilities to generate a mathematically accurate definition of a radial grid.\nThen, Using a laser cutter I carved up a piece of wood to different rings so that you can physically rotate them one within the other, making a cool physical game board, I made a bunch of other little game pieces and this is the result.",
    minWidth: 200,
    style: {
      flexBasis: '90%',
    }
  },
  {
    type: 'image',
    url: '/images/tower/board.png',
    alt: 'Board',
    minHeight: 375,
    minWidth: 450,
  },
  {
    type: 'code',
    codeFile: '/code/grid_generator.jsx',
    language: 'javascript',
    startLine: 1,
    sideBySide: true,
    endLine: 100,    
    referenceText: 'grid_generator.jsx',
    style: {
      maxWidth: 500,
    }
  },
  {
    type: 'text',
    content: "If you want to try and create your own physical radial grid game board you can modify this code and use it in Illustrator to generate the SVG file that you can then use to cut out the rings. If you just want the resulting file you can download it here. (there are also some basic playing pieces in the download)",
    links: [
      {
        text: 'here',
        url: '/downloads/RadialGridWithHoles.ai',
        isDownload: true,
        fileName: 'RadialGridWithHoles.ai'
      }
    ]
  },  
  {
    type: 'text',
    content: "I would add that there is no game for this yet, but! I am working on it, and I will be sure to update this page when I have something to show.",
    style: {
      marginTop: 1,
      marginBottom: 100,
    }
  },
  {
    title: 'Playdate for the Win',
    type: 'text',
    sideBySide: true,
    content: "I love this little console. I got one a while back and I thought this would be an interesting way to get out of the Unity ecosystem and implement the radial grid on a different game engine, turned out to this cute little game where you use the crank to rotate the rings.\nIf you have a playdate and want to try it out you can download it here and side load it to your playdate.",
    links: [
      {
        text: 'download it here',
        url: '/downloads/BlackHoleVisitorCenter.zip',
        isDownload: true,
        fileName: 'Black Hole Visitor Center.zip'
      }
    ],
    style: {
      marginBottom: 1,
    }
  },
  {
    type: 'image',
    url: '/images/tower/BHVC.png',
    alt: 'Black Hole Visitor Center',
    minHeight: 175,
    minWidth: 400,
  },
  {
    type: 'image',
    url: '/videos/playdate.gif',
    alt: 'Black Hole Visitor Center',
    minHeight: 300,
    minWidth: 500,
    maxHeight: 500,
    maxWidth: 300,
    style: {
      marginTop: 0,
      flexBasis: '10%',
    }
  },
  {
    title: 'Forward',
    type: 'text',
    content: "I'm still working on some of these prototypes, trying to avoid making any more of them so I can find the one that works best both as a fun game and as a project that I feel like I have more control over.\nI hope you enjoyed my little adventure into making sense of everything."
  },
]; 