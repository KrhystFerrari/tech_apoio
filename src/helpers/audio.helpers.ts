/**
 * Audio integration helpers
 * Utilities for text-to-speech, audio playback and recording
 */

// Interface para configuração de áudio
export interface AudioConfig {
  language: string;
  voice?: string;
  rate?: number; // velocidade (0.1 a 10)
  pitch?: number; // tom (0 a 2)
  volume?: number; // volume (0 a 1)
}

// Interface para resposta da API de TTS
export interface TTSResponse {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

// Configurações padrão para diferentes contextos
export const AUDIO_CONFIGS = {
  child: {
    language: "pt-BR",
    rate: 0.8, // Mais devagar para crianças
    pitch: 1.2, // Tom mais alto
    volume: 0.8,
  },
  normal: {
    language: "pt-BR",
    rate: 1,
    pitch: 1,
    volume: 0.8,
  },
  slow: {
    language: "pt-BR",
    rate: 0.6, // Muito devagar para palavras difíceis
    pitch: 1.1,
    volume: 0.9,
  },
};

/**
 * Classe para gerenciar áudio na aplicação
 */
export class AudioManager {
  private static instance: AudioManager;
  private audioContext?: AudioContext;
  private currentAudio?: HTMLAudioElement;
  private isSupported: boolean = false;

  constructor() {
    this.checkSupport();
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Verificar se o navegador suporta as funcionalidades necessárias
   */
  private checkSupport(): void {
    this.isSupported =
      globalThis.window !== undefined &&
      "speechSynthesis" in globalThis &&
      "Audio" in globalThis;
  }

  /**
   * Verificar se o áudio é suportado
   */
  isAudioSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Converter texto em fala usando Web Speech API (nativo do navegador)
   */
  async speakText(
    text: string,
    config: AudioConfig = AUDIO_CONFIGS.child
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported || !globalThis.speechSynthesis) {
        reject(new Error("Speech synthesis não suportado"));
        return;
      }

      // Cancelar qualquer fala em andamento
      globalThis.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Configurar parâmetros
      utterance.lang = config.language;
      utterance.rate = config.rate || 1;
      utterance.pitch = config.pitch || 1;
      utterance.volume = config.volume || 0.8;

      // Tentar encontrar uma voz específica
      const voices = globalThis.speechSynthesis.getVoices();
      const portugueseVoice = voices.find(
        (voice) => voice.lang === "pt-BR" || voice.lang.startsWith("pt")
      );

      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(new Error(error.error));

      globalThis.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Parar qualquer áudio em reprodução
   */
  stopAudio(): void {
    // Parar speech synthesis
    if (globalThis.window !== undefined && globalThis.speechSynthesis) {
      globalThis.speechSynthesis.cancel();
    }

    // Parar áudio HTML
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }

  /**
   * Reproduzir arquivo de áudio
   */
  async playAudioFile(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.stopAudio(); // Parar áudio anterior

        this.currentAudio = new Audio(url);
        this.currentAudio.volume = 0.8;

        this.currentAudio.onended = () => resolve();
        this.currentAudio.onerror = () =>
          reject(new Error("Erro ao reproduzir áudio"));
        this.currentAudio.onloadeddata = () => {
          this.currentAudio?.play();
        };

        this.currentAudio.load();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Gerar áudio usando API externa (Google Text-to-Speech, Azure, etc.)
   */
  async generateAudio(
    text: string,
    config: AudioConfig = AUDIO_CONFIGS.child
  ): Promise<TTSResponse> {
    try {
      // Para desenvolvimento, usar a Web Speech API nativa
      // Em produção, substituir por chamada para API externa
      await this.speakText(text, config);

      return {
        success: true,
        audioUrl: undefined, // URL seria retornada pela API externa
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }

  /**
   * Criar áudio para palavras do jogo
   */
  async speakWord(word: string): Promise<void> {
    const cleanWord = word.toLowerCase().trim();

    // Adicionar pausas entre sílabas para palavras mais longas
    let textToSpeak = cleanWord;
    if (cleanWord.length > 4) {
      // Simular quebra silábica (implementação básica)
      textToSpeak = cleanWord.split("").join(" ");
    }

    await this.speakText(textToSpeak, AUDIO_CONFIGS.slow);
  }

  /**
   * Falar dica ou instrução
   */
  async speakInstruction(instruction: string): Promise<void> {
    await this.speakText(instruction, AUDIO_CONFIGS.child);
  }

  /**
   * Som de feedback positivo
   */
  playSuccessSound(): void {
    // Usar Web Audio API para gerar tons simples
    this.playTone(523.25, 200); // Dó 5 por 200ms
  }

  /**
   * Som de feedback negativo
   */
  playErrorSound(): void {
    this.playTone(130.81, 300); // Dó 3 por 300ms
  }

  /**
   * Gerar tom simples
   */
  private playTone(frequency: number, duration: number): void {
    if (globalThis.window === undefined) return;

    try {
      this.audioContext ??= new (globalThis.AudioContext ||
        (
          globalThis as typeof globalThis & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext)();

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(
        frequency,
        this.audioContext.currentTime
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        this.audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.audioContext.currentTime + duration / 1000
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn("Erro ao reproduzir tom:", error);
    }
  }

  /**
   * Verificar se uma voz em português está disponível
   */
  hasPortugueseVoice(): boolean {
    if (globalThis.window === undefined || !globalThis.speechSynthesis) {
      return false;
    }

    const voices = globalThis.speechSynthesis.getVoices();
    return voices.some(
      (voice) => voice.lang === "pt-BR" || voice.lang.startsWith("pt")
    );
  }

  /**
   * Listar vozes disponíveis em português
   */
  getPortugueseVoices(): SpeechSynthesisVoice[] {
    if (globalThis.window === undefined || !globalThis.speechSynthesis) {
      return [];
    }

    const voices = globalThis.speechSynthesis.getVoices();
    return voices.filter(
      (voice) => voice.lang === "pt-BR" || voice.lang.startsWith("pt")
    );
  }
}

/**
 * Hook para usar o AudioManager em componentes React
 */
export function useAudio() {
  const audioManager = AudioManager.getInstance();

  return {
    speakText: (text: string, config?: AudioConfig) =>
      audioManager.speakText(text, config),
    speakWord: (word: string) => audioManager.speakWord(word),
    speakInstruction: (instruction: string) =>
      audioManager.speakInstruction(instruction),
    playSuccessSound: () => audioManager.playSuccessSound(),
    playErrorSound: () => audioManager.playErrorSound(),
    playAudioFile: (url: string) => audioManager.playAudioFile(url),
    stopAudio: () => audioManager.stopAudio(),
    isSupported: audioManager.isAudioSupported(),
    hasPortugueseVoice: () => audioManager.hasPortugueseVoice(),
    getPortugueseVoices: () => audioManager.getPortugueseVoices(),
  };
}

/**
 * Utilitário para carregar vozes (necessário em alguns navegadores)
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (globalThis.window === undefined || !globalThis.speechSynthesis) {
      resolve([]);
      return;
    }

    let voices = globalThis.speechSynthesis.getVoices();

    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    const voicesChanged = () => {
      voices = globalThis.speechSynthesis.getVoices();
      if (voices.length > 0) {
        globalThis.speechSynthesis.removeEventListener(
          "voiceschanged",
          voicesChanged
        );
        resolve(voices);
      }
    };

    globalThis.speechSynthesis.addEventListener("voiceschanged", voicesChanged);

    // Timeout de segurança
    setTimeout(() => {
      globalThis.speechSynthesis.removeEventListener(
        "voiceschanged",
        voicesChanged
      );
      resolve(globalThis.speechSynthesis.getVoices());
    }, 3000);
  });
}

/**
 * Verificar se o áudio está ativado no dispositivo
 */
export function checkAudioPermission(): boolean {
  if (globalThis.window === undefined) return false;

  // Verificar se não está silenciado
  try {
    const audio = new Audio();
    return !audio.muted;
  } catch {
    return false;
  }
}
