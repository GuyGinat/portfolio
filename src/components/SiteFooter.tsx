import { profile } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line/60 bg-scene/80 backdrop-blur-md">
      <div className="page flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>{profile.name}, New York</p>
        <p>The background is about 2,000 cubes in one draw call. Open the grid controls in the corner to play with it.</p>
      </div>
    </footer>
  );
}
