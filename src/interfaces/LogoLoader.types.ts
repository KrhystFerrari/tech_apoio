// LogoLoader component type definitions
export interface LogoLoaderProps {
  /**
   * Size variant for the logo loader
   * - sm: 48px container
   * - md: 64px container (default)
   * - lg: 80px container
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional CSS class name for additional styling
   */
  className?: string;

  /**
   * Loading text to display below the icon
   * @default "Carregando..."
   */
  loadingText?: string;
}

// Size configuration mapping
export interface LogoLoaderSizeConfig {
  container: number;
  icon: number;
}

export type LogoLoaderSizeMap = {
  [K in NonNullable<LogoLoaderProps["size"]>]: LogoLoaderSizeConfig;
};
