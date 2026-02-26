import type { Metadata } from "next";
import MalaysianAI from "@/views/MalaysianAI";

export const metadata: Metadata = {
  title: "Malaysian AI — The Home of AI Builders in Malaysia",
  description:
    "Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.",
  openGraph: {
    title: "Malaysian AI — The Home of AI Builders in Malaysia",
    description:
      "Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.",
  },
  twitter: {
    title: "Malaysian AI — The Home of AI Builders in Malaysia",
    description:
      "Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.",
  },
};

export default function Page() {
  return <MalaysianAI />;
}
