"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowLeft, Play, Lock, Star, Trophy, BookOpen } from "lucide-react";
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
    id: "forme-palavras",
    title: "🔤 Forme Palavras",
    description: "Forme palavras arrastando as letras na ordem correta",
    difficulty: "Fácil",
    icon: <BookOpen className="w-6 h-6" />,
    href: "/jogos/portugues/forme-palavras",
  },
];

export default function PortuguesPage() {
  const { student, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">
            Preparando sua aventura...
          </p>
          <p className="text-sm text-gray-500 mt-1">
            📚 Carregando jogos de Português
          </p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/estudante"
                className="flex items-center text-gray-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                📚 Português
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-2 rounded-full shadow-lg">
                <Trophy className="w-4 h-4 text-yellow-300" />
                <span className="font-medium">Pontos: 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          {/* Gradient Hero Background */}
          <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="text-center lg:text-left lg:flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                  >
                    <BookOpen className="w-10 h-10 text-white" />
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    📚 Português
                  </h1>
                  <p className="text-xl text-purple-100 mb-6 leading-relaxed max-w-lg">
                    Explore o fascinante mundo das palavras! Aprenda letras,
                    forme palavras e desenvolva suas habilidades de leitura de
                    forma divertida.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-2xl">🔤</span>
                      <span className="text-sm font-medium">
                        Formar Palavras
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-2xl">📖</span>
                      <span className="text-sm font-medium">
                        Aprender Letras
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-8xl md:text-9xl"
                  >
                    📝
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modern Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jogos.map((jogo, index) => (
            <motion.div
              key={jogo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              <div
                className={`relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-purple-100 ${
                  jogo.isLocked
                    ? "opacity-75"
                    : "hover:scale-[1.02] cursor-pointer"
                }`}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full -ml-16 -mb-16"></div>
                </div>

                <div className="relative z-10 p-6">
                  {/* Header com ícone e status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      {jogo.icon}
                    </div>
                    {jogo.isLocked ? (
                      <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
                        <Lock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">
                          Bloqueado
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-300 fill-current"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                      {jogo.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {jogo.description}
                    </p>

                    {/* Difficulty Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                          jogo.difficulty
                        )}`}
                      >
                        {jogo.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">
                        🎯 0% completo
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    {jogo.isLocked ? (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">
                          Desbloqueie com {jogo.requiredScore}% no jogo anterior
                        </p>
                        <div className="w-full bg-gray-200 rounded-lg py-3 text-gray-400 font-medium text-sm">
                          🔒 Bloqueado
                        </div>
                      </div>
                    ) : (
                      <Link href={jogo.href}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl py-3 px-4 font-semibold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Começar Aventura</span>
                        </motion.div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  📊 Seu Progresso em Português
                </h3>
                <p className="text-purple-100">
                  Acompanhe sua jornada de aprendizado
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1">0</div>
                  <div className="text-purple-100 text-sm">
                    Jogos Concluídos
                  </div>
                  <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl">🔤</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">0</div>
                  <div className="text-purple-100 text-sm">
                    Palavras Formadas
                  </div>
                  <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1">0</div>
                  <div className="text-purple-100 text-sm">
                    Letras Aprendidas
                  </div>
                  <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-pink-400 h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </motion.div>
              </div>

              {/* Motivational Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-8 text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <p className="text-purple-100 text-sm">
                  ✨ <strong>Dica do dia:</strong> A leitura abre portas para
                  mundos incríveis! Continue explorando e descobrindo novas
                  palavras.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <ConditionalBackToTop />
    </div>
  );
}
