import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'theplatypus.in',
      },
      {
        protocol: 'https',
        hostname: 'www.theplatypus.in',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Output standalone for Docker deployment
  output: 'standalone',
  // Strip console.* in production bundles.
  // Keep console.error + console.warn for ops.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-select'], // Tree-shake large packages
    cssChunking: true, // Improved CSS chunking for better caching
  },
  // Redirects: URL aliases + canonical non-www -> www redirect.
  async redirects() {
    return [
      {
        source: '/dog-walking-:location',
        destination: '/dog-walking/:location',
        permanent: true,
      },
      // Common URL guesses that used to 404.
      // /about has a real page now; /contact, /faq, /refund-policy redirect.
      { source: '/contact', destination: '/support', permanent: true },
      { source: '/faq', destination: '/#faq', permanent: false },
      { source: '/refund-policy', destination: '/refund', permanent: true },
      // Canonicalise on www.theplatypus.in.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'theplatypus.in' }],
        destination: 'https://www.theplatypus.in/:path*',
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
  // Add cache headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/optimized/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      // Override Next 15's default 1-year s-maxage on prerendered HTML.
      // Hashed chunks rotate on every build; if CF caches HTML for a year,
      // a new deploy 404s every cached visitor until manual CF purge.
      // 10-min edge cache + 24h stale-while-revalidate keeps CDN benefit
      // without pinning visitors to stale chunk hashes.
      {
        source: '/:path((?!_next|optimized|api|sitemap\\.xml|robots\\.txt|feed\\.xml|llms.*\\.txt).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
