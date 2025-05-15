// src/utils/solanaWalletUtils.js

/**
 * Safe wrapper for checking if the window object and wallet providers exist
 * This prevents errors from wallet extensions that try to inject before they're ready
 */
export const safeWindowCheck = () => {
    return typeof window !== 'undefined';
  };
  
  /**
   * Safely detects if a Solana wallet provider is available
   * @param {string} providerName - Name of provider to check
   * @returns {boolean} - Whether the provider is available
   */
  export const isSolanaWalletAvailable = (providerName) => {
    if (!safeWindowCheck()) return false;
    
    try {
      switch (providerName.toLowerCase()) {
        case 'phantom':
          return !!window.solana?.isPhantom;
        case 'solflare':
          return !!window.solflare;
        case 'sollet':
          return !!window.sollet;
        case 'coin98':
          return !!window.coin98;
        case 'math':
          return !!window.solana?.isMathWallet;
        case 'solong':
          return !!window.solong;
        default:
          return false;
      }
    } catch (error) {
      console.error(`Error checking for wallet ${providerName}:`, error);
      return false;
    }
  };
  
  /**
   * Initialize safe detection of wallet providers
   * @returns {Promise<Object>} - Object with detected wallet providers
   */
  export const detectWalletProviders = () => {
    return new Promise((resolve) => {
      // First check if we're in a browser environment
      if (!safeWindowCheck()) {
        resolve({});
        return;
      }
      
      // Wait for the window to fully load and wallet extensions to inject
      setTimeout(() => {
        try {
          const providers = {
            phantom: isSolanaWalletAvailable('phantom'),
            solflare: isSolanaWalletAvailable('solflare'),
            sollet: isSolanaWalletAvailable('sollet'),
            coin98: isSolanaWalletAvailable('coin98'),
            mathwallet: isSolanaWalletAvailable('math'),
            solong: isSolanaWalletAvailable('solong')
          };
          
          resolve(providers);
        } catch (error) {
          console.error('Error detecting wallet providers:', error);
          // Return empty object if error occurs
          resolve({});
        }
      }, 1500); // Wait 1.5 seconds for extensions to initialize
    });
  };
  
  /**
   * Create a safe version of wallet adapter initialization
   * This helps prevent errors caused by wallet extensions
   * @param {Function} callback - Function to call after initialization
   */
  export const initializeSafeWalletDetection = (callback) => {
    if (typeof document === 'undefined') return;
    
    // Method 1: Wait for DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => detectWalletProviders().then(callback), 500);
      });
    } else {
      // Method 2: DOM already loaded, wait a bit longer for extensions
      setTimeout(() => detectWalletProviders().then(callback), 1500);
    }
  };