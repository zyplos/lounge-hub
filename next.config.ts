import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vzge.me",
        port: "",
        pathname: "/**",
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
  sassOptions: {
    prependData: `
        @use "@/styles/_common.scss" as common;
      `,
  },
};

export default nextConfig;
