import type { Metadata } from "next";
import ResidentsDirectory from "@/views/ResidentsDirectory";

export const metadata: Metadata = {
  title: "Residents",
  description: "Explore the companies and teams in the Malaysian AI Residency.",
  openGraph: {
    title: "Our Residents | Malaysian AI",
    description: "Explore the companies and teams in the Malaysian AI Residency.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Residents | Malaysian AI",
    description: "Explore the companies and teams in the Malaysian AI Residency.",
  },
};

export default function Page() {
  return <ResidentsDirectory />;
}
