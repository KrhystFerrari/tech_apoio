"use client";

import { BookOpen } from "lucide-react";
import { LogoLoaderProps, LogoLoaderSizeMap } from "../../src/interfaces";

// Size configuration mapping
const SIZE_CONFIG: LogoLoaderSizeMap = {
  sm: { container: 48, icon: 24 },
  md: { container: 64, icon: 32 },
  lg: { container: 80, icon: 40 },
};

/**
 * Reusable logo loader component with TechApoio branding
 * Features BookOpen icon with gradient background and pulse animation
 */
export const LogoLoader: React.FC<LogoLoaderProps> = ({
  size = "lg",
  className = "",
  loadingText = "Carregando...",
}) => {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div
        className="flex items-center justify-center rounded-full animate-pulse"
        style={{
          width: `${config.container}px`,
          height: `${config.container}px`,
          background: "linear-gradient(135deg, #4285f4 0%, #9c27b0 100%)",
          boxShadow: "0 8px 25px rgba(66, 133, 244, 0.3)",
        }}
      >
        <BookOpen size={config.icon} color="white" className="text-white" />
      </div>

      {loadingText && (
        <p className="text-gray-600 text-sm font-medium">{loadingText}</p>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
          
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
        `,
        }}
      />
    </div>
  );
};
