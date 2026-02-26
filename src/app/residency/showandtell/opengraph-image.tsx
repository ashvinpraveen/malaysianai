import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Show and Tell Thursdays — Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Show and Tell Thursdays",
    "Share what you're building and learn from other builders. Every Thursday at Malaysian AI."
  );
}
