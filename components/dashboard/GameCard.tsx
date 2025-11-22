"use client";

import { motion } from "framer-motion";
import {
  Play,
  Star,
  Clock,
  Target,
  Trophy,
  Lock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface GameCardProps {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  dificuldade: string;
  cor: string;
  materia: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  score?: number;
  stars?: number;
  tempo?: number;
  className?: string;
  onClick?: () => void;
}

export const GameCard = ({
  id,
  nome,
  descricao,
  emoji,
  dificuldade,
  cor,
  materia,
  isLocked = false,
  isCompleted = false,
  score,
  stars = 0,
  tempo,
  className = "",
  onClick,
}: GameCardProps) => {
  const getDifficultyColor = () => {
    switch (dificuldade.toLowerCase()) {
      case "fácil":
        return "#22c55e";
      case "médio":
        return "#f59e0b";
      case "difícil":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getDifficultyEmoji = () => {
    switch (dificuldade.toLowerCase()) {
      case "fácil":
        return "🟢";
      case "médio":
        return "🟡";
      case "difícil":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLocked ? { y: -5 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`
          card card-interactive h-full
          ${isLocked ? "opacity-60" : ""}
          ${isCompleted ? "border-green-300 bg-green-50/20" : ""}
        `}
        style={{
          cursor: isLocked ? "not-allowed" : "pointer",
          borderColor: isCompleted ? "#22c55e" : undefined,
        }}
        onClick={!isLocked ? onClick : undefined}
      >
        <div className="card-content p-6">
          {/* Status Indicators */}
          <div className="absolute top-3 right-3 flex gap-2">
            {isCompleted && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
            )}

            {isLocked && (
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <Lock size={14} className="text-white" />
              </div>
            )}
          </div>

          {/* Game Icon & Difficulty */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              style={{ backgroundColor: cor }}
            >
              {emoji}
            </div>

            <div className="text-right">
              <div
                className="px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: getDifficultyColor() }}
              >
                {getDifficultyEmoji()} {dificuldade}
              </div>
            </div>
          </div>

          {/* Game Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
            {nome}
          </h3>

          {/* Game Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{descricao}</p>

          {/* Game Stats */}
          {(score !== undefined || stars > 0 || tempo) && !isLocked && (
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              {score !== undefined && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Target size={14} />
                  <span>{score}%</span>
                </div>
              )}

              {stars > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span>{stars}</span>
                </div>
              )}

              {tempo && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock size={14} />
                  <span>{tempo}min</span>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-auto">
            {isLocked ? (
              <button
                className="w-full py-3 px-4 bg-gray-400 text-white rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2"
                disabled
              >
                <Lock size={18} />
                Bloqueado
              </button>
            ) : (
              <Link
                href={`/jogos/${materia.toLowerCase()}/${id}`}
                className="block w-full"
              >
                <button
                  className="w-full py-3 px-4 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ backgroundColor: cor }}
                >
                  {isCompleted ? (
                    <>
                      <Trophy size={18} />
                      Jogar Novamente
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      {score !== undefined ? "Continuar" : "Jogar"}
                    </>
                  )}
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Trophy size={16} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
