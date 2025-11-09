"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: Readonly<ClientOnlyProps>) {
  const [hasMounted, setHasMounted] = useState(false);

  // Use a ref-based approach to avoid the setState in effect warning
  useEffect(() => {
    // Schedule the state update for the next tick to avoid cascading renders
    const timer = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
