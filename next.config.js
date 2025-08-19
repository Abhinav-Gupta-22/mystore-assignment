/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**', // This allows all domains (be cautious in production)
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable image optimization in development to prevent infinite loading
    disableStaticImages: process.env.NODE_ENV === 'development',
    // Allow local images
    domains: ['localhost'],
    // Disable image optimization for local images in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Disable static optimization for now to prevent issues
  output: 'standalone',
  // Enable webpack5 for better performance
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
