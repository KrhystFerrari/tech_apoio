/**
 * Inicio page specific helper functions
 * Utilities for landing page data, statistics and content management
 */

import { LucideIcon } from 'lucide-react';

export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface TestimonialData {
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface StatItem {
  number: string;
  label: string;
}

/**
 * Gets the statistics data for the hero section
 * @returns Array of statistics to display
 */
export function getHeroStats(): StatItem[] {
  return [
    {
      number: "🏫 500+",
      label: "Escolas parceiras"
    },
    {
      number: "🎮 100+",
      label: "Jogos educativos"
    },
    {
      number: "😊 98%",
      label: "Crianças felizes"
    }
  ];
}

/**
 * Generates star rating display array
 * @param rating - Rating value (1-5)
 * @returns Array with length equal to rating for star display
 */
export function generateStarArray(rating: number): number[] {
  return Array.from({ length: rating }, (_, i) => i);
}

/**
 * Gets testimonial data
 * @returns Testimonial object with user feedback
 */
export function getTestimonialData(): TestimonialData {
  return {
    name: "Professora Ana Silva",
    location: "Escola Municipal de São Paulo",
    avatar: "👩‍🏫",
    text: "O TechApoio revolucionou nossas aulas! As crianças ficam empolgadas com os jogos educativos e eu consigo acompanhar o progresso de cada aluno facilmente. A plataforma funciona perfeitamente nos tablets da escola!",
    rating: 5
  };
}

/**
 * Gets CTA section benefits list
 * @returns Array of benefit strings for the CTA section
 */
export function getCTABenefits(): string[] {
  return [
    "🏫 Ideal para escolas e salas de aula",
    "⚡ Funciona em tempo real",
    "🎮 Jogos que as crianças adoram",
    "📊 Relatórios para professores"
  ];
}

/**
 * Extracts emoji and text from a benefit string
 * @param benefit - Benefit string with emoji and text
 * @returns Object with separated emoji and text
 */
export function extractEmojiAndText(benefit: string): { emoji: string; text: string } {
  const [emoji, ...textParts] = benefit.split(' ');
  return {
    emoji,
    text: textParts.join(' ')
  };
}

/**
 * Handles scroll effects for header
 * @param scrollY - Current scroll position
 * @param threshold - Scroll threshold (default: 50)
 * @returns True if scrolled past threshold
 */
export function shouldShowScrollEffect(scrollY: number, threshold: number = 50): boolean {
  return scrollY > threshold;
}

/**
 * Generates animated emoji sequence for sections
 * @param type - Type of section ('hero' | 'benefits' | 'platform' | 'testimonial' | 'cta')
 * @returns Emoji string for the section
 */
export function getSectionEmojis(type: 'hero' | 'benefits' | 'platform' | 'testimonial' | 'cta'): string {
  const emojiMap = {
    hero: "🚀📚✨",
    benefits: "🌈✨🎊",
    platform: "🎮🏫💡",
    testimonial: "💬⭐🏫",
    cta: "🎉🚀📚✨"
  };
  
  return emojiMap[type];
}