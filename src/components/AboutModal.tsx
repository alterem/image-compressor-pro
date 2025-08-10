import React from 'react';
import { X, ImageIcon, Zap, Shield, Target, Sparkles, Globe } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">关于智能图片压缩专家</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 rounded-b-2xl mb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
          {/* Project Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">项目介绍</h3>
            <p className="text-gray-600 leading-relaxed">
              智能图片压缩专家是一款专业的在线图片压缩工具，采用先进的压缩算法，
              能够在保持图片质量的同时显著减小文件大小。支持多种图片格式，
              提供精确的文件大小控制，是您处理图片的最佳选择。
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">核心功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <Zap className="w-6 h-6 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">极速压缩</h4>
                  <p className="text-sm text-blue-600">采用多线程处理，压缩速度快</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <Shield className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">隐私保护</h4>
                  <p className="text-sm text-green-600">本地处理，图片不上传服务器</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                <Target className="w-6 h-6 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-800">精确控制</h4>
                  <p className="text-sm text-purple-600">可设置目标文件大小</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                <Sparkles className="w-6 h-6 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-800">智能算法</h4>
                  <p className="text-sm text-orange-600">自动优化压缩参数</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">支持格式</h3>
            <div className="flex flex-wrap gap-2">
              <span className="format-badge format-jpeg">JPEG</span>
              <span className="format-badge format-png">PNG</span>
              <span className="format-badge format-webp">WebP</span>
            </div>
            <p className="text-sm text-gray-500">
              支持主流图片格式的输入和输出，满足不同场景需求
            </p>
          </div>

          {/* Technical Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">技术特点</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>基于现代 Web 技术构建，无需安装</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>客户端处理，保护用户隐私安全</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Web Worker 多线程处理，提升性能</span>
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span>二分搜索算法，精确控制文件大小</span>
              </li>
            </ul>
          </div>

          {/* Version Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">版本信息</h4>
                <p className="text-sm text-gray-600">当前版本：v1.0.0</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">构建于 React + TypeScript</p>
                <p className="text-sm text-gray-500">使用 Vite + Tailwind CSS</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="https://github.com/alterem/image-compressor-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                查看源码
              </a>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t border-gray-200 p-6 mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                智能图片压缩专家 - 让图片处理更简单
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};