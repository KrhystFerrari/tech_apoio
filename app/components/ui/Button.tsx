"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonProps } from "@/src/interfaces/Button.types";

const variants = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white",
  secondary: "bg-secondary-500 hover:bg-secondary-600 text-white",
  success: "bg-success-500 hover:bg-success-600 text-white",
  accent: "bg-accent-500 hover:bg-accent-600 text-gray-800",
};

const sizes = {
  sm: "py-2 px-4 text-kid-sm",
  md: "py-3 px-6 text-kid-base",
  lg: "py-4 px-8 text-kid-lg",
  xl: "py-5 px-10 text-kid-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  onClick,
  disabled = false,
  type = "button",
}: Readonly<ButtonProps>) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Estilos base
        "font-kid font-bold rounded-kid shadow-kid hover:shadow-kid-lg",
        "transition-all duration-300 transform hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "flex items-center justify-center gap-2",
        // Variantes
        variants[variant],
        // Tamanhos
        sizes[size],
        className
      )}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </motion.button>
  );
}
