import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
        <BackgroundWithControls>{children}</BackgroundWithControls>
      </body>
    </html>
  );
}
