/**
 * String manipulation and formatting utilities
 * Helper functions for text processing, formatting and validation
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns String with first letter capitalized
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to title case
 * @returns String in title case
 */
export function titleCase(str: string): string {
  return str.split(" ").map(capitalize).join(" ");
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str - The string to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = "..."
): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * Removes all spaces from a string
 * @param str - The string to remove spaces from
 * @returns String without spaces
 */
export function removeSpaces(str: string): string {
  return str.replace(/\s+/g, "");
}

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns String in kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns String in camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Checks if a string is empty or only contains whitespace
 * @param str - The string to check
 * @returns True if string is empty or whitespace only
 */
export function isEmptyOrWhitespace(str: string): boolean {
  return !str?.trim();
}

/**
 * Extracts initials from a name
 * @param name - The full name
 * @param maxInitials - Maximum number of initials (default: 2)
 * @returns Initials as uppercase string
 */
export function getInitials(name: string, maxInitials: number = 2): string {
  return name
    .split(" ")
    .filter((word) => word.length > 0)
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * Generates a random string of specified length
 * @param length - Length of the string
 * @param chars - Characters to use (default: alphanumeric)
 * @returns Random string
 */
export function generateRandomString(
  length: number,
  chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
