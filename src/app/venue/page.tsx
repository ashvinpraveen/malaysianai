import type { Metadata } from "next";
import Venue from "@/views/Venue";

export const metadata: Metadata = {
  title: "Our Space",
  description: "The permanent home of the Malaysian AI Residency — where builders work, ship, and grow together in Kuala Lumpur.",
  openGraph: {
    title: "Our Space | Malaysian AI",
    description: "The permanent home of the Malaysian AI Residency — where builders work, ship, and grow together in Kuala Lumpur.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Space | Malaysian AI",
    description: "The permanent home of the Malaysian AI Residency — where builders work, ship, and grow together in Kuala Lumpur.",
  },
};

export default function Page() {
  return <Venue />;
}
