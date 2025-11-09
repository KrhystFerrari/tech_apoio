"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Importar BackToTop dinamicamente sem SSR para evitar hydration mismatch
const BackToTop = dynamic(() => import("./BackToTop"), {
  ssr: false,
});

export default function ConditionalBackToTop() {
  const pathname = usePathname();

  // Páginas onde não queremos mostrar o botão back to top
  const excludedPages = [
    "/login",
    "/login/estudante",
    "/login/professor",
    "/cadastro",
    "/cadastro/estudante",
    "/cadastro/professor",
  ];

  // Verificar se a página atual está na lista de exclusão
  const shouldShowBackToTop = !excludedPages.includes(pathname);

  if (!shouldShowBackToTop) {
    return null;
  }

  return <BackToTop />;
}
