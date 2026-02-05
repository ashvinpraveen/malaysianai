import type { Metadata } from "next";
import Start from "@/views/Start";

export const metadata: Metadata = {
  title: "Session Timer",
  description: "Show and Tell session timer for Malaysian AI meetups.",
};

export default function Page() {
  return <Start />;
}
