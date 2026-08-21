import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Proxy API requests to backend to avoid CORS in development and provide same-origin fallback
    // In production, NEXT_PUBLIC_API_BASE_URL points directly to Railway; this rewrite acts as fallback for local dev
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://candidexa-backend.up.railway.app/api/v1";
    // Only proxy if backendUrl is remote; local backend on :8000 is handled separately
    if (backendUrl.includes("railway.app")) {
      return [
        {
          source: "/api/proxy/:path*",
          destination: `${backendUrl}/:path*`,
        },
      ];
    }
    return [];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
