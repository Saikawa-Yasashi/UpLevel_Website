import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F4EEE7",
          color: "#071827",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#9B581C",
            marginBottom: 24,
          }}
        >
          Uplevel Carpentry
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 32,
            width: 120,
            height: 2,
            backgroundColor: "#9B581C",
          }}
        />
        <div
          style={{
            marginTop: 32,
            fontSize: 24,
            color: "#746B63",
            textAlign: "center",
            maxWidth: 760,
          }}
        >
          Proudly Serving the Copper Country
        </div>
      </div>
    ),
    { ...size },
  );
}
