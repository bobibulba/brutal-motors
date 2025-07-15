import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon: Icon,
  className = '',
}) => {
  const baseClasses = 'font-mono font-bold border-2 border-black transition-all duration-200 flex items-center justify-center space-x-2';
  
  const variantClasses = {
    primary: 'bg-brutal-yellow text-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
    secondary: 'bg-white text-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
    danger: 'bg-red-500 text-white shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
    success: 'bg-brutal-green text-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none shadow-none' 
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
