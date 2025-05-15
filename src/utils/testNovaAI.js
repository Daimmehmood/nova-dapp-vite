// src/utils/testNovaAI.js
/**
 * Utility script to test the Nova AI service
 * This can be run in the browser console to verify the enhanced crypto analysis is working
 */

import { processNovaEnhancedMessage } from '../services/novaAIService';
import { getComprehensiveTokenAnalysis, getTechnicalIndicators } from '../services/cryptoApiService';
import { OPENAI_API_KEY } from '../config/constants';

// Test the Nova AI service
const testNovaAI = async () => {
  console.log('Starting Nova AI Test...');
  console.log('OpenAI API Key configured:', OPENAI_API_KEY ? 'Yes' : 'No');
  
  try {
    // Test 1: Basic message processing
    console.log('\n--- Test 1: Basic Message Processing ---');
    const basicResponse = await processNovaEnhancedMessage('Hi, tell me about yourself');
    console.log('Basic Response:', basicResponse);
    
    // Test 2: Crypto analysis
    console.log('\n--- Test 2: Crypto Analysis Request ---');
    const cryptoResponse = await processNovaEnhancedMessage('Tell me about Bitcoin');
    console.log('Crypto Response:', cryptoResponse);
    
    // Test 3: Contract address (if available)
    console.log('\n--- Test 3: Contract Analysis ---');
    const ethereumContractAddress = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'; // BNB token
    const contractResponse = await processNovaEnhancedMessage(`Can you analyze this contract: ${ethereumContractAddress}`);
    console.log('Contract Analysis Response:', contractResponse);
    
    // Test 4: Token comparison
    console.log('\n--- Test 4: Token Comparison ---');
    const comparisonResponse = await processNovaEnhancedMessage('Compare Bitcoin and Ethereum');
    console.log('Comparison Response:', comparisonResponse);
    
    // Test 5: Accessing CoinGecko API directly
    console.log('\n--- Test 5: CoinGecko API Access ---');
    const bitcoinData = await getComprehensiveTokenAnalysis('bitcoin');
    console.log('Bitcoin Data from CoinGecko:', bitcoinData);
    
    // Test 6: Technical indicators
    console.log('\n--- Test 6: Technical Indicators ---');
    if (bitcoinData && bitcoinData.marketChart && bitcoinData.marketChart.prices) {
      const technicalIndicators = getTechnicalIndicators(bitcoinData.marketChart.prices);
      console.log('Technical Indicators for Bitcoin:', technicalIndicators);
    } else {
      console.log('Could not calculate technical indicators: No price data available');
    }
    
    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
};

// Helper function to manually test Nova AI from the console
const analyzeToken = async (token) => {
  console.log(`Analyzing ${token}...`);
  try {
    const result = await processNovaEnhancedMessage(`Analyze ${token}`);
    console.log('Analysis result:', result);
    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
    return null;
  }
};

// Helper function to test token comparisons
const compareTokens = async (token1, token2) => {
  console.log(`Comparing ${token1} and ${token2}...`);
  try {
    const result = await processNovaEnhancedMessage(`Compare ${token1} and ${token2}`);
    console.log('Comparison result:', result);
    return result;
  } catch (error) {
    console.error('Comparison failed:', error);
    return null;
  }
};

// Export the test functions so they can be run from the console
window.testNovaAI = testNovaAI;
window.analyzeToken = analyzeToken;
window.compareTokens = compareTokens;

export { testNovaAI, analyzeToken, compareTokens };