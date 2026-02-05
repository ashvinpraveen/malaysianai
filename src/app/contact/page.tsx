import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about partnerships, residency questions, or community collaborations.",
};

export default function Page() {
  return <Contact />;
}
