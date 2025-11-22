"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Star, Gift } from "lucide-react";
import { BadgeNotification } from "@/src/helpers/badge-actions.helpers";

interface BadgeNotificationSystemProps {
  notifications: BadgeNotification[];
  onDismiss: (index: number) => void;
  autoHide?: boolean;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center";
}

export function BadgeNotificationSystem({
  notifications,
  onDismiss,
  autoHide = true,
  position = "top-right",
}: Readonly<BadgeNotificationSystemProps>) {
  useEffect(() => {
    if (!autoHide) return;

    const timers: NodeJS.Timeout[] = [];

    for (const [index] of notifications.entries()) {
      const timer = setTimeout(() => {
        onDismiss(index);
      }, 5000); // Auto-hide após 5 segundos
      timers.push(timer);
    }

    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [notifications, onDismiss, autoHide]);

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      default:
        return "top-4 right-4";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500";
      case "epic":
        return "from-purple-400 to-pink-500";
      case "rare":
        return "from-blue-400 to-indigo-500";
      default:
        return "from-green-400 to-emerald-500";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Trophy className="text-yellow-600" size={24} />;
      case "epic":
        return <Star className="text-purple-600" size={24} />;
      case "rare":
        return <Gift className="text-blue-600" size={24} />;
      default:
        return <Star className="text-green-600" size={24} />;
    }
  };

  return (
    <div className={`fixed z-50 pointer-events-none ${getPositionClasses()}`}>
      <div className="space-y-3 max-w-sm">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={`${notification.badge.id}-${index}`}
              initial={{
                opacity: 0,
                x: position.includes("right") ? 300 : -300,
                scale: 0.8,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: position.includes("right") ? 300 : -300,
                scale: 0.8,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                delay: index * 0.1,
              }}
              className="pointer-events-auto"
            >
              <BadgeNotificationCard
                notification={notification}
                onDismiss={() => onDismiss(index)}
                rarityColor={getRarityColor(notification.badge.rarity)}
                rarityIcon={getRarityIcon(notification.badge.rarity)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface BadgeNotificationCardProps {
  notification: BadgeNotification;
  onDismiss: () => void;
  rarityColor: string;
  rarityIcon: React.ReactNode;
}

function BadgeNotificationCard({
  notification,
  onDismiss,
  rarityColor,
  rarityIcon,
}: Readonly<BadgeNotificationCardProps>) {
  const isNewBadge = notification.type === "new";

  const getRarityBadgeClass = (rarity: string): string => {
    switch (rarity) {
      case "legendary":
        return "bg-yellow-100 text-yellow-700";
      case "epic":
        return "bg-purple-100 text-purple-700";
      case "rare":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl shadow-2xl border-2 overflow-hidden
        ${isNewBadge ? "border-yellow-400" : "border-gray-200"}
      `}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${rarityColor} opacity-10`}
      />

      {/* Close Button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 z-10 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
      >
        <X size={14} className="text-gray-600" />
      </button>

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {rarityIcon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-800 text-sm">
                {isNewBadge ? "🏆 Novo Badge!" : "⭐ Progresso!"}
              </h3>
              <span
                className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${getRarityBadgeClass(notification.badge.rarity)}
              `}
              >
                {notification.badge.rarity}
              </span>
            </div>
          </div>
        </div>

        {/* Badge Info */}
        <div className="flex items-start gap-3">
          <div className="text-3xl">{notification.badge.icon}</div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">
              {notification.badge.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

            {isNewBadge && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {notification.badge.description}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-yellow-600">
                    +{notification.badge.points} pts
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Celebration Effect for New Badges */}
        {isNewBadge && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="relative w-full h-full">
              {new Array(6).fill(null).map((_, i) => (
                <motion.div
                  key={`confetti-${notification.badge.id}-${i}`}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 100}%`,
                    y: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 100}%`,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Hook para gerenciar notificações de badges
export function useBadgeNotifications() {
  const [notifications, setNotifications] = useState<BadgeNotification[]>([]);

  const addNotification = (notification: BadgeNotification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const addNotifications = (newNotifications: BadgeNotification[]) => {
    setNotifications((prev) => [...prev, ...newNotifications]);
  };

  const dismissNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    addNotifications,
    dismissNotification,
    clearAll,
  };
}
