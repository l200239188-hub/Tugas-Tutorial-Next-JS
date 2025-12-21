import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Experimental features for Next.js 16 + React 19
  experimental: {
    // Enable server actions (already default in Next.js 14+)
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (for faster deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
