import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react';
import { formatFileSize } from '../utils/formatters';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isCompressing: boolean;
  onReset: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  isCompressing,
  onReset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return '仅支持 JPEG, PNG, WebP 格式的图片';
    }
    if (file.size > maxSize) {
      return '文件大小不能超过 10MB';
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setUploadedFile(file);
    onImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onReset();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">上传图片</h2>
        <p className="text-gray-600">支持 JPEG, PNG, WebP 格式，最大 10MB</p>
      </div>

      {!uploadedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-300 hover-lift
            ${
              dragActive
                ? 'border-blue-500 bg-blue-50/50 scale-[1.02]'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isCompressing}
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                拖拽图片到此处，或点击选择文件
              </p>
              <p className="text-sm text-gray-500">
                支持 JPEG, PNG, WebP • 最大 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{uploadedFile.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {formatFileSize(uploadedFile.size)}
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {uploadedFile.type.split('/')[1].toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            
            <button
              onClick={handleReset}
              disabled={isCompressing}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="重新选择图片"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-white/60 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">图片信息:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">文件大小:</span>
                <span className="ml-2 font-semibold">{formatFileSize(uploadedFile.size)}</span>
              </div>
              <div>
                <span className="text-gray-500">格式:</span>
                <span className="ml-2 font-semibold">{uploadedFile.type.split('/')[1].toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};