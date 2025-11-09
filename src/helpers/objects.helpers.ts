/**
 * Objects manipulation utilities
 * Helper functions for working with objects, merging, cloning and transformation
 */

/**
 * Simple deep clone using JSON methods (works for serializable objects)
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}

/**
 * Picks specific keys from an object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only picked keys
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T, 
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specific keys from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T, 
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Checks if an object has any properties
 * @param obj - Object to check
 * @returns True if object is empty
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Gets object keys with type safety
 * @param obj - Object to get keys from
 * @returns Array of object keys
 */
export function getKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Merges two objects shallowly
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function shallowMerge<T extends Record<string, unknown>>(
  target: T, 
  source: Partial<T>
): T {
  return { ...target, ...source };
}

/**
 * Transforms object values using a mapper function
 * @param obj - Source object
 * @param mapper - Function to transform values
 * @returns New object with transformed values
 */
export function mapValues<T extends Record<string, unknown>, R>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;
  
  for (const key of getKeys(obj)) {
    result[key] = mapper(obj[key], key);
  }
  
  return result;
}