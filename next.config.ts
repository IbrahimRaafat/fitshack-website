import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/menu/**" },
      { pathname: "/*.png" },
    ],
  },
};

export default nextConfig;
