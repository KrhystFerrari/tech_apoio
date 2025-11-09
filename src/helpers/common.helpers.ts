/**
 * Common utility constants and helper functions
 * Shared constants and utilities used across the application
 */

/**
 * Application constants
 */
export const APP_CONSTANTS = {
  // Game settings
  GAME_COMPLETION_TARGET: 3,
  GAME_MAX_ATTEMPTS: 10,
  CELEBRATION_DURATION: 2000,
  
  // UI settings
  SCROLL_THRESHOLD: 50,
  MOBILE_BREAKPOINT: 768,
  ANIMATION_DURATION: 300,
  
  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_AGE: 6,
  MAX_AGE: 100,
  
  // Local storage keys
  STORAGE_KEYS: {
    USER_SESSION: 'tech_apoio_user_session',
    GAME_PROGRESS: 'tech_apoio_game_progress',
    THEME_PREFERENCE: 'tech_apoio_theme',
    LANGUAGE_PREFERENCE: 'tech_apoio_language'
  },
  
  // API endpoints
  API_ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GAMES: '/api/jogos',
    PROFILE: '/api/profile'
  }
} as const;

/**
 * Common error messages in Portuguese
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Por favor, insira um email válido',
  INVALID_PASSWORD: 'A senha deve ter pelo menos 8 caracteres',
  PASSWORD_MISMATCH: 'As senhas não coincidem',
  INVALID_AGE: 'Idade deve estar entre 6 e 100 anos',
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
  UNAUTHORIZED: 'Acesso negado. Faça login novamente.',
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente mais tarde.',
  NOT_FOUND: 'Recurso não encontrado',
  INVALID_CPF: 'CPF inválido',
  INVALID_PHONE: 'Número de telefone inválido'
} as const;

/**
 * Success messages in Portuguese
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  REGISTER_SUCCESS: 'Conta criada com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  GAME_COMPLETED: 'Parabéns! Jogo concluído!',
  DATA_SAVED: 'Dados salvos com sucesso!',
  EMAIL_SENT: 'Email enviado com sucesso!'
} as const;

/**
 * Color palette for the application
 */
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe', 
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a'
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    900: '#0f172a'
  },
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4'
} as const;

/**
 * Common regex patterns
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  NUMBERS_ONLY: /^\d+$/,
  LETTERS_ONLY: /^[a-zA-ZÀ-ÿ\s]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9À-ÿ\s]+$/
} as const;

/**
 * Utility function to create a delay
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Utility function to debounce function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Utility function to throttle function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T, 
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}