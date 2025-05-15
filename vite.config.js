// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    // If you need to provide global variables
    global: {},
  },
  // Support for environment variables with VITE_ prefix
  envPrefix: 'VITE_',
  // Only add this if you encounter any specific Node.js polyfill issues
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  // Configure server options if needed
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Set to true in production to remove console logs
      },
    },
  },
})