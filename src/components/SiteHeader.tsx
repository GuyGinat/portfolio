import Link from "next/link";
import { profile } from "@/data/site";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wide: true },
  { href: "/#tools", label: "Tools", wide: true },
  { href: "/#lab", label: "Lab" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-scene/70 backdrop-blur-md">
      <div className="page flex h-14 items-center justify-between gap-4">
        <Link href="/" className="type-title whitespace-nowrap text-ink">
          {profile.name}
        </Link>
        <nav aria-label="Sections" className="-mr-2 overflow-x-auto">
          <ul className="flex text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href} className={"wide" in item ? "hidden sm:block" : ""}>
                <Link href={item.href} className="block px-2 py-2 transition-colors hover:text-ink sm:px-3">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
