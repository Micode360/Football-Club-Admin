/** @type {import('next').NextConfig} */

const nextConfig = {
  presets: ["next/babel"],
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    domains: ["flagcdn.com", "upload.wikimedia.org", "res.cloudinary.com"],
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Remove console logs in production
      config.optimization.minimizer.push({
        apply: (compiler) => {
          compiler.hooks.compilation.tap("RemoveConsole", (compilation) => {
            compilation.hooks.processAssets.tap(
              {
                name: "RemoveConsole",
                stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
              },
              (assets) => {
                for (const assetName in assets) {
                  if (assetName.endsWith(".js")) {
                    assets[assetName] = {
                      source: () =>
                        assets[assetName]
                          .source()
                          .replace(/console\.(log|warn|error|debug)\(.*?\);?/g, ""),
                      size: () => assets[assetName].source().length,
                    };
                  }
                }
              }
            );
          });
        },
      });
    }
    return config;
  },
};

module.exports = nextConfig;
