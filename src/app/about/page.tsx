import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "About Malaysian AI",
  description: "Learn how Malaysian AI brings builders together through events, communities, and the Malaysian AI Residency.",
  openGraph: {
    title: "About Malaysian AI",
    description: "Learn how Malaysian AI brings builders together through events, communities, and the Malaysian AI Residency.",
  },
  twitter: {
    title: "About Malaysian AI",
    description: "Learn how Malaysian AI brings builders together through events, communities, and the Malaysian AI Residency.",
  },
};

export default function Page() {
  return <About />;
}
