/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'dbmgdlfeqxtzhnuazibe.supabase.co',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'loremflickr.com',
          },
        ],
      },
      async redirects() {
        return [
          // {
          //   source: '/',
          //   destination: '/signin',
          //   permanent: true,
          // },
          // {
          //   source: '/workspace',
          //   destination: '/workspace/inbox',
          //   permanent: true,
          // },
        ]
      },
};

export default nextConfig;
