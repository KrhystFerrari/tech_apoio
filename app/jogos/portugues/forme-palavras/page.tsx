"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { FormePalavrasGame } from "@/components/games/FormePalavrasGame";
import { ArrowLeft, Trophy, Star, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FormePalavrasGamePage() {
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
    if (score >= 90) return "🌟 Incrível! Você é um mestre das palavras!";
    if (score >= 70) return "🎉 Muito bem! Seu vocabulário está ótimo!";
    if (score >= 50) return "👍 Bom trabalho! Continue praticando!";
    return "💪 Não desista! A leitura faz a diferença!";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-400 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Preparando o jogo...</p>
          <p className="text-sm text-gray-500 mt-1">🔤 Embaralhando as letras</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/jogos/portugues"
                className="flex items-center text-gray-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                🔤 Forme Palavras
              </h1>
            </div>
            <div className="text-sm bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-2 rounded-full shadow-lg font-medium">
              Olá, {student.name}! 👋
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!gameStarted && !gameCompleted ? (
          // Modern Game Introduction
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
              </div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <BookOpen className="w-12 h-12 text-white" />
                </motion.div>
                
                <h2 className="text-4xl font-bold mb-4">
                  🔤 Forme Palavras
                </h2>
                <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Vamos formar palavras arrastando as letras para o lugar correto! 
                  Desenvolva sua habilidade de leitura e escrita de forma divertida.
                </p>

                {/* Game Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">🔤</span>
                    </div>
                    <h3 className="font-bold text-white mb-2">Letras</h3>
                    <p className="text-sm text-purple-100">Arraste as letras na ordem certa</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">📝</span>
                    </div>
                    <h3 className="font-bold text-white mb-2">Palavras</h3>
                    <p className="text-sm text-purple-100">Forme palavras conhecidas</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="font-bold text-white mb-2">Acerte</h3>
                    <p className="text-sm text-purple-100">Complete as palavras corretamente</p>
                  </motion.div>
                </div>

                {/* Instructions */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 text-left border border-white/10"
                >
                  <h3 className="font-bold text-white mb-4 text-center">📋 Como Jogar:</h3>
                  <div className="space-y-3 text-sm text-purple-100">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>Observe a imagem e descubra que palavra representa</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>Arraste as letras embaralhadas para formar a palavra</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>Coloque as letras na ordem correta</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span>Ganhe estrelas pelo seu desempenho!</span>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameStarted(true)}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
                >
                  🚀 Começar a Formar
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : gameCompleted ? (
          // Modern Game Results
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/10 rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-2">
                  Parabéns! 🎉
                </h3>
                <p className="text-purple-100 mb-6 text-lg">
                  {getResultMessage()}
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                  <div className="text-5xl font-bold text-white mb-2">
                    {score}%
                  </div>
                  <div className="text-sm text-purple-100 mb-4">Pontuação Final</div>
                  
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-8 h-8 ${i < getStars() ? 'text-yellow-300 fill-current' : 'text-white/30'}`}
                      />
                    ))}
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-purple-100 mb-1">
                        <span>Precisão</span>
                        <span>{score}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayAgain}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold border border-white/30 transition-all"
                  >
                    🔄 Jogar Novamente
                  </motion.button>
                  <Link href="/jogos/portugues">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold transition-all text-center shadow-lg"
                    >
                      📚 Voltar aos Jogos
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Game Component
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <FormePalavrasGame onGameComplete={handleGameComplete} />
          </div>
        )}
      </div>
    </div>
  );
}