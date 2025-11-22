"use client";

import { BookOpen, Calculator, Computer, Microscope } from "lucide-react";
import Link from "next/link";
import {
  getJogosByMateria,
  calculateMateriaStats,
  MATERIAS_INFO,
} from "@/src/helpers/games.helpers";

interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<{
    style?: React.CSSProperties;
    className?: string;
  }>;
  activities: number;
  completed: number;
}

interface StudentSubjectsGridProps {
  subjects?: Subject[];
}

// Função para converter dados dos helpers em formato do componente
const getSubjectData = () => {
  const materias = [
    {
      id: "portugues",
      icon: BookOpen,
    },
    {
      id: "matematica",
      icon: Calculator,
    },
    {
      id: "tecnologia",
      name: "💻 Mundo Tech",
      description: "Computadores e programação!",
      color: "#8b5cf6",
      icon: Computer,
      activities: 3,
      completed: 1,
    },
    {
      id: "ciencias",
      icon: Microscope,
    },
  ];

  return materias.map((materia) => {
    if (materia.id === "tecnologia") {
      return materia;
    }

    const jogos = getJogosByMateria(materia.id);
    const materiaInfo = MATERIAS_INFO[materia.id as keyof typeof MATERIAS_INFO];
    const stats = calculateMateriaStats(jogos);

    return {
      id: materia.id,
      name: materiaInfo?.nome || materia.id,
      description: materiaInfo?.descricao || "Jogos educativos divertidos!",
      color: materiaInfo?.cor || "#6b7280",
      icon: materia.icon,
      activities: stats.total,
      completed: stats.concluidos,
    };
  });
};

export const StudentSubjectsGrid = ({ subjects }: StudentSubjectsGridProps) => {
  const subjectData = subjects || getSubjectData();

  return (
    <section className="section-spacing">
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "1rem",
          }}
        >
          🎯 Suas Matérias Favoritas
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#666666",
            margin: 0,
          }}
        >
          Continue de onde parou e desbloqueie novos desafios!
        </p>
      </div>

      <div
        className="features-grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {subjectData.map((subject) => {
          const Icon = subject.icon;
          const activities = subject.activities || 0;
          const completed = subject.completed || 0;
          const progress = activities > 0 ? (completed / activities) * 100 : 0;
          const isAvailable = activities > 0;

          return (
            <div key={subject.id} className="card card-interactive">
              <div className="card-content" style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: subject.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "white",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#f3f4f6",
                      color: "#666666",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                    }}
                  >
                    {completed}/{activities}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {subject.name}
                </h3>

                <p
                  style={{
                    color: "#666666",
                    fontSize: "0.875rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {subject.description}
                </p>

                {/* Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: subject.color,
                      borderRadius: "4px",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>

                {isAvailable ? (
                  <Link href={`/jogos/${subject.id}`} className="block w-full">
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        backgroundColor: subject.color,
                      }}
                    >
                      🎮 {completed > 0 ? "Continuar" : "Começar"}
                    </button>
                  </Link>
                ) : (
                  <button
                    className="btn"
                    style={{
                      width: "100%",
                      backgroundColor: "#d1d5db",
                      color: "#6b7280",
                      cursor: "not-allowed",
                    }}
                    disabled
                  >
                    🚧 Em Breve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
