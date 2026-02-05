import type { Metadata } from "next";
import Terms from "@/views/Terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Malaysian AI Residency terms and participation guidelines.",
};

export default function Page() {
  return <Terms />;
}
