import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },

  devIndicators: {
    buildActivity: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;