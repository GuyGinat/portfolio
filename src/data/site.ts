// Profile, experience and tools. Copy mirrors CONTENT.md; edit there first.

export const profile = {
  name: "Guy Ginat",
  title: "Game developer and technical director",
  email: "guyginat4@gmail.com",
  intro:
    "Co-founder of Panda Paw, shipping CatchUp on Steam on November 11, 2026.",
  bio:
    "I build the systems games run on: procedural generation, multiplayer netcode, and the tools that let a small team move fast. Before co-founding Panda Paw I led Unity development on a shipped mobile game and spent two years as a full-stack engineer, then earned an MFA in Game Design at NYU.",
  // Set to "/guy-ginat-resume.pdf" once the PDF is in public/.
  resume: null as string | null,
  links: {
    steam: "https://store.steampowered.com/app/4698980",
    linkedin: "https://www.linkedin.com/in/guy-ginat/",
    github: "https://github.com/GuyGinat",
    itch: "https://guyginat.itch.io/",
  },
};

export type Role = {
  org: string;
  title: string;
  start: string;
  end: string;
  place: string;
  summary: string;
};

export const experience: Role[] = [
  {
    org: "Panda Paw",
    title: "Co-founder & Technical Director",
    start: "2026",
    end: "Now",
    place: "New York",
    summary:
      "Funded five-person indie studio. I own the tech: Photon Fusion netcode, Steamworks, the build and release pipeline, telemetry, crash reporting and the studio's Unity tooling.",
  },
  {
    org: "City Hive",
    title: "Senior Software Engineer",
    start: "2025",
    end: "2026",
    place: "New York",
    summary: "Build and release pipeline behind about 5,000 white-label commerce apps.",
  },
  {
    org: "NYU Game Center",
    title: "MFA in Game Design, Graduate Teaching Assistant",
    start: "2023",
    end: "2025",
    place: "Brooklyn",
    summary: "Mentored students in game design and development and ran Unity and systems-design workshops.",
  },
  {
    org: "NOVOS Games",
    title: "Unity Lead Developer",
    start: "2022",
    end: "2023",
    place: "Tel Aviv",
    summary:
      "Led development of a casual asynchronous-multiplayer mobile game with a team of 10: core gameplay, backend networking, analytics, Addressables, tooling and UI. Hired and onboarded the developers.",
  },
  {
    org: "Picafuel",
    title: "Full Stack Developer",
    start: "2020",
    end: "2022",
    place: "Tel Aviv",
    summary:
      "Fleet-management SaaS in React, Node.js, Flask and Elasticsearch. Built a campaigns engine for driver promotions and an automated migration system that onboarded clients' millions of records.",
  },
  {
    org: "Reichman University",
    title: "BSc in Computer Science, Zell Entrepreneurship Program",
    start: "2016",
    end: "2020",
    place: "Herzliya",
    summary: "Co-founded Paladin, a startup protecting children in online games, in the Zell program's venture track.",
  },
];

export type Tool = {
  name: string;
  description: string;
  stack: string;
  href?: string;
  linkLabel?: string;
};

export const tools: Tool[] = [
  {
    name: "Midas narrative pipeline",
    description:
      "Engine, dialogue runtime and tooling for a narrative radio game, built around the designer's workflow. The script lives in a Google Sheet, a web graph editor edits it, and one runtime runs identically in Unity and Godot, kept in lockstep by a shared test fixture.",
    stack: "C#, Unity, Godot, TypeScript",
  },
  {
    name: "dialogue-graph",
    description:
      "A web editor that renders a Google Sheet as a live dialogue graph. Edits write straight back to the sheet, with in-tool playtesting and a validated export for the game.",
    stack: "Next.js, React Flow, Google Sheets API",
  },
  {
    name: "Studio editor tooling",
    description:
      "Unity tools for Panda Paw: a gizmo control overlay, an inspector component filter, a MIDI tuner for adjusting gameplay values with physical knobs in play mode, and scene capture for marketing art.",
    stack: "C#, Unity editor",
  },
  {
    name: "Unity editor scripts",
    description: "Small public scripts: anchor UI to its rect, mesh utilities, and a reflection-based API docs generator.",
    stack: "C#, Unity editor",
    href: "/tools/unity-tools",
    linkLabel: "Read and download",
  },
  {
    name: "Star Chart",
    description: "A zoomable, animated presentation tool built in Unity. The talk it hosts looks at diegetic UI in Pacific Drive.",
    stack: "C#, Unity",
    href: "/tools/star-chart",
    linkLabel: "Open the presentation",
  },
];
