"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Image as ImageIcon,
  File,
  Check,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import {
  processImageUpload,
  createImagePreview,
  validateImageFile,
  formatFileSize,
  cleanupImagePreviews,
  UPLOAD_CONFIGS,
  UploadConfig,
  ImagePreview,
  UploadResult,
} from "@/src/helpers/upload.helpers";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onUpload?: (result: UploadResult) => void;
  onRemove?: () => void;
  config?: UploadConfig;
  multiple?: boolean;
  preview?: boolean;
  className?: string;
  accept?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function ImageUpload({
  onUpload,
  onRemove,
  config = UPLOAD_CONFIGS.general,
  multiple = false,
  preview = true,
  className = "",
  accept = "image/*",
  disabled = false,
  placeholder = "Clique ou arraste uma imagem aqui",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (files: FileList) => {
      if (disabled) return;

      setIsUploading(true);
      setErrors([]);

      const newErrors: string[] = [];
      const newPreviews: ImagePreview[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validar arquivo
        const validation = validateImageFile(file, config);
        if (!validation.valid) {
          newErrors.push(`${file.name}: ${validation.error}`);
          continue;
        }

        try {
          // Processar upload
          const result = await processImageUpload(file, config);

          if (result.success && result.file) {
            // Criar preview
            const preview = await createImagePreview(result.file);
            newPreviews.push(preview);

            // Chamar callback
            onUpload?.(result);
          } else {
            newErrors.push(`${file.name}: ${result.error}`);
          }
        } catch (error) {
          newErrors.push(`${file.name}: Erro ao processar arquivo`);
        }
      }

      if (!multiple) {
        // Limpar previews anteriores se não for múltiplo
        cleanupImagePreviews(previews);
        setPreviews(newPreviews);
      } else {
        setPreviews((prev) => [...prev, ...newPreviews]);
      }

      setErrors(newErrors);
      setIsUploading(false);
    },
    [config, disabled, multiple, onUpload, previews]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const removePreview = useCallback(
    (index: number) => {
      setPreviews((prev) => {
        const newPreviews = [...prev];
        const removed = newPreviews.splice(index, 1);
        cleanupImagePreviews(removed);

        if (newPreviews.length === 0) {
          onRemove?.();
        }

        return newPreviews;
      });
    },
    [onRemove]
  );

  const clearAll = useCallback(() => {
    cleanupImagePreviews(previews);
    setPreviews([]);
    setErrors([]);
    onRemove?.();
  }, [previews, onRemove]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          "hover:border-blue-400 hover:bg-blue-50/50",
          isDragging && "border-blue-500 bg-blue-50 scale-105",
          disabled &&
            "opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-transparent",
          previews.length > 0 && "border-green-300 bg-green-50/30",
          errors.length > 0 && "border-red-300 bg-red-50/30"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-col items-center gap-4">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-blue-600 font-medium">Processando...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload size={32} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    {placeholder}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {multiple
                      ? "Selecione uma ou mais imagens"
                      : "Selecione uma imagem"}{" "}
                    • Máximo {formatFileSize(config.maxSize)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Formatos aceitos: JPG, PNG, WebP
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {errors.map((error, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Previews */}
      <AnimatePresence>
        {preview && previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <ImageIcon size={18} />
                {previews.length} imagem{previews.length !== 1 ? "s" : ""}{" "}
                selecionada{previews.length !== 1 ? "s" : ""}
              </h4>

              {previews.length > 1 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <RotateCcw size={14} />
                  Limpar todas
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <motion.div
                  key={preview.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removePreview(index)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>

                  {/* Success Indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <Check size={14} />
                  </div>

                  {/* File Info */}
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700 truncate">
                      {preview.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(preview.size)}</span>
                      {preview.dimensions && (
                        <span>
                          {preview.dimensions.width}x{preview.dimensions.height}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente especializado para avatar
export function AvatarUpload({
  currentAvatar,
  onUpload,
  className = "",
}: {
  currentAvatar?: string;
  onUpload?: (result: UploadResult) => void;
  className?: string;
}) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);

  const handleUpload = (result: UploadResult) => {
    if (result.success && result.url) {
      setPreview(result.url);
      onUpload?.(result);
    }
  };

  const handleRemove = () => {
    setPreview(null);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
          )}
        </div>

        {preview && (
          <button
            onClick={handleRemove}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Upload Component */}
      <ImageUpload
        onUpload={handleUpload}
        onRemove={handleRemove}
        config={UPLOAD_CONFIGS.avatar}
        preview={false}
        placeholder="Escolher foto do perfil"
        className="max-w-xs"
      />
    </div>
  );
}
