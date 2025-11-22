"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  processBadgesAfterGameAction,
  GameAction,
} from "@/src/helpers/badge-actions.helpers";
import {
  BadgeNotificationSystem,
  useBadgeNotifications,
} from "@/components/badges/BadgeNotificationSystem";
import { useAuth } from "@/lib/contexts/AuthContext";

interface Comando {
  id: string;
  texto: string;
  acao: string;
  cor: string;
}

interface Questao {
  id: string;
  titulo: string;
  objetivo: string;
  comandosDisponiveis: Comando[];
  sequenciaCorreta: string[];
  dica: string;
  personagemInicial: { x: number; y: number };
  obstaculo?: { x: number; y: number };
  meta: { x: number; y: number };
}

interface ProgramacaoGameProps {
  onGameComplete?: (score: number) => void;
}

const COMANDOS: Comando[] = [
  {
    id: "andar-direita",
    texto: "➡️ Andar Direita",
    acao: "direita",
    cor: "bg-blue-500",
  },
  {
    id: "andar-esquerda",
    texto: "⬅️ Andar Esquerda",
    acao: "esquerda",
    cor: "bg-green-500",
  },
  {
    id: "andar-cima",
    texto: "⬆️ Andar Cima",
    acao: "cima",
    cor: "bg-purple-500",
  },
  {
    id: "andar-baixo",
    texto: "⬇️ Andar Baixo",
    acao: "baixo",
    cor: "bg-orange-500",
  },
  { id: "pular", texto: "🦘 Pular", acao: "pular", cor: "bg-yellow-500" },
];

const QUESTOES: Questao[] = [
  {
    id: "1",
    titulo: "Primeira Aventura",
    objetivo: "Ajude o robô a chegar na estrela!",
    comandosDisponiveis: COMANDOS.slice(0, 2), // só direita e esquerda
    sequenciaCorreta: ["direita", "direita"],
    dica: "O robô precisa andar 2 passos para a direita",
    personagemInicial: { x: 0, y: 0 },
    meta: { x: 2, y: 0 },
  },
  {
    id: "2",
    titulo: "Navegando em L",
    objetivo: "Faça o robô seguir o caminho em L",
    comandosDisponiveis: COMANDOS.slice(0, 4), // direita, esquerda, cima, baixo
    sequenciaCorreta: ["direita", "direita", "cima"],
    dica: "Ande 2 passos para a direita, depois 1 para cima",
    personagemInicial: { x: 0, y: 0 },
    meta: { x: 2, y: 1 },
  },
  {
    id: "3",
    titulo: "Pulando Obstáculos",
    objetivo: "Use o comando pular para evitar o obstáculo",
    comandosDisponiveis: COMANDOS, // todos os comandos
    sequenciaCorreta: ["direita", "pular", "direita"],
    dica: "Ande, pule o obstáculo e continue andando",
    personagemInicial: { x: 0, y: 0 },
    obstaculo: { x: 1, y: 0 },
    meta: { x: 2, y: 0 },
  },
];

export function ProgramacaoGame({
  onGameComplete,
}: Readonly<ProgramacaoGameProps>) {
  const { student } = useAuth();
  const { notifications, dismissNotification } = useBadgeNotifications();

  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [sequenciaUsuario, setSequenciaUsuario] = useState<string[]>([]);
  const [executando, setExecutando] = useState(false);
  const [posicaoPersonagem, setPosicaoPersonagem] = useState({ x: 0, y: 0 });
  const [gameComplete, setGameComplete] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [mostrandoDica, setMostrandoDica] = useState(false);

  const questao = QUESTOES[questaoAtual];

  const resetarJogo = useCallback(() => {
    setSequenciaUsuario([]);
    setPosicaoPersonagem(questao.personagemInicial);
    setExecutando(false);
  }, [questao.personagemInicial]);

  const getComandoColor = (comandoId: string): string => {
    switch (comandoId) {
      case "andar-direita":
        return "linear-gradient(135deg, #007bff 0%, #0056b3 100%)";
      case "andar-esquerda":
        return "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)";
      case "andar-cima":
        return "linear-gradient(135deg, #6f42c1 0%, #59359a 100%)";
      case "andar-baixo":
        return "linear-gradient(135deg, #fd7e14 0%, #e55a00 100%)";
      default:
        return "linear-gradient(135deg, #ffc107 0%, #e0a800 100%)";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => resetarJogo(), 0);
    return () => clearTimeout(timer);
  }, [questaoAtual, resetarJogo]);

  const adicionarComando = (comando: Comando) => {
    if (executando || gameComplete) return;

    if (sequenciaUsuario.length < 10) {
      // limite de comandos
      setSequenciaUsuario((prev) => [...prev, comando.acao]);
    }
  };

  const removerUltimoComando = () => {
    if (executando || gameComplete) return;
    setSequenciaUsuario((prev) => prev.slice(0, -1));
  };

  const limparSequencia = () => {
    if (executando || gameComplete) return;
    setSequenciaUsuario([]);
  };

  const executarComando = (
    comando: string,
    posicaoAtual: { x: number; y: number }
  ) => {
    switch (comando) {
      case "direita":
        return { ...posicaoAtual, x: posicaoAtual.x + 1 };
      case "esquerda":
        return { ...posicaoAtual, x: posicaoAtual.x - 1 };
      case "cima":
        return { ...posicaoAtual, y: posicaoAtual.y + 1 };
      case "baixo":
        return { ...posicaoAtual, y: posicaoAtual.y - 1 };
      case "pular":
        return posicaoAtual; // Animação de pulo (pode pular sobre obstáculo)
      default:
        return posicaoAtual;
    }
  };

  const verificarSucesso = (posicaoFinal: { x: number; y: number }) => {
    const chegouNaMeta =
      posicaoFinal.x === questao.meta.x && posicaoFinal.y === questao.meta.y;
    const sequenciaCorreta =
      JSON.stringify(sequenciaUsuario) ===
      JSON.stringify(questao.sequenciaCorreta);
    return chegouNaMeta && sequenciaCorreta;
  };

  const processarSucesso = async () => {
    setAcertos((prev) => prev + 1);
    toast.success("🎉 Parabéns! Você resolveu!");

    if (questaoAtual < QUESTOES.length - 1) {
      setTimeout(() => setQuestaoAtual((prev) => prev + 1), 2000);
    } else {
      await finalizarJogo();
    }
  };

  const finalizarJogo = async () => {
    setGameComplete(true);
    const score = Math.round(((acertos + 1) / tentativas) * 100);
    onGameComplete?.(score);

    if (student) {
      await processarBadges(score);
    }
  };

  const processarBadges = async (score: number) => {
    const gameAction: GameAction = {
      studentId: student!.id,
      gameId: "programacao-basica",
      materia: "tecnologia",
      questionsAnswered: tentativas,
      correctAnswers: acertos + 1,
      scorePercentage: score,
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      hintsUsed: mostrandoDica ? 1 : 0,
    };

    try {
      const badgeResult = await processBadgesAfterGameAction(gameAction);
      if (badgeResult.earned) {
        toast.success(`🏆 ${badgeResult.message}`);
      }
    } catch (error) {
      console.error("Erro ao processar badges:", error);
    }
  };

  const executarSequencia = async () => {
    if (sequenciaUsuario.length === 0 || executando) return;

    setExecutando(true);
    setTentativas((prev) => prev + 1);
    let posicaoAtual = { ...questao.personagemInicial };
    setPosicaoPersonagem(posicaoAtual);

    // Executar cada comando com delay para animação
    for (const comando of sequenciaUsuario) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      posicaoAtual = executarComando(comando, posicaoAtual);
      setPosicaoPersonagem({ ...posicaoAtual });
    }

    // Verificar resultado
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (verificarSucesso(posicaoAtual)) {
      await processarSucesso();
    } else {
      toast.error("Ops! Tente novamente.");
    }

    setExecutando(false);
  };

  const mostrarDica = () => {
    setMostrandoDica(true);
    toast(questao.dica);
  };

  // Calcular posição em pixels para o grid
  const calcularPosicao = (x: number, y: number) => ({
    transform: `translate(${x * 60}px, ${-y * 60}px)`,
  });

  return (
    <div className="container-logiclike">
      {/* Game Content */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div className="card-content">
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              padding: "2rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "var(--radius-lg)",
              color: "white",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              🤖 Programação Básica
            </h2>
            <p style={{ opacity: 0.9, margin: 0 }}>
              Questão {questaoAtual + 1} de {QUESTOES.length}: {questao.titulo}
            </p>
          </div>

          {/* Objetivo */}
          <div
            style={{
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              color: "white",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🎯 Objetivo:
            </h3>
            <p style={{ margin: 0, opacity: 0.95 }}>{questao.objetivo}</p>
          </div>

          {/* Game Area */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 350px",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            {/* Área do Jogo */}
            <div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🎮 Área do Jogo
              </h4>
              <div
                style={{
                  position: "relative",
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2rem",
                  minHeight: "300px",
                  border: "2px solid #dee2e6",
                  overflow: "hidden",
                }}
              >
                {/* Grid */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        borderLeft: "1px solid #6c757d",
                        left: `${i * 60}px`,
                        height: "100%",
                      }}
                    />
                  ))}
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        borderTop: "1px solid #6c757d",
                        top: `${i * 60}px`,
                        width: "100%",
                      }}
                    />
                  ))}
                </div>

                {/* Obstáculo */}
                {questao.obstaculo && (
                  <div
                    style={{
                      position: "absolute",
                      width: "48px",
                      height: "48px",
                      background:
                        "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
                      ...calcularPosicao(
                        questao.obstaculo.x,
                        questao.obstaculo.y
                      ),
                    }}
                  >
                    ❌
                  </div>
                )}

                {/* Meta */}
                <div
                  style={{
                    position: "absolute",
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg, #ffc107 0%, #ffb300 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    boxShadow: "0 4px 12px rgba(255, 193, 7, 0.3)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    ...calcularPosicao(questao.meta.x, questao.meta.y),
                  }}
                >
                  ⭐
                </div>

                {/* Personagem */}
                <motion.div
                  style={{
                    position: "absolute",
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
                    ...calcularPosicao(
                      posicaoPersonagem.x,
                      posicaoPersonagem.y
                    ),
                  }}
                  animate={{
                    scale: executando ? [1, 1.1, 1] : 1,
                    rotate: executando ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: executando ? Infinity : 0,
                  }}
                >
                  🤖
                </motion.div>
              </div>
            </div>

            {/* Comandos */}
            <div>
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                📋 Comandos Disponíveis
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                {questao.comandosDisponiveis.map((comando) => (
                  <button
                    key={comando.id}
                    onClick={() => adicionarComando(comando)}
                    disabled={executando || gameComplete}
                    className={cn(
                      "w-full p-3 text-white rounded-lg font-medium transition-all",
                      "hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    style={{
                      background: getComandoColor(comando.id),
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      cursor:
                        executando || gameComplete ? "not-allowed" : "pointer",
                    }}
                  >
                    {comando.texto}
                  </button>
                ))}
              </div>

              {/* Sequência */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem",
                  marginBottom: "1rem",
                  border: "1px solid #dee2e6",
                }}
              >
                <h5
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  📝 Sua Sequência:
                </h5>
                <div style={{ minHeight: "60px" }}>
                  {sequenciaUsuario.length === 0 ? (
                    <p
                      style={{
                        color: "#6c757d",
                        fontSize: "0.875rem",
                        margin: 0,
                      }}
                    >
                      Adicione comandos acima
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {sequenciaUsuario.map((comando, index) => (
                        <div
                          key={`${comando}-${index}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "white",
                            padding: "0.75rem",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid #dee2e6",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          <span
                            style={{ fontSize: "0.875rem", fontWeight: "500" }}
                          >
                            {index + 1}. {comando}
                          </span>
                          {index === sequenciaUsuario.length - 1 &&
                            !executando && (
                              <button
                                onClick={removerUltimoComando}
                                style={{
                                  color: "#dc3545",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  padding: "0.25rem",
                                  borderRadius: "4px",
                                }}
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Botões de Ação */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={executarSequencia}
                  disabled={
                    sequenciaUsuario.length === 0 || executando || gameComplete
                  }
                  className="btn btn-primary"
                  style={{
                    background:
                      "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)",
                    color: "white",
                    padding: "0.875rem 1rem",
                    border: "none",
                    borderRadius: "var(--radius-lg)",
                    fontSize: "1rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor:
                      sequenciaUsuario.length === 0 ||
                      executando ||
                      gameComplete
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      sequenciaUsuario.length === 0 ||
                      executando ||
                      gameComplete
                        ? 0.5
                        : 1,
                    boxShadow: "0 2px 8px rgba(40, 167, 69, 0.3)",
                  }}
                >
                  {executando ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid white",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                      <span>Executando...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      <span>Executar</span>
                    </>
                  )}
                </button>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={limparSequencia}
                    disabled={executando || gameComplete}
                    className="btn btn-secondary"
                    style={{
                      flex: 1,
                      background:
                        "linear-gradient(135deg, #6c757d 0%, #5a6268 100%)",
                      color: "white",
                      padding: "0.75rem",
                      border: "none",
                      borderRadius: "var(--radius-lg)",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor:
                        executando || gameComplete ? "not-allowed" : "pointer",
                      opacity: executando || gameComplete ? 0.5 : 1,
                    }}
                  >
                    🗑️ Limpar
                  </button>
                  <button
                    onClick={mostrarDica}
                    className="btn"
                    style={{
                      flex: 1,
                      background:
                        "linear-gradient(135deg, #ffc107 0%, #e0a800 100%)",
                      color: "white",
                      padding: "0.75rem",
                      border: "none",
                      borderRadius: "var(--radius-lg)",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.25rem",
                      cursor: "pointer",
                    }}
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Dica</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                borderRadius: "var(--radius-lg)",
                color: "white",
                boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                }}
              >
                {questaoAtual + 1}
              </div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Questão</div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)",
                borderRadius: "var(--radius-lg)",
                color: "white",
                boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                }}
              >
                {acertos}
              </div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Acertos</div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #6f42c1 0%, #59359a 100%)",
                borderRadius: "var(--radius-lg)",
                color: "white",
                boxShadow: "0 4px 12px rgba(111, 66, 193, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                }}
              >
                {tentativas}
              </div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                Tentativas
              </div>
            </div>
          </div>

          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center",
                background: "linear-gradient(135deg, #28a745 0%, #007bff 100%)",
                color: "white",
                padding: "3rem 2rem",
                borderRadius: "var(--radius-xl)",
                boxShadow: "0 8px 25px rgba(40, 167, 69, 0.3)",
              }}
            >
              <CheckCircle2
                style={{ width: "4rem", height: "4rem", margin: "0 auto 1rem" }}
              />
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                🎉 Parabéns!
              </h3>
              <p
                style={{
                  marginBottom: "1.5rem",
                  fontSize: "1.125rem",
                  opacity: 0.95,
                }}
              >
                Você completou todas as questões de programação básica!
              </p>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem",
                  display: "inline-block",
                }}
              >
                Pontuação: {Math.round((acertos / tentativas) * 100)}%
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <BadgeNotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
      />
    </div>
  );
}
