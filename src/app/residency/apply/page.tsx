import type { Metadata } from "next";
import BookDemo from "@/views/BookDemo";

export const metadata: Metadata = {
  title: "Apply",
  description: "Start your application to join the Malaysian AI Residency.",
};

export default function Page() {
  return <BookDemo />;
}
