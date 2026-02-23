import type { Metadata } from "next";
import Venue from "@/views/Venue";

export const metadata: Metadata = {
  title: "Our Space — Blok71 KL",
  description: "Blok71 KL is the permanent home of the Malaysian AI Residency — where builders work, ship, and grow together in Kuala Lumpur.",
};

export default function Page() {
  return <Venue />;
}
