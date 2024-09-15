/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  
    // Enable static exports if needed
    // output: 'export',
  
    // Custom webpack config
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      console.log('Webpack build started');
      // Add any custom webpack configurations here
      return config;
    },
  
    // Environment variables that will be available at build time
    env: {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
  
    // Redirects
    async redirects() {
      return [
        // Add any redirects here
      ];
    },
  
    // Headers
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
          ],
        },
      ];
    },
  
    // Image optimization config
    images: {
      domains: ['your-image-domain.com'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
  
    // Internationalization settings (if needed)
    // i18n: {
    //   locales: ['en', 'fr', 'de'],
    //   defaultLocale: 'en',
    // },
  
    // Custom build directory
    // distDir: 'build',
  
    // Trailing slash config
    trailingSlash: false,
  
    // Powered by header
    poweredByHeader: false,
  
    // Custom server-side runtime config
    serverRuntimeConfig: {
      // Will only be available on the server side
      mySecret: 'secret',
    },
  
    // Custom public runtime config
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: '/static',
    },
  
    // Experimental features
    experimental: {
      // appDir: true,
      // serverActions: true,
    },
  };
  
  module.exports = nextConfig;