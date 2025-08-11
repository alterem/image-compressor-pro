import React from 'react';

interface CompressIconProps {
  className?: string;
}

export const CompressIcon: React.FC<CompressIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <img
      src="icon-512.svg"
      alt="图片压缩"
      className={className}
    />
  );
};