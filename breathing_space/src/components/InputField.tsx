import React, { InputHTMLAttributes, useState } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  icon,
  className = '', 
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`input-container ${className}`}>
      {label && <label className="input-label title-lg">{label}</label>}
      <div 
        className={`input-wrapper ${isFocused ? 'focused' : ''}`}
      >
        {icon && <span className="input-icon">{icon}</span>}
        <input 
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className="input-field"
          {...props} 
        />
      </div>
    </div>
  );
};
