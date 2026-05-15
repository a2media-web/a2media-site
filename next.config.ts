import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Defense-in-depth for the exploration routes: even if a crawler ignores
  // robots.txt, X-Robots-Tag at the response level keeps `/transitions/*`
  // and `/mockups` out of search indexes.
  async headers() {
    return [
      {
        source: "/transitions/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/mockups",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
