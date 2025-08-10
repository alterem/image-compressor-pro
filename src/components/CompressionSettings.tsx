import React, { useState, useEffect } from 'react';
import { Settings, Play, Target, Sliders, FileImage } from 'lucide-react';
import { CompressionConfig, CompressedImageData } from '../App';
import { compressImage, createImageUrl, revokeImageUrl } from '../utils/imageCompression';
import { formatFileSize, parseTargetSize } from '../utils/formatters';
import { ProgressBar } from './ProgressBar';

interface CompressionSettingsProps {
  originalImage: File;
  config: CompressionConfig;
  onConfigChange: (config: CompressionConfig) => void;
  onCompressionStart: () => void;
  onCompressionComplete: (data: CompressedImageData) => void;
  isCompressing: boolean;
  progress: number;
  onProgressUpdate: (progress: number) => void;
}

export const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  originalImage,
  config,
  onConfigChange,
  onCompressionStart,
  onCompressionComplete,
  isCompressing,
  progress,
  onProgressUpdate
}) => {
  const [targetSizeInput, setTargetSizeInput] = useState('');
  const [compressionMessage, setCompressionMessage] = useState('');
  const [hasTargetSize, setHasTargetSize] = useState(false);
  
  const handleQualityChange = (quality: number) => {
    onConfigChange({ ...config, quality });
  };
  
  const handleFormatChange = (format: 'jpeg' | 'png' | 'webp') => {
    onConfigChange({ ...config, outputFormat: format });
  };
  
  const handleTargetSizeChange = (value: string) => {
    setTargetSizeInput(value);
    const targetSizeKB = parseTargetSize(value);
    
    if (targetSizeKB && targetSizeKB > 0) {
      setHasTargetSize(true);
      onConfigChange({ ...config, targetSizeKB });
    } else {
      setHasTargetSize(false);
      onConfigChange({ ...config, targetSizeKB: undefined });
    }
  };
  
  const handleCompress = async () => {
    try {
      onCompressionStart();
      
      const compressedFile = await compressImage(
        originalImage,
        config,
        (progressData) => {
          setCompressionMessage(progressData.message);
          onProgressUpdate(progressData.progress);
        }
      );
      
      const originalUrl = createImageUrl(originalImage);
      const compressedUrl = createImageUrl(compressedFile);
      
      const data: CompressedImageData = {
        originalFile: originalImage,
        compressedFile,
        originalSize: originalImage.size,
        compressedSize: compressedFile.size,
        compressionRatio: compressedFile.size / originalImage.size,
        originalUrl,
        compressedUrl
      };
      
      onCompressionComplete(data);
    } catch (error) {
      console.error('Compression failed:', error);
      setCompressionMessage('压缩失败，请重试');
    }
  };
  
  const getQualityLabel = (quality: number): string => {
    if (quality >= 0.9) return '最高质量';
    if (quality >= 0.7) return '高质量';
    if (quality >= 0.5) return '中等质量';
    if (quality >= 0.3) return '低质量';
    return '最低质量';
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">压缩设置</h2>
        </div>
        <p className="text-gray-600">调整参数以获得最佳压缩效果</p>
      </div>
      
      {/* Target Size */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          <label className="font-semibold text-gray-800">目标文件大小（可选）</label>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="例如: 1.5MB, 500KB"
            value={targetSizeInput}
            onChange={(e) => handleTargetSizeChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isCompressing}
          />
          {hasTargetSize && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                ✓ 已设置
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500">
          原始大小: {formatFileSize(originalImage.size)}
        </p>
      </div>
      
      {/* Quality Slider */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-500" />
          <label className="font-semibold text-gray-800">图片质量</label>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={config.quality}
            onChange={(e) => handleQualityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            disabled={isCompressing}
          />
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">最小文件</span>
            <span className="font-semibold text-blue-600">
              {(config.quality * 100).toFixed(0)}% - {getQualityLabel(config.quality)}
            </span>
            <span className="text-gray-500">最佳质量</span>
          </div>
        </div>
      </div>
      
      {/* Output Format */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileImage className="w-5 h-5 text-purple-500" />
          <label className="font-semibold text-gray-800">输出格式</label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['jpeg', 'png', 'webp'] as const).map((format) => (
            <button
              key={format}
              onClick={() => handleFormatChange(format)}
              disabled={isCompressing}
              className={`
                px-4 py-3 rounded-xl border-2 font-semibold transition-all hover-lift
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  config.outputFormat === format
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }
              `}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <div>• JPEG: 最小文件，适合照片</div>
          <div>• PNG: 支持透明，适合图标</div>
          <div>• WebP: 新格式，更高压缩率</div>
        </div>
      </div>
      
      {/* Compression Progress */}
      {isCompressing && (
        <ProgressBar
          progress={progress}
          isComplete={false}
          message={compressionMessage}
          className="mt-6"
        />
      )}
      
      {/* Compress Button */}
      <button
        onClick={handleCompress}
        disabled={isCompressing}
        className="
          w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg
          bg-gradient-to-r from-blue-500 to-indigo-500 text-white
          hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 hover-lift
        "
      >
        <Play className={`w-6 h-6 ${isCompressing ? 'animate-pulse' : ''}`} />
        <span>{isCompressing ? '正在压缩...' : '开始压缩'}</span>
      </button>
    </div>
  );
};

// Custom slider styles
const sliderStyles = `
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = sliderStyles;
  document.head.appendChild(styleElement);
}