/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/dersler/kpds-hazirlik',
        destination: '/dersler/yds-hazirlik',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
