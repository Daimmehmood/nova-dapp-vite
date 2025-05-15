// src/styles/Theme.jsx
export const theme = {
    colors: {
      // Primary colors
      primaryOrange: '#FF6B1A',
      primaryYellow: '#FFD700',
      primaryBlack: '#0A0A0A',
      
      // Character-specific colors
      nova: '#FF5B79',     // Nova's signature red - analytical
      luna: '#9933FF',     // Luna's purple - creative
      vega: '#33CCFF',     // Vega's blue - technical
      ember: '#FF9933',    // Ember's amber - protective
      astra: '#4EFF9F',    // Astra's green - visionary
      
      // Supporting colors
      cyberPurple: '#9933FF',
      neonBlue: '#00FFFF',
      darkGray: '#1A1A1A',
      mediumGray: '#333333',
      lightGray: '#666666',
      
      // Feedback colors
      success: '#4eff9f',
      warning: '#ffcc00',
      danger: '#ff4e4e'
    },
    
    gradients: {
      // Primary gradients
      orangeYellow: 'linear-gradient(45deg, #FF6B1A 0%, #FFD700 100%)',
      darkOrange: 'linear-gradient(180deg, #FF6B1A 0%, #CC5500 100%)',
      
      // Character-specific gradients
      novaGradient: 'linear-gradient(45deg, #FF5B79 0%, #FF9190 100%)',
      lunaGradient: 'linear-gradient(45deg, #9933FF 0%, #CC66FF 100%)',
      vegaGradient: 'linear-gradient(45deg, #33CCFF 0%, #00FFFF 100%)',
      emberGradient: 'linear-gradient(45deg, #FF9933 0%, #FFCC33 100%)',
      astraGradient: 'linear-gradient(45deg, #4EFF9F 0%, #00FF66 100%)',
      
      // Supporting gradients
      purpleBlue: 'linear-gradient(45deg, #9933FF 0%, #00FFFF 100%)',
      darkToLight: 'linear-gradient(180deg, #0A0A0A 0%, #333333 100%)',
      cyberpunkOverlay: 'linear-gradient(180deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.8) 100%)'
    },
    
    shadows: {
      // Primary glow effects
      glowOrange: '0 0 10px rgba(255, 107, 26, 0.7), 0 0 20px rgba(255, 107, 26, 0.5)',
      glowYellow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5)',
      
      // Character-specific glows
      glowNova: '0 0 10px rgba(255, 91, 121, 0.7), 0 0 20px rgba(255, 91, 121, 0.5)',
      glowLuna: '0 0 10px rgba(153, 51, 255, 0.7), 0 0 20px rgba(153, 51, 255, 0.5)',
      glowVega: '0 0 10px rgba(51, 204, 255, 0.7), 0 0 20px rgba(51, 204, 255, 0.5)',
      glowEmber: '0 0 10px rgba(255, 153, 51, 0.7), 0 0 20px rgba(255, 153, 51, 0.5)',
      glowAstra: '0 0 10px rgba(78, 255, 159, 0.7), 0 0 20px rgba(78, 255, 159, 0.5)',
      
      // Subtle shadows
      subtle: '0 4px 6px rgba(0, 0, 0, 0.1)',
      medium: '0 6px 12px rgba(0, 0, 0, 0.15)',
      strong: '0 10px 20px rgba(0, 0, 0, 0.2)'
    },
    
    fonts: {
      heading: "'Orbitron', sans-serif",
      body: "'Rajdhani', sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    
    breakpoints: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px'
    },
    
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem'
    },
    
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      round: '50%'
    },
    
    transitions: {
      fast: '0.2s',
      medium: '0.4s',
      slow: '0.8s'
    }
  };