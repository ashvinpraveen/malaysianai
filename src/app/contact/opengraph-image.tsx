import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Contact — Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Get in Touch",
    "Reach out about partnerships, residency questions, or community collaborations."
  );
}
