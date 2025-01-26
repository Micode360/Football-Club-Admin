/** @type {import('next').NextConfig} */

const nextConfig = {
  presets: ["next/babel"],
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
