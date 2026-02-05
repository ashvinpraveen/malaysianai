import type { Metadata } from "next";
import CommunityDirectory from "@/views/CommunityDirectory";

export const metadata: Metadata = {
  title: "Community Partners",
  description: "Meet the communities and partners supporting Malaysian AI builders.",
};

export default function Page() {
  return <CommunityDirectory />;
}
