/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
