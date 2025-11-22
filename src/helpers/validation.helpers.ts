/**
 * Form validation helper functions
 * Utilities for form validation, error handling and input processing
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormField {
  name: string;
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => boolean;
}

/**
 * Validates a single form field
 * @param field - Field configuration and value
 * @returns Validation result with errors
 */
export function validateField(field: FormField): ValidationResult {
  const errors: string[] = [];
  const { value, required, minLength, maxLength, pattern, customValidator } =
    field;

  // Required validation
  if (required && (!value || value.trim() === "")) {
    errors.push(`${field.name} é obrigatório`);
    return { isValid: false, errors };
  }

  // Skip other validations if field is empty and not required
  if (!value) {
    return { isValid: true, errors: [] };
  }

  // Minimum length validation
  if (minLength && value.length < minLength) {
    errors.push(`${field.name} deve ter pelo menos ${minLength} caracteres`);
  }

  // Maximum length validation
  if (maxLength && value.length > maxLength) {
    errors.push(`${field.name} deve ter no máximo ${maxLength} caracteres`);
  }

  // Pattern validation
  if (pattern && !pattern.test(value)) {
    errors.push(`${field.name} tem formato inválido`);
  }

  // Custom validation
  if (customValidator && !customValidator(value)) {
    errors.push(`${field.name} não atende aos critérios especificados`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates multiple form fields
 * @param fields - Array of field configurations
 * @returns Validation result for all fields
 */
export function validateForm(fields: FormField[]): ValidationResult {
  const allErrors: string[] = [];

  for (const field of fields) {
    const fieldResult = validateField(field);
    allErrors.push(...fieldResult.errors);
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

/**
 * Sanitizes form input by removing harmful characters
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "");
}

/**
 * Formats form errors for display
 * @param errors - Array of error strings
 * @returns Formatted error message
 */
export function formatFormErrors(errors: string[]): string {
  if (errors.length === 0) return "";
  if (errors.length === 1) return errors[0];

  return `• ${errors.join("\n• ")}`;
}

/**
 * Validates Brazilian CPF format
 * @param cpf - CPF string to validate
 * @returns True if CPF format is valid
 */
export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // All same digits

  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cleanCPF[i]) * (10 - i);
  }

  let checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;

  if (Number.parseInt(cleanCPF[9]) !== checkDigit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cleanCPF[i]) * (11 - i);
  }

  checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;

  return Number.parseInt(cleanCPF[10]) === checkDigit;
}

/**
 * Formats phone number for display
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(
      2,
      6
    )}-${cleanPhone.slice(6)}`;
  }

  if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(
      2,
      7
    )}-${cleanPhone.slice(7)}`;
  }

  return phone;
}
