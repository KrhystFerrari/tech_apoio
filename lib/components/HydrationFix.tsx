"use client";

import { useEffect, useRef } from "react";

interface HydrationFixProps {
  readonly children: React.ReactNode;
}

/**
 * Componente minimalista para correção de hydratação
 * sem interferir no scroll
 */
export function HydrationFix({ children }: HydrationFixProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Limpeza única e rápida apenas dos atributos mais problemáticos
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      // Remove apenas bis_skin_checked que é o mais comum
      try {
        if (container.hasAttribute("bis_skin_checked")) {
          container.removeAttribute("bis_skin_checked");
        }
      } catch {
        // Ignora erros
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} suppressHydrationWarning={true}>
      {children}
    </div>
  );
}
