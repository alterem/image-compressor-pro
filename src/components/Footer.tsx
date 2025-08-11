import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            智能图片压缩 - 让图片处理更简单
          </p>
        </div>
      </div>
    </footer>
  );
};