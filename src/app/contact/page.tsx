import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about partnerships, residency questions, or community collaborations.",
  openGraph: {
    title: "Get in Touch | Malaysian AI",
    description: "Get in touch about partnerships, residency questions, or community collaborations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch | Malaysian AI",
    description: "Get in touch about partnerships, residency questions, or community collaborations.",
  },
};

export default function Page() {
  return <Contact />;
}
