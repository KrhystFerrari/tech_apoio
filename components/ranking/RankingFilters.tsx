"use client";

import { motion } from "framer-motion";
import { Calendar, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RankingFiltersProps,
  RankingPeriod,
} from "@/src/interfaces/Ranking.types";

const periodOptions = [
  { value: RankingPeriod.DAILY, label: "Hoje", emoji: "📅" },
  { value: RankingPeriod.WEEKLY, label: "Esta Semana", emoji: "📊" },
  { value: RankingPeriod.MONTHLY, label: "Este Mês", emoji: "🗓️" },
  { value: RankingPeriod.YEARLY, label: "Este Ano", emoji: "📈" },
  { value: RankingPeriod.ALL_TIME, label: "Histórico", emoji: "🏆" },
];

export function RankingFilters({
  selectedPeriod,
  selectedSubject,
  subjects,
  onPeriodChange,
  onSubjectChange,
}: RankingFiltersProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col gap-4">
        {/* Period Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-700">Período</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {periodOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => onPeriodChange(option.value)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "border flex items-center gap-2",
                  selectedPeriod === option.value
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{option.emoji}</span>
                <span className="text-sm">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Book size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-700">Matéria</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* All Subjects Option */}
            <motion.button
              onClick={() => onSubjectChange(undefined)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                "border flex items-center gap-2",
                !selectedSubject
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>🎯</span>
              <span className="text-sm">Geral</span>
            </motion.button>

            {/* Individual Subject Options */}
            {subjects.map((subject) => {
              const getSubjectEmoji = (name: string) => {
                switch (name.toLowerCase()) {
                  case "português":
                    return "📚";
                  case "matemática":
                    return "🔢";
                  case "ciências":
                    return "🔬";
                  case "tecnologia":
                    return "💻";
                  case "geografia":
                    return "🌍";
                  case "inglês":
                    return "🇺🇸";
                  default:
                    return "📖";
                }
              };

              return (
                <motion.button
                  key={subject.id}
                  onClick={() => onSubjectChange(subject.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    "border flex items-center gap-2",
                    selectedSubject === subject.id
                      ? "bg-purple-500 text-white border-purple-500 shadow-md"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{getSubjectEmoji(subject.name)}</span>
                  <span className="text-sm">{subject.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
