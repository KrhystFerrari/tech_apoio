"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  BookOpen,
  Activity,
  TrendingUp,
  Filter,
  Download,
} from "lucide-react";
import {
  ReportGeneratorProps,
  ReportType,
  ReportFilters,
} from "@/src/interfaces/Reports.types";
import { cn } from "@/lib/utils";

const reportTypes = [
  {
    type: ReportType.STUDENT_PROGRESS,
    title: "Progresso do Estudante",
    description: "Análise detalhada do progresso individual de cada aluno",
    icon: Users,
    color: "blue",
  },
  {
    type: ReportType.CLASS_OVERVIEW,
    title: "Visão Geral da Turma",
    description: "Métricas e desempenho geral da turma",
    icon: FileText,
    color: "green",
  },
  {
    type: ReportType.SUBJECT_PERFORMANCE,
    title: "Performance por Matéria",
    description: "Análise de desempenho em cada disciplina",
    icon: BookOpen,
    color: "purple",
  },
  {
    type: ReportType.ACTIVITY_ANALYTICS,
    title: "Análise de Atividades",
    description: "Estatísticas detalhadas de atividades específicas",
    icon: Activity,
    color: "orange",
  },
  {
    type: ReportType.ENGAGEMENT_REPORT,
    title: "Relatório de Engajamento",
    description: "Análise de uso e engajamento da plataforma",
    icon: TrendingUp,
    color: "pink",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "text-blue-600",
    button: "bg-blue-500 hover:bg-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "text-green-600",
    button: "bg-green-500 hover:bg-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    icon: "text-purple-600",
    button: "bg-purple-500 hover:bg-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    icon: "text-orange-600",
    button: "bg-orange-500 hover:bg-orange-600",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    icon: "text-pink-600",
    button: "bg-pink-500 hover:bg-pink-600",
  },
};

export function ReportGenerator({
  onGenerate,
  loading = false,
}: Readonly<ReportGeneratorProps>) {
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);

  const [filters, setFilters] = useState<ReportFilters>(() => ({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 dias atrás
    endDate: new Date(),
    studentIds: [],
    subjectIds: [],
    activityIds: [],
  }));

  const handleGenerate = () => {
    if (selectedType) {
      onGenerate(selectedType, filters);
    }
  };

  const selectedReportType = reportTypes.find((rt) => rt.type === selectedType);
  const colorClass = selectedReportType
    ? colorClasses[selectedReportType.color as keyof typeof colorClasses]
    : null;

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📊 Gerar Novo Relatório
        </h2>
        <p className="text-gray-600">
          Escolha o tipo de relatório e configure os filtros para análise
        </p>
      </div>

      {/* Report Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText size={20} />
          Tipo de Relatório
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((reportType) => {
            const isSelected = selectedType === reportType.type;
            const colors =
              colorClasses[reportType.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={reportType.type}
                onClick={() => setSelectedType(reportType.type)}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  "hover:shadow-md",
                  isSelected
                    ? `${colors.bg} ${colors.border} shadow-md`
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isSelected ? colors.bg : "bg-gray-100"
                    )}
                  >
                    <reportType.icon
                      size={20}
                      className={isSelected ? colors.icon : "text-gray-600"}
                    />
                  </div>
                  <h4
                    className={cn(
                      "font-semibold",
                      isSelected ? colors.text : "text-gray-700"
                    )}
                  >
                    {reportType.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reportType.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </h3>

          <div
            className={cn(
              "p-4 rounded-xl border",
              colorClass?.bg,
              colorClass?.border
            )}
          >
            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Data Inicial
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={filters.startDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      startDate: new Date(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Data Final
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={filters.endDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      endDate: new Date(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Date Presets */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600">
                Períodos rápidos:
              </span>
              {[
                { label: "Última semana", days: 7 },
                { label: "Último mês", days: 30 },
                { label: "Último trimestre", days: 90 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      startDate: new Date(
                        Date.now() - preset.days * 24 * 60 * 60 * 1000
                      ),
                      endDate: new Date(),
                    }))
                  }
                  className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Additional Filters based on report type */}
            {selectedType === ReportType.STUDENT_PROGRESS && (
              <div>
                <label
                  htmlFor="student-names"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Estudantes Específicos (opcional)
                </label>
                <input
                  id="student-names"
                  type="text"
                  placeholder="Digite nomes dos estudantes separados por vírgula"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Generate Button */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl",
              "transition-all duration-200 disabled:opacity-50",
              colorClass?.button || "bg-blue-500 hover:bg-blue-600"
            )}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Gerando...
              </>
            ) : (
              <>
                <Download size={18} />
                Gerar Relatório
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
