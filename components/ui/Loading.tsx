"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingProps } from "@/src/interfaces/Loading.types";

const sizes = {
  sm: { container: "w-12 h-12", icon: 20 },
  md: { container: "w-16 h-16", icon: 28 },
  lg: { container: "w-20 h-20", icon: 36 },
};

export default function Loading({
  size = "md",
  variant = "spinner",
  color = "primary",
  className,
  text,
}: Readonly<LoadingProps>) {
  const sizeConfig = sizes[size];

  if (variant === "spinner") {
    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <motion.div
          className={cn(
            "border-4 border-gray-200 rounded-full",
            sizeConfig.container,
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

  // Variant bounce agora usa BookOpen
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <motion.div
        className={cn(
          "rounded-full bg-primary-500 flex items-center justify-center",
          sizeConfig.container
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <BookOpen size={sizeConfig.icon} color="white" />
      </motion.div>
      {text && (
        <p className="mt-3 text-kid-base font-kid text-gray-600">{text}</p>
      )}
    </div>
  );
}
