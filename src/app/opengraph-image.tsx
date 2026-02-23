import { ImageResponse } from "next/og";

export const alt = "Driving Malaysia's AI progress";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic so the server is running when images are fetched by Satori
export const dynamic = "force-dynamic";

async function fetchNewsreader(): Promise<ArrayBuffer | null> {
  try {
    // Use an old UA so Google Fonts returns TTF (Satori doesn't support woff2)
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=swap",
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
  // Resolve base URL: custom domain → Vercel deployment URL → localhost
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const fontData = await fetchNewsreader();

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
          {/* Background image — URL fetched by Satori directly */}
          <img
            src={`${baseUrl}/batik_kl_night_sky_vast.png`}
            width={CARD_W}
            height={CARD_H}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
              objectPosition: "0% 65%",
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
              <img
                src={`${baseUrl}/logo-ai-residency.png`}
                width={48}
                height={48}
              />
              <span
                style={{
                  color: "white",
                  fontSize: 22,
                  fontFamily: fontData ? "Newsreader" : "Georgia, serif",
                  letterSpacing: "0.02em",
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
                fontFamily: fontData ? "Newsreader" : "Georgia, serif",
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
                fontSize: 20,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 300,
                lineHeight: 1.55,
                margin: 0,
                maxWidth: "640px",
                textAlign: "center",
              }}
            >
              Backing grassroots builders with visibility, learning, and
              resources to ship real AI products globally.
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Newsreader", data: fontData, style: "normal", weight: 400 }]
        : [],
    }
  );
}
