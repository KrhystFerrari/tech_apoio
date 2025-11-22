"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Microscope, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface CienciasGameProps {
  onGameComplete: (score: number) => void;
  currentLevel: number;
}

interface CienciasQuestion {
  question: string;
  emoji: string;
  explanation: string;
  correctAnswer: string;
  options: string[];
  category: string;
}

// Perguntas organizadas por nível de dificuldade
const perguntasPorNivel: Record<number, CienciasQuestion[]> = {
  1: [
    {
      question: "O que as plantas precisam para crescer?",
      emoji: "🌱",
      explanation: "As plantas precisam de água, luz solar e terra (solo) para crescerem saudáveis!",
      correctAnswer: "Água, sol e terra",
      options: ["Água, sol e terra", "Só água", "Só sol", "Só terra"],
      category: "plantas"
    },
    {
      question: "Qual animal voa e faz mel?",
      emoji: "🐝",
      explanation: "As abelhas voam de flor em flor coletando néctar e fazem mel delicioso!",
      correctAnswer: "Abelha",
      options: ["Abelha", "Borboleta", "Passarinho", "Mosquito"],
      category: "animais"
    },
    {
      question: "O que acontece com a água quando está muito frio?",
      emoji: "❄️",
      explanation: "Quando está muito frio, a água vira gelo! É por isso que no inverno a água congela.",
      correctAnswer: "Vira gelo",
      options: ["Vira gelo", "Vira vapor", "Fica quente", "Não muda"],
      category: "estados"
    },
    {
      question: "De onde vem a chuva?",
      emoji: "🌧️",
      explanation: "A chuva vem das nuvens! A água do mar e dos rios sobe para o céu e forma as nuvens.",
      correctAnswer: "Das nuvens",
      options: ["Das nuvens", "Das árvores", "Do sol", "Da terra"],
      category: "clima"
    }
  ],
  2: [
    {
      question: "Como as plantas fazem sua comida?",
      emoji: "☀️",
      explanation: "As plantas fazem fotossíntese! Usam luz do sol, água e ar para fazer sua própria comida.",
      correctAnswer: "Fotossíntese",
      options: ["Fotossíntese", "Comendo terra", "Bebendo água", "Dormindo"],
      category: "plantas"
    },
    {
      question: "Qual órgão do corpo humano bombeia sangue?",
      emoji: "❤️",
      explanation: "O coração é como uma bomba que manda sangue para todo o corpo!",
      correctAnswer: "Coração",
      options: ["Coração", "Pulmão", "Estômago", "Cérebro"],
      category: "corpo"
    },
    {
      question: "O que acontece quando misturamos água e óleo?",
      emoji: "🛢️",
      explanation: "Água e óleo não se misturam! O óleo fica por cima da água porque é mais leve.",
      correctAnswer: "Não se misturam",
      options: ["Não se misturam", "Viram suco", "Explodem", "Ficam verdes"],
      category: "misturas"
    },
    {
      question: "Como os pássaros conseguem voar?",
      emoji: "🦅",
      explanation: "Os pássaros têm asas especiais que batem no ar e os levantam do chão!",
      correctAnswer: "Batendo as asas",
      options: ["Batendo as asas", "Pulando forte", "Correndo rápido", "Pensando"],
      category: "movimento"
    }
  ],
  3: [
    {
      question: "O que é o ciclo da água?",
      emoji: "💧",
      explanation: "É quando a água evapora, forma nuvens, chove e volta para rios e mares!",
      correctAnswer: "Evaporação, nuvens, chuva",
      options: ["Evaporação, nuvens, chuva", "Só evaporação", "Só chuva", "Plantas crescendo"],
      category: "ciclos"
    },
    {
      question: "Por que os objetos caem no chão?",
      emoji: "🍎",
      explanation: "Por causa da gravidade! É uma força que puxa tudo em direção ao centro da Terra.",
      correctAnswer: "Gravidade",
      options: ["Gravidade", "Vento", "Magnetismo", "Magia"],
      category: "física"
    },
    {
      question: "O que são fósseis?",
      emoji: "🦕",
      explanation: "São restos de animais ou plantas muito antigas que viraram pedra ao longo do tempo!",
      correctAnswer: "Restos antigos virados pedra",
      options: ["Restos antigos virados pedra", "Pedras coloridas", "Plantas novas", "Animais dormindo"],
      category: "paleontologia"
    },
    {
      question: "Como os vulcões funcionam?",
      emoji: "🌋",
      explanation: "Magma quente do interior da Terra sobe e sai pela superfície como lava!",
      correctAnswer: "Magma sobe e vira lava",
      options: ["Magma sobe e vira lava", "Água ferve", "Plantas crescem", "Rochas derretem no sol"],
      category: "geologia"
    }
  ]
};

export function CienciasGame({
  onGameComplete,
  currentLevel,
}: Readonly<CienciasGameProps>) {
  const perguntasDoNivel = perguntasPorNivel[currentLevel] || perguntasPorNivel[1];

  const [question, setQuestion] = useState<CienciasQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Gerar nova pergunta
  const gerarNovaPergunta = useCallback(() => {
    const pergunta = perguntasDoNivel[Math.floor(Math.random() * perguntasDoNivel.length)];
    setQuestion(pergunta);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  }, [perguntasDoNivel]);

  // Inicializar primeira pergunta
  useEffect(() => {
    gerarNovaPergunta();
  }, [gerarNovaPergunta]);

  // Verificar resposta
  const verificarResposta = useCallback((answer: string) => {
    if (!question || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setAcertos(prev => prev + 1);
      toast.success(`🎉 Correto! ${question.explanation}`);
      setShowCelebration(true);
      setShowExplanation(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        if (acertos + 1 >= 5) {
          setGameComplete(true);
          const score = Math.round(((acertos + 1) / tentativas) * 100);
          onGameComplete(score);
        } else {
          setTimeout(() => {
            setTentativas(prev => prev + 1);
            gerarNovaPergunta();
          }, 3000);
        }
      }, 2000);
    } else {
      toast.error(`Ops! A resposta correta é: ${question.correctAnswer}`);
      setShowExplanation(true);
      setTimeout(() => {
        setTentativas(prev => prev + 1);
        gerarNovaPergunta();
      }, 4000);
    }
  }, [question, selectedAnswer, acertos, tentativas, onGameComplete, gerarNovaPergunta]);

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
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
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
              🔬
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
              Cientista Incrível!
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
              Você explorou a ciência no nível {currentLevel} com maestria! 🧪
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
                    Descobertas
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
                  color: "#16a34a",
                  fontWeight: "600",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
                }}
              >
                🔬 Explorar Novamente
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
                backgroundColor: "#16a34a",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              <Microscope 
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
              Preparando experimentos científicos...
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
              Laboratório de Ciências - Nível {currentLevel}
            </h2>
            <p style={{ color: "#666666", margin: 0 }}>
              Descubra os segredos da natureza
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", color: "#666666", marginBottom: "0.5rem" }}>
              Descobertas: {acertos}/5
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
                  background: "linear-gradient(90deg, #16a34a, #15803d)",
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
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{question.emoji}</div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "1rem",
            maxWidth: "600px",
            margin: "0 auto 1rem"
          }}>
            {question.question}
          </h3>

          <div style={{
            display: "inline-block",
            background: "rgba(22, 163, 74, 0.1)",
            color: "#15803d",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            fontSize: "0.875rem",
            fontWeight: "500",
            border: "1px solid rgba(22, 163, 74, 0.2)"
          }}>
            {question.category}
          </div>
        </div>

        {/* Botões de ação */}
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
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          maxWidth: "800px",
          margin: "0 auto 2rem"
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
                  : selectedAnswer !== null && option === question.correctAnswer
                  ? "bg-green-500 text-white"
                  : ""
              )}
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                minHeight: "80px",
                padding: "1rem",
                textAlign: "center",
                lineHeight: "1.3",
                opacity: selectedAnswer !== null && selectedAnswer !== option && option !== question.correctAnswer ? 0.5 : 1
              }}
              whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Explicação */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: isCorrect 
                  ? "rgba(22, 163, 74, 0.1)" 
                  : "rgba(239, 68, 68, 0.1)",
                border: `2px solid ${isCorrect 
                  ? "rgba(22, 163, 74, 0.2)" 
                  : "rgba(239, 68, 68, 0.2)"}`,
                borderRadius: "16px",
                padding: "1.5rem",
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <Info 
                  size={24} 
                  color={isCorrect ? "#15803d" : "#dc2626"} 
                  style={{ marginTop: "0.25rem", flexShrink: 0 }}
                />
                <p style={{ 
                  margin: 0,
                  fontSize: "1rem",
                  color: isCorrect ? "#15803d" : "#dc2626",
                  fontWeight: "500",
                  lineHeight: "1.5"
                }}>
                  {question.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              🧪
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}