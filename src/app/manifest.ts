import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Malaysian AI",
    short_name: "Malaysian AI",
    description: "The home of AI builders in Malaysia.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f1c2e",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo-ai-residency.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
