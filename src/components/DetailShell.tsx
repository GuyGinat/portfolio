import Link from "next/link";
import MoodSection from "@/components/background/MoodSection";

// Shared frame for the Lab and Tools detail pages.
export function DetailShell({ back, backLabel, title, description, tags, children }: {
  back: string;
  backLabel: string;
  title: string;
  description?: string;
  tags?: string[];
  children: React.ReactNode;
}) {
  return (
    <MoodSection mood="quiet" className="pb-24 pt-10 sm:pt-14">
      <div className="page">
        <Link href={back} className="link text-sm text-muted">{backLabel}</Link>
        <h1 className="type-display mt-8 text-[clamp(2.25rem,6vw,4.5rem)]">{title}</h1>
        {description && <p className="mt-4 max-w-prose text-lg text-ink/90">{description}</p>}
        {tags && tags.length > 0 && <p className="mt-2 text-sm text-muted">{tags.join(", ")}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </MoodSection>
  );
}
