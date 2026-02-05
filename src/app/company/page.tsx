import type { Metadata } from "next";
import Company from "@/views/Company";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn about the team and mission behind the Malaysian AI Residency.",
};

export default function Page() {
  return <Company />;
}
