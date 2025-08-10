import imageCompression from 'browser-image-compression';
import { CompressionConfig } from '../App';

export interface CompressionProgress {
  stage: 'preparing' | 'compressing' | 'optimizing' | 'complete';
  progress: number;
  message: string;
}

export const compressImage = async (
  file: File,
  config: CompressionConfig,
  onProgress?: (progress: CompressionProgress) => void
): Promise<File> => {
  try {
    onProgress?.({
      stage: 'preparing',
      progress: 10,
      message: '准备压缩...'
    });

    // If target size is specified, use iterative compression
    if (config.targetSizeKB) {
      onProgress?.({
        stage: 'optimizing',
        progress: 30,
        message: '优化文件大小...'
      });

      const compressedFile = await compressToTargetSize(
        file,
        config.targetSizeKB * 1024,
        config,
        (progress) => {
          onProgress?.({
            stage: 'optimizing',
            progress: 30 + (progress * 0.6),
            message: '精确控制文件大小...'
          });
        }
      );

      onProgress?.({
        stage: 'complete',
        progress: 100,
        message: '压缩完成'
      });

      return compressedFile;
    } else {
      // Standard compression without target size
      const options: any = {
        maxWidthOrHeight: Math.max(config.maxWidth || 1920, config.maxHeight || 1920),
        useWebWorker: true,
        fileType: `image/${config.outputFormat}`,
        initialQuality: config.quality,
        onProgress: (progress: number) => {
          onProgress?.({
            stage: 'compressing',
            progress: 10 + (progress * 0.8),
            message: `压缩中... ${Math.round(progress)}%`
          });
        }
      };

      const compressedFile = await imageCompression(file, options);

      onProgress?.({
        stage: 'complete',
        progress: 100,
        message: '压缩完成'
      });

      return compressedFile;
    }
  } catch (error) {
    console.error('Compression error:', error);
    throw new Error('图片压缩失败，请重试');
  }
};

const compressToTargetSize = async (
  file: File,
  targetSizeBytes: number,
  config: CompressionConfig,
  onProgress?: (progress: number) => void
): Promise<File> => {
  let minQuality = 0.1;
  let maxQuality = 1.0;
  let bestFile = file;
  let attempts = 0;
  const maxAttempts = 15;
  const tolerance = targetSizeBytes * 0.1; // 10% tolerance

  // First attempt with original quality
  let currentQuality = config.quality;

  while (attempts < maxAttempts) {
    onProgress?.((attempts / maxAttempts) * 100);

    const options = {
      maxWidthOrHeight: Math.max(config.maxWidth || 1920, config.maxHeight || 1920),
      useWebWorker: true,
      fileType: `image/${config.outputFormat}`,
      initialQuality: currentQuality
    };

    const compressedFile = await imageCompression(file, options);

    // Check if we've achieved the target size (within tolerance)
    if (compressedFile.size <= targetSizeBytes + tolerance) {
      bestFile = compressedFile;

      // If we're very close to target, we're done
      if (Math.abs(compressedFile.size - targetSizeBytes) <= tolerance * 0.5) {
        break;
      }
    }

    // Binary search approach for quality adjustment
    if (compressedFile.size > targetSizeBytes) {
      // File too large, reduce quality
      maxQuality = currentQuality;
      currentQuality = (minQuality + currentQuality) / 2;
    } else {
      // File smaller than target, we can increase quality if we want
      minQuality = currentQuality;
      currentQuality = (currentQuality + maxQuality) / 2;
      bestFile = compressedFile; // Keep this as our best result
    }

    // If quality range is too narrow, stop
    if (maxQuality - minQuality < 0.05) {
      break;
    }

    attempts++;
  }

  onProgress?.(100);
  return bestFile;
};

export const createImageUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeImageUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};