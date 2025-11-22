"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { SubjectGames } from "@/components/dashboard/SubjectGames";
import { StudentHeader, StudentFooter } from "@/components";
import { getJogosByMateria } from "@/src/helpers/games.helpers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CienciasPage() {
  const { student, logout } = useAuth();
  const router = useRouter();
  const [jogos] = useState(() => {
    // Simular dados de progresso do usuário
    const jogosData = getJogosByMateria("ciencias");
    return jogosData.map((jogo, index) => ({
      ...jogo,
      isLocked: index > 0 && !jogosData[index - 1]?.isCompleted,
      isCompleted: Math.random() > 0.7, // Simular alguns jogos completos
      score: Math.random() > 0.6 ? Math.floor(Math.random() * 100) : undefined,
      stars: Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0,
      tempo: Math.random() > 0.6 ? Math.floor(Math.random() * 20) + 5 : undefined,
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
    <div style={{ background: "white", minHeight: "100vh" }}>
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
            materia="ciencias"
            jogos={jogos}
            showFilters={true}
          />
        </div>
      </main>

      <StudentFooter />
    </div>
  );
}