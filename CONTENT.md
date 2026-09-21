# Portfolio content: single source of truth

One file for every piece of copy that appears on the site, LinkedIn and the base résumé, so the three never drift apart again.
Edit here first, then propagate. No em dashes anywhere in outward copy.

Items marked **[confirm]** are facts Guy still needs to verify before they go public.

---

## 0. Positioning

**Name:** Guy Ginat
**Title:** Game Developer & Technical Director
**Public email:** guyginat4@gmail.com
**Links:** guyginat.xyz · linkedin.com/in/guy-ginat · github.com/GuyGinat · guyginat.itch.io
**Location:** New York, NY

**One-liner (hero, meta description, social preview):**
> Game developer and technical director. Co-founder of Panda Paw, shipping CatchUp on Steam on November 11, 2026.

**Short bio (hero, 2 sentences):**
> I build the systems games run on: procedural generation, multiplayer netcode, and the tools that let a small team move fast. Before co-founding Panda Paw I led Unity development on a shipped mobile game and spent two years as a full-stack engineer, then earned an MFA in Game Design at NYU.

**Tone rules:** plain, specific, first person on the site, no jokes in headings, no "passionate", numbers only where they are true and public.

---

## 1. LinkedIn

### Headline (≤220 chars)
```
Co-founder & Technical Director at Panda Paw | Shipping CatchUp on Steam, Nov 2026 | Unity · C# · Multiplayer · Procedural Generation | MFA Game Design, NYU
```

### About
```
I'm a game developer who builds the systems underneath the game: procedural generation, multiplayer netcode, build and release pipelines, and the editor tools that let a small team move fast.

Right now I'm co-founder and Technical Director at Panda Paw, a funded indie studio in New York. Our co-op climbing game CatchUp launches on Steam on November 11, 2026. I own the technical side: Photon Fusion networking, the build and Steam deployment pipeline, telemetry and crash reporting, and the studio's Unity tooling. Before CatchUp I built the procedural level generator for our first project, Swipers: a deterministic, network-synced pipeline that grows whole facilities from a single seed.

Before Panda Paw I led Unity development of a live mobile game at NOVOS, worked as a full-stack engineer at Picafuel and City Hive (React, Node, Python, Rails), earned a BSc in Computer Science at Reichman University and an MFA in Game Design at the NYU Game Center.

I also maintain Local Multi-Control, a Slay the Spire 2 mod on the Steam Workshop that lets one player drive up to 12 characters through the game's real multiplayer pipeline.

Portfolio: guyginat.xyz
```

### Experience

**Co-founder & Technical Director** · Panda Paw · Mar 2026 – Present · New York
- Co-founded Panda Paw, a funded five-person indie studio, launching CatchUp, an online co-op climbing game, on Steam on Nov 11, 2026.
- Own the technical stack: Unity 6, Photon Fusion 2 (host-authoritative, client-predicted physics), FMOD, Steamworks (achievements, cloud save, leaderboards, lobbies).
- Built the studio's release pipeline: one-command Unity builds, Plastic SCM changeset versioning, Steam branch deployment, Discord notifications, plus telemetry and crash reporting with build-tagged breadcrumbs.
- Designed and built the procedural level generator for our first title, Swipers (≈54k lines of runtime and editor code): a deterministic, seed-synced pipeline with a designer-facing workbench.
- Shipped the CatchUp Steam demo and took it through Steam Next Fest (Oct 2026).

**Senior Software Engineer** · City Hive · Sep 2025 – Mar 2026 · New York
- Worked on the build and release pipeline behind ~5,000 white-label commerce apps.

**Graduate Teaching Assistant** · NYU Game Center · 2023 – 2025 · Brooklyn *(add to LinkedIn; currently missing)*
- Mentored students in game design and development; ran Unity and systems-design workshops.

**Unity Lead Developer** · NOVOS Games · May 2022 – Sep 2023 · Tel Aviv
- Led development of a casual asynchronous-multiplayer mobile game with an interdisciplinary team of 10.
- Designed and implemented features end to end: core gameplay, backend networking, analytics, Addressables-based content loading, tooling and UI/UX.
- Hired and onboarded the team's developers.
- *(Résumé only, not public: tens of thousands of players in year one, 30% ROAS above industry standard.)*

**Full Stack Developer** · Picafuel · Sep 2020 – May 2022 · Tel Aviv
- Developed and maintained a fleet-management SaaS platform with React, Redux, Node.js, Flask and Elasticsearch.
- Designed a campaigns engine that let clients run driver-facing promotions and engagement flows.
- Built an automated data-migration system that onboarded new clients' millions of records with no manual turnaround.

**Zell Entrepreneurship Program** · Reichman University · Aug 2019 – Jun 2020
- Selected for the program's final-year venture track; co-founded Paladin, a startup protecting children in online games.

### Education
- **MFA, Game Design** · NYU Tisch, Game Center · 2023 – 2025 **[confirm Education section exists on LinkedIn]**
- **BSc, Computer Science** · Reichman University (IDC Herzliya) · 2016 – 2019

### Featured section
1. CatchUp on Steam: https://store.steampowered.com/app/4698980
2. Portfolio: https://guyginat.xyz
3. Local Multi-Control on the Steam Workshop: https://steamcommunity.com/sharedfiles/filedetails/?id=3772900244

### Settings
- Turn off "Open to work".
- Top skills: Unity · C# · Multiplayer Networking · Procedural Generation · Game Design

---

## 2. Site structure

1. **Hero:** name, title, one-liner, short bio. Buttons: Wishlist CatchUp · Résumé (PDF) · Email · GitHub.
2. **Featured work:** four case studies (§3). CatchUp is visually the largest.
3. **Experience:** a compact strip mirroring §1.
4. **Tools & Systems:** §4.
5. **Lab:** §5.
6. **Contact:** email, LinkedIn, GitHub, itch.io.

Delete: `/writing`, `/music`, `/game-dev-journey`, `src/data/timeline.ts`, the "MFA Thesis Project" tag, Super Session, Noteman.

---

## 3. Featured case studies

Each page follows the same header block: **Role · Team · Timeline · Stack · Links**, then Overview → What I built → Result, then media.

### 3.1 CatchUp
- **Role:** Co-founder & Technical Director
- **Team:** Panda Paw, 5 people (2 engineers, art, tech art, animation)
- **Timeline:** Jul 2026 – launch Nov 11, 2026
- **Stack:** Unity 6 · C# · Photon Fusion 2 · FMOD · Steamworks · Firebase
- **Links:** Steam page (wishlist)

**Overview.** CatchUp is an online co-op climbing game about catching: players climb a tower of ever-stranger catching challenges together and fall a long way when it goes wrong. It grew out of the studio's first project, Swipers, reusing its networking, player, audio and platform layers, and went from pitch to Steam demo in about two months.

**What I built**
- **Netcode.** Host-authoritative Photon Fusion 2 with client-predicted physics. The world is a pure function of two networked values, a seed and the climb progress, so late joiners rebuild the whole scene from a few bytes. I led the client-stutter work: rendering proxies in remote time, tick-scheduled collider drops and hazards, and trimming per-player state by about a quarter.
- **Release pipeline.** One command takes a Plastic changeset to a versioned Unity build, compresses and uploads it, pushes it to a Steam branch and announces it on Discord.
- **Live-ops foundations.** Opt-out telemetry (events plus position sampling) feeding a private backoffice of live rooms and sessions; crash reporting with build-tagged breadcrumbs and Discord alerts; Steam achievements, cloud save and leaderboards; controller support, rebinding and localization.
- **Gameplay systems.** Player movement rework, scoring, and the original catch and throw tech.

**Result.** Steam demo live since Aug 31, 2026; Steam Next Fest Oct 19–26; full launch Nov 11, 2026.

**Media:** `/mnt/d/GameDevFootage/trailer_work/CatchUp_GameplayTrailer.mp4` (43 s), `CatchUp_Trailer_Loop_v2.mp4` (hero loop), GIFs `g1_daruma_catch`, `g2_climb_cracks`, `g4_ring_throw`, `g5_slide_catch`, `g6_gold_shatter`, `g7_tower_lookup`, Steam capsule art.

**Do not credit:** the procedural tower (Taylor), crowd, HUD, cosmetics/shop.

### 3.2 Swipers: procedural level generation
- **Role:** Technical Director; lead and primary author of the level generator
- **Team:** Panda Paw
- **Timeline:** Mar – Jun 2026 (project cancelled; tech carried into CatchUp)
- **Stack:** Unity 6 · C# · Photon Fusion 2

**Overview.** Swipers was Panda Paw's first game: a physics-heavy co-op heist where players raid procedurally generated facilities while a teammate guides them from the van. The studio pivoted to CatchUp in June 2026. The level generator is the part I'm proudest of.

**What I built**
- **A network-first pipeline.** The first version placed rooms and squeezed corridors through what was left; it produced mazes, not buildings. I rewrote it top down: special halls first (most-constrained first), then regular halls, perimeter loop corridors, attached rooms, then MST-plus-loops hallway connectivity routed with A*. Sixteen named stages from grid to packaged level.
- **One data structure at every scale.** Layouts are stored as a doubly-connected edge list (every wall is two half-edges, one per side), per room and level-wide. The same graph drives maze carving (DFS, Prim, Kruskal), occlusion zones, guard hearing and pathfinding.
- **Deterministic multiplayer.** The host sends one integer. Every peer builds identical geometry from salted random sub-streams; only the host spawns networked items. Failed seeds retry automatically, and a curated cache holds pre-validated seeds.
- **Performance.** Layout runs on a background thread; instantiation is chunked under an 8 ms per-frame budget, followed by an async NavMesh bake.
- **Designer control.** Placement constraints (near/far, required/preferred, boundary rules), weighted pools in ScriptableObjects, and a **Level Workbench** editor with a live 2D layout preview, a Seed Curator, room scaffolding, decoration tools, validation, gizmo overlays and a loot-economy simulator that runs across many seeds.

**Scale:** ≈43k lines runtime + 11k lines editor tooling.
**Result:** used for every Swipers playtest; its data types and seed-determinism model underpin CatchUp's world.

**Media:** *needs capture*: Level Workbench layout preview regenerating across seeds (GIF), stage-by-stage build of one level, a fly-through. Existing sources: `Recordings/Movie_007..009.mp4` (Apr 2026), `Assets/Docs/LevelGeneration/*.html` presentations and the development-history PDF (diagrams can be lifted from these).

### 3.3 Local Multi-Control (Slay the Spire 2 mod)
- **Role:** Maintainer (inherited the project from its original author in Jul 2026)
- **Stack:** C# · .NET 9 · Godot 4.5 · HarmonyX · Steam Workshop
- **Links:** Workshop · GitHub

**Overview.** A mod that lets one player control 2 to 12 characters in Slay the Spire 2 by driving the game's real multiplayer pipeline locally. I took over maintenance from the original author and keep it working across the game's frequent beta patches.

**What I built:** patch-adaptation workflow (decompile, diff, string-reflection sweep after each game update), reward-merge and input fixes, version gating, and release management through v1.33.
**Result:** live on the Steam Workshop with 445 subscribers and 113 favorites (Sep 2026).

### 3.4 Tower: radial grid design research
- **Role:** Solo designer and developer
- **Timeline:** 2024 – 2025
- **Stack:** Unity · C# · FMOD · Playdate SDK (Lua) · Adobe Illustrator scripting · laser cutting

**Overview.** A year-long study of one question: what games does a radial grid want to be? I built a reusable radial-grid framework, then used it to prototype a roguelike, a constraint puzzle, an action game, a tactics game, Tetris and a small level editor, plus a laser-cut wooden board and a Playdate game played with the crank.

**Result:** six playable prototypes, a physical edition, and the grid framework packaged as a Unity library (RadialGridGeneration).

**Page edits needed:** keep the essay voice; cut the profanity; remove the two "Currently under construction" placeholder images (Rogue, Tactics) or replace with real captures; cut the "MFA Thesis" tag (the NYU link can stay as one line at the end).

---

## 4. Tools & Systems

| Entry | One-liner |
|---|---|
| **Midas narrative pipeline** | Built the engine, dialogue runtime and tooling for a narrative radio game, working from the designer's needs: a Google Sheet is the script, a web graph editor edits it, and one runtime spec runs identically in Unity and Godot, enforced by a shared test fixture. |
| **dialogue-graph** | Next.js + React Flow editor that renders a Google Sheet as a live dialogue graph: edits write back to the sheet, in-tool playtesting, validated export. |
| **Studio editor tooling** | Gizmo Control overlay, ComponentPeek, MIDI Tuner (tune values with physical knobs in play mode, then save back to assets), Scene Object Capture, keyboard Window Manager. |
| **RadialGridGeneration** | The Tower grid framework as a standalone Unity library. |
| **Unity editor scripts** | Anchor-to-rect, mesh utilities, reflection-based API docs generator (existing page, needs copy fixes). |
| **Star Chart** | A zoomable presentation tool built in Unity (existing page). |

---

## 5. Lab

Intro line:
> Short experiments in input, physics and systems, each built in days.

Belgrad Park · Spinning Roles · Berto · Pusher · Jiggle Jaggle Juggling · Intergalactic Animal Control · Massivesweeper

Tiles only: thumbnail, title, one line, "Play" link. No per-game essays. Fix Intergalactic's description (currently duplicates Berto's).

---

## 6. Base résumé

Source: `resume-latex/Base2026.tex` (compiles on Overleaf with pdfLaTeX, or locally with XeTeX).
- `\publicfalse` (default): the version you send to people, with phone number and NOVOS metrics. Built copy: `resume-latex/Guy Ginat - Resume.pdf`.
- `\publictrue`: the version linked from the site's hero, `public/guy-ginat-resume.pdf`. No phone, no NOVOS metrics.
- Tailor per role by changing `\roletitle`, the summary, and the order of Selected Projects. `GamesJan2026.tex` is kept as the old base.

---

## 7. Open items
- [x] Funding wording: "funded"
- [x] CatchUp team size: 5
- [x] Mod subscribers: 445 / 113 favorites
- [x] Launch-tooling line: cut (interview material only)
- [ ] Capture Swipers level-gen footage (§3.2)
