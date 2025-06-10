import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import BackgroundWithControls from "../components/BackgroundWithControls";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const DEFAULT_COLOR1 = "#4338ca";
const DEFAULT_COLOR2 = "#7e22ce";
const DEFAULT_LIGHT_POSITION: [number, number, number] = [0, 5, 5];
const DEFAULT_WAVE_AMPLITUDE = 1.8;
const DEFAULT_WAVE_FREQUENCY = 0.3;
const DEFAULT_WAVE_SPEED = 4.5;

export const metadata: Metadata = {
  title: "Guy Ginat | Technical Game Designer",
  description: "Portfolio showcasing game development projects, technical writing, and code snippets and just some random fun stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundWithControls />
        <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-gray-200/20 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">Guy Ginat</Link>
              <div className="flex space-x-4">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/games" className="nav-link">Games</Link>
                <Link href="/tech" className="nav-link">Tech & Code</Link>
                <Link href="/writing" className="nav-link">Game Design</Link>
                <Link href="/about" className="nav-link">About</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="relative">
          <main className="pt-20 min-h-screen px-4 sm:px-8 pb-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
