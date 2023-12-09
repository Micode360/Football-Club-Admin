/** @type {import('next').NextConfig} */

const nextConfig = {
  presets: ["next/babel"],
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
