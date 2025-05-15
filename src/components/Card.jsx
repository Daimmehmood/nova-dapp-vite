// src/components/Card.jsx
import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { pulseGlow } from '../styles/animations';

// Card variants
const variants = {
  default: css`
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(255, 107, 26, 0.3);
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryOrange};
      box-shadow: ${({ theme }) => theme.shadows.glowOrange};
    }
  `,
  active: css`
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid ${({ theme }) => theme.colors.primaryYellow};
    box-shadow: ${({ theme }) => theme.shadows.glowOrange};
    animation: ${pulseGlow} 3s infinite;
  `,
  // Character-specific variants
  nova: css`
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid ${({ theme }) => theme.colors.nova};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glowNova};
    }
  `,
  luna: css`
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid ${({ theme }) => theme.colors.luna};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glowLuna};
    }
  `,
  vega: css`
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid ${({ theme }) => theme.colors.vega};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glowVega};
    }
  `,
  ember: css`
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid ${({ theme }) => theme.colors.ember};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glowEmber};
    }
  `,
  astra: css`
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid ${({ theme }) => theme.colors.astra};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.glowAstra};
    }
  `
};

const StyledCard = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ noPadding }) => noPadding ? '0' : '1.5rem'};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  
  /* Apply variant styles */
  ${({ variant, active }) => active ? variants.active : variants[variant] || variants.default}
  
  /* Cyberpunk corner accents */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: 1;
    pointer-events: none;
  }
  
  &::before {
    top: 0;
    left: 0;
    border-top: 2px solid ${({ theme, variant }) => 
      variant === 'nova' ? theme.colors.nova :
      variant === 'luna' ? theme.colors.luna :
      variant === 'vega' ? theme.colors.vega :
      variant === 'ember' ? theme.colors.ember :
      variant === 'astra' ? theme.colors.astra :
      theme.colors.primaryOrange
    };
    border-left: 2px solid ${({ theme, variant }) => 
      variant === 'nova' ? theme.colors.nova :
      variant === 'luna' ? theme.colors.luna :
      variant === 'vega' ? theme.colors.vega :
      variant === 'ember' ? theme.colors.ember :
      variant === 'astra' ? theme.colors.astra :
      theme.colors.primaryOrange
    };
  }
  
  &::after {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid ${({ theme, variant }) => 
      variant === 'nova' ? theme.colors.nova :
      variant === 'luna' ? theme.colors.luna :
      variant === 'vega' ? theme.colors.vega :
      variant === 'ember' ? theme.colors.ember :
      variant === 'astra' ? theme.colors.astra :
      theme.colors.primaryOrange
    };
    border-right: 2px solid ${({ theme, variant }) => 
      variant === 'nova' ? theme.colors.nova :
      variant === 'luna' ? theme.colors.luna :
      variant === 'vega' ? theme.colors.vega :
      variant === 'ember' ? theme.colors.ember :
      variant === 'astra' ? theme.colors.astra :
      theme.colors.primaryOrange
    };
  }
  
  &:hover {
    transform: ${({ clickable }) => clickable ? 'translateY(-5px)' : 'none'};
  }
`;

const Card = ({ 
  children, 
  variant = 'default',
  active = false,
  clickable = false,
  noPadding = false,
  onClick,
  ...rest 
}) => {
  return (
    <StyledCard
      variant={variant}
      active={active}
      clickable={clickable}
      noPadding={noPadding}
      onClick={clickable ? onClick : undefined}
      whileHover={clickable ? { scale: 1.02 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

export default Card;