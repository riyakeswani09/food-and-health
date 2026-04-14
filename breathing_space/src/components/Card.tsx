import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  interactive = false
}) => {
  return (
    <div 
      className={`card ${interactive ? 'card-interactive' : ''} ${className}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};
