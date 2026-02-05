import type { Metadata } from "next";
import CanvasOverview from "@/views/CanvasOverview";

export const metadata: Metadata = {
  title: "Site Canvas",
  description: "Visual overview of the Malaysian AI Residency site.",
};

export default function Page() {
  return <CanvasOverview />;
}
