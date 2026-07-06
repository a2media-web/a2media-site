import { ImageResponse } from "next/og";

export const alt =
  "A2 Media — B2B SaaS video that turns viewers into pipeline.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0d0536 0%, #1a0a5c 55%, #0d0536 100%)",
          padding: "72px 80px",
          position: "relative",
          color: "#fff",
        }}
      >
        {/* Ambient purple glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(143, 69, 238, 0.55), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -260,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(90, 51, 255, 0.45), transparent 70%)",
          }}
        />

        {/* Top eyebrow + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#66f78e",
                boxShadow: "0 0 18px rgba(102, 247, 142, 0.85)",
              }}
            />
            A2 MEDIA
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            CONTENT THAT CONVERTS
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 78,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fff",
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Your videos should be&nbsp;</span>
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "#c9b6ff",
              }}
            >
              closing deals&nbsp;
            </span>
            <span>for you.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 920,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            B2B SaaS video content strategy + editing. Strategy mapped to your
            buyer journey, scripts that move deals.
          </div>
        </div>

        {/* Trusted-by bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            position: "relative",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Trusted by
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            <div style={{ display: "flex" }}>Okta</div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>·</div>
            <div style={{ display: "flex" }}>Shopify</div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>·</div>
            <div style={{ display: "flex" }}>Crossbeam</div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>·</div>
            <div style={{ display: "flex" }}>Goldcast</div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>·</div>
            <div style={{ display: "flex" }}>Chili Piper</div>
            <div style={{ display: "flex", fontSize: 26, color: "#66f78e" }}>+ 30 more*</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
