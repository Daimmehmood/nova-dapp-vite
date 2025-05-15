// src/context/SolanaWalletProvider.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { 
  ConnectionProvider, 
  WalletProvider 
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  SolongWalletAdapter,
  Coin98WalletAdapter,
  CloverWalletAdapter,
  MathWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { isSolanaWalletAvailable } from '../utils/walletUtils';

// Import the wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const SolanaWalletProvider = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = 'devnet';
  
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize wallet adapters
  const wallets = useMemo(() => {
    const adapters = [];
    
    try {
      // Add Phantom wallet (most popular)
      if (isSolanaWalletAvailable('phantom')) {
        adapters.push(new PhantomWalletAdapter());
      }
      
      // Add Solflare wallet
      if (isSolanaWalletAvailable('solflare')) {
        adapters.push(new SolflareWalletAdapter());
      }
      
      // Add other wallets
      adapters.push(
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolongWalletAdapter(),
        new Coin98WalletAdapter(),
        new CloverWalletAdapter(),
        new MathWalletAdapter()
      );
    } catch (error) {
      console.error('Error initializing wallet adapters:', error);
    }
    
    return adapters;
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWalletProvider;