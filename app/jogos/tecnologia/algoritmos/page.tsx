"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AlgoritmosPage() {
  const { student, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/jogos/tecnologia"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                Voltar
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                🔄 Algoritmos
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-white rounded-xl shadow-lg border p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 relative"
            >
              <span className="text-4xl opacity-50">🔄</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Jogo Bloqueado
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Complete o jogo &quot;Programação Básica&quot; com pelo menos 70%
              de aproveitamento para desbloquear este desafio de algoritmos!
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-yellow-900 mb-4">
                🎯 Requisitos para Desbloqueio:
              </h3>
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-yellow-800">
                    Complete Programação Básica
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-yellow-800">
                    Obtenha pelo menos 70% de acerto
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-yellow-800">
                    Demonstre conhecimento dos comandos básicos
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <Link
                href="/jogos/tecnologia/programacao-basica"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all"
              >
                Ir para Programação Básica
              </Link>
              <Link
                href="/jogos/tecnologia"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Voltar
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
