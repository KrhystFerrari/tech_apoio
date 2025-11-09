import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export type ButtonVariant = "primary" | "secondary" | "success" | "accent";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonIconPosition = "left" | "right";