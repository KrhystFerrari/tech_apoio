"use client";

import { motion } from "framer-motion";
import {
  User,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Star,
  Award,
  Calendar,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StudentProgressReport } from "@/src/interfaces/Reports.types";
import { cn } from "@/lib/utils";

interface StudentProgressReportViewProps {
  report: StudentProgressReport;
  onDownload?: () => void;
  className?: string;
}

export function StudentProgressReportView({
  report,
  onDownload,
  className = "",
}: Readonly<StudentProgressReportViewProps>) {
  const completionRate =
    (report.completedActivities / report.totalActivities) * 100 || 0;
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className={cn("bg-white rounded-2xl p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={24} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {report.studentName}
            </h2>
            <p className="text-gray-600">Relatório de Progresso Individual</p>
          </div>
        </div>

        {onDownload && (
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-green-600" size={24} />
            <span className="font-semibold text-green-700">Atividades</span>
          </div>
          <div className="text-2xl font-bold text-green-800">
            {report.completedActivities}
          </div>
          <div className="text-sm text-green-600">
            de {report.totalActivities} total
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-blue-600" size={24} />
            <span className="font-semibold text-blue-700">Nota Média</span>
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {report.averageScore.toFixed(1)}
          </div>
          <div className="text-sm text-blue-600">de 100 pontos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 border border-purple-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-purple-600" size={24} />
            <span className="font-semibold text-purple-700">Tempo Total</span>
          </div>
          <div className="text-2xl font-bold text-purple-800">
            {formatTime(report.totalTime)}
          </div>
          <div className="text-sm text-purple-600">de estudo</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="text-yellow-600" size={24} />
            <span className="font-semibold text-yellow-700">Badges</span>
          </div>
          <div className="text-2xl font-bold text-yellow-800">
            {report.badgesEarned}
          </div>
          <div className="text-sm text-yellow-600">conquistados</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-700">Progresso Geral</span>
          <span className="text-sm text-gray-600">
            {completionRate.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Subject Progress */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Progresso por Matéria
        </h3>
        <div className="grid gap-4">
          {report.subjectProgress.map((subject, index) => (
            <motion.div
              key={subject.subjectName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">
                  {subject.subjectName}
                </span>
                <span className="text-sm text-gray-500">
                  {subject.activities} atividades
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Nota Média:</span>
                  <span className="ml-2 font-semibold text-blue-600">
                    {subject.averageScore.toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Tempo:</span>
                  <span className="ml-2 font-semibold text-purple-600">
                    {formatTime(subject.timeSpent)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Atividades Recentes
        </h3>
        <div className="space-y-3">
          {report.recentActivities.slice(0, 5).map((activity, index) => (
            <motion.div
              key={`${activity.activityName}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium text-gray-800">
                  {activity.activityName}
                </div>
                <div className="text-sm text-gray-600">{activity.subject}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-600">
                  {activity.score} pts
                </div>
                <div className="text-xs text-gray-500">
                  {format(new Date(activity.completedAt), "dd/MM", {
                    locale: ptBR,
                  })}{" "}
                  • {formatTime(activity.timeSpent)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            Pontos Fortes
          </h3>
          <div className="space-y-2">
            {report.strengths.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 p-2 bg-green-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700">{strength}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
            <Target size={20} />
            Áreas para Melhorar
          </h3>
          <div className="space-y-2">
            {report.improvements.map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-orange-700">{improvement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
