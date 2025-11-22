"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LeaderboardProps,
  RankingCardProps,
} from "@/src/interfaces/Ranking.types";

const positionIcons = {
  1: { icon: Trophy, color: "#FFD700", bgColor: "#FFF8DC" },
  2: { icon: Medal, color: "#C0C0C0", bgColor: "#F5F5F5" },
  3: { icon: Award, color: "#CD7F32", bgColor: "#FFF8DC" },
};

function RankingCard({
  entry,
  isCurrentUser = false,
  showTrend = true,
  size = "md",
}: RankingCardProps) {
  const isTopThree = entry.position <= 3;
  const positionData =
    positionIcons[entry.position as keyof typeof positionIcons];

  const cardClasses = cn(
    "flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
    "border hover:shadow-lg",
    isCurrentUser
      ? "bg-blue-50 border-blue-200 shadow-md"
      : "bg-white border-gray-200 hover:border-gray-300",
    isTopThree && "ring-2",
    entry.position === 1 && "ring-yellow-200",
    entry.position === 2 && "ring-gray-200",
    entry.position === 3 && "ring-orange-200",
    size === "sm" && "p-3",
    size === "lg" && "p-5"
  );

  const getTrendIcon = () => {
    if (!showTrend || !entry.trend) return null;

    switch (entry.trend) {
      case "up":
        return <TrendingUp size={16} className="text-green-500" />;
      case "down":
        return <TrendingDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: entry.position * 0.1 }}
      className={cardClasses}
    >
      {/* Position */}
      <div className="flex items-center justify-center min-w-[60px]">
        {isTopThree && positionData ? (
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full"
            style={{ backgroundColor: positionData.bgColor }}
          >
            <positionData.icon
              size={24}
              style={{ color: positionData.color }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-xl font-bold text-gray-600">
            {entry.position}
          </div>
        )}
      </div>

      {/* Student Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={cn(
              "font-semibold truncate",
              isCurrentUser ? "text-blue-700" : "text-gray-900",
              size === "sm"
                ? "text-sm"
                : size === "lg"
                ? "text-lg"
                : "text-base"
            )}
          >
            {entry.studentName}
            {isCurrentUser && (
              <span className="ml-2 text-xs text-blue-500">(Você)</span>
            )}
          </h3>
          {getTrendIcon()}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            🏆 {entry.totalBadges} badges
          </span>
          <span className="flex items-center gap-1">
            ⭐ {entry.totalActivities} atividades
          </span>
        </div>
      </div>

      {/* Points */}
      <div className="text-right">
        <div
          className={cn(
            "font-bold",
            isCurrentUser ? "text-blue-700" : "text-gray-900",
            size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"
          )}
        >
          {entry.points.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">pontos</div>
      </div>
    </motion.div>
  );
}

function PodiumDisplay({
  topThree,
}: {
  topThree: RankingCardProps["entry"][];
}) {
  const podiumHeights = ["120px", "150px", "100px"]; // 2º, 1º, 3º
  const podiumOrder = [topThree[1], topThree[0], topThree[2]]; // Reordenar para 2º, 1º, 3º

  return (
    <div className="flex items-end justify-center gap-4 mb-8 py-6">
      {podiumOrder.map((entry, index) => {
        if (!entry) return null;

        const realPosition = entry.position;
        const positionData =
          positionIcons[realPosition as keyof typeof positionIcons];
        const height = podiumHeights[index];

        return (
          <motion.div
            key={entry.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Student */}
            <div className="mb-4 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2 mx-auto"
                style={{ backgroundColor: positionData.bgColor }}
              >
                <positionData.icon
                  size={32}
                  style={{ color: positionData.color }}
                />
              </div>
              <div className="font-semibold text-sm text-gray-900 max-w-[100px] truncate">
                {entry.studentName}
              </div>
              <div
                className="text-lg font-bold"
                style={{ color: positionData.color }}
              >
                {entry.points.toLocaleString()}
              </div>
            </div>

            {/* Podium */}
            <div
              className="w-20 rounded-t-lg flex items-end justify-center pb-2"
              style={{
                height,
                background: `linear-gradient(to top, ${positionData.color}40, ${positionData.color}20)`,
              }}
            >
              <div className="text-2xl font-bold text-white">
                {realPosition}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function Leaderboard({
  leaderboardData,
  currentStudentId,
  maxEntries = 10,
  className = "",
}: LeaderboardProps) {
  const topThree = leaderboardData.rankings.slice(0, 3);
  const remainingEntries = leaderboardData.rankings.slice(3, maxEntries);

  // Encontrar posição do estudante atual se não estiver no top
  const currentStudentEntry = currentStudentId
    ? leaderboardData.rankings.find(
        (entry) => entry.studentId === currentStudentId
      )
    : null;

  const shouldShowCurrentStudent =
    currentStudentEntry && currentStudentEntry.position > maxEntries;

  return (
    <div className={cn("bg-white rounded-2xl p-6", className)}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🏆 Ranking dos Campeões
        </h2>
        <p className="text-gray-600">
          {leaderboardData.subjectName || "Classificação Geral"} •{" "}
          {leaderboardData.period === "WEEKLY"
            ? "Esta Semana"
            : leaderboardData.period === "MONTHLY"
            ? "Este Mês"
            : leaderboardData.period === "DAILY"
            ? "Hoje"
            : "Histórico"}
        </p>
      </div>

      {/* Podium for Top 3 */}
      {topThree.length > 0 && <PodiumDisplay topThree={topThree} />}

      {/* Remaining Rankings */}
      {remainingEntries.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-center mb-4">
            Outros Competidores
          </h3>
          {remainingEntries.map((entry) => (
            <RankingCard
              key={entry.id}
              entry={entry}
              isCurrentUser={entry.studentId === currentStudentId}
              showTrend={leaderboardData.period !== "ALL_TIME"}
            />
          ))}
        </div>
      )}

      {/* Current Student if Outside Top */}
      {shouldShowCurrentStudent && currentStudentEntry && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 text-sm mb-3 text-center">
            Sua Posição
          </h4>
          <RankingCard
            entry={currentStudentEntry}
            isCurrentUser={true}
            showTrend={leaderboardData.period !== "ALL_TIME"}
          />
        </div>
      )}

      {/* Empty State */}
      {leaderboardData.rankings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ranking em Construção
          </h3>
          <p className="text-gray-600">
            Complete algumas atividades para aparecer no ranking!
          </p>
        </div>
      )}
    </div>
  );
}
