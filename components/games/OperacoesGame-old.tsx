"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Calculator, Plus, Minus } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface OperacoesGameProps {
  onGameComplete: (score: number) => void;
  currentLevel: number;
}

interface OperationQuestion {
  num1: number;
  num2: number;
  operation: "+" | "-";
  result: number;
  options: number[];
}

export function OperacoesGame({
  onGameComplete,
  currentLevel,
}: Readonly<OperacoesGameProps>) {
  const [question, setQuestion] = useState<OperationQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Gerar nova operação baseada no nível
  const gerarNovaOperacao = useCallback(() => {
    let num1: number, num2: number, operation: "+" | "-", result: number;

    if (currentLevel === 1) {
      // Nível 1: soma simples até 10
      num1 = Math.floor(Math.random() * 6) + 1; // 1-6
      num2 = Math.floor(Math.random() * (10 - num1)) + 1; // para não passar de 10
      operation = "+";
      result = num1 + num2;
    } else if (currentLevel === 2) {
      // Nível 2: soma até 20 e subtração simples
      if (Math.random() < 0.5) {
        // Soma até 20
        num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        num2 = Math.floor(Math.random() * (20 - num1)) + 1;
        operation = "+";
        result = num1 + num2;
      } else {
        // Subtração
        result = Math.floor(Math.random() * 10) + 1; // resultado de 1-10
        num2 = Math.floor(Math.random() * result) + 1; // subtraendo menor que o resultado
        num1 = result + num2; // minuendo
        operation = "-";
      }
    } else {
      // Nível 3: operações mais complexas
      if (Math.random() < 0.6) {
        // Soma até 50
        num1 = Math.floor(Math.random() * 25) + 1;
        num2 = Math.floor(Math.random() * 25) + 1;
        operation = "+";
        result = num1 + num2;
      } else {
        // Subtração
        result = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * result) + 1;
        num1 = result + num2;
        operation = "-";
      }
    }

    // Gerar opções de resposta
    const options = [result];
    while (options.length < 4) {
      let option;
      if (operation === "+") {
        option = result + Math.floor(Math.random() * 6) - 3; // ±3 do resultado
      } else {
        option = result + Math.floor(Math.random() * 6) - 3;
      }
      
      if (option > 0 && !options.includes(option) && option !== result) {
        options.push(option);
      }
    }

    // Embaralhar opções
    options.sort(() => Math.random() - 0.5);

    setQuestion({ num1, num2, operation, result, options });
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [currentLevel]);

  // Inicializar primeira pergunta
  useEffect(() => {
    gerarNovaOperacao();
  }, [gerarNovaOperacao]);

  // Verificar resposta
  const verificarResposta = useCallback((answer: number) => {
    if (!question || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === question.result;
    setIsCorrect(correct);

    if (correct) {
      setAcertos(prev => prev + 1);
      toast.success(`🎉 Correto! ${question.num1} ${question.operation} ${question.num2} = ${question.result}!`);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        if (acertos + 1 >= 5) {
          setGameComplete(true);
          const score = Math.round(((acertos + 1) / tentativas) * 100);
          onGameComplete(score);
        } else {
          setTentativas(prev => prev + 1);
          gerarNovaOperacao();
        }
      }, 2000);
    } else {
      toast.error(`Ops! ${question.num1} ${question.operation} ${question.num2} = ${question.result}. Tente novamente!`);
      setTimeout(() => {
        setTentativas(prev => prev + 1);
        gerarNovaOperacao();
      }, 2000);
    }
  }, [question, selectedAnswer, acertos, tentativas, onGameComplete, gerarNovaOperacao]);

  const resetGame = () => {
    setAcertos(0);
    setTentativas(0);
    setGameComplete(false);
    gerarNovaOperacao();
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
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
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
              Matemático Incrível!
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
              Você mandou bem nas operações do nível {currentLevel}! 🎯
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
                  color: "#3b82f6",
                  fontWeight: "600",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
                }}
              >
                ➕ Calcular Novamente
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
                backgroundColor: "#3b82f6",
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
              Preparando as operações matemáticas...
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
              Operações Matemáticas - Nível {currentLevel}
            </h2>
            <p style={{ color: "#666666", margin: 0 }}>
              Resolva as operações e escolha a resposta correta
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", color: "#666666", marginBottom: "0.5rem" }}>
              Progresso: {acertos}/5 operações
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
                  background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
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
        background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
        marginBottom: "2rem"
      }}>
        {/* Operação */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap"
          }}>
            {/* Número 1 */}
            <div style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: "#1a1a1a",
              background: "rgba(59, 130, 246, 0.1)",
              borderRadius: "16px",
              padding: "1rem 1.5rem",
              minWidth: "120px",
              border: "2px solid rgba(59, 130, 246, 0.2)"
            }}>
              {question.num1}
            </div>

            {/* Operador */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              backgroundColor: question.operation === "+" ? "#22c55e" : "#ef4444",
              borderRadius: "50%",
              fontSize: "3rem",
              fontWeight: "700",
              color: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}>
              {question.operation === "+" ? <Plus size={40} /> : <Minus size={40} />}
            </div>

            {/* Número 2 */}
            <div style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: "#1a1a1a",
              background: "rgba(59, 130, 246, 0.1)",
              borderRadius: "16px",
              padding: "1rem 1.5rem",
              minWidth: "120px",
              border: "2px solid rgba(59, 130, 246, 0.2)"
            }}>
              {question.num2}
            </div>

            {/* Igual */}
            <div style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#666666"
            }}>
              =
            </div>

            {/* Interrogação */}
            <div style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: "#f59e0b",
              background: "rgba(245, 158, 11, 0.1)",
              borderRadius: "16px",
              padding: "1rem 1.5rem",
              minWidth: "120px",
              border: "2px dashed rgba(245, 158, 11, 0.5)"
            }}>
              ?
            </div>
          </div>
        </div>

        {/* Botão de nova operação */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}>
          <button
            className="btn btn-secondary"
            onClick={gerarNovaOperacao}
            disabled={selectedAnswer !== null}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <RefreshCw style={{ width: "1rem", height: "1rem" }} />
            Nova Operação
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
                  : selectedAnswer !== null && option === question.result
                  ? "bg-green-500 text-white"
                  : ""
              )}
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                minHeight: "80px",
                opacity: selectedAnswer !== null && selectedAnswer !== option && option !== question.result ? 0.5 : 1
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
              🎯
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}