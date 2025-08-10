import React from 'react';
import { formatFileSize } from '../utils/formatters';

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
  fileSize: number;
  format: string;
  title: string;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  fileName,
  fileSize,
  format,
  title,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      
      <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
        <img
          src={imageUrl}
          alt={fileName}
          className="w-full h-48 object-contain rounded-lg bg-white"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">文件大小:</span>
          <span className="file-size-badge">{formatFileSize(fileSize)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">格式:</span>
          <span className={`format-badge format-${format.toLowerCase()}`}>
            {format.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};