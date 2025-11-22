"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Calculator } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { processBadgesAfterGameAction, GameAction } from "@/src/helpers/badge-actions.helpers";
import { BadgeNotificationSystem, useBadgeNotifications } from "@/components/badges/BadgeNotificationSystem";
import { useAuth } from "@/lib/contexts/AuthContext";

interface ContagemGameProps {
  onGameComplete: (score: number) => void;
  currentLevel: number;
}

interface ContagemQuestion {
  emoji: string;
  count: number;
  options: number[];
  category: string;
}

// Objetos por nível de dificuldade
const objetosPorNivel: Record<number, { emoji: string; name: string; category: string }[]> = {
  1: [
    { emoji: "🐱", name: "gatos", category: "animais" },
    { emoji: "🍎", name: "maçãs", category: "frutas" },
    { emoji: "⭐", name: "estrelas", category: "objetos" },
    { emoji: "🌸", name: "flores", category: "natureza" },
    { emoji: "🎈", name: "balões", category: "brinquedos" },
  ],
  2: [
    { emoji: "🐶", name: "cachorros", category: "animais" },
    { emoji: "🍊", name: "laranjas", category: "frutas" },
    { emoji: "🚗", name: "carros", category: "transportes" },
    { emoji: "🏠", name: "casas", category: "lugares" },
    { emoji: "📚", name: "livros", category: "objetos" },
  ],
  3: [
    { emoji: "🦋", name: "borboletas", category: "animais" },
    { emoji: "🍓", name: "morangos", category: "frutas" },
    { emoji: "✈️", name: "aviões", category: "transportes" },
    { emoji: "🌳", name: "árvores", category: "natureza" },
    { emoji: "⚽", name: "bolas", category: "brinquedos" },
  ],
};

export function ContagemGame({
  onGameComplete,
  currentLevel,
}: Readonly<ContagemGameProps>) {
  const { student } = useAuth();
  const { notifications, dismissNotification } = useBadgeNotifications();
  const objetosDoNivel = objetosPorNivel[currentLevel] || objetosPorNivel[1];
  const getMaxCountByLevel = () => {
    if (currentLevel === 1) return 5;
    if (currentLevel === 2) return 8;
    return 10;
  };
  const maxCount = getMaxCountByLevel();

  const [question, setQuestion] = useState<ContagemQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [isFirstGame] = useState(true);

  // Gerar nova pergunta
  const gerarNovaPergunta = useCallback(() => {
    const objeto = objetosDoNivel[Math.floor(Math.random() * objetosDoNivel.length)];
    const count = Math.floor(Math.random() * maxCount) + 1;
    
    // Gerar opções de resposta
    const options = [count];
    while (options.length < 4) {
      const option = Math.floor(Math.random() * maxCount) + 1;
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    
    // Embaralhar opções
    options.sort(() => Math.random() - 0.5);
    
    setQuestion({
      emoji: objeto.emoji,
      count,
      options,
      category: objeto.category,
    });
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [objetosDoNivel, maxCount]);

  // Inicializar primeira pergunta
  useEffect(() => {
    const timer = setTimeout(() => {
      gerarNovaPergunta();
    }, 0);
    return () => clearTimeout(timer);
  }, [gerarNovaPergunta]);

  // Verificar resposta
  const verificarResposta = useCallback((answer: number) => {
    if (!question || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === question.count;
    setIsCorrect(correct);

    if (correct) {
      setAcertos(prev => prev + 1);
      toast.success(`🎉 Correto! Havia ${question.count} ${question.emoji}!`);
      setShowCelebration(true);
      
      setTimeout(async () => {
        setShowCelebration(false);
        if (acertos + 1 >= 5) {
          setGameComplete(true);
          const score = Math.round(((acertos + 1) / tentativas) * 100);
          const timeSpent = Math.round((Date.now() - startTime) / 1000);
          
          onGameComplete(score);
          
          // Processar badges após completar o jogo
          if (student) {
            const gameAction: GameAction = {
              studentId: student.id,
              gameId: 'contagem',
              materia: 'matematica',
              questionsAnswered: tentativas,
              correctAnswers: acertos + 1,
              scorePercentage: score,
              timeSpent: timeSpent,
              hintsUsed: 0
            };

            try {
              const badgeResult = await processBadgesAfterGameAction(gameAction);
              if (badgeResult.earned) {
                toast.success(`🏆 ${badgeResult.message}`);
              }
            } catch (error) {
              console.error('Erro ao processar badges:', error);
            }
          }
        } else {
          setTentativas(prev => prev + 1);
          gerarNovaPergunta();
        }
      }, 2000);
    } else {
      toast.error(`Ops! Havia ${question.count} ${question.emoji}. Tente novamente!`);
      setTimeout(() => {
        setTentativas(prev => prev + 1);
        gerarNovaPergunta();
      }, 2000);
    }
  }, [question, selectedAnswer, acertos, tentativas, onGameComplete, gerarNovaPergunta, student, startTime]);

  const resetGame = () => {
    setAcertos(0);
    setTentativas(0);
    setGameComplete(false);
    gerarNovaPergunta();
  };

  if (gameComplete) {
    return (
      <div style={{ background: "white", minHeight: "100vh", padding: "2rem 0" }}>
        <div className="container-logiclike">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              padding: "3rem",
              borderRadius: "24px",
              textAlign: "center",
              border: "none",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
            >
              🧮
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              Excelente Contagem!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontSize: "1.25rem",
                opacity: 0.9,
                marginBottom: "2rem",
                color: "white",
              }}
            >
              Você dominou a contagem no nível {currentLevel}! 🎯
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "1.5rem",
                marginBottom: "2rem",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-around", 
                alignItems: "center",
                gap: "1rem"
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "2rem", 
                    fontWeight: "700", 
                    color: "white",
                    marginBottom: "0.5rem"
                  }}>
                    {acertos}
                  </div>
                  <div style={{ 
                    fontSize: "0.9rem", 
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500"
                  }}>
                    Acertos
                  </div>
                </div>
                <div style={{ 
                  width: "2px", 
                  height: "3rem", 
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "1px"
                }}></div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "2rem", 
                    fontWeight: "700", 
                    color: "white",
                    marginBottom: "0.5rem"
                  }}>
                    {Math.round((acertos / tentativas) * 100) || 100}%
                  </div>
                  <div style={{ 
                    fontSize: "0.9rem", 
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500"
                  }}>
                    Precisão
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <button 
                onClick={resetGame} 
                className="btn btn-large"
                style={{
                  backgroundColor: "white",
                  color: "#22c55e",
                  fontWeight: "600",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
                }}
              >
                🔢 Contar Novamente
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div 
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <div className="container-logiclike">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#22c55e",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              <Calculator 
                size={40} 
                color="white"
              />
            </div>
            
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#666666",
                fontWeight: "500",
                margin: 0,
              }}
            >
              Preparando o jogo de contagem...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-logiclike">
      {/* Header do Jogo */}
      <div className="card" style={{ marginBottom: "2rem", padding: "1.5rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div>
            <h2 style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "0.5rem"
            }}>
              Contagem Divertida - Nível {currentLevel}
            </h2>
            <p style={{ color: "#666666", margin: 0 }}>
              Conte os objetos e escolha a resposta correta
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", color: "#666666", marginBottom: "0.5rem" }}>
              Progresso: {acertos}/5 questões
            </div>
            <div style={{
              width: "200px",
              height: "8px",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #22c55e, #16a34a)",
                  borderRadius: "4px",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(acertos / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Área do Jogo */}
      <div className="card" style={{
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
        marginBottom: "2rem"
      }}>
        {/* Pergunta */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "1rem"
          }}>
            Conte quantos você vê:
          </h3>

          {/* Objetos para contar */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "1.5rem",
            background: "rgba(34, 197, 94, 0.05)",
            borderRadius: "16px",
            border: "2px dashed rgba(34, 197, 94, 0.2)",
          }}>
            {Array.from({ length: question.count }, (_, index) => (
              <motion.div
                key={index}
                style={{ fontSize: "3rem" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200 
                }}
              >
                {question.emoji}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Botão de nova pergunta */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}>
          <button
            className="btn btn-secondary"
            onClick={gerarNovaPergunta}
            disabled={selectedAnswer !== null}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <RefreshCw style={{ width: "1rem", height: "1rem" }} />
            Nova Pergunta
          </button>
        </div>

        {/* Opções de resposta */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1rem",
          maxWidth: "500px",
          margin: "0 auto"
        }}>
          {question.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => verificarResposta(option)}
              disabled={selectedAnswer !== null}
              className={cn(
                "btn btn-large",
                selectedAnswer === option
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : selectedAnswer !== null && option === question.count
                  ? "bg-green-500 text-white"
                  : ""
              )}
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                minHeight: "80px",
                opacity: selectedAnswer !== null && selectedAnswer !== option && option !== question.count ? 0.5 : 1
              }}
              whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Celebração */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sistema de Notificações de Badges */}
      <BadgeNotificationSystem 
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
      />
    </div>
  );
}