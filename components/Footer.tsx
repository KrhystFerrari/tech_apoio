"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles } from "lucide-react";
import { ClientOnly } from "@/lib/components/ClientOnly";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-t-4 border-accent-300 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Seção TechApoio */}
          <motion.div
            className="text-center md:text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-kid-lg font-fun text-purple-600 mb-4 flex items-center justify-center md:justify-start">
              <Sparkles className="w-6 h-6 mr-2 text-accent-500" />
              TechApoio
            </h3>
            <p className="text-kid-base font-kid text-gray-600 mb-4">
              Transformando o aprendizado em diversão! Uma plataforma educativa
              criada especialmente para crianças do ensino fundamental.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-red-500">
              <span className="font-kid">Feito com</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 fill-current" />
              </motion.div>
              <span className="font-kid">para crianças</span>
            </div>
          </motion.div>

          {/* Seção Áreas de Aprendizado */}
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-kid-lg font-fun text-blue-600 mb-4 flex items-center justify-center">
              <Star className="w-6 h-6 mr-2 text-accent-500" />
              Áreas de Aprendizado
            </h3>
            <ul className="space-y-2 font-kid text-gray-600">
              <li className="hover:text-red-500 transition-colors cursor-pointer">
                🔤 Português Divertido
              </li>
              <li className="hover:text-blue-500 transition-colors cursor-pointer">
                🧮 Matemática Lúdica
              </li>
              <li className="hover:text-purple-500 transition-colors cursor-pointer">
                💻 Iniciação Tecnológica
              </li>
              <li className="hover:text-green-500 transition-colors cursor-pointer">
                🔍 Ciências e Natureza
              </li>
              <li className="hover:text-teal-500 transition-colors cursor-pointer">
                🌍 Geografia
              </li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">
                🇺🇸 Inglês Básico
              </li>
            </ul>
          </motion.div>

          {/* Seção Características */}
          <motion.div
            className="text-center md:text-right"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-kid-lg font-fun text-green-600 mb-4 flex items-center justify-center md:justify-end">
              <Sparkles className="w-6 h-6 mr-2 text-accent-500" />
              Características
            </h3>
            <ul className="space-y-2 font-kid text-gray-600">
              <li>🎨 Interface lúdica e colorida</li>
              <li>🎵 Sons e animações divertidas</li>
              <li>🏆 Sistema de recompensas</li>
              <li>📱 Totalmente responsivo</li>
              <li>♿ Recursos de acessibilidade</li>
              <li>👨‍🏫 Painel para professores</li>
            </ul>
          </motion.div>
        </div>

        {/* Linha Divisória Animada */}
        <motion.div
          className="h-1 bg-gradient-to-r from-red-300 via-blue-300 to-purple-300 rounded-full mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        />

        {/* Copyright */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ClientOnly
            fallback={
              <p className="text-kid-base font-kid text-gray-600">
                © 2025 TechApoio - Plataforma Educativa.
                <span className="block sm:inline sm:ml-2">
                  Iniciação tecnológica para crianças de 6 a 10 anos.
                </span>
              </p>
            }
          >
            <p className="text-kid-base font-kid text-gray-600">
              © {currentYear} TechApoio - Plataforma Educativa.
              <span className="block sm:inline sm:ml-2">
                Iniciação tecnológica para crianças de 6 a 10 anos.
              </span>
            </p>
          </ClientOnly>
          <motion.p
            className="text-kid-sm font-kid text-gray-500 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Aprender nunca foi tão divertido! ✨
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
