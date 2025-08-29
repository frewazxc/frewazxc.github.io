/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portfolio',
        permanent: true,
      },
    ];
  },
  transpilePackages: ['three'],
};

export default nextConfig;