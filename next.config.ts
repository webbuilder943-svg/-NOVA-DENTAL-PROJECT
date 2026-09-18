import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — avoids Windows' symlink restriction that breaks
  // Vercel's serverless-function build step locally, and this site has no
  // server-only features (no API routes, no SSR data) that would need it.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
