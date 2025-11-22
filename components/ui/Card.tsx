"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CardProps } from "@/src/interfaces/Card.types";

const variants = {
  default: "bg-white border-2 border-gray-100",
  interactive:
    "bg-white border-2 border-gray-100 hover:shadow-kid-lg cursor-pointer transform hover:scale-105",
  game: "bg-gradient-to-br border-4 border-white hover:shadow-fun cursor-pointer",
};

export default function Card({
  children,
  variant = "default",
  className,
  onClick,
  gradient = "from-purple-100 to-blue-100",
}: Readonly<CardProps>) {
  const Component = onClick ? motion.div : "div";

  return (
    <Component
      onClick={onClick}
      className={cn(
        // Estilos base
        "rounded-kid-lg shadow-kid p-6 transition-all duration-300",
        // Variantes
        variants[variant],
        // Gradient para cards de jogo
        variant === "game" && `bg-gradient-to-br ${gradient}`,
        className
      )}
      {...(onClick && {
        whileHover: { scale: 1.05, y: -5 },
        whileTap: { scale: 0.95 },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      })}
    >
      {children}
    </Component>
  );
}
