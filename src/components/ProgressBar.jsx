// src/components/ProgressBar.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fillAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--fill-width);
  }
`;

const BarContainer = styled.div`
  width: 100%;
  height: ${props => props.height || '8px'};
  background: rgba(26, 26, 26, 0.8);
  border-radius: ${props => props.height ? `${parseInt(props.height) / 2}px` : '4px'};
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  margin: ${props => props.margin || '0.5rem 0'};
`;

const BarFill = styled.div`
  height: 100%;
  width: ${({ fillPercentage }) => `${fillPercentage}%`};
  background: ${({ color, theme }) => color || theme.gradients.orangeYellow};
  border-radius: ${props => props.height ? `${parseInt(props.height) / 2}px` : '4px'};
  animation: ${fillAnimation} 1.5s ease-out;
  animation-fill-mode: both;
  --fill-width: ${({ fillPercentage }) => `${fillPercentage}%`};
  position: relative;
  
  /* Optional glow effect */
  ${({ glow, color, theme }) => glow && `
    box-shadow: 0 0 10px ${color || theme.colors.primaryOrange};
  `}
  
  /* Striped effect */
  ${({ striped }) => striped && `
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 20px 20px;
  `}
  
  /* Animated stripes */
  ${({ animated }) => animated && `
    animation: ${fillAnimation} 1.5s ease-out, stripesAnimation 1s linear infinite;
    
    @keyframes stripesAnimation {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 20px 0;
      }
    }
  `}
`;

const ProgressLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  z-index: 1;
  white-space: nowrap;
`;

// Character-specific gradient maps
const characterGradients = {
  nova: 'linear-gradient(45deg, #FF5B79 0%, #FF9190 100%)',
  luna: 'linear-gradient(45deg, #9933FF 0%, #CC66FF 100%)',
  vega: 'linear-gradient(45deg, #33CCFF 0%, #00FFFF 100%)',
  ember: 'linear-gradient(45deg, #FF9933 0%, #FFCC33 100%)',
  astra: 'linear-gradient(45deg, #4EFF9F 0%, #00FF66 100%)'
};

const ProgressBar = ({ 
  progress,
  max = 100,
  height,
  margin,
  showLabel = false,
  glow = false,
  striped = false,
  animated = false,
  characterType,
  color
}) => {
  // Calculate fill percentage
  const fillPercentage = Math.min((progress / max) * 100, 100);
  
  // Get gradient based on character type if specified
  const barColor = characterType ? characterGradients[characterType] : color;
  
  return (
    <BarContainer height={height} margin={margin}>
      <BarFill 
        fillPercentage={fillPercentage}
        color={barColor}
        glow={glow}
        striped={striped}
        animated={animated}
      />
      {showLabel && (
        <ProgressLabel>{Math.round(fillPercentage)}%</ProgressLabel>
      )}
    </BarContainer>
  );
};

export default ProgressBar;