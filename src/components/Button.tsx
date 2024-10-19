import React from 'react';
import {Button as BootstrapButton} from 'react-bootstrap';

interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: string
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, variant="primary", className}) => {
  return (
    <BootstrapButton
      onClick={onClick} 
      disabled={disabled} 
      className="custom-button"
      variant={variant}
    >
      {label}
    </BootstrapButton>
  );
};

export default Button;
