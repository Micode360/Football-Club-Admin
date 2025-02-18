/** @type {import('next').NextConfig} */

const nextConfig = {
  presets: ["next/babel"],
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    domains: ["flagcdn.com", "upload.wikimedia.org", "res.cloudinary.com"],
  },
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Remove console.log, console.warn, and console.error in production
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  },
};

module.exports = nextConfig;
