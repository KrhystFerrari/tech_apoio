/**
 * Styles and CSS helper functions
 * Utilities for class management, style calculations and responsive design
 */

/**
 * Maps for converting inline styles to Tailwind classes
 */
const styleMappers = {
  fontSize: {
    '48px': 'text-5xl',
    '64px': 'text-6xl', 
    '18px': 'text-lg',
    '24px': 'text-2xl',
    '36px': 'text-4xl',
    '20px': 'text-xl',
    '16px': 'text-base',
    '14px': 'text-sm'
  },
  marginBottom: {
    '20px': 'mb-5',
    '24px': 'mb-6',
    '40px': 'mb-10',
    '60px': 'mb-15'
  },
  marginTop: {
    '60px': 'mt-15',
    '40px': 'mt-10',
    '20px': 'mt-5'
  },
  textAlign: {
    'center': 'text-center',
    'left': 'text-left',
    'right': 'text-right'
  },
  padding: {
    '40px': 'p-10',
    '20px': 'p-5'
  },
  maxWidth: {
    '600px': 'max-w-2xl',
    '800px': 'max-w-4xl'
  },
  margin: {
    '0 auto': 'mx-auto'
  },
  minHeight: {
    '100vh': 'min-h-screen'
  },
  background: {
    'white': 'bg-white',
    'var(--gray-50)': 'bg-gray-50',
    'var(--primary-blue)': 'bg-primary-500'
  },
  color: {
    'white': 'text-white',
    'var(--text-secondary)': 'text-gray-600',
    'var(--text-primary)': 'text-gray-900',
    'var(--text-muted)': 'text-gray-500'
  }
} as const;

/**
 * Replaces inline styles with equivalent Tailwind CSS classes
 * @param styles - Object containing CSS styles
 * @returns Tailwind CSS class string
 */
export function inlineStylesToTailwind(styles: Record<string, string | number>): string {
  const classes: string[] = [];

  for (const [property, value] of Object.entries(styles)) {
    const mapper = styleMappers[property as keyof typeof styleMappers];
    if (mapper) {
      const tailwindClass = mapper[value as keyof typeof mapper];
      if (tailwindClass) {
        classes.push(tailwindClass);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Common Tailwind class combinations for frequently used styles
 */
export const commonStyles = {
  // Typography
  heroTitle: 'text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6',
  sectionTitle: 'text-3xl md:text-4xl font-bold text-center mb-4',
  sectionSubtitle: 'text-lg md:text-xl text-gray-600 text-center mb-8',
  cardTitle: 'text-xl font-semibold mb-3',
  cardDescription: 'text-gray-600 leading-relaxed',

  // Layout
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 md:py-16 lg:py-20',
  card: 'bg-white rounded-lg shadow-md p-6',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',

  // Interactive elements
  button: 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
  buttonPrimary: 'bg-primary-500 text-white hover:bg-primary-600',
  buttonSecondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  buttonOutline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',

  // States
  loading: 'animate-pulse bg-gray-200 rounded',
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',

  // Responsive
  mobileOnly: 'block md:hidden',
  desktopOnly: 'hidden md:block',
  mobileMenu: 'md:hidden',
  desktopMenu: 'hidden md:flex',
} as const;

/**
 * Generates responsive classes for different screen sizes
 * @param baseClass - Base class name
 * @param sizes - Object with breakpoint sizes
 * @returns Responsive class string
 */
export function responsiveClass(
  baseClass: string,
  sizes: Partial<{
    sm: string;
    md: string;
    lg: string;
    xl: string;
  }>
): string {
  const classes = [baseClass];

  for (const [breakpoint, size] of Object.entries(sizes)) {
    if (size) {
      classes.push(`${breakpoint}:${baseClass}-${size}`);
    }
  }

  return classes.join(' ');
}

/**
 * Creates a grid layout class with responsive columns
 * @param cols - Number of columns for different breakpoints
 * @returns Grid class string
 */
export function gridCols(cols: {
  default: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}): string {
  const classes = [`grid-cols-${cols.default}`];

  if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);

  return `grid ${classes.join(' ')}`;
}

/**
 * Combines multiple class strings and removes duplicates
 * @param classes - Array of class strings
 * @returns Combined class string without duplicates
 */
export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter((cls, index, arr) => cls && arr.indexOf(cls) === index)
    .join(' ');
}