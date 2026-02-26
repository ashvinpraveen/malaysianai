import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Malaysian AI — Residency";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "AI Residency",
    "Accelerate your progress in building your startup, surrounded by ambitious Malaysian founders."
  );
}
