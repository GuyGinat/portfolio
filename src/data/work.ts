// Featured case studies. Copy mirrors CONTENT.md section 3; edit there first.

export type Media =
  | { kind: "video"; src: string; poster: string; alt: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "pipeline" } // Swipers level-gen schematic
  | { kind: "slots" }; // Local Multi-Control character strip

export type CaseStudy = {
  slug: string;
  title: string;
  fullTitle?: string;
  summary: string;
  tint: string; // background grid tint while the card is hovered
  role: string;
  team?: string;
  timeline: string;
  stack: string[];
  links: { label: string; href: string }[];
  cover: Media;
  overview: string[];
  built: { title: string; body: string }[];
  result: string;
  gallery?: { src: string; poster: string; caption: string }[];
  note?: string;
};

export const work: CaseStudy[] = [
  {
    slug: "catchup",
    title: "CatchUp",
    fullTitle: "Mr. Daruma's CatchUp Showdown",
    summary:
      "An online co-op climbing game about catching. I lead the tech: netcode, Steam, the release pipeline and live-ops.",
    tint: "#d9b33a",
    role: "Co-founder & Technical Director",
    team: "Panda Paw, 5 people: two engineers, art, tech art, animation",
    timeline: "July 2026 to launch on November 11, 2026",
    stack: ["Unity 6", "C#", "Photon Fusion 2", "FMOD", "Steamworks", "Firebase"],
    links: [{ label: "Wishlist on Steam", href: "https://store.steampowered.com/app/4698980" }],
    cover: { kind: "video", src: "/media/catchup/loop.mp4", poster: "/media/catchup/poster.jpg", alt: "CatchUp gameplay: catching, throwing and climbing a tower of arenas" },
    overview: [
      "CatchUp is an online co-op game where players climb a tower of increasingly strange catching challenges together, and fall a long way when it goes wrong.",
      "It grew out of the studio's first project, Swipers, reusing its networking, player, audio and platform layers, and went from pitch to a public Steam demo in about two months.",
    ],
    built: [
      {
        title: "Netcode",
        body: "Host-authoritative Photon Fusion 2 with client-predicted physics. The world is a pure function of two networked values, a seed and the climb progress, so a late joiner rebuilds the whole scene from a few bytes. I led the client-stutter work: rendering remote players in their own timeframe, scheduling collider drops and hazards on the network tick, and cutting per-player state by about a quarter.",
      },
      {
        title: "Release pipeline",
        body: "One command takes a Plastic SCM changeset to a versioned Unity build, compresses and uploads it, pushes it to a Steam branch and posts it to the team's Discord.",
      },
      {
        title: "Live-ops foundations",
        body: "Opt-out telemetry feeding a private backoffice of live rooms and sessions. Crash reporting with build-tagged breadcrumbs and Discord alerts. Steam achievements, cloud save and leaderboards. Controller support, rebinding and localization.",
      },
      {
        title: "Gameplay systems",
        body: "The player movement rework, scoring, and the original catch and throw tech the game is built on.",
      },
    ],
    result: "Steam demo live since August 31, 2026. Steam Next Fest, October 19 to 26. Full launch on November 11, 2026.",
    gallery: [
      { src: "/media/catchup/g1_daruma_catch.mp4", poster: "/media/catchup/g1_daruma_catch.jpg", caption: "Catching Mr. Daruma's throw" },
      { src: "/media/catchup/g4_ring_throw.mp4", poster: "/media/catchup/g4_ring_throw.jpg", caption: "Ring throw" },
      { src: "/media/catchup/g5_slide_catch.mp4", poster: "/media/catchup/g5_slide_catch.jpg", caption: "Slide catch" },
      { src: "/media/catchup/g2_climb_cracks.mp4", poster: "/media/catchup/g2_climb_cracks.jpg", caption: "Climbing a cracking wall" },
      { src: "/media/catchup/g6_gold_shatter.mp4", poster: "/media/catchup/g6_gold_shatter.jpg", caption: "Gold ball shatter" },
      { src: "/media/catchup/g7_tower_lookup.mp4", poster: "/media/catchup/g7_tower_lookup.jpg", caption: "The tower from the bottom" },
    ],
  },
  {
    slug: "swipers",
    title: "Swipers level generation",
    summary:
      "A deterministic, network-synced generator that grows whole facilities from one seed, with a workbench designers drive.",
    tint: "#b88746",
    role: "Technical Director, lead author of the level generator",
    team: "Panda Paw",
    timeline: "March to June 2026. The game was cancelled; the tech carried into CatchUp.",
    stack: ["Unity 6", "C#", "Photon Fusion 2"],
    links: [],
    cover: { kind: "image", src: "/media/swipers/cover.jpg", alt: "Swipers title screen: a lobby console in a cluttered facility corridor" },
    overview: [
      "Swipers was Panda Paw's first game: a physics-heavy co-op heist where players raid procedurally generated facilities while a teammate guides them from the van. We pivoted to CatchUp in June 2026.",
      "The level generator is the part I'm proudest of. It is about 43,000 lines of runtime code and 11,000 lines of editor tooling.",
    ],
    built: [
      {
        title: "A network-first pipeline",
        body: "The first version placed rooms and squeezed corridors through what was left, which produced mazes rather than buildings. I rewrote it top down: special halls first, most constrained first, then regular halls, perimeter loop corridors, attached rooms, and finally hallways connected by a spanning tree plus loops and routed with A*. Sixteen named stages take a level from empty grid to packaged result.",
      },
      {
        title: "One data structure at every scale",
        body: "Layouts are stored as a doubly connected edge list, where every wall is two half-edges, one for each side. The same graph, per room and level-wide, drives maze carving (depth-first, Prim and Kruskal), occlusion zones, guard hearing and pathfinding.",
      },
      {
        title: "Deterministic multiplayer",
        body: "The host sends a single integer. Every player builds identical geometry from salted random streams, and only the host spawns networked items. A failed seed retries automatically, and a curated cache holds pre-validated seeds.",
      },
      {
        title: "Performance",
        body: "Layout runs on a background thread, instantiation is chunked under an 8 ms per-frame budget, and the navmesh bakes asynchronously afterwards.",
      },
      {
        title: "Designer control",
        body: "Placement rules (near or far, required or preferred, boundary sides), weighted pools in ScriptableObjects, and a Level Workbench editor with a live 2D layout preview, a seed curator, room scaffolding, decoration tools, validation, gizmo overlays and a loot-economy simulator that runs across many seeds.",
      },
    ],
    result:
      "It generated every level in Swipers playtests. Its data types and seed-determinism model now underpin CatchUp's world.",
    note: "The diagram is a schematic of the pipeline order, not a generated level.",
  },
  {
    slug: "local-multi-control",
    title: "Local Multi-Control",
    summary:
      "A Slay the Spire 2 mod that lets one player drive up to 12 characters through the game's real multiplayer pipeline.",
    tint: "#8a5cd6",
    role: "Maintainer since July 2026",
    timeline: "July 2026 to now",
    stack: ["C#", ".NET 9", "Godot 4.5", "HarmonyX", "Steam Workshop"],
    links: [
      { label: "Steam Workshop", href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3772900244" },
      { label: "Source on GitHub", href: "https://github.com/GuyGinat/STS2_DualRoleAdventure" },
    ],
    cover: { kind: "slots" },
    overview: [
      "Local Multi-Control lets one person play Slay the Spire 2's multiplayer mode alone, controlling 2 to 12 characters on one machine and switching between them with Tab.",
      "I took over maintenance from the original author, with their permission, and keep it working across the game's frequent beta patches.",
    ],
    built: [
      {
        title: "Patch adaptation",
        body: "A repeatable workflow for every game update: decompile the new build, diff it against the last one, and sweep every string-based reflection target so nothing silently breaks.",
      },
      {
        title: "Fixes and features",
        body: "Reward merging across characters, input and overlay fixes, an opt-in cross-character card reward, and minimum-version gating so players on an unsupported game build get a clear message instead of a crash.",
      },
      {
        title: "Release management",
        body: "Versioned releases through v1.33, a public issue tracker, and Workshop metadata in English and Chinese for the mod's two main audiences.",
      },
    ],
    result: "Live on the Steam Workshop with 445 subscribers and 113 favorites.",
  },
  {
    slug: "tower",
    title: "Tower",
    summary:
      "A year of design research into radial grids: six prototypes, a laser-cut board and a Playdate game.",
    tint: "#3f9a82",
    role: "Solo designer and developer",
    timeline: "2024 to 2025",
    stack: ["Unity", "C#", "FMOD", "Playdate SDK (Lua)", "Illustrator scripting"],
    links: [{ label: "Download the exhibition build", href: "https://guyginat.itch.io/tower" }],
    cover: { kind: "image", src: "/images/tower/TowerBgSm.png", alt: "Tower: a radial grid of rings and segments" },
    overview: [
      "One question for a year: what games does a radial grid want to be? I built a reusable framework for grids of rings and segments that rotate, push and pull, then used it to prototype across genres.",
      "The write-up below is the design diary. Most of the prototypes are playable in the browser on a desktop.",
    ],
    built: [
      { title: "The framework", body: "Rings, segments, walls, rotation and push or pull operations, with generation from a handful of parameters. Later packaged as a standalone Unity library." },
      { title: "Six prototypes", body: "A roguelike, a Nurikabe constraint puzzle, an action game, a tactics game, Tetris, and a small level editor." },
      { title: "Off the screen", body: "An Illustrator script that generates the exact geometry for a laser-cut wooden board with rotating rings, and a Playdate game played with the crank." },
    ],
    result: "Developed during my MFA at the NYU Game Center and shown as an exhibition build.",
  },
];

export const getCase = (slug: string) => work.find((w) => w.slug === slug);
