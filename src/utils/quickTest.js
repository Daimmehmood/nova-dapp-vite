// src/utils/quickTest.js
import { getComprehensiveTokenAnalysis, checkApiHealth } from '../services/cryptoApiService';

// Create a simple test function
const quickTest = async () => {
  console.log('Running quick API test...');
  
  try {
    // Check API health
    console.log('1. Checking API health...');
    const health = await checkApiHealth();
    console.log('API Health:', health);
    
    if (health.coinGecko.status === 'online') {
      // Test token retrieval
      console.log('2. Testing token retrieval...');
      const btcData = await getComprehensiveTokenAnalysis('bitcoin');
      console.log('Bitcoin data retrieved:', !!btcData);
      console.log('Test successful!');
      return { success: true, data: btcData };
    } else {
      console.log('APIs offline. Test aborted.');
      return { success: false, error: 'APIs offline' };
    }
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error: error.message };
  }
};

// Expose to window object
if (typeof window !== 'undefined') {
  window.runQuickTest = quickTest;
}

export default quickTest;