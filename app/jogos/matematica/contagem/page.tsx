"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ContagemGame } from "@/components/games/ContagemGame";
import { ArrowLeft, Trophy, Star, Calculator } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContagemGamePage() {
  const { student, loading } = useAuth();
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameCompleted(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/jogos/matematica"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                🔢 Contagem Divertida
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              Olá, {student.name}! 👋
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!gameStarted && !gameCompleted ? (
          // Game Introduction
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Calculator className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🔢 Contagem Divertida
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Vamos aprender a contar de forma divertida! Count os objetos na tela 
                e descubra quantos existem.
              </p>

              {/* Game Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Observe</h3>
                  <p className="text-sm text-gray-600">Conte cuidadosamente cada objeto</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🧮</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Calcule</h3>
                  <p className="text-sm text-gray-600">Use seus dedos se precisar!</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Acerte</h3>
                  <p className="text-sm text-gray-600">Digite o número correto</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">📋 Como Jogar:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>Observe os objetos na tela</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>Conte quantos objetos existem</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">3.</span>
                    <span>Digite o número correto</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">4.</span>
                    <span>Ganhe estrelas pelo seu desempenho!</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
              >
                🚀 Começar a Contar
              </motion.button>
            </div>
          </motion.div>
        ) : gameCompleted ? (
          // Game Results
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Parabéns! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                {getResultMessage()}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score}%
                </div>
                <div className="text-sm text-gray-600 mb-4">Pontuação Final</div>
                
                <div className="flex justify-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-6 h-6 ${i < getStars() ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Jogar Novamente
                </button>
                <Link
                  href="/jogos/matematica"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all text-center"
                >
                  Voltar aos Jogos
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          // Game Component
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <ContagemGame onGameComplete={handleGameComplete} />
          </div>
        )}
      </div>
    </div>
  );
}