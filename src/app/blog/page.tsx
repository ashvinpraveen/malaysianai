import type { Metadata } from "next";
import Blog from "@/views/Blog";

export const metadata: Metadata = {
  title: "Updates",
  description: "Residency updates, cohort stories, and program announcements.",
  openGraph: {
    title: "Updates | Malaysian AI",
    description: "Residency updates, cohort stories, and program announcements.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Updates | Malaysian AI",
    description: "Residency updates, cohort stories, and program announcements.",
  },
};

export default function Page({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  return <Blog categoryFilter={searchParams?.category ?? null} />;
}
