import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  variant?: "default" | "interactive" | "game";
  className?: string;
  onClick?: () => void;
  gradient?: string;
}

export type CardVariant = "default" | "interactive" | "game";
