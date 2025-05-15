// src/components/Button.jsx
import React from 'react';
import styled, { css } from 'styled-components';
import { pulseGlow } from '../styles/animations';

// Button variants
const variants = {
  primary: css`
    background: ${({ theme }) => theme.gradients.orangeYellow};
    color: ${({ theme }) => theme.colors.primaryBlack};
    box-shadow: ${({ theme }) => theme.shadows.glowOrange};
    animation: ${pulseGlow} 2s infinite;
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glowYellow};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primaryOrange};
    border: 1px solid ${({ theme }) => theme.colors.primaryOrange};
    
    &:hover {
      background: rgba(255, 107, 26, 0.1);
      color: ${({ theme }) => theme.colors.primaryYellow};
      border-color: ${({ theme }) => theme.colors.primaryYellow};
    }
  `,
  // Character-specific variants
  nova: css`
    background: ${({ theme }) => theme.gradients.novaGradient};
    color: ${({ theme }) => theme.colors.primaryBlack};
    box-shadow: ${({ theme }) => theme.shadows.glowNova};
    
    &:hover {
      box-shadow: 0 0 15px rgba(255, 91, 121, 0.9), 0 0 30px rgba(255, 91, 121, 0.7);
    }
  `,
  luna: css`
    background: ${({ theme }) => theme.gradients.lunaGradient};
    color: ${({ theme }) => theme.colors.primaryBlack};
    box-shadow: ${({ theme }) => theme.shadows.glowLuna};
    
    &:hover {
      box-shadow: 0 0 15px rgba(153, 51, 255, 0.9), 0 0 30px rgba(153, 51, 255, 0.7);
    }
  `,
  vega: css`
    background: ${({ theme }) => theme.gradients.vegaGradient};
    color: ${({ theme }) => theme.colors.primaryBlack};
    box-shadow: ${({ theme }) => theme.shadows.glowVega};
    
    &:hover {
      box-shadow: 0 0 15px rgba(51, 204, 255, 0.9), 0 0 30px rgba(51, 204, 255, 0.7);
    }
  `,
  ember: css`
    background: ${({ theme }) => theme.gradients.emberGradient};
    color: ${({ theme }) => theme.colors.primaryBlack};
    box-shadow: ${({ theme }) => theme.shadows.glowEmber};
    
    &:hover {
      box-shadow: 0 0 15px rgba(255, 153, 51, 0.9), 0 0 30px rgba(255, 153, 51, 0.7);
    }
  `,
  astra: css`
    background: ${({ theme }) => theme.gradients.astraGradient};
    color: ${({ theme }) => theme.colors.primaryBlack};
    box-shadow: ${({ theme }) => theme.shadows.glowAstra};
    
    &:hover {
      box-shadow: 0 0 15px rgba(78, 255, 159, 0.9), 0 0 30px rgba(78, 255, 159, 0.7);
    }
  `
};

// Button sizes
const sizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.25rem;
  `
};

const StyledButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
    box-shadow: none;
    animation: none;
    
    &:hover {
      transform: none;
    }
    
    &::before {
      display: none;
    }
  }
  
  /* Apply variant styles */
  ${({ variant }) => variants[variant] || variants.primary}
  
  /* Apply size styles */
  ${({ size }) => sizes[size] || sizes.medium}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  ...rest 
}) => {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;