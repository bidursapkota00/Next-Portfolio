import type { Metadata } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

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
  title: "Bidur Sapkota - Next.js Website Developer | Website Designer | Nepal",
  description:
    "I'm Bidur Sapkota, an experienced web developer from Nepal specializing in building modern, responsive websites with NextJS. I create high-performance, SEO-friendly web applications for businesses worldwide. Hire me for your next NextJS project.",
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
      </body>
    </html>
  );
}
