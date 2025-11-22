"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ComputadoresPage() {
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
                💻 Conhecendo o Computador
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
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">💻</span>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Em Desenvolvimento
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Este jogo sobre as partes do computador está sendo criado! Em
              breve você poderá aprender sobre processador, memória, teclado,
              mouse e muito mais de forma interativa.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-4">
                🔧 O que você vai aprender:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-blue-800">
                    Partes básicas do computador
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-blue-800">
                    Função de cada componente
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-blue-800">
                    Como usar mouse e teclado
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-blue-800">
                    Cuidados com o equipamento
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/jogos/tecnologia"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Tecnologia</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
