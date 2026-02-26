import type { Metadata } from "next";
import Venue from "@/views/Venue";

export const metadata: Metadata = {
  title: "Our Space",
  description: "The permanent home of the Malaysian AI Residency — where builders work, ship, and grow together in Kuala Lumpur.",
};

export default function Page() {
  return <Venue />;
}
