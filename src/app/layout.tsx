import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundWithControls from "@/components/BackgroundWithControls";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guy Ginat",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundWithControls>
          {children}
        </BackgroundWithControls>
      </body>
    </html>
  );
}
