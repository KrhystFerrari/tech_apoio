"use client";

import { BookOpen } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export const LoadingScreen = ({
  message = "Carregando...",
  className = "",
}: LoadingScreenProps) => {
  return (
    <div
      className={`flex justify-center items-center min-h-screen ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          color: "white",
        }}
      >
        {/* Ícone do livro com animação pulse */}
        <div
          className="loading-pulse"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <BookOpen
            size={40}
            color="white"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          />
        </div>

        <p
          style={{
            fontSize: "18px",
            color: "white",
            fontWeight: "500",
            textAlign: "center",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {message}
        </p>
      </div>

      {/* Adicionando as classes CSS globalmente */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .loading-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
          
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
        `,
        }}
      />
    </div>
  );
};
