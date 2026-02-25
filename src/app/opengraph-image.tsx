import { ImageResponse } from "next/og";

export const alt = "Malaysian AI — The home of AI builders in Malaysia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic so the server is running when images are fetched by Satori
export const dynamic = "force-dynamic";

async function fetchFont(family: string, weight = 400): Promise<ArrayBuffer | null> {
  try {
    // Use an old UA so Google Fonts returns TTF (Satori doesn't support woff2)
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      { headers: { "User-Agent": "Mozilla/4.0" } }
    ).then((r) => r.text());

    const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return null;

    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const [newsreaderData, interData, spaceGroteskData] = await Promise.all([
    fetchFont("Newsreader", 400),
    fetchFont("Inter", 300),
    fetchFont("Space Grotesk", 500),
  ]);

  const fonts: ConstructorParameters<typeof ImageResponse>[1]["fonts"] = [];
  if (newsreaderData) fonts.push({ name: "Newsreader", data: newsreaderData, style: "normal", weight: 400 });
  if (interData) fonts.push({ name: "Inter", data: interData, style: "normal", weight: 300 });
  if (spaceGroteskData) fonts.push({ name: "Space Grotesk", data: spaceGroteskData, style: "normal", weight: 500 });

  const CARD_W = 1160;
  const CARD_H = 590;

  return new ImageResponse(
    (
      // Cream outer background — matches the site's page background
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#faf8f5",
          padding: "20px",
          alignItems: "stretch",
        }}
      >
        {/* Rounded card */}
        <div
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#0a1628",
          }}
        >
          {/* Background image */}
          <img
            src={`${baseUrl}/batik_kl_city_sunrise.png`}
            width={CARD_W}
            height={CARD_H}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              objectPosition: "50% 60%",
            }}
          />

          {/* Dark readability gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "0 90px",
            }}
          >
            {/* Logo + wordmark */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "36px",
              }}
            >
              <img src={`${baseUrl}/logo-ai-residency.png`} width={48} height={48} />
              <span
                style={{
                  color: "white",
                  fontSize: 22,
                  fontFamily: spaceGroteskData ? "Space Grotesk" : "system-ui, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                Malaysian AI
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                color: "white",
                fontSize: 84,
                fontFamily: newsreaderData ? "Newsreader" : "Georgia, serif",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: 0,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Driving Malaysia&apos;s AI progress
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 26,
                fontFamily: interData ? "Inter" : "system-ui, sans-serif",
                fontWeight: 300,
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "700px",
                textAlign: "center",
              }}
            >
              Join workshops, events, and a community of people figuring out AI together — from beginners to serious builders.
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
