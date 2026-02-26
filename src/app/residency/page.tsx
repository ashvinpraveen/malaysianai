import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Residency",
  description: "Apply to the Malaysian AI Residency and build with mentorship, structure, and partners.",
  openGraph: {
    title: "AI Residency | Malaysian AI",
    description: "Apply to the Malaysian AI Residency and build with mentorship, structure, and partners.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Residency | Malaysian AI",
    description: "Apply to the Malaysian AI Residency and build with mentorship, structure, and partners.",
  },
};

export default function Page() {
  return <Index />;
}
