import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Our Space — Blok71 KL | Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Our Space — Blok71 KL",
    "The permanent home of the Malaysian AI Residency in Kuala Lumpur."
  );
}
