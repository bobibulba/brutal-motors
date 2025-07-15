import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClasses = hover 
    ? 'hover:translate-x-2 hover:translate-y-2 hover:shadow-none cursor-pointer' 
    : '';

  return (
    <div className={`bg-white border-2 border-black shadow-brutal transition-all duration-200 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
