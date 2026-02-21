import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Change this to your repo name if not using a custom domain
  // basePath: process.env.NODE_ENV === 'production' ? '/portifolio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
