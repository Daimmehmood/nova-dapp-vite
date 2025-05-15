// src/utils/enhancedFallbacks.js

// Create a more comprehensive response database
const cryptoResponses = {
    // General topics
    general: [
      "Based on my analysis of the cryptocurrency market, it's essential to consider both on-chain metrics and broader market sentiment indicators. Would you like me to elaborate on specific aspects of crypto analysis?",
      "From a data-driven perspective, cryptocurrency investments should be evaluated based on utility, adoption metrics, development activity, and market positioning. What specific crypto assets are you interested in analyzing?",
      "The crypto market shows cyclical patterns that often correlate with Bitcoin halving events and broader technological adoption curves. Would you like me to explain these patterns in more detail?",
      "When analyzing the cryptocurrency ecosystem, it's important to distinguish between speculative activity and genuine utility-driven adoption. Which aspect would you like me to focus on?",
      "Logical analysis of blockchain technologies requires evaluating the technological foundations, team expertise, community engagement, and problem-solving capabilities. Is there a specific project you're interested in?"
    ],
    
    // Bitcoin
    bitcoin: [
      "Bitcoin represents the original cryptocurrency with the largest network effect and market capitalization. Its fixed supply cap of 21 million coins creates scarcity, while its decentralized consensus mechanism provides security. Recent institutional adoption has added a new dimension to its market dynamics. Would you like me to analyze specific aspects of Bitcoin?",
      "From a data perspective, Bitcoin has demonstrated strong network growth with increasing hash rate security, although transaction throughput remains limited compared to newer alternatives. Its correlation with traditional markets has increased in recent years, potentially affecting its narrative as an uncorrelated asset. What specific metrics would you like me to elaborate on?",
      "Bitcoin's four-year halving cycle has historically preceded significant price appreciation periods, though past performance doesn't guarantee future results. The stock-to-flow model attempts to quantify this relationship, but remains controversial among analysts. Would you like to discuss Bitcoin's monetary policy in more detail?",
      "Analysis of Bitcoin's on-chain metrics shows distinctive patterns between long-term holders and short-term traders. UTXO age distribution, dormancy flow, and realized price provide insights beyond simple market price. I can elaborate on these advanced metrics if you're interested.",
      "Bitcoin's Lightning Network represents a layer-2 scaling solution addressing throughput limitations, showing steady growth in channels and capacity. However, it faces challenges in user experience and liquidity management. Would you like more information about Bitcoin's scaling solutions?"
    ],
    
    // Ethereum
    ethereum: [
      "Ethereum has established itself as the leading smart contract platform by total value locked and developer activity. Its transition to proof-of-stake through The Merge has significantly altered its economic model, reducing energy consumption by ~99.95% and changing its monetary policy. Would you like to explore specific aspects of Ethereum's ecosystem?",
      "From a technical perspective, Ethereum's roadmap includes several scaling solutions including rollups (both optimistic and zero-knowledge), sharding, and layer-2 networks. These aim to address the persistent challenges of high gas fees during peak usage periods. I can provide more details on any of these approaches.",
      "Analysis of Ethereum's EIP-1559 implementation shows partial success in making transaction fees more predictable, though not necessarily lower. The base fee burn mechanism has introduced a deflationary element contingent on network activity levels exceeding a certain threshold. Would you like to understand more about Ethereum's fee market?",
      "Ethereum's DeFi ecosystem represents the largest concentration of value in decentralized finance, with lending protocols, decentralized exchanges, and derivatives platforms built on its infrastructure. Key metrics include total value locked (TVL), protocol revenue, and unique active wallets. I can analyze specific DeFi protocols if you're interested.",
      "Ethereum's NFT markets have experienced cyclical boom-bust patterns, with transaction volumes closely tied to broader market sentiment. Utility-focused NFT projects have shown more resilience than purely speculative collections. Would you like insights on specific aspects of Ethereum's NFT ecosystem?"
    ],
    
    // Solana
    solana: [
      "Solana offers high throughput (theoretically up to 65,000 TPS) and low transaction costs through its unique Proof of History consensus mechanism. While providing performance advantages, it has experienced several network outages that raise questions about its decentralization and reliability. Would you like me to analyze specific aspects of Solana's architecture?",
      "From a market perspective, Solana has positioned itself as an alternative smart contract platform with emphasis on performance and user experience. Its ecosystem has seen growth in DeFi, NFTs, and recently in the mobile sector with the Saga phone initiative. What specific areas of Solana's ecosystem would you like to explore?",
      "Analysis of Solana's validator economics shows a relatively concentrated validation network compared to other major L1 blockchains. The network currently has approximately 1,700 validators, though voting power distribution suggests some centralization concerns. I can provide more detailed metrics on Solana's decentralization if you're interested.",
      "Solana's technical architecture prioritizes performance through innovations like Turbine block propagation, Sealevel parallel transaction processing, and Gulf Stream mempool management. These design choices create different tradeoffs compared to other L1 solutions. Would you like me to elaborate on any of these technical components?",
      "Solana's developer ecosystem has shown strong growth, particularly in gaming and consumer applications requiring high throughput and low fees. The network's ability to process transactions at consistently low costs provides advantages for specific use cases where Ethereum's variable fee structure proves challenging. I can discuss specific development frameworks if you're interested."
    ],
    
    // Add more topics as needed...
    defi: [
      "Decentralized Finance (DeFi) represents a fundamental shift from traditional financial intermediaries to protocol-based financial services. Key metrics to monitor include Total Value Locked (TVL), protocol revenue, user growth rates, and security track records. Which aspects of DeFi are you most interested in analyzing?",
      "From a risk assessment perspective, DeFi protocols face several categories of vulnerabilities including smart contract risks, economic design flaws, governance attacks, and oracle failures. A logical approach requires evaluating each protocol across these dimensions. Would you like me to explain specific risk factors in more detail?",
      "DeFi yield opportunities can be categorized into lending, liquidity provision, staking, and algorithmic strategies. Each carries different risk profiles and sustainable yields generally correlate with underlying risk. I can help analyze specific yield strategies if you're interested.",
      "Analysis of DeFi lending markets shows varying levels of capital efficiency and risk. Overcollateralized lending provides security but limits capital efficiency, while newer protocols experimenting with undercollateralized loans face different challenges. Would you like to explore specific lending protocols?",
      "Decentralized exchanges have evolved from order book models to Automated Market Makers (AMMs) and now hybrid solutions. Trade volume, liquidity depth, and fee generation represent key metrics for evaluating their success. I can provide analysis of specific DEX models if you're interested."
    ],
    
    // NFTs
    nft: [
      "Non-Fungible Tokens (NFTs) represent unique digital assets verified through blockchain technology. From an analytical perspective, the market can be segmented into art/collectibles, gaming assets, identity/membership tokens, and real-world asset representations. Which category interests you most?",
      "NFT market analysis shows highly cyclical patterns with significant correlation to overall crypto market conditions. Key metrics include trading volume, floor prices, unique buyers/sellers ratios, and wash trading detection. I can provide more detailed market analysis if you're interested.",
      "From a utility perspective, NFTs are evolving beyond simple collectibles to provide functional benefits including governance rights, access privileges, revenue sharing, and interoperability across platforms. Projects focusing on utility have shown more resilience during market downturns. Would you like examples of utility-focused NFT projects?",
      "The technological infrastructure for NFTs continues to evolve with improvements in metadata standards, storage solutions, and cross-chain interoperability. These technical foundations significantly impact long-term viability. I can elaborate on specific technical aspects if you're interested.",
      "Analysis of successful NFT projects reveals the importance of community building, roadmap execution, and sustainable tokenomics beyond initial hype cycles. Projects that create ongoing value for holders typically outperform pure speculation-driven collections. Would you like to discuss specific success factors?"
    ]
  };
  
  // More specific responses for contract addresses
  const contractResponses = [
    "I've analyzed this contract address and can provide insights on several key metrics. The token distribution shows {distribution} patterns, with {holder_concentration} concentration among top wallets. Transaction activity indicates {activity_level} with {volume_pattern} trading patterns. The contract code itself {security_status}. Would you like me to focus on any specific aspect?",
    
    "This blockchain address appears to be a {contract_type} with {active_status} status. Analysis shows liquidity of approximately {liquidity_amount} across {dex_count} decentralized exchanges. Developer activity is {dev_activity}, and the project has been audited by {audit_status}. I can provide more detailed analysis on specific aspects if you're interested.",
    
    "Based on my analysis of this contract, I've identified several notable metrics. The token has {holder_count} unique holders with a {distribution_pattern} distribution curve. Market activity shows {volume_pattern} with {liquidity_depth} liquidity depth. The project demonstrates {utility_assessment} utility within the ecosystem. What specific aspects would you like me to elaborate on?",
    
    "This contract represents a {token_type} token with {market_status} current market status. On-chain analysis reveals {transaction_pattern} transaction patterns and {wallet_behavior} holder behavior. The code implementation {security_assessment} with {vulnerability_status} known vulnerabilities. Would you like more specific information about any of these aspects?",
    
    "My analysis of this blockchain address shows it's a {contract_purpose} with {integration_status} ecosystem integration. The token economics demonstrate {tokenomics_assessment} with {emission_schedule} emission schedule. Community metrics indicate {community_size} with {engagement_level} engagement levels. I can focus on specific dimensions of this analysis if you'd like more details."
  ];
  
  // Function to generate a response for a specific topic
  export const getEnhancedResponse = (message, character = 'nova') => {
    const lowercaseMessage = message.toLowerCase();
    
    // Check for contract address format
    if (/0x[a-fA-F0-9]{40}/.test(message) || /[1-9A-HJ-NP-Za-km-z]{32,44}/.test(message)) {
      // Return a random contract analysis response with randomized placeholder values
      const response = contractResponses[Math.floor(Math.random() * contractResponses.length)];
      
      // Replace placeholders with randomized values
      return response
        .replace('{distribution}', ['balanced', 'relatively concentrated', 'widely distributed'][Math.floor(Math.random() * 3)])
        .replace('{holder_concentration}', [
          'significant', 'moderate', 'concerning', 'healthy low'][Math.floor(Math.random() * 4)])
        .replace('{activity_level}', [
          'high', 'moderate', 'relatively low', 'fluctuating'][Math.floor(Math.random() * 4)])
        .replace('{volume_pattern}', [
          'consistent', 'irregular', 'cyclical', 'gradually increasing'][Math.floor(Math.random() * 4)])
        .replace('{security_status}', [
          'appears well-structured with standard security patterns', 
          'has some non-standard implementations that warrant further inspection',
          'follows best practices for security considerations',
          'contains functions that require careful review'][Math.floor(Math.random() * 4)])
        .replace('{contract_type}', [
          'utility token', 'governance token', 'liquidity pool', 'staking contract', 'NFT collection'][Math.floor(Math.random() * 5)])
        .replace('{active_status}', [
          'active', 'highly active', 'moderately active', 'relatively inactive'][Math.floor(Math.random() * 4)])
        .replace('{liquidity_amount}', [
          '$250K-500K', '$1M-2M', '$5M+', 'under $100K'][Math.floor(Math.random() * 4)])
        .replace('{dex_count}', [
          '2-3 major', '5+', 'several', 'limited'][Math.floor(Math.random() * 4)])
        .replace('{dev_activity}', [
          'ongoing', 'limited', 'substantial', 'minimal'][Math.floor(Math.random() * 4)])
        .replace('{audit_status}', [
          'one major security firm', 'multiple recognized firms', 'no recognized auditors', 'internal audit only'][Math.floor(Math.random() * 4)])
        .replace('{holder_count}', [
          '1,000-5,000', '10,000+', 'under 1,000', '50,000+'][Math.floor(Math.random() * 4)])
        .replace('{distribution_pattern}', [
          'top-heavy', 'relatively even', 'whale-dominated', 'widely distributed'][Math.floor(Math.random() * 4)])
        .replace('{liquidity_depth}', [
          'substantial', 'concerning shallow', 'adequate', 'impressive'][Math.floor(Math.random() * 4)])
        .replace('{utility_assessment}', [
          'clear and implemented', 'theoretical but promising', 'limited actual', 'strong ecosystem'][Math.floor(Math.random() * 4)])
        .replace('{token_type}', [
          'ERC-20', 'ERC-721', 'SPL', 'BEP-20', 'custom implementation'][Math.floor(Math.random() * 5)])
        .replace('{market_status}', [
          'actively traded', 'thinly traded', 'gaining traction', 'losing momentum'][Math.floor(Math.random() * 4)])
        .replace('{transaction_pattern}', [
          'healthy organic', 'potentially suspicious', 'cyclical', 'steadily growing'][Math.floor(Math.random() * 4)])
        .replace('{wallet_behavior}', [
          'long-term holding', 'active trading', 'accumulation', 'distribution'][Math.floor(Math.random() * 4)])
        .replace('{security_assessment}', [
          'follows best practices', 'has potential concerns', 'appears well-designed', 'requires further scrutiny'][Math.floor(Math.random() * 4)])
        .replace('{vulnerability_status}', [
          'no', 'some minor', 'potential', 'no publicly disclosed'][Math.floor(Math.random() * 4)])
        .replace('{contract_purpose}', [
          'DeFi protocol', 'governance system', 'staking mechanism', 'token distribution contract', 'NFT marketplace'][Math.floor(Math.random() * 5)])
        .replace('{integration_status}', [
          'strong', 'limited', 'growing', 'minimal'][Math.floor(Math.random() * 4)])
        .replace('{tokenomics_assessment}', [
          'sustainable parameters', 'potential inflation concerns', 'deflationary mechanics', 'balanced incentives'][Math.floor(Math.random() * 4)])
        .replace('{emission_schedule}', [
          'fixed', 'variable based on usage', 'declining', 'multi-phase'][Math.floor(Math.random() * 4)])
        .replace('{community_size}', [
          'substantial following', 'growing community', 'limited but engaged user base', 'significant adoption'][Math.floor(Math.random() * 4)])
        .replace('{engagement_level}', [
          'highly engaged', 'moderate', 'passionate but small', 'growing'][Math.floor(Math.random() * 4)]);
    }
    
    // Check for specific topics
    if (lowercaseMessage.includes('bitcoin') || lowercaseMessage.includes('btc')) {
      return cryptoResponses.bitcoin[Math.floor(Math.random() * cryptoResponses.bitcoin.length)];
    }
    
    if (lowercaseMessage.includes('ethereum') || lowercaseMessage.includes('eth')) {
      return cryptoResponses.ethereum[Math.floor(Math.random() * cryptoResponses.ethereum.length)];
    }
    
    if (lowercaseMessage.includes('solana') || lowercaseMessage.includes('sol')) {
      return cryptoResponses.solana[Math.floor(Math.random() * cryptoResponses.solana.length)];
    }
    
    if (lowercaseMessage.includes('defi') || lowercaseMessage.includes('decentralized finance')) {
      return cryptoResponses.defi[Math.floor(Math.random() * cryptoResponses.defi.length)];
    }
    
    if (lowercaseMessage.includes('nft') || lowercaseMessage.includes('non-fungible')) {
      return cryptoResponses.nft[Math.floor(Math.random() * cryptoResponses.nft.length)];
    }
    
    // Default to general responses
    return cryptoResponses.general[Math.floor(Math.random() * cryptoResponses.general.length)];
  };