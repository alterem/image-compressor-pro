import React from 'react';
import { TrendingDown, FileText, Zap } from 'lucide-react';
import { formatFileSize, formatSavings } from '../utils/formatters';
import { CompressedImageData } from '../App';

interface CompressionStatsProps {
  data: CompressedImageData;
  className?: string;
}

export const CompressionStats: React.FC<CompressionStatsProps> = ({
  data,
  className = ''
}) => {
  const { originalSize, compressedSize, compressionRatio } = data;
  const savings = originalSize - compressedSize;
  const savingsPercentage = (savings / originalSize) * 100;
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Compression Ratio */}
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800">压缩比例</span>
        </div>
        <div className="text-2xl font-bold text-cyan-600">
          {(compressionRatio * 100).toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600">原始大小的 {(compressionRatio * 100).toFixed(1)}%</div>
      </div>
      
      {/* Size Reduction */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800">减少大小</span>
        </div>
        <div className="text-2xl font-bold text-green-600">
          {formatFileSize(savings)}
        </div>
        <div className="text-sm text-gray-600">节省 {savingsPercentage.toFixed(1)}% 空间</div>
      </div>
      
      {/* Final Size */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800">最终大小</span>
        </div>
        <div className="text-2xl font-bold text-emerald-600">
          {formatFileSize(compressedSize)}
        </div>
        <div className="text-sm text-gray-600">优化后的文件大小</div>
      </div>
    </div>
  );
};