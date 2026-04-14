import React from 'react';
import './components.css';

interface ProgressHaloProps {
  progress: number; // 0 to 100
  size?: number;
  children?: React.ReactNode;
}

export const ProgressHalo: React.FC<ProgressHaloProps> = ({ 
  progress, 
  size = 120,
  children
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="halo-container" style={{ width: size, height: size }}>
      <svg
        className="halo-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="halo-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className="halo-path"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {children && (
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {children}
        </div>
      )}
    </div>
  );
};
