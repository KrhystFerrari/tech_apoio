"use client";

import { useEffect, useState } from "react";

interface NoSSRProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}

interface HydrationSafeWrapperProps {
  readonly children: React.ReactNode;
}

/**
 * Componente que desabilita SSR para evitar problemas de hidratação
 * causados por extensões do browser
 */
export function NoSSR({ children, fallback = null }: NoSSRProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Componente que suprime warnings de hidratação globalmente
 */
export function HydrationSafeWrapper({ children }: HydrationSafeWrapperProps) {
  return <div suppressHydrationWarning={true}>{children}</div>;
}
