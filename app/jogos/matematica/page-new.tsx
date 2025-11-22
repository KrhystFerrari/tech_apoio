"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowLeft, Play, Lock, Star, Trophy, Calculator } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ConditionalBackToTop from "@/components/ConditionalBackToTop";

interface Jogo {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  icon: React.ReactNode;
  href: string;
  isLocked?: boolean;
  requiredScore?: number;
}

const jogos: Jogo[] = [
  {
    id: "contagem",
    title: "🔢 Jogo da Contagem",
    description: "Conte os objetos e aprenda os números de forma divertida",
    difficulty: "Fácil",
    icon: <Calculator className="w-6 h-6" />,
    href: "/jogos/matematica/contagem",
  },
  {
    id: "operacoes",
    title: "➕ Operações Básicas",
    description: "Pratique somas e subtrações com problemas interativos",
    difficulty: "Médio",
    icon: <Calculator className="w-6 h-6" />,
    href: "/jogos/matematica/operacoes",
  },
];

export default function MatematicaPage() {
  const { student, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800 border-green-200";
      case "Médio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Difícil":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/estudante"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                🔢 Matemática
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Pontos: 0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Calculator className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo à Matemática!
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore o mundo dos números através de jogos divertidos e
              interativos. Aprenda contagem, operações básicas e muito mais!
            </p>
          </div>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jogos.map((jogo, index) => (
            <motion.div
              key={jogo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div
                className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden ${
                  jogo.isLocked ? "opacity-75" : "hover:scale-[1.02]"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      {jogo.icon}
                    </div>
                    {jogo.isLocked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-gray-300" />
                        <Star className="w-4 h-4 text-gray-300" />
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {jogo.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {jogo.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        jogo.difficulty
                      )}`}
                    >
                      {jogo.difficulty}
                    </span>

                    {jogo.isLocked ? (
                      <div className="text-xs text-gray-500">
                        Desbloqueie com {jogo.requiredScore}% no jogo anterior
                      </div>
                    ) : (
                      <Link
                        href={jogo.href}
                        className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                      >
                        <Play className="w-4 h-4" />
                        <span>Jogar</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Seu Progresso em Matemática
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Jogos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">0%</div>
              <div className="text-sm text-gray-600">Taxa de Acerto</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Problemas Resolvidos</div>
            </div>
          </div>
        </motion.div>
      </div>

      <ConditionalBackToTop />
    </div>
  );
}
