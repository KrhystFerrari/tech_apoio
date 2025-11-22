/**
 * Image upload and processing helpers
 * Utilities for handling image uploads, validation and optimization
 */

// Interface para configuração de upload
export interface UploadConfig {
  maxSize: number; // em bytes
  allowedTypes: string[];
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1 para compressão JPEG
}

// Interface para resultado do upload
export interface UploadResult {
  success: boolean;
  file?: File;
  url?: string;
  error?: string;
  metadata?: {
    size: number;
    width: number;
    height: number;
    type: string;
  };
}

// Interface para preview de imagem
export interface ImagePreview {
  file: File;
  url: string;
  name: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

// Configurações padrão por contexto
export const UPLOAD_CONFIGS = {
  avatar: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.8,
  },
  wordImage: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    maxWidth: 800,
    maxHeight: 600,
    quality: 0.85,
  },
  general: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxWidth: 1200,
    maxHeight: 900,
    quality: 0.9,
  },
};

/**
 * Validar arquivo de imagem
 */
export function validateImageFile(
  file: File,
  config: UploadConfig
): { valid: boolean; error?: string } {
  // Verificar tamanho
  if (file.size > config.maxSize) {
    const maxMB = Math.round(config.maxSize / 1024 / 1024);
    return {
      valid: false,
      error: `Arquivo muito grande. Máximo permitido: ${maxMB}MB`,
    };
  }

  // Verificar tipo
  if (!config.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de arquivo não permitido. Tipos aceitos: ${config.allowedTypes.join(
        ", "
      )}`,
    };
  }

  return { valid: true };
}

/**
 * Redimensionar imagem mantendo proporção
 */
export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.9
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calcular novas dimensões mantendo proporção
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Desenhar imagem redimensionada
      ctx?.drawImage(img, 0, 0, width, height);

      // Converter para blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Erro ao processar imagem"));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error("Erro ao carregar imagem"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Obter dimensões da imagem
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Erro ao carregar imagem"));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Criar preview da imagem
 */
export async function createImagePreview(file: File): Promise<ImagePreview> {
  const url = URL.createObjectURL(file);

  try {
    const dimensions = await getImageDimensions(file);

    return {
      file,
      url,
      name: file.name,
      size: file.size,
      dimensions,
    };
  } catch (error) {
    return {
      file,
      url,
      name: file.name,
      size: file.size,
    };
  }
}

/**
 * Processar upload de imagem
 */
export async function processImageUpload(
  file: File,
  config: UploadConfig
): Promise<UploadResult> {
  try {
    // Validar arquivo
    const validation = validateImageFile(file, config);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Obter dimensões originais
    const dimensions = await getImageDimensions(file);

    // Verificar se precisa redimensionar
    let processedFile: File | Blob = file;

    if (config.maxWidth && config.maxHeight) {
      const needsResize =
        dimensions.width > config.maxWidth ||
        dimensions.height > config.maxHeight;

      if (needsResize) {
        processedFile = await resizeImage(
          file,
          config.maxWidth,
          config.maxHeight,
          config.quality
        );
      }
    }

    // Converter blob para file se necessário
    if (processedFile instanceof Blob && !(processedFile instanceof File)) {
      processedFile = new File([processedFile], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });
    }

    return {
      success: true,
      file: processedFile as File,
      url: URL.createObjectURL(processedFile),
      metadata: {
        size: processedFile.size,
        width: dimensions.width,
        height: dimensions.height,
        type: file.type,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Upload múltiplo de imagens
 */
export async function processMultipleImageUploads(
  files: FileList | File[],
  config: UploadConfig
): Promise<UploadResult[]> {
  const fileArray = Array.from(files);
  const results: UploadResult[] = [];

  for (const file of fileArray) {
    const result = await processImageUpload(file, config);
    results.push(result);
  }

  return results;
}

/**
 * Gerar thumbnail da imagem
 */
export function generateThumbnail(
  file: File,
  width: number = 150,
  height: number = 150
): Promise<Blob> {
  return resizeImage(file, width, height, 0.8);
}

/**
 * Comprimir imagem para web
 */
export async function compressImageForWeb(file: File): Promise<File> {
  const config = UPLOAD_CONFIGS.general;
  const result = await processImageUpload(file, config);

  if (result.success && result.file) {
    return result.file;
  }

  throw new Error(result.error || "Erro ao comprimir imagem");
}

/**
 * Verificar se o arquivo é uma imagem válida
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  return validTypes.includes(file.type);
}

/**
 * Formatar tamanho de arquivo em texto legível
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Limpar URLs de objeto para evitar vazamentos de memória
 */
export function cleanupImagePreviews(previews: ImagePreview[]): void {
  previews.forEach((preview) => {
    if (preview.url.startsWith("blob:")) {
      URL.revokeObjectURL(preview.url);
    }
  });
}

/**
 * Upload para servidor (simulado - deve ser substituído por implementação real)
 */
export async function uploadToServer(
  file: File,
  endpoint: string = "/api/upload"
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        url: result.url,
      };
    } else {
      return {
        success: false,
        error: result.error || "Erro no upload",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro de conexão",
    };
  }
}

/**
 * Classe para gerenciar uploads
 */
export class ImageUploadManager {
  private uploads: Map<string, UploadResult> = new Map();
  private config: UploadConfig;

  constructor(config: UploadConfig) {
    this.config = config;
  }

  async addFile(id: string, file: File): Promise<UploadResult> {
    const result = await processImageUpload(file, this.config);
    this.uploads.set(id, result);
    return result;
  }

  getUpload(id: string): UploadResult | undefined {
    return this.uploads.get(id);
  }

  removeUpload(id: string): void {
    const upload = this.uploads.get(id);
    if (upload && upload.url && upload.url.startsWith("blob:")) {
      URL.revokeObjectURL(upload.url);
    }
    this.uploads.delete(id);
  }

  getAllUploads(): UploadResult[] {
    return Array.from(this.uploads.values());
  }

  cleanup(): void {
    this.uploads.forEach((upload) => {
      if (upload.url && upload.url.startsWith("blob:")) {
        URL.revokeObjectURL(upload.url);
      }
    });
    this.uploads.clear();
  }
}
