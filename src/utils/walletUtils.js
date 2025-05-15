// src/utils/walletUtils.js
export const isSolanaWalletAvailable = (walletName) => {
    try {
      // Check for Phantom
      if (walletName === 'phantom') {
        return window?.phantom?.solana?.isPhantom || false;
      }
      
      // Check for Solflare
      if (walletName === 'solflare') {
        return window?.solflare?.isSolflare || false;
      }
      
      // Check for other wallets as needed
      return false;
    } catch (error) {
      console.error(`Error checking wallet ${walletName}:`, error);
      return false;
    }
  };