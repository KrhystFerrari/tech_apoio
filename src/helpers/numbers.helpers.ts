/**
 * Number conversion and formatting utilities
 * Helper functions for working with numbers, conversions and mathematical operations
 */

/**
 * Converts a number to its Portuguese word representation
 * @param num - The number to convert (1-99)
 * @returns The number as a Portuguese word
 * @example
 * numberToWords(23) // "vinte e três"
 * numberToWords(15) // "quinze"
 */
export function numberToWords(num: number): string {
  const ones = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quinze",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
  ];

  const tens = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];

  if (num < 20) return ones[num];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return tens[ten] + (one ? " e " + ones[one] : "");
  }

  return num.toString();
}

/**
 * Formats a number as percentage
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Generates a random number between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamps a number between min and max values
 * @param value - The value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
