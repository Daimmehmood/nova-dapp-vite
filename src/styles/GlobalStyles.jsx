// src/styles/GlobalStyles.jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.primaryBlack};
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    &:before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        linear-gradient(rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.8) 100%),
        url('/images/backgrounds/main-bg.jpg') no-repeat center center/cover;
      z-index: -1;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 2.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2rem;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 1.75rem;
    }
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primaryYellow};
    transition: color 0.3s ease, text-shadow 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryOrange};
      text-shadow: ${({ theme }) => theme.shadows.glowOrange};
    }
  }
  
  button {
    font-family: ${({ theme }) => theme.fonts.heading};
    cursor: pointer;
    border: none;
    outline: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.darkGray};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryOrange};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryYellow};
    }
  }
  
  /* Animation for scan lines */
  @keyframes scanLine {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  
  /* Animation for glitch effect */
  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
  
  /* Animation for pulsing glow */
  @keyframes pulseGlow {
    0% {
      box-shadow: 0 0 5px rgba(255, 107, 26, 0.7), 0 0 10px rgba(255, 107, 26, 0.5);
    }
    50% {
      box-shadow: 0 0 15px rgba(255, 107, 26, 0.9), 0 0 30px rgba(255, 107, 26, 0.7);
    }
    100% {
      box-shadow: 0 0 5px rgba(255, 107, 26, 0.7), 0 0 10px rgba(255, 107, 26, 0.5);
    }
  }
  
  /* Container utility class */
  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`;

export default GlobalStyles;