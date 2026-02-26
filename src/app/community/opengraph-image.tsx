import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Community Partners — Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Community Partners",
    "Malaysia's AI communities, all in one place."
  );
}
