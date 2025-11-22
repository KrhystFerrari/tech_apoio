"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import {
  BadgeNotificationProps,
  BadgeRarity,
} from "@/src/interfaces/Badge.types";

const rarityColors = {
  [BadgeRarity.COMMON]: {
    primary: "#6b7280",
    secondary: "#f3f4f6",
  },
  [BadgeRarity.RARE]: {
    primary: "#2563eb",
    secondary: "#eff6ff",
  },
  [BadgeRarity.EPIC]: {
    primary: "#7c3aed",
    secondary: "#f3e8ff",
  },
  [BadgeRarity.LEGENDARY]: {
    primary: "#d97706",
    secondary: "#fef3c7",
  },
};

export function BadgeNotification({
  badge,
  onClose,
}: Readonly<BadgeNotificationProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const colors = rarityColors[badge.rarity];

  const getRarityLabel = (rarity: BadgeRarity): string => {
    switch (rarity) {
      case BadgeRarity.COMMON:
        return "Comum";
      case BadgeRarity.RARE:
        return "Raro";
      case BadgeRarity.EPIC:
        return "Épico";
      case BadgeRarity.LEGENDARY:
        return "Lendário";
    }
  };

  const [confettiParticles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 1,
    }))
  );

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 0);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6,
          }}
          className="pointer-events-auto relative bg-white rounded-2xl shadow-2xl border-4 p-6 max-w-sm mx-4"
          style={{
            borderColor: colors.primary,
            background: `linear-gradient(135deg, white 0%, ${colors.secondary} 100%)`,
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>

          {/* Badge Content */}
          <div className="text-center">
            {/* Celebration Header */}
            <div className="mb-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: 2,
                  delay: 0.3,
                }}
                className="text-5xl mb-2"
              >
                {badge.icon}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-gray-800 mb-1"
              >
                🎉 Badge Conquistado!
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg font-semibold"
                style={{ color: colors.primary }}
              >
                {badge.name}
              </motion.h3>
            </div>

            {/* Badge Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-gray-600 mb-4 leading-relaxed"
            >
              {badge.description}
            </motion.p>

            {/* Badge Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-between items-center p-3 rounded-lg"
              style={{ backgroundColor: colors.secondary }}
            >
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: colors.primary }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: colors.primary }}
                >
                  +{badge.points} pontos
                </span>
              </div>

              <div
                className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {getRarityLabel(badge.rarity)}
              </div>
            </motion.div>
          </div>

          {/* Confetti Effect for Rare+ Badges */}
          {(badge.rarity === BadgeRarity.RARE ||
            badge.rarity === BadgeRarity.EPIC ||
            badge.rarity === BadgeRarity.LEGENDARY) && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {confettiParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute text-yellow-400"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  initial={{
                    scale: 0,
                    rotate: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: 360,
                    opacity: [0, 1, 0],
                    y: [-10, -30, -50],
                  }}
                  transition={{
                    duration: 2,
                    delay: particle.delay,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}

          {/* Legendary Glow Effect */}
          {badge.rarity === BadgeRarity.LEGENDARY && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, ${colors.primary}20, transparent, ${colors.primary}20)`,
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
