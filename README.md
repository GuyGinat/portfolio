# guyginat.xyz

Portfolio of Guy Ginat, game developer and technical director. Next.js 14 (app router), Tailwind, react-three-fiber. Deployed on Vercel from `main`.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, also type-checks
```

## Where things live

- **Copy:** `CONTENT.md` is the source of truth for all text on the site, LinkedIn and the résumé. Edit it first, then the data files.
- **Data:** `src/data/site.ts` (profile, experience, tools), `src/data/work.ts` (case studies), `src/data/games.ts` (Lab), `src/data/techs.ts` (tool pages), `src/data/tower-content.ts` (Tower essay blocks).
- **Background:** `src/components/background/`. One `InstancedMesh` animated in `useFrame`; all state lives in the mutable store `src/lib/bgStore.ts`, so nothing re-renders React per frame. Page sections switch the mood through `MoodSection`; work cards tint the grid on hover. `GridPanel` is the easter-egg control panel.
- **Media:** `public/media/` holds web-encoded video (H.264, no audio) and posters. Unity WebGL builds for the Lab live under `public/games/`.

## Redirects

Old URLs from earlier résumés (`/tower`, `/games/*`, `/tech/*`) redirect to their new homes; see `next.config.js`.
