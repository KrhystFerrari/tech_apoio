"use client";

import { useEffect, useRef } from "react";

interface HydrationFixProps {
  readonly children: React.ReactNode;
}

/**
 * Componente que remove atributos adicionados por extensões do browser
 * após a hidratação para evitar warnings de mismatch
 */
export function HydrationFix({ children }: HydrationFixProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.window === undefined) return;

    // Remove atributos conhecidos adicionados por extensões
    const removeExtensionAttributes = () => {
      const container = containerRef.current;
      if (!container) return;

      // Lista de atributos comuns adicionados por extensões
      const extensionAttributes = [
        "bis_skin_checked",
        "__processed__",
        "data-grammarly-shadow-root",
        "data-lastpass-icon-root",
        "data-testid",
      ];

      // Remove atributos de todos os elementos descendentes
      const allElements = container.getElementsByTagName("*");

      for (const element of Array.from(allElements)) {
        for (const attr of extensionAttributes) {
          if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
          }
        }
      }
    };

    // Execute após a hidratação
    const timer = setTimeout(removeExtensionAttributes, 100);

    // Observer para mudanças no DOM (caso extensões adicionem atributos dinamicamente)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName;

          if (attrName === "bis_skin_checked" || attrName === "__processed__") {
            target.removeAttribute(attrName);
          }
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ["bis_skin_checked", "__processed__"],
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} suppressHydrationWarning={true}>
      {children}
    </div>
  );
}
