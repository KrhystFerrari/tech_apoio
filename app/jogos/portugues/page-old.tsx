"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { SubjectGames } from "@/components/dashboard/SubjectGames";
import { StudentHeader, StudentFooter } from "@/components";
import { getJogosByMateria } from "@/src/helpers/games.helpers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ClientOnly } from "@/lib/components/ClientOnly";

export default function JogosPortugues() {
  const { student, logout } = useAuth();
  const router = useRouter();
  const [jogos] = useState(() => {
    // Simular dados de progresso do usuário
    const jogosData = getJogosByMateria("portugues");
    return jogosData.map((jogo, index) => ({
      ...jogo,
      isLocked: index > 0 && !jogosData[index - 1]?.isCompleted,
      isCompleted: Math.random() > 0.6, // Simular alguns jogos completos
      score: Math.random() > 0.4 ? Math.floor(Math.random() * 100) : undefined,
      stars: Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0,
      tempo: Math.random() > 0.4 ? Math.floor(Math.random() * 15) + 3 : undefined,
    }));
  });

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!student) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
      <ClientOnly>
        <StudentHeader student={student} onLogout={handleLogout} />

        <main style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div className="container-logiclike">
            {/* Navegação */}
            <div className="mb-8">
              <Link 
                href="/dashboard/estudante"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft size={20} />
                Voltar ao Dashboard
              </Link>
            </div>

            {/* Conteúdo Principal */}
            <SubjectGames 
              materia="portugues"
              jogos={jogos}
              showFilters={true}
            />
          </div>
        </main>

        <StudentFooter />
      </ClientOnly>
    </div>
  );
}
