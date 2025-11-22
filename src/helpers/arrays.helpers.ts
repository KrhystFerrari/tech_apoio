/**
 * Array manipulation utilities
 * Helper functions for working with arrays, sorting, filtering and transforming data
 */

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - The array to shuffle
 * @returns A new shuffled array
 * @example
 * shuffleArray([1, 2, 3, 4]) // [3, 1, 4, 2]
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a random element from an array
 * @param array - The array to pick from
 * @returns A random element from the array
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Creates an array of specified length filled with a value or function result
 * @param length - Length of the array
 * @param fillValue - Value or function to fill with
 * @returns New array filled with the specified value
 */
export function createFilledArray<T>(
  length: number,
  fillValue: T | ((index: number) => T)
): T[] {
  return Array.from(
    { length },
    typeof fillValue === "function"
      ? (fillValue as (index: number) => T)
      : () => fillValue
  );
}

/**
 * Removes duplicate values from an array
 * @param array - The array to deduplicate
 * @returns New array without duplicates
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Chunks an array into smaller arrays of specified size
 * @param array - The array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Groups array elements by a key function
 * @param array - The array to group
 * @param keyFn - Function to extract the grouping key
 * @returns Object with grouped elements
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}
