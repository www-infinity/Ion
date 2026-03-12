import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Ion',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
