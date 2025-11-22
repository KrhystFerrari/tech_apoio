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
  
  // Headers de segurança que podem ajudar com extensões
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
