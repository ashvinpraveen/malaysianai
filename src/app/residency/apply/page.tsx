import type { Metadata } from "next";
import BookDemo from "@/views/BookDemo";

export const metadata: Metadata = {
  title: "Apply",
  description: "Start your application to join the Malaysian AI Residency.",
  openGraph: {
    title: "Apply to the Residency | Malaysian AI",
    description: "Start your application to join the Malaysian AI Residency.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply to the Residency | Malaysian AI",
    description: "Start your application to join the Malaysian AI Residency.",
  },
};

export default function Page() {
  return <BookDemo />;
}
