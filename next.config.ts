import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images :{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
            {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  }
};

export default nextConfig;
