import type { Metadata } from "next";
import ShowAndTell from "@/views/ShowAndTell";

export const metadata: Metadata = {
  title: "Show and Tell",
  description: "Join a Show and Tell Thursday session with Malaysian AI builders.",
  openGraph: {
    title: "Show and Tell Thursdays | Malaysian AI",
    description: "Join a Show and Tell Thursday session with Malaysian AI builders.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Show and Tell Thursdays | Malaysian AI",
    description: "Join a Show and Tell Thursday session with Malaysian AI builders.",
  },
};

export default function Page() {
  return <ShowAndTell />;
}
