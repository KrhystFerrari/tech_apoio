"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  Badge,
  BadgeCardProps,
  BadgeRarity,
} from "@/src/interfaces/Badge.types";

const rarityColors: Record<
  BadgeRarity,
  { bg: string; border: string; text: string }
> = {
  [BadgeRarity.COMMON]: {
    bg: "rgba(107, 114, 128, 0.1)",
    border: "rgba(107, 114, 128, 0.3)",
    text: "#374151",
  },
  [BadgeRarity.RARE]: {
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.3)",
    text: "#2563eb",
  },
  [BadgeRarity.EPIC]: {
    bg: "rgba(168, 85, 247, 0.1)",
    border: "rgba(168, 85, 247, 0.3)",
    text: "#7c3aed",
  },
  [BadgeRarity.LEGENDARY]: {
    bg: "rgba(251, 191, 36, 0.1)",
    border: "rgba(251, 191, 36, 0.3)",
    text: "#d97706",
  },
};

const sizeClasses = {
  sm: "w-16 h-20",
  md: "w-20 h-24",
  lg: "w-24 h-28",
};

export function BadgeCard({
  badge,
  isEarned = false,
  earnedAt,
  progress,
  size = "md",
}: BadgeCardProps) {
  const rarityStyle = rarityColors[badge.rarity];
  const sizeClass = sizeClasses[size];

  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center p-3 rounded-xl",
        "border-2 transition-all duration-200",
        sizeClass,
        isEarned
          ? "bg-white shadow-lg cursor-pointer hover:shadow-xl"
          : "bg-gray-50 opacity-60"
      )}
      style={{
        borderColor: isEarned ? rarityStyle.border : "#d1d5db",
        backgroundColor: isEarned ? rarityStyle.bg : "#f9fafb",
      }}
      whileHover={isEarned ? { scale: 1.05, y: -2 } : {}}
      whileTap={isEarned ? { scale: 0.98 } : {}}
    >
      {/* Badge Icon */}
      <div
        className="text-2xl mb-1 filter"
        style={{
          filter: isEarned ? "none" : "grayscale(100%) opacity(0.4)",
        }}
      >
        {badge.icon}
      </div>

      {/* Badge Name */}
      <h4
        className="text-xs font-semibold text-center leading-tight"
        style={{
          color: isEarned ? rarityStyle.text : "#6b7280",
          fontSize:
            size === "sm" ? "0.625rem" : size === "md" ? "0.75rem" : "0.875rem",
        }}
      >
        {badge.name}
      </h4>

      {/* Earned Date */}
      {isEarned && earnedAt && (
        <p className="text-xs text-gray-500 mt-1">
          {format(new Date(earnedAt), "dd/MM", { locale: ptBR })}
        </p>
      )}

      {/* Progress Bar for Unearned Badges */}
      {!isEarned && progress && (
        <div className="w-full mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div
              className="bg-blue-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            {progress.currentValue}/{progress.targetValue}
          </p>
        </div>
      )}

      {/* Rarity Indicator */}
      {isEarned && (
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: rarityStyle.text }}
        >
          <div className="text-white text-xs font-bold">
            {badge.rarity === BadgeRarity.COMMON
              ? "C"
              : badge.rarity === BadgeRarity.RARE
              ? "R"
              : badge.rarity === BadgeRarity.EPIC
              ? "E"
              : "L"}
          </div>
        </div>
      )}

      {/* Shine Effect for Legendary */}
      {isEarned && badge.rarity === BadgeRarity.LEGENDARY && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-30"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
            repeatDelay: 2,
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)",
            borderRadius: "inherit",
          }}
        />
      )}
    </motion.div>
  );
}

export function BadgeTooltip({
  badge,
  isEarned,
  earnedAt,
}: {
  badge: Badge;
  isEarned: boolean;
  earnedAt?: Date;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border max-w-xs">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{badge.icon}</div>
        <div>
          <h3 className="font-bold text-lg">{badge.name}</h3>
          <p className="text-sm text-gray-500 capitalize">
            {badge.rarity.toLowerCase()}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{badge.description}</p>

      <div className="border-t pt-3">
        <p className="text-xs text-gray-500 mb-1">
          <strong>Requisito:</strong> {badge.requirement}
        </p>
        <p className="text-xs text-gray-500">
          <strong>Pontos:</strong> {badge.points}
        </p>

        {isEarned && earnedAt && (
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ✅ Conquistado em{" "}
            {format(new Date(earnedAt), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        )}

        {!isEarned && (
          <p className="text-xs text-orange-600 mt-2 font-semibold">
            🔒 Ainda não conquistado
          </p>
        )}
      </div>
    </div>
  );
}
