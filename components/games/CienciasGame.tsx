"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Microscope, Info, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { processBadgesAfterGameAction, GameAction } from "@/src/helpers/badge-actions.helpers";
import { BadgeNotificationSystem, useBadgeNotifications } from "@/components/badges/BadgeNotificationSystem";
import { useAuth } from "@/lib/contexts/AuthContext";

interface CienciasGameProps {
  onGameComplete: (score: number) => void;
}

interface CienciasQuestion {
  question: string;
  emoji: string;
  explanation: string;
  correctAnswer: string;
  options: string[];
  category: string;
}

// Perguntas científicas divertidas e educativas
const perguntas: CienciasQuestion[] = [
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
  },
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
    category: "experimentos"
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    emoji: "🪐",
    explanation: "Júpiter é o maior planeta! É tão grande que cabem mais de 1000 Terras dentro dele.",
    correctAnswer: "Júpiter",
    options: ["Júpiter", "Terra", "Marte", "Saturno"],
    category: "espaço"
  }
];

export function CienciasGame({ onGameComplete }: Readonly<CienciasGameProps>) {
  const { student } = useAuth();
  const { notifications, dismissNotification } = useBadgeNotifications();
  
  const [currentQuestion, setCurrentQuestion] = useState<CienciasQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  // Gerar nova pergunta
  const gerarNovaPergunta = useCallback(() => {
    let availableQuestions = perguntas.filter((_, index) => !usedQuestions.includes(index));
    
    // Se todas as perguntas foram usadas, resetar
    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      availableQuestions = perguntas;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    const originalIndex = perguntas.indexOf(selectedQuestion);
    
    setCurrentQuestion(selectedQuestion);
    setUsedQuestions(prev => [...prev, originalIndex]);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  }, [usedQuestions]);

  // Inicializar primeira pergunta
  useEffect(() => {
    gerarNovaPergunta();
  }, [gerarNovaPergunta]);

  // Verificar resposta
  const verificarResposta = useCallback((answer: string) => {
    if (!currentQuestion || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setAcertos(prev => prev + 1);
      toast.success(`🎉 Correto! ${currentQuestion.explanation}`);
      setShowCelebration(true);
      
      setTimeout(async () => {
        setShowCelebration(false);
        setTentativas(prev => prev + 1);
        
        if (acertos + 1 >= 5) {
          setGameComplete(true);
          const score = Math.round(((acertos + 1) / (tentativas + 1)) * 100);
          const timeSpent = Math.round((Date.now() - startTime) / 1000);
          
          onGameComplete(score);
          
          // Processar badges após completar o jogo
          if (student) {
            const gameAction: GameAction = {
              studentId: student.id,
              gameId: 'ciencias-quiz',
              materia: 'ciencias',
              questionsAnswered: tentativas + 1,
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
          setTimeout(() => {
            gerarNovaPergunta();
          }, 2000);
        }
      }, 3000);
    } else {
      toast.error(`Ops! A resposta correta era: ${currentQuestion.correctAnswer}`);
      setTimeout(() => {
        setTentativas(prev => prev + 1);
        setTimeout(() => {
          gerarNovaPergunta();
        }, 2000);
      }, 3000);
    }
  }, [currentQuestion, selectedAnswer, acertos, tentativas, onGameComplete, gerarNovaPergunta, student, startTime]);

  const resetGame = () => {
    setAcertos(0);
    setTentativas(0);
    setGameComplete(false);
    setShowCelebration(false);
    setUsedQuestions([]);
    gerarNovaPergunta();
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparando o quiz de ciências...</p>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-8 rounded-xl max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            🔬
          </motion.div>

          <h3 className="text-2xl font-bold mb-2">
            Fantástico!
          </h3>
          <p className="text-teal-100 mb-6">
            Você é um pequeno cientista!
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{acertos}</div>
                <div className="text-sm text-teal-100">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round((acertos / tentativas) * 100) || 100}%</div>
                <div className="text-sm text-teal-100">Precisão</div>
              </div>
            </div>
          </div>

          <button 
            onClick={resetGame} 
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            🧪 Descobrir Mais
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header do Jogo */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">🧪 Quiz de Ciências</h2>
            <p className="text-teal-100">Descubra os mistérios da ciência</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-teal-100 mb-2">
              Progresso: {acertos}/5 descobertas
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(acertos / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Área do Jogo */}
      <div className="bg-white rounded-xl shadow-lg border p-8">
        {/* Pergunta */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-6"
          >
            {currentQuestion.emoji}
          </motion.div>

          <div className="mb-4">
            <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion.category}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Opções de resposta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => verificarResposta(option)}
              disabled={selectedAnswer !== null}
              className={cn(
                "p-4 rounded-xl font-medium text-left transition-all min-h-[60px]",
                selectedAnswer === option
                  ? isCorrect
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-red-500 text-white shadow-lg"
                  : selectedAnswer !== null && option === currentQuestion.correctAnswer
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-md disabled:opacity-50"
              )}
              style={{
                opacity: selectedAnswer !== null && selectedAnswer !== option && option !== currentQuestion.correctAnswer ? 0.3 : 1
              }}
              whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explicação */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className={cn(
                "rounded-lg p-4 border-2",
                isCorrect 
                  ? "bg-green-50 border-green-200" 
                  : "bg-blue-50 border-blue-200"
              )}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={cn(
                      "font-semibold mb-1",
                      isCorrect ? "text-green-800" : "text-blue-800"
                    )}>
                      {isCorrect ? "Parabéns!" : "Boa tentativa!"}
                    </h4>
                    <p className={cn(
                      "text-sm",
                      isCorrect ? "text-green-700" : "text-blue-700"
                    )}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão de nova pergunta */}
        <div className="flex justify-center">
          <button
            onClick={gerarNovaPergunta}
            disabled={selectedAnswer === null}
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nova Pergunta</span>
          </button>
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