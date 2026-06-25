import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from public folder (local) with no external domains required yet
    localPatterns: [{ pathname: "/menu/**" }],
  },
};

export default nextConfig;
