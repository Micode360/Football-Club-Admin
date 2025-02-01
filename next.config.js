/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  presets: ["next/babel"],
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    domains: ["flagcdn.com", "upload.wikimedia.org", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
