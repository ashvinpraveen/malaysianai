import type { Metadata } from "next";
import Providers from "./providers";
import "../index.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Malaysian AI",
    template: "%s | Malaysian AI",
  },
  description:
    "The home of AI builders in Malaysia. Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.",
  keywords: [
    "AI Malaysia",
    "AI community",
    "AI events",
    "AI workshops",
    "Malaysian AI",
    "AI builders",
    "AI residency",
  ],
  authors: [{ name: "Malaysian AI" }],
  openGraph: {
    title: "Malaysian AI",
    description:
      "The home of AI builders in Malaysia. Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.",
    url: siteUrl,
    siteName: "Malaysian AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malaysian AI",
    description:
      "The home of AI builders in Malaysia. Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.",
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
