/**
 * FormePalavras Game specific helper functions
 * Utilities for game logic, scoring, validation and word management
 */

import { shuffleArray, getRandomElement } from './arrays.helpers';
import type { Palavra } from '../interfaces/FormePalavrasGame.types';

/**
 * Shuffles the letters of a word
 * @param word - The word to shuffle
 * @returns Array of shuffled letters
 */
export function shuffleWordLetters(word: string): string[] {
  return shuffleArray(word.split(''));
}

/**
 * Gets a random word from a list of words
 * @param words - Array of word objects
 * @returns Random word object
 */
export function getRandomWord(words: Palavra[]): Palavra {
  return getRandomElement(words);
}

/**
 * Calculates the game score based on attempts and correct answers
 * @param correct - Number of correct answers
 * @param attempts - Total number of attempts
 * @returns Score as percentage (0-100)
 */
export function calculateGameScore(correct: number, attempts: number): number {
  if (attempts === 0) return 0;
  return Math.round((correct / attempts) * 100);
}

/**
 * Validates if the formed word matches the target word
 * @param formedWord - The word formed by the player
 * @param targetWord - The target word to match
 * @returns True if words match (case insensitive)
 */
export function validateWord(formedWord: string, targetWord: string): boolean {
  return formedWord.toLowerCase() === targetWord.toLowerCase();
}

/**
 * Creates empty slots for letter placement
 * @param wordLength - Length of the word
 * @returns Array of null values representing empty slots
 */
export function createEmptySlots(wordLength: number): (string | null)[] {
  return new Array(wordLength).fill(null);
}

/**
 * Generates confetti data for celebration animation
 * @param count - Number of confetti pieces (default: 20)
 * @returns Array of confetti objects with position and animation data
 */
export function generateConfettiData(count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 600,
    delay: Math.random() * 0.5,
    emoji: getRandomElement(["🌟", "🎊", "🎈", "✨", "🎯"])
  }));
}

/**
 * Checks if the game is complete based on correct answers
 * @param correct - Number of correct answers
 * @param target - Target number of correct answers to complete game (default: 3)
 * @returns True if game is complete
 */
export function isGameComplete(correct: number, target: number = 3): boolean {
  return correct >= target;
}

/**
 * Gets progress percentage for the game
 * @param correct - Number of correct answers
 * @param target - Target number of correct answers (default: 3)
 * @returns Progress as percentage (0-100)
 */
export function getGameProgress(correct: number, target: number = 3): number {
  return Math.min((correct / target) * 100, 100);
}

/**
 * Handles letter placement in word slots
 * @param slots - Current letter slots
 * @param letter - Letter to place
 * @param position - Position to place the letter
 * @returns Updated slots array
 */
export function placeLetter(
  slots: (string | null)[], 
  letter: string, 
  position: number
): (string | null)[] {
  const newSlots = [...slots];
  newSlots[position] = letter;
  return newSlots;
}

/**
 * Removes a letter from a specific position
 * @param slots - Current letter slots
 * @param position - Position to remove letter from
 * @returns Object with updated slots and removed letter
 */
export function removeLetter(
  slots: (string | null)[], 
  position: number
): { slots: (string | null)[]; removedLetter: string | null } {
  const newSlots = [...slots];
  const removedLetter = newSlots[position];
  newSlots[position] = null;
  return { slots: newSlots, removedLetter };
}