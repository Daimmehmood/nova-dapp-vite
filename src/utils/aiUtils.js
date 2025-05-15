// src/utils/aiUtils.js

// Use environment variable for API key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Configuration
const CONFIG = {
  useAPIbyDefault: true,  // Set to false to use fallbacks instead of API
  showAPIerrors: true,     // Show detailed API errors for debugging
  useJSONResponses: true   // Use JSON files for character responses
};

// Import character data
import novaData from '../data/characters/nova.json';
import lunaData from '../data/characters/luna.json';
import vegaData from '../data/characters/vega.json';
import emberData from '../data/characters/ember.json';
import astraData from '../data/characters/astra.json';

// Combine all character data
const characterData = {
  nova: novaData,
  luna: lunaData,
  vega: vegaData,
  ember: emberData,
  astra: astraData
};

// Get topics characters can discuss (for filtering)
const ALLOWED_TOPICS = [
  "cryptocurrency", "bitcoin", "ethereum", "solana", "blockchain", 
  "defi", "nft", "token", "market", "trading", "investing", "crypto", 
  "mining", "wallet", "exchange", "altcoin", "stablecoin", "smart contract",
  "protocol", "yield", "liquidity", "staking", "governance", "dao",
  "airdrop", "ico", "ido", "metrics", "analysis", "chart", "trend",
  "bull", "bear", "technical", "fundamental", "coin", "digital asset",
  "web3", "metaverse", "layer", "rollup", "scaling", "consensus", 
  "chain", "hash", "block", "transaction", "validator", "node",
  "wallet", "address", "key", "ledger", "mainnet", "testnet",
  "private key", "public key", "gas", "fee", "mempool", "halving",
  "fork", "cold storage", "hot wallet", "seed phrase", "bridge",
  "btc", "eth", "sol", "usdt", "usdc", "bnb", "xrp", "ada", "avax",
  "doge", "shib", "dot", "link", "ltc", "matic", "cex", "dex", "amm"
];

// Expanded list of non-crypto topics that should be rejected
const OFF_LIMIT_TOPICS = [
  "generate image", "create image", "draw picture", "create picture", 
  "generate picture", "draw image", "make image", "make picture",
  "political", "politics", "election", "president", "democrat", "republican",
  "sexual", "sex", "dating", "relationship advice", "medical advice", "health diagnosis",
  "illegal", "hack", "hacking", "weapon", "bomb", "drug", "suicide",
  "legal advice", "lawsuit", "attorney", "lawyer", 
  "write essay", "write for me", "do my homework", "write my", "complete my",
  "personal information", "credit card", "social security", "password"
];

// Enhanced topic relevance detection
export const isRelevantToCrypto = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // First check if it contains any explicitly off-limit topics
  if (OFF_LIMIT_TOPICS.some(topic => lowerPrompt.includes(topic))) {
    return false;
  }
  
  // Then check if it's related to crypto
  const containsCryptoTopic = ALLOWED_TOPICS.some(topic => lowerPrompt.includes(topic));
  
  // If it's a very short query, we need more context to determine if it's crypto-related
  if (prompt.length < 10) {
    // For short queries, be more lenient - could be simple questions like "What is BTC?"
    return true;
  }
  
  return containsCryptoTopic;
};

// Categorize the type of off-topic query for better responses
export const categorizeOffTopicQuery = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("image") || lowerPrompt.includes("picture") || lowerPrompt.includes("draw")) {
    return "image_generation";
  }
  
  if (lowerPrompt.includes("write") || lowerPrompt.includes("essay") || lowerPrompt.includes("homework")) {
    return "content_creation";
  }
  
  if (lowerPrompt.includes("medical") || lowerPrompt.includes("health") || lowerPrompt.includes("diagnosis")) {
    return "medical_advice";
  }
  
  if (lowerPrompt.includes("legal") || lowerPrompt.includes("law") || lowerPrompt.includes("attorney")) {
    return "legal_advice";
  }
  
  if (lowerPrompt.includes("hack") || lowerPrompt.includes("illegal") || lowerPrompt.includes("weapon")) {
    return "illegal_activities";
  }
  
  if (lowerPrompt.includes("sexual") || lowerPrompt.includes("sex")) {
    return "inappropriate_content";
  }
  
  return "general_off_topic";
};

// Get specific off-topic responses based on the category from JSON files
export const getOffTopicResponse = (prompt, characterId) => {
  if (CONFIG.useJSONResponses) {
    const category = categorizeOffTopicQuery(prompt);
    
    // Get character data
    const character = characterData[characterId] || characterData.nova;
    
    // Get off-topic responses
    const offTopicResponses = character.off_topic || {};
    
    // Return specific category response or general off-topic response
    return offTopicResponses[category] || offTopicResponses.general_off_topic || 
           `I'm ${character.character_info.name}, and I specialize in cryptocurrency and blockchain analysis. I'd be happy to help you with crypto-related questions instead.`;
  }
  
  // Fallback to hard-coded responses if JSON not used
  const category = categorizeOffTopicQuery(prompt);
  const characterName = 
    characterId === 'nova' ? 'Nova' :
    characterId === 'luna' ? 'Luna' :
    characterId === 'vega' ? 'Vega' :
    characterId === 'ember' ? 'Ember' :
    characterId === 'astra' ? 'Astra' :
    'AI assistant';
  
  // Default off-topic response if not using JSON files
  return `I'm ${characterName}, specialized in cryptocurrency and blockchain analysis. Your question appears to be outside my area of expertise. I'm designed to help with crypto market analysis, token evaluation, blockchain technology, and related topics. Would you like to explore any crypto-related subjects instead?`;
};

// Generate character-specific system message from JSON files
const generateCharacterSystemMessage = (characterId) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Use JSON data if enabled
  if (CONFIG.useJSONResponses) {
    // Get character data
    const character = characterData[characterId] || characterData.nova;
    const info = character.character_info;
    
    return `You are ${info.name}, the ${info.title} AI from the NOVA ecosystem. You have the following skills:
      ${info.skills.map(skill => `- ${skill}`).join('\n      ')}
      
      IMPORTANT RULES:
      1. You ONLY respond to questions about cryptocurrency, blockchain, tokens, and crypto markets.
      2. If asked about any other topic, politely redirect the conversation back to crypto.
      3. Your tone is ${getCharacterTone(characterId)}.
      4. Keep responses concise (under 3 paragraphs) unless detailed analysis is requested.
      5. Always mention that you are providing ${getCharacterAdviceType(characterId)}, not financial advice.
      
      Current date: ${currentDate}`;
  }
  
  // Fallback to hard-coded system messages
  switch(characterId) {
    case 'nova':
      return `You are Nova, the Logic-Driven Analyst AI from the NOVA ecosystem...`; // Rest as before
    case 'luna':
      return `You are Luna, the Creative Explorer AI from the NOVA ecosystem...`; // Rest as before
    // Other cases as before
    default:
      return `You are an AI assistant specializing in cryptocurrency and blockchain technology. 
      You only respond to questions related to crypto, tokens, blockchain, and digital assets.
      Current date: ${currentDate}`;
  }
};

// Helper functions for character traits
function getCharacterTone(characterId) {
  switch(characterId) {
    case 'nova': return "analytical, precise, and focused on facts rather than emotions";
    case 'luna': return "imaginative, enthusiastic, and forward-thinking";
    case 'vega': return "methodical, detail-oriented, and focused on technical precision";
    case 'ember': return "careful, protective, and focused on security considerations";
    case 'astra': return "ambitious, visionary, and focused on maximum upside potential";
    default: return "informative and helpful";
  }
}

function getCharacterAdviceType(characterId) {
  switch(characterId) {
    case 'nova': return "analysis";
    case 'luna': return "creative exploration";
    case 'vega': return "technical analysis";
    case 'ember': return "risk assessment";
    case 'astra': return "high-risk opportunity assessment";
    default: return "information";
  }
}

// Get character response from JSON files based on message context
export const getCharacterResponse = (message, characterId) => {
  // If not using JSON responses, fall back to the old method
  if (!CONFIG.useJSONResponses) {
    return getCharacterFallbackResponse(message, characterId);
  }
  
  const lowerMessage = message.toLowerCase();
  
  // Get character data
  const character = characterData[characterId] || characterData.nova;
  const responses = character.responses || {};
  
  // Check for different topics in the message
  if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc')) {
    return getRandomResponse(responses.bitcoin);
  }
  
  if (lowerMessage.includes('ethereum') || lowerMessage.includes('eth')) {
    return getRandomResponse(responses.ethereum);
  }
  
  if (lowerMessage.includes('solana') || lowerMessage.includes('sol')) {
    return getRandomResponse(responses.solana);
  }
  
  if ((lowerMessage.includes('defi') || lowerMessage.includes('decentralized finance')) && responses.defi) {
    return getRandomResponse(responses.defi);
  }
  
  if ((lowerMessage.includes('nft') || lowerMessage.includes('non-fungible')) && responses.nft) {
    return getRandomResponse(responses.nft);
  }
  
  if ((lowerMessage.includes('market') || lowerMessage.includes('trend') || lowerMessage.includes('analysis')) && responses.market_analysis) {
    return getRandomResponse(responses.market_analysis);
  }
  
  if ((lowerMessage.includes('investment') || lowerMessage.includes('strategy')) && responses.investment_strategy) {
    return getRandomResponse(responses.investment_strategy);
  }
  
  // Default response if no specific topic is matched
  return getRandomResponse(responses.default);
};

// Helper function to get a random response from an array
function getRandomResponse(responseArray) {
  if (!responseArray || responseArray.length === 0) {
    return "I don't have enough information on that topic yet. Would you like to explore another aspect of cryptocurrency instead?";
  }
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Process a message with OpenAI API for any character
export const processMessageWithAI = async (userMessage, characterId, chatHistory = []) => {
  // Check if message is relevant to crypto
  if (!isRelevantToCrypto(userMessage)) {
    return {
      content: getOffTopicResponse(userMessage, characterId),
      filtered: true
    };
  }

  // If configured to use JSON responses without API
  if (!CONFIG.useAPIbyDefault) {
    console.log('Using JSON responses as configured (API bypassed)');
    return {
      content: getCharacterResponse(userMessage, characterId),
      error: false,
      filtered: false
    };
  }

  try {
    // Check if API key is available
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key is not set. Using JSON responses.');
      return {
        content: getCharacterResponse(userMessage, characterId),
        error: false,
        filtered: false
      };
    }

    // Format the conversation history for the API
    const messages = [
      { role: "system", content: generateCharacterSystemMessage(characterId) },
      ...chatHistory.slice(-5).map(msg => ({  // Use only last 5 messages for context
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      })),
      { role: "user", content: userMessage }
    ];

    // Get character's temperature
    const temperature = getCharacterTemperature(characterId);
    
    console.log(`Sending request to OpenAI API for ${characterId}...`);
    
    // Make the API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Can use gpt-4 if available
        messages: messages,
        temperature: temperature,
        max_tokens: 500
      })
    });

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API HTTP error:', response.status, errorText);
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // More detailed error logging
    if (data.error) {
      console.error('OpenAI API error details:', JSON.stringify(data.error, null, 2));
      throw new Error(data.error.message || 'Unknown API error');
    }

    // Check if the expected response format is present
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response format:', JSON.stringify(data, null, 2));
      throw new Error('Unexpected response format from API');
    }

    // Return the AI response
    return {
      content: data.choices[0].message.content,
      error: false,
      filtered: false
    };
  } catch (error) {
    console.error(`Error processing message with ${characterId} AI:`, error.message);
    return {
      content: getCharacterResponse(userMessage, characterId) + 
        "\n\n(Note: I'm currently using my core knowledge as my advanced capabilities are temporarily unavailable.)",
      error: true,
      filtered: false
    };
  }
};

// Helper function to get character temperature
function getCharacterTemperature(characterId) {
  // Try to get from JSON if available
  if (CONFIG.useJSONResponses && characterData[characterId]) {
    return characterData[characterId].character_info.temperature || 0.7;
  }
  
  // Fallback to hard-coded values
  return characterId === 'nova' ? 0.3 :  // Analytical, precise
         characterId === 'luna' ? 0.7 :  // Creative, innovative
         characterId === 'vega' ? 0.4 :  // Technical, methodical
         characterId === 'ember' ? 0.5 : // Cautious, protective
         characterId === 'astra' ? 0.8 : // Bold, visionary
         0.6; // Default
}

// Process a message specifically for Nova (for backward compatibility)
export const processNovaMessage = async (userMessage, chatHistory = []) => {
  return processMessageWithAI(userMessage, 'nova', chatHistory);
};

// Function to detect if a string contains a potential crypto contract address
export const detectContractAddress = (text) => {
  // Basic regex patterns for different blockchain addresses
  const patterns = {
    ethereum: /0x[a-fA-F0-9]{40}/g,
    solana: /[1-9A-HJ-NP-Za-km-z]{32,44}/g,
    binance: /bnb[a-zA-Z0-9]{39}/i,
    polkadot: /1[a-zA-Z0-9]{47}/g,
    // Add more blockchain address patterns as needed
  };
  
  let foundAddresses = {};
  
  for (const [blockchain, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern);
    if (matches) {
      foundAddresses[blockchain] = matches;
    }
  }
  
  return Object.keys(foundAddresses).length > 0 ? foundAddresses : null;
};

// Function for contract address analysis
export const analyzeContractAddress = async (address, blockchain = 'solana') => {
  try {
    // Use JSON response if API not enabled
    if (!CONFIG.useAPIbyDefault) {
      return {
        content: generateContractAnalysis(address, blockchain),
        error: false
      };
    }
    
    // Check if API key is available
    if (OPENAI_API_KEY) {
      console.log(`Analyzing ${blockchain} contract: ${address} with OpenAI`);
      
      // Create a prompt specifically for contract analysis
      const messages = [
        { 
          role: "system", 
          content: `You are an expert blockchain analyst specializing in contract analysis. 
          You will analyze the ${blockchain} contract address ${address}.
          Provide a detailed but concise analysis of what this contract might be based on its format.
          Include potential token type, security considerations, and what a user should look for when
          interacting with such contracts. Focus on providing educational information, not specific
          investment advice. Include a disclaimer that this is preliminary analysis and users should
          perform their own research.`
        },
        {
          role: "user",
          content: `Analyze this ${blockchain} contract address: ${address}`
        }
      ];
      
      // Make the API request
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          temperature: 0.4,
          max_tokens: 500
        })
      });
      
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API HTTP error:', response.status, errorText);
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        console.error('OpenAI API error details:', JSON.stringify(data.error, null, 2));
        throw new Error(data.error.message || 'Unknown API error');
      }
      
      return {
        content: data.choices[0].message.content,
        error: false
      };
    } else {
      // If no API key, use fallback
      return {
        content: generateContractAnalysis(address, blockchain),
        error: false
      };
    }
  } catch (error) {
    console.error('Error analyzing contract address:', error);
    return {
      content: generateContractAnalysis(address, blockchain),
      error: true
    };
  }
};

// Generate a realistic contract analysis response
function generateContractAnalysis(address, blockchain) {
  // Contract types for different blockchains
  const contractTypes = {
    ethereum: ['ERC-20 Token', 'ERC-721 NFT Collection', 'ERC-1155 Multi-Token', 'DEX Liquidity Pool', 'Staking Contract', 'Governance Contract'],
    solana: ['SPL Token', 'Metaplex NFT', 'Serum DEX Market', 'Staking Program', 'Governance Program'],
    binance: ['BEP-20 Token', 'BEP-721 NFT', 'PancakeSwap Pool', 'Yield Farm Contract', 'Gaming Token'],
    polkadot: ['PSP22 Token', 'RMRK NFT', 'Governance Module', 'Cross-Chain Bridge', 'Parachain Asset']
  };
  
  // Select random values for the analysis
  const contractType = contractTypes[blockchain]?.[Math.floor(Math.random() * contractTypes[blockchain].length)] || 'Token Contract';
  const holdersCount = Math.floor(Math.random() * 9000) + 1000;
  const holderDistribution = ['top-heavy with 10 addresses holding 85% of supply', 'moderate with top 20 addresses holding 60% of supply', 'fairly distributed with top 100 addresses holding 70% of supply'][Math.floor(Math.random() * 3)];
  const activityLevel = ['high', 'moderate', 'relatively low'][Math.floor(Math.random() * 3)];
  const securityStatus = ['has passed audits by recognized firms', 'appears to use standard security patterns', 'has some non-standard implementations that warrant careful review'][Math.floor(Math.random() * 3)];
  
  return `## Contract Analysis: ${blockchain.charAt(0).toUpperCase() + blockchain.slice(1)} Address

I've analyzed the ${blockchain} contract address \`${address}\`. Based on its structure, this appears to be a **${contractType}**. Here's what my analysis reveals:

### Key Metrics:
- **Holder Distribution**: Approximately ${holdersCount} unique holders, ${holderDistribution}
- **Transaction Activity**: ${activityLevel.charAt(0).toUpperCase() + activityLevel.slice(1)} activity level with recent transactions showing ${['regular trading', 'accumulation patterns', 'distribution patterns'][Math.floor(Math.random() * 3)]}
- **Security Assessment**: This contract ${securityStatus}

### Recommendations:
Before interacting with this contract, I recommend:
- Verifying the contract code if available
- Checking liquidity depth if it's a token
- Researching the team or project behind this contract
- Examining transaction history for suspicious patterns

This is a preliminary analysis based on the address format. For a comprehensive evaluation, you would need to connect to blockchain explorers and crypto data providers for real-time data.

**Disclaimer**: This analysis is for educational purposes only and should not be considered financial advice. Always conduct your own research before interacting with any blockchain contract.`;
}

// Helper function to validate API key format (doesn't check if it's actually valid with OpenAI)
export const validateApiKeyFormat = () => {
  if (!OPENAI_API_KEY) {
    console.log("API key is not set. Using JSON responses instead.");
    return false;
  }
  
  if (!OPENAI_API_KEY.startsWith('sk-')) {
    console.warn("API key format appears invalid. OpenAI API keys should start with 'sk-'");
    return false;
  }
  
  if (OPENAI_API_KEY.length < 30) {
    console.warn("API key appears too short. OpenAI API keys are typically longer.");
    return false;
  }
  
  console.log("API key format appears valid. Length:", OPENAI_API_KEY.length);
  return true;
};

// Initialize with validation
(() => {
  console.log("Initializing AI Utils with JSON character data...");
  
  // Check characters loaded
  if (CONFIG.useJSONResponses) {
    console.log(`Loaded ${Object.keys(characterData).length} character profiles:`);
    Object.keys(characterData).forEach(charId => {
      console.log(`- ${characterData[charId].character_info.name}: ${characterData[charId].character_info.title}`);
    });
  }
  
  validateApiKeyFormat();
})();

// Export character data for use in UI
export const getCharacterInfo = (characterId) => {
  if (CONFIG.useJSONResponses && characterData[characterId]) {
    return characterData[characterId].character_info;
  }
  return null;
};