import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'theplatypus.in',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Output standalone for Docker deployment
  output: 'standalone',
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'], // Tree-shake large packages
  },
  // Redirect old URL format to new format
  async redirects() {
    return [
      {
        source: '/dog-walking-:location',
        destination: '/dog-walking/:location',
        permanent: true,
      },
    ];
  },
  // Temporarily disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Temporarily disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
