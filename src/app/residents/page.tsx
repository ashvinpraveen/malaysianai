import type { Metadata } from "next";
import ResidentsDirectory from "@/views/ResidentsDirectory";

export const metadata: Metadata = {
  title: "Residents",
  description: "Explore the companies and teams in the Malaysian AI Residency.",
};

export default function Page() {
  return <ResidentsDirectory />;
}
