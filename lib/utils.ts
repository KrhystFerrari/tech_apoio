import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Utilitários específicos para a plataforma infantil
export const kidStyles = {
  button: {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white font-kid font-bold py-3 px-6 rounded-kid shadow-kid hover:shadow-kid-lg transition-all duration-300 transform hover:scale-105",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 text-white font-kid font-bold py-3 px-6 rounded-kid shadow-kid hover:shadow-kid-lg transition-all duration-300 transform hover:scale-105",
    success:
      "bg-success-500 hover:bg-success-600 text-white font-kid font-bold py-3 px-6 rounded-kid shadow-kid hover:shadow-kid-lg transition-all duration-300 transform hover:scale-105",
    accent:
      "bg-accent-500 hover:bg-accent-600 text-gray-800 font-kid font-bold py-3 px-6 rounded-kid shadow-kid hover:shadow-kid-lg transition-all duration-300 transform hover:scale-105",
  },
  card: {
    base: "bg-white rounded-kid-lg shadow-kid p-6 border-2 border-gray-100 hover:shadow-kid-lg transition-all duration-300",
    interactive:
      "bg-white rounded-kid-lg shadow-kid p-6 border-2 border-gray-100 hover:shadow-kid-lg transition-all duration-300 transform hover:scale-105 cursor-pointer",
    game: "bg-gradient-to-br from-purple-100 to-blue-100 rounded-kid-lg shadow-kid-lg p-8 border-4 border-white hover:shadow-fun transition-all duration-300 transform hover:scale-105",
  },
  text: {
    title: "text-kid-2xl font-fun text-gray-800 mb-4",
    subtitle: "text-kid-lg font-kid font-bold text-gray-700 mb-3",
    body: "text-kid-base font-kid text-gray-600",
    button: "text-kid-base font-kid font-bold",
  },
  container: {
    page: "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",
    main: "container mx-auto px-4 py-8",
    section: "mb-12",
  },
};

// Cores por área de conhecimento
export const subjectColors = {
  portugues: {
    primary: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    gradient: "from-red-100 to-pink-100",
  },
  matematica: {
    primary: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    gradient: "from-blue-100 to-indigo-100",
  },
  tecnologia: {
    primary: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-200",
    gradient: "from-purple-100 to-violet-100",
  },
  ciencias: {
    primary: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    gradient: "from-green-100 to-emerald-100",
  },
  historia: {
    primary: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    gradient: "from-amber-100 to-yellow-100",
  },
  geografia: {
    primary: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-200",
    gradient: "from-teal-100 to-cyan-100",
  },
  ingles: {
    primary: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    gradient: "from-orange-100 to-red-100",
  },
};
