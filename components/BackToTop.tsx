"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mostrar botão quando o usuário rolar para baixo
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        if (!shouldRender) {
          setShouldRender(true);
          setIsVisible(true);
          // Pequeno delay para garantir que o elemento está no DOM
          setTimeout(() => {
            setAnimationClass("back-to-top-enter");
          }, 10);
        }
      } else if (shouldRender) {
        setAnimationClass("back-to-top-exit");
        setIsVisible(false);
        // Aguardar a animação de saída antes de remover do DOM
        setTimeout(() => {
          setShouldRender(false);
          setAnimationClass("");
        }, 300);
      }
    };

    // Verificar scroll inicial
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [shouldRender]);

  // Adicionar animação de idle após a entrada
  useEffect(() => {
    if (animationClass === "back-to-top-enter") {
      const timer = setTimeout(() => {
        setAnimationClass("back-to-top-idle");
      }, 400); // Duração da animação de entrada

      return () => clearTimeout(timer);
    }
  }, [animationClass]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className={`back-to-top-button ${animationClass}`}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 9999,
        width: "56px",
        height: "56px",
        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (isVisible) {
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(59, 130, 246, 0.5)";
          e.currentTarget.style.background =
            "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)";
          // Parar animação idle durante hover
          setAnimationClass("");
        }
      }}
      onMouseLeave={(e) => {
        if (isVisible) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(59, 130, 246, 0.3)";
          e.currentTarget.style.background =
            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)";
          // Retomar animação idle
          setAnimationClass("back-to-top-idle");
        }
      }}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ChevronUp
        style={{
          width: "24px",
          height: "24px",
          transition: "transform 0.3s ease",
        }}
      />
    </button>
  );
}
