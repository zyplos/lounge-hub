// https://stackoverflow.com/a/67641345
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer, dev, buildId, config: nextJsConfig, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: { and: [/\.(js|ts|md)x?$/] }, // Original issuer condition
      // Updated issuer to be more specific for Next.js 13+ as per some common practices,
      // though the original should also work. Keeping original for now.
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '443',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'visage.surgeplay.com',
        port: '443',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crafatar.com',
        port: '443',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/youre-invited",
        destination: "/mc",
        permanent: false,
      },
      {
        source: "/friend-invite",
        destination: "/mc",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
