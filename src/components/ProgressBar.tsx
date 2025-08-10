import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  isComplete: boolean;
  message?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  isComplete,
  message,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{message || '处理中...'}</span>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
          )}
          <span className="font-semibold text-gray-700">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full progress-bar ${
            isComplete
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {!isComplete && (
            <div className="h-full w-full bg-white/30 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};