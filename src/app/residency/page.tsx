import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Residency",
  description: "Apply to the Malaysian AI Residency and build with mentorship, structure, and partners.",
};

export default function Page() {
  return <Index />;
}
