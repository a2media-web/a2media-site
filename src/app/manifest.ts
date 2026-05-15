import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "A2 Media — Content That Converts",
    short_name: "A2 Media",
    description:
      "B2B SaaS video content strategy and editing. We build the video engine that turns viewers into pipeline.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0536",
    theme_color: "#0d0536",
    icons: [
      {
        src: "/a2-logo-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
