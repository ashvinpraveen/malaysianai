import type { Metadata } from "next";
import CommunityDirectory from "@/views/CommunityDirectory";

export const metadata: Metadata = {
  title: "Malaysia's AI Communities and Events",
  description:
    "A living directory of Malaysia's AI communities and events — meetups, builder groups, and space for yours.",
  openGraph: {
    title: "Malaysia's AI Communities and Events | Malaysian AI",
    description:
      "A living directory of Malaysia's AI communities and events — meetups, builder groups, and space for yours.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malaysia's AI Communities and Events | Malaysian AI",
    description:
      "A living directory of Malaysia's AI communities and events — meetups, builder groups, and space for yours.",
  },
};

export default function Page() {
  return <CommunityDirectory />;
}
