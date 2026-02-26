import type { Metadata } from "next";
import Terms from "@/views/Terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Malaysian AI Residency terms and participation guidelines.",
  openGraph: {
    title: "Terms of Service | Malaysian AI",
    description: "Review the Malaysian AI Residency terms and participation guidelines.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Malaysian AI",
    description: "Review the Malaysian AI Residency terms and participation guidelines.",
  },
};

export default function Page() {
  return <Terms />;
}
