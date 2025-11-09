"use client";

import { useEffect, useState } from "react";

/**
 * Hook para detectar quando a hidratação do React está completa
 * Útil para evitar problemas de SSR/Client mismatch
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Usar setTimeout para evitar setState síncrono no effect
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return isClient;
}

/**
 * Hook para detectar se estamos no browser
 */
export function useIsBrowser() {
  return globalThis.window !== undefined;
}

interface ClientOnlyProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}

/**
 * Componente que só renderiza após a hidratação estar completa
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
