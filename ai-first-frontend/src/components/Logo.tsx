import React from 'react';
import logo from '../assets/logo.png';


export type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  size?: LogoSize;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: 'h-6',   
  md: 'h-8',   
  lg: 'h-10',  
};

export const Logo: React.FC<LogoProps> = ({ size }) => {
  const finalSize: LogoSize = size ?? 'md';
  const heightClass = sizeClasses[finalSize];

  console.log('Logo size:', size, '– className:', heightClass);
  return (
    <img
      src={logo}
      alt="VendeAI"
      className={`object-contain ${heightClass}`}
    />
  );
};

export default Logo;
