import React, { ButtonHTMLAttributes } from 'react';
import './components.css'; // Will create this for component specific styles

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'nudge';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
