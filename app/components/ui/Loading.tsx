"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LoadingProps } from "@/src/interfaces/Loading.types";

const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function Loading({
  size = "md",
  variant = "spinner",
  color = "primary",
  className,
  text,
}: Readonly<LoadingProps>) {
  if (variant === "spinner") {
    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <motion.div
          className={cn(
            "border-4 border-gray-200 rounded-full",
            sizes[size],
            `border-t-${color}-500`
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {text && (
          <p className="mt-3 text-kid-base font-kid text-gray-600">{text}</p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => {
            let dotSize: string;
            switch (size) {
              case "sm":
                dotSize = "w-2 h-2";
                break;
              case "md":
                dotSize = "w-3 h-3";
                break;
              default:
                dotSize = "w-4 h-4";
            }
            return (
              <motion.div
                key={i}
                className={cn("rounded-full bg-primary-500", dotSize)}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </div>
        {text && (
          <p className="mt-3 text-kid-base font-kid text-gray-600">{text}</p>
        )}
      </div>
    );
  }

  if (variant === "bounce") {
    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <div className="flex space-x-1">
          {["🎮", "🎨", "🚀"].map((emoji, i) => (
            <motion.div
              key={`emoji-${emoji}`}
              className={cn(
                "text-2xl",
                size === "sm" && "text-lg",
                size === "lg" && "text-4xl"
              )}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
        {text && (
          <p className="mt-3 text-kid-base font-kid text-gray-600">{text}</p>
        )}
      </div>
    );
  }

  return null;
}
