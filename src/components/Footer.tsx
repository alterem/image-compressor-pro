import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 text-center text-gray-500">
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-gray-200 pt-8 mb-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">功能特色</h3>
              <ul className="text-sm space-y-2">
                <li>智能压缩算法</li>
                <li>精确大小控制</li>
                <li>多格式支持</li>
                <li>实时预览对比</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">隐私保护</h3>
              <ul className="text-sm space-y-2">
                <li>本地处理</li>
                <li>不上传服务器</li>
                <li>完全免费</li>
                <li>无需注册</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">支持格式</h3>
              <ul className="text-sm space-y-2">
                <li>JPEG / JPG</li>
                <li>PNG</li>
                <li>WebP</li>
                <li>最大 10MB</li>
              </ul>
            </div>
          </div>
          <p>
            智能图片压缩专家 - 让图片处理更简单
          </p>
        </div>
      </div>
    </footer>
  );
};