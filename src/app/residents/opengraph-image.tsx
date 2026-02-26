import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Residents — Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Our Residents",
    "Meet the companies and builders in the Malaysian AI Residency."
  );
}
