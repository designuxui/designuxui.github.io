import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Templates — BRIDGE.",
  description: "Ready-made website templates for SaaS, portfolios, eCommerce, and more. From €59.",
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
