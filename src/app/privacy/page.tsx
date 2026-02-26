import type { Metadata } from "next";
import Privacy from "@/views/Privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how the Malaysian AI Residency collects and uses data.",
  openGraph: {
    title: "Privacy Policy | Malaysian AI",
    description: "Read how the Malaysian AI Residency collects and uses data.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Malaysian AI",
    description: "Read how the Malaysian AI Residency collects and uses data.",
  },
};

export default function Page() {
  return <Privacy />;
}
