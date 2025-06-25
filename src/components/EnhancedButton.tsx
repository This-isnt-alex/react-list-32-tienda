import React from 'react';
import ShapeBlur from './ShapeBlur';

interface EnhancedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variation?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  variation = 0,
  shapeSize = 1.2,
  roundness = 0.4,
  borderSize = 0.05,
  circleSize = 0.3,
  circleEdge = 0.5,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* ShapeBlur effect overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <ShapeBlur
          variation={variation}
          shapeSize={shapeSize}
          roundness={roundness}
          borderSize={borderSize}
          circleSize={circleSize}
          circleEdge={circleEdge}
        />
      </div>

      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};

export default EnhancedButton;
