"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Calculator, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { processBadgesAfterGameAction, GameAction } from "@/src/helpers/badge-actions.helpers";
import { BadgeNotificationSystem, useBadgeNotifications } from "@/components/badges/BadgeNotificationSystem";
import { useAuth } from "@/lib/contexts/AuthContext";

interface ContagemGameProps {
  onGameComplete: (score: number) => void;
}

interface ContagemQuestion {
  emoji: string;
  count: number;
  options: number[];
  category: string;
}

// Objetos por categoria com emojis divertidos
const objetos = [
  { emoji: "🐱", name: "gatos", category: "animais" },
  { emoji: "🍎", name: "maçãs", category: "frutas" },
  { emoji: "⭐", name: "estrelas", category: "objetos" },
  { emoji: "🌸", name: "flores", category: "natureza" },
  { emoji: "🎈", name: "balões", category: "brinquedos" },
  { emoji: "🐶", name: "cachorros", category: "animais" },
  { emoji: "🍊", name: "laranjas", category: "frutas" },
  { emoji: "🚗", name: "carros", category: "transportes" },
  { emoji: "🏠", name: "casas", category: "lugares" },
  { emoji: "📚", name: "livros", category: "objetos" },
  { emoji: "🦋", name: "borboletas", category: "animais" },
  { emoji: "🍓", name: "morangos", category: "frutas" },
  { emoji: "✈️", name: "aviões", category: "transportes" },
  { emoji: "🌳", name: "árvores", category: "natureza" },
  { emoji: "⚽", name: "bolas", category: "brinquedos" },
];

export function ContagemGame({ onGameComplete }: Readonly<ContagemGameProps>) {
  const { student } = useAuth();
  const { notifications, dismissNotification } = useBadgeNotifications();
  
  const [question, setQuestion] = useState<ContagemQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(() => Date.now());

  // Gerar nova pergunta
  const gerarNovaPergunta = useCallback(() => {
    const objeto = objetos[Math.floor(Math.random() * objetos.length)];
    const count = Math.floor(Math.random() * 8) + 1; // 1 a 8 objetos
    
    // Gerar opções de resposta
    const options = [count];
    while (options.length < 4) {
      const option = Math.floor(Math.random() * 10) + 1;
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
  }, []);

  // Inicializar primeira pergunta
  useEffect(() => {
    gerarNovaPergunta();
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
              gameId: 'contagem',
              materia: 'matematica',
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
    setShowCelebration(false);
    gerarNovaPergunta();
  };

  if (!question) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparando o jogo de contagem...</p>
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
          className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-xl max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            🧮
          </motion.div>

          <h3 className="text-2xl font-bold mb-2">
            Excelente Contagem!
          </h3>
          <p className="text-blue-100 mb-6">
            Você dominou os números!
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{acertos}</div>
                <div className="text-sm text-blue-100">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round((acertos / tentativas) * 100) || 100}%</div>
                <div className="text-sm text-blue-100">Precisão</div>
              </div>
            </div>
          </div>

          <button 
            onClick={resetGame} 
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            🔢 Contar Novamente
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header do Jogo */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">🔢 Contagem Divertida</h2>
            <p className="text-blue-100">Conte os objetos e escolha a resposta correta</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100 mb-2">
              Progresso: {acertos}/5 questões
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
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Conte quantos você vê:
          </h3>

          {/* Objetos para contar */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-dashed border-blue-200 mb-8">
            <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
              {Array.from({ length: question.count }, (_, index) => (
                <motion.div
                  key={index}
                  className="text-5xl"
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
        </div>

        {/* Botão de nova pergunta */}
        <div className="flex justify-center mb-8">
          <button
            onClick={gerarNovaPergunta}
            disabled={selectedAnswer !== null}
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nova Pergunta</span>
          </button>
        </div>

        {/* Opções de resposta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          {question.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => verificarResposta(option)}
              disabled={selectedAnswer !== null}
              className={cn(
                "p-4 rounded-xl font-bold text-xl min-h-[80px] transition-all",
                selectedAnswer === option
                  ? isCorrect
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-red-500 text-white shadow-lg"
                  : selectedAnswer !== null && option === question.count
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md disabled:opacity-50"
              )}
              style={{
                opacity: selectedAnswer !== null && selectedAnswer !== option && option !== question.count ? 0.3 : 1
              }}
              whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Feedback visual */}
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <div className={cn(
              "inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium",
              isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}>
              {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <span>
                {isCorrect 
                  ? `Correto! Havia ${question.count} ${question.emoji}` 
                  : `Havia ${question.count} ${question.emoji}. Tente novamente!`
                }
              </span>
            </div>
          </motion.div>
        )}
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