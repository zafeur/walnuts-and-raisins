import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};
export default nextConfig;
