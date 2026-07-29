import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function generateOgImage(
  title: string,
  subtitle: string,
): Promise<ImageResponse> {
  return new ImageResponse(
    (
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
        <div
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            background:
              "radial-gradient(circle at 80% 25%, rgba(148, 97, 255, 0.72) 0%, rgba(47, 52, 166, 0.2) 30%, transparent 52%), radial-gradient(circle at 18% 82%, rgba(36, 203, 198, 0.28) 0%, transparent 38%), linear-gradient(135deg, #070d1e 0%, #101b3d 48%, #180d37 100%)",
          }}
        >
          {/* Decorative light field, kept self-contained so builds never depend on
              a running dev server or a remote font/image host. */}
          <div
            style={{
              position: "absolute",
              width: 520,
              height: 520,
              right: -70,
              top: 30,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 44%, transparent 70%)",
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
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #d7ff36 0%, #8e6cff 100%)",
                }}
              />
              <span
                style={{
                  color: "white",
                  fontSize: 22,
                  fontFamily: "sans-serif",
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
                fontFamily: "sans-serif",
                fontWeight: 400,
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                margin: 0,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 26,
                fontFamily: "sans-serif",
                fontWeight: 300,
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "700px",
                textAlign: "center",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
