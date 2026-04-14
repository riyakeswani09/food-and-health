import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color, className = '' }) => {
  // If color is a hex, we could convert it to rgba, but assuming it could be a css variable
  // Let's rely on standard color names or let them pass the exact styling
  
  const style = color ? { 
    backgroundColor: color.startsWith('var') ? `color-mix(in srgb, ${color} 15%, transparent)` : `${color}20`, 
    color: color,
    border: `1px solid ${color.startsWith('var') ? `color-mix(in srgb, ${color} 30%, transparent)` : `${color}40`}`
  } : {};

  return (
    <span className={`badge ${className}`} style={style}>
      {children}
    </span>
  );
};
