import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Change this to your repo name if not using a custom domain
  // basePath: isProd ? '/portifolio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
