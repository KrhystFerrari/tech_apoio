"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Settings } from "lucide-react";
import { useAudio } from "@/src/helpers/audio.helpers";
import { cn } from "@/lib/utils";

interface AudioControlProps {
  text?: string;
  audioUrl?: string;
  showSettings?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AudioControl({
  text,
  audioUrl,
  showSettings = false,
  size = "md",
  className = "",
}: Readonly<AudioControlProps>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [speechRate, setSpeechRate] = useState(0.8);

  const {
    speakText,
    playAudioFile,
    stopAudio,
    isSupported,
    hasPortugueseVoice,
  } = useAudio();

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  const handlePlay = async () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      return;
    }

    if (isMuted) return;

    try {
      setIsPlaying(true);

      if (audioUrl) {
        await playAudioFile(audioUrl);
      } else if (text) {
        await speakText(text, {
          language: "pt-BR",
          rate: speechRate,
          volume: volume,
          pitch: 1.1,
        });
      }
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    }
    setIsMuted(!isMuted);
  };

  if (!isSupported) {
    return (
      <div
        className={cn("flex items-center gap-2", className)}
        title="Áudio não suportado neste navegador"
      >
        <div
          className={cn(
            "rounded-full bg-gray-100 flex items-center justify-center opacity-50",
            sizeClasses[size]
          )}
        >
          <VolumeX size={iconSizes[size]} className="text-gray-400" />
        </div>
        {showSettings && (
          <span className="text-xs text-gray-500">Áudio indisponível</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Main Play/Pause Button */}
      <motion.button
        onClick={handlePlay}
        disabled={!text && !audioUrl}
        className={cn(
          "rounded-full flex items-center justify-center transition-all",
          "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isPlaying
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white",
          isMuted && "bg-gray-400 hover:bg-gray-500",
          !text && !audioUrl && "bg-gray-300 cursor-not-allowed",
          sizeClasses[size]
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Parar" : "Reproduzir"}
      >
        {isPlaying ? (
          <Pause size={iconSizes[size]} />
        ) : (
          <Play size={iconSizes[size]} />
        )}
      </motion.button>

      {/* Mute/Unmute Button */}
      <motion.button
        onClick={toggleMute}
        className={cn(
          "rounded-full flex items-center justify-center transition-all",
          "focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
          isMuted
            ? "bg-gray-500 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-600",
          sizeClasses[size]
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isMuted ? "Ativar som" : "Silenciar"}
      >
        {isMuted ? (
          <VolumeX size={iconSizes[size]} />
        ) : (
          <Volume2 size={iconSizes[size]} />
        )}
      </motion.button>

      {/* Settings Toggle */}
      {showSettings && (
        <motion.button
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          className={cn(
            "rounded-full flex items-center justify-center transition-all",
            "focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
            "bg-gray-100 hover:bg-gray-200 text-gray-600",
            sizeClasses[size]
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Configurações de áudio"
        >
          <Settings size={iconSizes[size]} />
        </motion.button>
      )}

      {/* Volume and Speed Controls */}
      {showSettings && showVolumeControl && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg absolute z-10"
          style={{
            top: "100%",
            left: 0,
            marginTop: "0.5rem",
            minWidth: "200px",
          }}
        >
          {/* Volume Control */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Speech Rate Control */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Velocidade: {speechRate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Voice Info */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              {hasPortugueseVoice()
                ? "✅ Voz em português disponível"
                : "⚠️ Usando voz padrão do sistema"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Componente especializado para palavras
export function WordAudioControl({
  word,
  className = "",
  size = "md",
}: {
  word: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { speakWord, playSuccessSound } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayWord = async () => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      await speakWord(word);
      playSuccessSound();
    } catch (error) {
      console.error("Erro ao falar palavra:", error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <motion.button
      onClick={handlePlayWord}
      disabled={isPlaying}
      className={cn(
        "rounded-full flex items-center justify-center transition-all",
        "focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
        isPlaying
          ? "bg-green-600 text-white animate-pulse"
          : "bg-green-500 hover:bg-green-600 text-white",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10",
        size === "lg" && "w-12 h-12",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Ouvir a palavra: ${word}`}
    >
      <Volume2 size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
    </motion.button>
  );
}

// Componente para instruções
export function InstructionAudio({
  instruction,
  autoPlay = false,
  className = "",
}: {
  instruction: string;
  autoPlay?: boolean;
  className?: string;
}) {
  const { speakInstruction } = useAudio();
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (autoPlay && !hasPlayed) {
      const timer = setTimeout(() => {
        speakInstruction(instruction);
        setHasPlayed(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoPlay, hasPlayed, instruction, speakInstruction]);

  return (
    <AudioControl
      text={instruction}
      size="sm"
      showSettings={false}
      className={cn("inline-flex", className)}
    />
  );
}
