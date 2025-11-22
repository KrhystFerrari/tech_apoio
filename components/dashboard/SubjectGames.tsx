"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Calculator, Microscope, Award } from "lucide-react";
import { GameCard } from "./GameCard";

interface Game {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  dificuldade: string;
  cor: string;
  materia: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  score?: number;
  stars?: number;
  tempo?: number;
}

interface SubjectGamesProps {
  materia: string;
  jogos: Game[];
  viewMode?: "grid" | "list";
  showFilters?: boolean;
  className?: string;
}

const MATERIAS_INFO = {
  portugues: {
    nome: "Português Mágico",
    emoji: "📖",
    cor: "#3b82f6",
    icon: BookOpen,
  },
  matematica: {
    nome: "Matemática Legal",
    emoji: "🔢",
    cor: "#22c55e",
    icon: Calculator,
  },
  ciencias: {
    nome: "Ciências Incríveis",
    emoji: "🔬",
    cor: "#f59e0b",
    icon: Microscope,
  },
};

export const SubjectGames = ({
  materia,
  jogos,
  viewMode = "grid",
  showFilters = true,
  className = "",
}: SubjectGamesProps) => {
  const [filtro, setFiltro] = useState<"todos" | "concluidos" | "pendentes">(
    "todos"
  );
  const [dificuldade, setDificuldade] = useState<
    "todas" | "fácil" | "médio" | "difícil"
  >("todas");
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<
    "nome" | "dificuldade" | "progresso"
  >("nome");

  const materiaInfo = MATERIAS_INFO[materia as keyof typeof MATERIAS_INFO] || {
    nome: materia,
    emoji: "🎮",
    cor: "#6b7280",
    icon: BookOpen,
  };

  const jogosFiltrados = useMemo(() => {
    let jogosProcessados = [...jogos];

    // Filtro por status
    if (filtro === "concluidos") {
      jogosProcessados = jogosProcessados.filter((jogo) => jogo.isCompleted);
    } else if (filtro === "pendentes") {
      jogosProcessados = jogosProcessados.filter(
        (jogo) => !jogo.isCompleted && !jogo.isLocked
      );
    }

    // Filtro por dificuldade
    if (dificuldade !== "todas") {
      jogosProcessados = jogosProcessados.filter(
        (jogo) => jogo.dificuldade.toLowerCase() === dificuldade
      );
    }

    // Filtro por busca
    if (busca.trim()) {
      jogosProcessados = jogosProcessados.filter(
        (jogo) =>
          jogo.nome.toLowerCase().includes(busca.toLowerCase()) ||
          jogo.descricao.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Ordenação
    jogosProcessados.sort((a, b) => {
      switch (ordenacao) {
        case "dificuldade": {
          const niveis = { fácil: 1, médio: 2, difícil: 3 };
          return (
            niveis[a.dificuldade.toLowerCase() as keyof typeof niveis] -
            niveis[b.dificuldade.toLowerCase() as keyof typeof niveis]
          );
        }
        case "progresso":
          return (b.score || 0) - (a.score || 0);
        default:
          return a.nome.localeCompare(b.nome);
      }
    });

    return jogosProcessados;
  }, [jogos, filtro, dificuldade, busca, ordenacao]);

  const estatisticas = useMemo(() => {
    const total = jogos.length;
    const concluidos = jogos.filter((j) => j.isCompleted).length;
    const pendentes = jogos.filter((j) => !j.isCompleted && !j.isLocked).length;
    const bloqueados = jogos.filter((j) => j.isLocked).length;
    const pontuacaoTotal = jogos.reduce((acc, j) => acc + (j.score || 0), 0);
    const estrelasTotal = jogos.reduce((acc, j) => acc + (j.stars || 0), 0);

    return {
      total,
      concluidos,
      pendentes,
      bloqueados,
      progresso: total > 0 ? Math.round((concluidos / total) * 100) : 0,
      pontuacaoMedia: total > 0 ? Math.round(pontuacaoTotal / total) : 0,
      estrelasTotal,
    };
  }, [jogos]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header da Matéria */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{ backgroundColor: materiaInfo.cor }}
          >
            {materiaInfo.emoji}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {materiaInfo.nome}
            </h2>
            <p className="text-gray-600">
              {estatisticas.total} jogos disponíveis
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {estatisticas.progresso}%
          </div>
          <p className="text-sm text-gray-600">Concluído</p>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {estatisticas.concluidos}
          </div>
          <p className="text-sm text-blue-700">Concluídos</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {estatisticas.pendentes}
          </div>
          <p className="text-sm text-yellow-700">Pendentes</p>
        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {estatisticas.pontuacaoMedia}%
          </div>
          <p className="text-sm text-green-700">Pontuação Média</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
            <Award size={20} />
            {estatisticas.estrelasTotal}
          </div>
          <p className="text-sm text-purple-700">Estrelas</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      {showFilters && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Buscar jogos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-4">
              <select
                value={filtro}
                onChange={(e) =>
                  setFiltro(
                    e.target.value as "todos" | "concluidos" | "pendentes"
                  )
                }
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="concluidos">Concluídos</option>
                <option value="pendentes">Pendentes</option>
              </select>

              <select
                value={dificuldade}
                onChange={(e) =>
                  setDificuldade(
                    e.target.value as "todas" | "fácil" | "médio" | "difícil"
                  )
                }
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="todas">Todas</option>
                <option value="fácil">Fácil</option>
                <option value="médio">Médio</option>
                <option value="difícil">Difícil</option>
              </select>

              <select
                value={ordenacao}
                onChange={(e) =>
                  setOrdenacao(
                    e.target.value as "nome" | "dificuldade" | "progresso"
                  )
                }
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="nome">Nome</option>
                <option value="dificuldade">Dificuldade</option>
                <option value="progresso">Progresso</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Jogos */}
      <AnimatePresence>
        {jogosFiltrados.length > 0 ? (
          <div
            className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            `}
          >
            {jogosFiltrados.map((jogo, index) => (
              <motion.div
                key={jogo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <GameCard {...jogo} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum jogo encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
