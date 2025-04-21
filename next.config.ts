import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["assets.aceternity.com", "via.placeholder.com", "images.unsplash.com", "cdn.discordapp.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

export default nextConfig;
