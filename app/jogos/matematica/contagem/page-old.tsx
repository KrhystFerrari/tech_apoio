"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ContagemGame } from "@/components/games/ContagemGame";
import { ArrowLeft, Trophy, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContagemGamePage() {
  const { student } = useAuth();
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!student) {
      router.push("/login/estudante");
    }
  }, [student, router]);

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameCompleted(true);
    // Aqui poderia salvar o progresso no banco de dados
  };

  const handlePlayAgain = () => {
    setGameCompleted(false);
    setGameStarted(false);
    setScore(0);
  };

  const getStars = () => {
    if (score >= 90) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;
    return 0;
  };

  const getResultMessage = () => {
    if (score >= 90) return "🌟 Incrível! Você é um mestre da contagem!";
    if (score >= 70) return "🎉 Muito bem! Excelente trabalho!";
    if (score >= 50) return "👍 Bom trabalho! Continue praticando!";
    return "💪 Não desista! Tente novamente!";
  };

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/jogos/matematica"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft size={20} />
              Voltar aos Jogos de Matemática
            </Link>

            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-800">
                🔢 Contagem Divertida
              </h1>
              <p className="text-sm text-gray-600">Olá, {student.name}!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!gameStarted && !gameCompleted ? (
          // Game Introduction
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <div className="text-8xl mb-6">🔢</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Contagem Divertida
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Conte os animais e objetos que aparecem na tela e escolha a
                resposta correta!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm font-medium text-green-700">Objetivo</p>
                  <p className="text-xs text-green-600">Contar corretamente</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">⏱️</div>
                  <p className="text-sm font-medium text-blue-700">Tempo</p>
                  <p className="text-xs text-blue-600">Sem pressa!</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="text-sm font-medium text-yellow-700">
                    Dificuldade
                  </p>
                  <p className="text-xs text-yellow-600">Fácil</p>
                </div>
              </div>

              <button
                onClick={() => setGameStarted(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
              >
                🚀 Começar a Jogar!
              </button>
            </div>
          </motion.div>
        ) : gameCompleted ? (
          // Game Results
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="text-8xl mb-6">🏆</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Parabéns!
              </h2>

              <p className="text-lg text-gray-600 mb-6">{getResultMessage()}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <Trophy className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Pontuação
                  </p>
                  <p className="text-2xl font-bold text-green-600">{score}%</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-yellow-700 mb-1">
                    Estrelas
                  </p>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= getStars()
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  🔄 Jogar Novamente
                </button>

                <Link href="/jogos/matematica">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    📚 Outros Jogos
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          // Game Component
          <ContagemGame onGameComplete={handleGameComplete} />
        )}
      </main>
    </div>
  );
}
