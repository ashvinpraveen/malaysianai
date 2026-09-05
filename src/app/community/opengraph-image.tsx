import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Malaysia's AI Communities and Events — Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Malaysia's AI Communities and Events",
    "A living directory of communities across the country — add yours."
  );
}
