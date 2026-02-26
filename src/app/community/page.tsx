import type { Metadata } from "next";
import CommunityDirectory from "@/views/CommunityDirectory";

export const metadata: Metadata = {
  title: "Community Partners",
  description: "Meet the communities and partners supporting Malaysian AI builders.",
  openGraph: {
    title: "Community Partners | Malaysian AI",
    description: "Meet the communities and partners supporting Malaysian AI builders.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Partners | Malaysian AI",
    description: "Meet the communities and partners supporting Malaysian AI builders.",
  },
};

export default function Page() {
  return <CommunityDirectory />;
}
