import type { Metadata } from "next";
import { DM_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/app/components/ui/MagneticCursor";
import Nav from "@/app/components/ui/Nav";
import SmoothScroll from "@/app/components/ui/SmoothScroll";
import ColorTransitions from "@/app/components/ui/ColorTransitions";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "BRIDGE. — Where Design Meets Growth",
  description: "One specialist bridging UX, product strategy and sales — so your team doesn't need three hires. UX audits, funnel optimization, B2B sales systems. Remote worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${unbounded.variable}`}>
        <MagneticCursor />
        <Nav />
        <ColorTransitions />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
