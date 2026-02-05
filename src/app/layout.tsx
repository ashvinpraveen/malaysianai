import type { Metadata } from "next";
import Providers from "./providers";
import "../index.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Malaysian AI Residency",
    template: "%s | The Malaysian AI Residency",
  },
  description:
    "A cohort-based residency helping builders and researchers ship real AI products in Malaysia.",
  keywords: [
    "AI residency",
    "Malaysia",
    "cohort",
    "mentorship",
    "applied AI",
    "product",
    "research",
  ],
  authors: [{ name: "The Malaysian AI Residency" }],
  openGraph: {
    title: "The Malaysian AI Residency",
    description:
      "A cohort-based residency helping builders and researchers ship real AI products in Malaysia.",
    url: siteUrl,
    siteName: "The Malaysian AI Residency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malaysian AI Residency",
    description:
      "A cohort-based residency helping builders and researchers ship real AI products in Malaysia.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
