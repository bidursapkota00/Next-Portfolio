import type { Metadata } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import Footer from "@/components/footer/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Bidur Sapkota – Full-Stack Developer & Lecturer | React, Node, Next.js | Nepal",
  description:
    "I'm Bidur Sapkota, a full-stack web developer from Nepal. I build fast, SEO-friendly MERN Stack websites and apps. Available for freelance projects.",
  keywords: [
    "Full Stack Developer",
    "React.js",
    "React Native",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Website Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Electron.js",
    "Mobile App Developer",
    "Desktop App Developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${quicksand.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights sampleRate={0.2} />
        <Footer />
      </body>
    </html>
  );
}
