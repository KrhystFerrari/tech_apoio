import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@": "./",
      "@/*": ["./*"],
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Configuração para melhor performance e hidratação
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
