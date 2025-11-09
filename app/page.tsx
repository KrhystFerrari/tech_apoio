"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de início
    router.push("/inicio");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-xl font-kid text-gray-700">
          Carregando a aventura... 🚀
        </p>
      </div>
    </div>
  );
}
