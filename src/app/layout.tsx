import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Background from "@/components/background/Background";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { profile } from "@/data/site";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap" });

const description = `${profile.title}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://guyginat.xyz"),
  title: { default: `${profile.name}, ${profile.title}`, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    title: profile.name,
    description,
    url: "https://guyginat.xyz",
    siteName: profile.name,
    images: [{ url: "/media/catchup/poster.jpg", width: 1280, height: 720 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#151130",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={schibsted.variable}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-scene">
          Skip to content
        </a>
        <Background />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
