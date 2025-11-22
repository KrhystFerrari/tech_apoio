"use client";

import { useEffect } from "react";

/**
 * Componente que aplica correções globais para problemas de hydration
 * causados por extensões do browser
 */
export function GlobalHydrationFix() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Desabilita warnings de hydration em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const message = args[0];

        // Suprime warnings específicos de hydration relacionados a extensões
        if (
          typeof message === "string" &&
          (message.includes("A tree hydrated but some attributes") ||
            message.includes("bis_skin_checked") ||
            message.includes("Hydration failed") ||
            message.includes("Expected server HTML to contain"))
        ) {
          return; // Não exibe o erro
        }

        // Outros erros são exibidos normalmente
        originalConsoleError.apply(console, args);
      };
    }

    // Remove atributos de extensões de todo o documento
    const cleanupDocument = () => {
      const extensionAttributes = [
        "bis_skin_checked",
        "__processed__",
        "data-grammarly-shadow-root",
        "data-lastpass-icon-root",
        "data-testid",
        "data-adblock",
        "data-ublock",
        "data-extension",
        "_moz_dirty",
        "data-ms-editor",
        "data-skype_c2c_plugin",
      ];

      // Limpa todos os elementos no documento
      const allElements = document.querySelectorAll("*");

      allElements.forEach((element) => {
        extensionAttributes.forEach((attr) => {
          if (element.hasAttribute(attr)) {
            try {
              element.removeAttribute(attr);
            } catch {
              // Ignora erros silenciosamente
            }
          }
        });
      });
    };

    // Executa limpeza inicial
    const initialTimer = setTimeout(cleanupDocument, 100);

    // Limpeza adicional para extensões que carregam depois
    const delayedTimer = setTimeout(cleanupDocument, 1000);

    // Observer global para mudanças no documento
    const observer = new MutationObserver((mutations) => {
      let hasExtensionChanges = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const attrName = mutation.attributeName;
          if (attrName === "bis_skin_checked" || attrName === "__processed__") {
            hasExtensionChanges = true;
            const target = mutation.target as Element;
            try {
              target.removeAttribute(attrName);
            } catch {
              // Ignora erros
            }
          }
        }
      });

      if (hasExtensionChanges) {
        // Debounce: aguarda um pouco antes de fazer limpeza completa
        setTimeout(cleanupDocument, 50);
      }
    });

    // Observa mudanças em todo o documento
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: [
        "bis_skin_checked",
        "__processed__",
        "data-grammarly-shadow-root",
      ],
    });

    // Cleanup periódico discreto
    const periodicCleanup = setInterval(cleanupDocument, 10000); // A cada 10 segundos

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(delayedTimer);
      clearInterval(periodicCleanup);
      observer.disconnect();
    };
  }, []);

  // Este componente não renderiza nada
  return null;
}
