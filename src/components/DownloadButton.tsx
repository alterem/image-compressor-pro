import React from 'react';
import { Download, CheckCircle } from 'lucide-react';

interface DownloadButtonProps {
  file: File;
  originalFileName: string;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  file,
  originalFileName,
  className = ''
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);
  
  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      
      // Generate new filename with compression suffix
      const extension = file.name.split('.').pop() || 'jpg';
      const baseName = originalFileName.replace(/\.[^/.]+$/, '');
      const newFileName = `${baseName}_compressed.${extension}`;
      
      link.href = url;
      link.download = newFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold
        transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed
        ${
          downloaded
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600'
        }
        ${className}
      `}
    >
      {downloaded ? (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>下载完成</span>
        </>
      ) : (
        <>
          <Download className={`w-5 h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
          <span>{isDownloading ? '准备下载...' : '下载压缩图片'}</span>
        </>
      )}
    </button>
  );
};