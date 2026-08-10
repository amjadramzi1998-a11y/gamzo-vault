import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsqyhfgiznpociahvpfk.supabase.co",
        pathname: "/storage/v1/object/public/game-images/**",
      },
    ],
  },
};

export default nextConfig;