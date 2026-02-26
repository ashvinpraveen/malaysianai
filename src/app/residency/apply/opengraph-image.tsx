import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Apply — Malaysian AI Residency";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-dynamic";

export default function Image() {
  return generateOgImage(
    "Apply to the Residency",
    "Join a community of ambitious Malaysian AI founders and accelerate your startup."
  );
}
