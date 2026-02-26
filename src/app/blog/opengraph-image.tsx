import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Updates — Malaysian AI";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Updates",
    "Residency updates, cohort stories, and program announcements from Malaysian AI."
  );
}
