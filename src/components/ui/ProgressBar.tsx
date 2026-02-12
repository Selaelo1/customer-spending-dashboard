import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = '#00A3AD',
  height = 'md',
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={`w-full bg-gray-100 rounded-full ${heights[height]} ${className}`}>
      <div
        className="rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color
        }}
      />
    </div>
  );
};