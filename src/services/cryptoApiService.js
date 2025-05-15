// src/services/cryptoApiService.js
/**
 * This service handles API integrations with CoinGecko and DexScreener
 * to fetch cryptocurrency data for enhanced analysis
 */

// Constants for API endpoints
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const DEXSCREENER_API_BASE = 'https://api.dexscreener.com/latest';

// Optional API key for CoinGecko Pro (if you have it)
// const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

/**
 * Fetch token data from CoinGecko
 * @param {string} tokenId - CoinGecko token ID (e.g., 'bitcoin', 'ethereum')
 * @returns {Promise<Object>} - Token data
 */
export const fetchTokenDataFromCoinGecko = async (tokenId) => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/coins/${tokenId}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from CoinGecko:', error);
    throw error;
  }
};

/**
 * Search for tokens on CoinGecko
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Search results
 */
export const searchTokensOnCoinGecko = async (query) => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko search API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error('Error searching on CoinGecko:', error);
    throw error;
  }
};

/**
 * Get token market data from CoinGecko
 * @param {string} tokenId - CoinGecko token ID
 * @param {string} vsCurrency - Currency to compare against (default: 'usd')
 * @param {number} days - Number of days of data to fetch (default: 30)
 * @returns {Promise<Object>} - Market data
 */
export const getTokenMarketChart = async (tokenId, vsCurrency = 'usd', days = 30) => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/coins/${tokenId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=daily`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko market chart API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching market chart from CoinGecko:', error);
    throw error;
  }
};

/**
 * Get global cryptocurrency market data
 * @returns {Promise<Object>} - Global market data
 */
export const getGlobalMarketData = async () => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/global`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko global data API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching global data from CoinGecko:', error);
    throw error;
  }
};

/**
 * Search for pairs on DexScreener
 * @param {string} query - Search query (token name, symbol, or address)
 * @returns {Promise<Object>} - Pair data
 */
export const searchDexScreener = async (query) => {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/dex/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching on DexScreener:', error);
    throw error;
  }
};

/**
 * Get specific token pair data from DexScreener by address
 * @param {string} tokenAddress - Token contract address
 * @param {string} chainId - Chain ID (optional)
 * @returns {Promise<Object>} - Pair data
 */
export const getTokenPairsByAddress = async (tokenAddress, chainId = null) => {
  try {
    const endpoint = chainId 
      ? `${DEXSCREENER_API_BASE}/dex/pairs/${chainId}/${tokenAddress}`
      : `${DEXSCREENER_API_BASE}/dex/tokens/${tokenAddress}`;
      
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`DexScreener pairs API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pairs from DexScreener:', error);
    throw error;
  }
};

/**
 * Format token data from CoinGecko for analysis
 * @param {Object} tokenData - Raw token data from CoinGecko
 * @returns {Object} - Formatted token data
 */
export const formatTokenDataForAnalysis = (tokenData) => {
  if (!tokenData) return null;
  
  try {
    return {
      name: tokenData.name,
      symbol: tokenData.symbol?.toUpperCase(),
      id: tokenData.id,
      marketCapRank: tokenData.market_cap_rank,
      currentPrice: tokenData.market_data?.current_price?.usd,
      marketCap: tokenData.market_data?.market_cap?.usd,
      totalVolume: tokenData.market_data?.total_volume?.usd,
      high24h: tokenData.market_data?.high_24h?.usd,
      low24h: tokenData.market_data?.low_24h?.usd,
      priceChange24h: tokenData.market_data?.price_change_24h,
      priceChangePercentage24h: tokenData.market_data?.price_change_percentage_24h,
      priceChangePercentage7d: tokenData.market_data?.price_change_percentage_7d,
      priceChangePercentage30d: tokenData.market_data?.price_change_percentage_30d,
      marketCapChange24h: tokenData.market_data?.market_cap_change_24h,
      marketCapChangePercentage24h: tokenData.market_data?.market_cap_change_percentage_24h,
      circulatingSupply: tokenData.market_data?.circulating_supply,
      totalSupply: tokenData.market_data?.total_supply,
      maxSupply: tokenData.market_data?.max_supply,
      ath: tokenData.market_data?.ath?.usd,
      athChangePercentage: tokenData.market_data?.ath_change_percentage?.usd,
      athDate: tokenData.market_data?.ath_date?.usd,
      atl: tokenData.market_data?.atl?.usd,
      atlChangePercentage: tokenData.market_data?.atl_change_percentage?.usd,
      atlDate: tokenData.market_data?.atl_date?.usd,
      description: tokenData.description?.en,
      categories: tokenData.categories,
      sentimentVotesUpPercentage: tokenData.sentiment_votes_up_percentage,
      sentimentVotesDownPercentage: tokenData.sentiment_votes_down_percentage,
      developerData: {
        forks: tokenData.developer_data?.forks,
        stars: tokenData.developer_data?.stars,
        subscribers: tokenData.developer_data?.subscribers,
        totalIssues: tokenData.developer_data?.total_issues,
        closedIssues: tokenData.developer_data?.closed_issues,
        pullRequestsMerged: tokenData.developer_data?.pull_requests_merged,
        pullRequestContributors: tokenData.developer_data?.pull_request_contributors,
        commitCount4Weeks: tokenData.developer_data?.commit_count_4_weeks,
      },
      communityData: {
        twitterFollowers: tokenData.community_data?.twitter_followers,
        redditSubscribers: tokenData.community_data?.reddit_subscribers,
        redditAveragePosts48h: tokenData.community_data?.reddit_average_posts_48h,
        redditAverageComments48h: tokenData.community_data?.reddit_average_comments_48h,
        telegramChannelUserCount: tokenData.community_data?.telegram_channel_user_count,
      },
      links: {
        homepage: tokenData.links?.homepage?.[0],
        blockchainSite: tokenData.links?.blockchain_site?.filter(site => site)?.slice(0, 3),
        officialForumUrl: tokenData.links?.official_forum_url?.filter(url => url)?.slice(0, 1),
        chatUrl: tokenData.links?.chat_url?.filter(url => url)?.slice(0, 1),
        announcementUrl: tokenData.links?.announcement_url?.filter(url => url)?.slice(0, 1),
        twitterScreenName: tokenData.links?.twitter_screen_name,
        telegramChannelIdentifier: tokenData.links?.telegram_channel_identifier,
        subredditUrl: tokenData.links?.subreddit_url,
        reposUrl: {
          github: tokenData.links?.repos_url?.github?.filter(url => url)?.slice(0, 3),
        },
      },
      lastUpdated: tokenData.last_updated,
    };
  } catch (error) {
    console.error('Error formatting token data:', error);
    return null;
  }
};

/**
 * Format DEX data from DexScreener for analysis
 * @param {Object} dexData - Raw DEX data from DexScreener
 * @returns {Object} - Formatted DEX data
 */
export const formatDexDataForAnalysis = (dexData) => {
  if (!dexData || !dexData.pairs || dexData.pairs.length === 0) {
    return null;
  }
  
  try {
    const pairs = dexData.pairs.map(pair => ({
      pairAddress: pair.pairAddress,
      baseToken: {
        name: pair.baseToken?.name,
        symbol: pair.baseToken?.symbol,
        address: pair.baseToken?.address,
      },
      quoteToken: {
        name: pair.quoteToken?.name,
        symbol: pair.quoteToken?.symbol,
        address: pair.quoteToken?.address,
      },
      dexId: pair.dexId,
      chainId: pair.chainId,
      priceUsd: pair.priceUsd,
      priceNative: pair.priceNative,
      liquidity: {
        usd: pair.liquidity?.usd,
        base: pair.liquidity?.base,
        quote: pair.liquidity?.quote,
      },
      volume: {
        h24: pair.volume?.h24,
        h6: pair.volume?.h6,
        h1: pair.volume?.h1,
        m5: pair.volume?.m5,
      },
      priceChange: {
        h24: pair.priceChange?.h24,
        h6: pair.priceChange?.h6,
        h1: pair.priceChange?.h1,
        m5: pair.priceChange?.m5,
      },
      txns: {
        h24: {
          buys: pair.txns?.h24?.buys,
          sells: pair.txns?.h24?.sells,
        },
        h6: {
          buys: pair.txns?.h6?.buys,
          sells: pair.txns?.h6?.sells,
        },
        h1: {
          buys: pair.txns?.h1?.buys,
          sells: pair.txns?.h1?.sells,
        },
        m5: {
          buys: pair.txns?.m5?.buys,
          sells: pair.txns?.m5?.sells,
        },
      },
      fdv: pair.fdv,
      marketCap: pair.marketCap,
    }));
    
    return {
      pairs,
      schemaVersion: dexData.schemaVersion,
      pairsCount: pairs.length,
      mostLiquidPair: pairs.reduce((prev, current) => 
        (prev.liquidity?.usd > current.liquidity?.usd) ? prev : current
      ),
      highestVolumePair: pairs.reduce((prev, current) => 
        (prev.volume?.h24 > current.volume?.h24) ? prev : current
      ),
    };
  } catch (error) {
    console.error('Error formatting DEX data:', error);
    return null;
  }
};

/**
 * Comprehensive token analysis combining data from both APIs
 * @param {string} tokenQuery - Token name, symbol or address
 * @returns {Promise<Object>} - Comprehensive analysis data
 */
export const getComprehensiveTokenAnalysis = async (tokenQuery) => {
  try {
    // Step 1: Search for the token on CoinGecko
    const searchResults = await searchTokensOnCoinGecko(tokenQuery);
    
    // If no results found, try DexScreener directly
    if (!searchResults || searchResults.length === 0) {
      const dexData = await searchDexScreener(tokenQuery);
      return {
        source: 'dexscreener_only',
        coinGeckoData: null,
        dexScreenerData: formatDexDataForAnalysis(dexData),
        marketChart: null,
      };
    }
    
    // Get the most relevant result from CoinGecko
    const mostRelevantToken = searchResults[0];
    
    // Step 2: Fetch detailed data from CoinGecko
    const tokenData = await fetchTokenDataFromCoinGecko(mostRelevantToken.id);
    const formattedTokenData = formatTokenDataForAnalysis(tokenData);
    
    // Step 3: Fetch market chart data
    const marketChart = await getTokenMarketChart(mostRelevantToken.id);
    
    // Step 4: Try to fetch DEX data if we have a contract address
    let dexData = null;
    if (tokenData.platforms) {
      // Find a valid contract address from platforms
      const contractAddresses = Object.values(tokenData.platforms).filter(address => address && address.length > 0);
      
      if (contractAddresses.length > 0) {
        const dexResponse = await getTokenPairsByAddress(contractAddresses[0]);
        dexData = formatDexDataForAnalysis(dexResponse);
      }
    }
    
    // If no DEX data yet, try searching by name/symbol
    if (!dexData) {
      const dexResponse = await searchDexScreener(tokenData.symbol || tokenData.name);
      dexData = formatDexDataForAnalysis(dexResponse);
    }
    
    return {
      source: dexData ? 'combined' : 'coingecko_only',
      coinGeckoData: formattedTokenData,
      dexScreenerData: dexData,
      marketChart: marketChart,
    };
  } catch (error) {
    console.error('Error in comprehensive token analysis:', error);
    
    // Try alternative approaches if the main one fails
    try {
      // Try DexScreener if CoinGecko fails
      const dexData = await searchDexScreener(tokenQuery);
      return {
        source: 'dexscreener_fallback',
        coinGeckoData: null,
        dexScreenerData: formatDexDataForAnalysis(dexData),
        marketChart: null,
        error: error.message
      };
    } catch (fallbackError) {
      console.error('Both API approaches failed:', fallbackError);
      throw new Error('Failed to retrieve token data from all available sources');
    }
  }
};

/**
 * Get technical analysis indicators
 * @param {Array} priceData - Array of price data points
 * @returns {Object} - Technical indicators
 */
export const getTechnicalIndicators = (priceData) => {
  if (!priceData || priceData.length === 0) return null;
  
  try {
    // Convert data to a format suitable for analysis
    const prices = priceData.map(item => parseFloat(item[1]));
    
    // Calculate Simple Moving Averages
    const sma20 = calculateSMA(prices, 20);
    const sma50 = calculateSMA(prices, 50);
    const sma200 = calculateSMA(prices, 200);
    
    // Calculate RSI
    const rsi = calculateRSI(prices, 14);
    
    // Calculate MACD
    const macd = calculateMACD(prices);
    
    // Calculate Bollinger Bands
    const bollingerBands = calculateBollingerBands(prices, 20, 2);
    
    // Latest price
    const currentPrice = prices[prices.length - 1];
    
    // Determine current trend based on SMAs
    let trend = 'neutral';
    if (currentPrice > sma50 && sma50 > sma200) {
      trend = 'bullish';
    } else if (currentPrice < sma50 && sma50 < sma200) {
      trend = 'bearish';
    }
    
    // Determine if price is overbought or oversold based on RSI
    let rsiSignal = 'neutral';
    if (rsi > 70) {
      rsiSignal = 'overbought';
    } else if (rsi < 30) {
      rsiSignal = 'oversold';
    }
    
    // MACD signal
    let macdSignal = 'neutral';
    if (macd.histogram > 0 && macd.histogram > macd.previousHistogram) {
      macdSignal = 'bullish';
    } else if (macd.histogram < 0 && macd.histogram < macd.previousHistogram) {
      macdSignal = 'bearish';
    }
    
    // Bollinger Bands signal
    let bbSignal = 'neutral';
    if (currentPrice > bollingerBands.upper) {
      bbSignal = 'overbought';
    } else if (currentPrice < bollingerBands.lower) {
      bbSignal = 'oversold';
    }
    
    // Volatility calculation
    const volatility = calculateVolatility(prices, 30);
    
    return {
      sma: {
        sma20: sma20.toFixed(6),
        sma50: sma50.toFixed(6),
        sma200: sma200.toFixed(6),
        sma20vsPrice: ((currentPrice / sma20 - 1) * 100).toFixed(2) + '%',
        sma50vsPrice: ((currentPrice / sma50 - 1) * 100).toFixed(2) + '%',
        sma200vsPrice: ((currentPrice / sma200 - 1) * 100).toFixed(2) + '%',
      },
      rsi: {
        value: rsi.toFixed(2),
        signal: rsiSignal,
      },
      macd: {
        line: macd.line.toFixed(6),
        signal: macd.signal.toFixed(6),
        histogram: macd.histogram.toFixed(6),
        trend: macdSignal,
      },
      bollingerBands: {
        upper: bollingerBands.upper.toFixed(6),
        middle: bollingerBands.middle.toFixed(6),
        lower: bollingerBands.lower.toFixed(6),
        width: ((bollingerBands.upper - bollingerBands.lower) / bollingerBands.middle).toFixed(4),
        signal: bbSignal,
      },
      volatility: {
        daily: (volatility.daily * 100).toFixed(2) + '%',
        annualized: (volatility.annualized * 100).toFixed(2) + '%',
      },
      trend: trend,
      supportResistance: findSupportResistanceLevels(prices),
    };
  } catch (error) {
    console.error('Error calculating technical indicators:', error);
    return null;
  }
};

/**
 * Calculate Simple Moving Average
 * @param {Array} data - Price data
 * @param {number} period - Period for SMA
 * @returns {number} - SMA value
 */
function calculateSMA(data, period) {
  if (data.length < period) return 0;
  
  const sum = data.slice(data.length - period).reduce((total, price) => total + price, 0);
  return sum / period;
}

/**
 * Calculate Relative Strength Index
 * @param {Array} data - Price data
 * @param {number} period - Period for RSI (typically 14)
 * @returns {number} - RSI value
 */
function calculateRSI(data, period) {
  if (data.length < period + 1) return 50;
  
  let gains = 0;
  let losses = 0;
  
  // Calculate initial average gain and loss
  for (let i = 1; i <= period; i++) {
    const change = data[data.length - period - 1 + i] - data[data.length - period - 1 + i - 1];
    if (change >= 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }
  
  let avgGain = gains / period;
  let avgLoss = losses / period;
  
  // Calculate subsequent values using the smoothing method
  for (let i = period + 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    let currentGain = 0;
    let currentLoss = 0;
    
    if (change >= 0) {
      currentGain = change;
    } else {
      currentLoss = -change;
    }
    
    avgGain = ((avgGain * (period - 1)) + currentGain) / period;
    avgLoss = ((avgLoss * (period - 1)) + currentLoss) / period;
  }
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

/**
 * Calculate Moving Average Convergence Divergence
 * @param {Array} data - Price data
 * @returns {Object} - MACD values
 */
function calculateMACD(data) {
  if (data.length < 26) return { line: 0, signal: 0, histogram: 0, previousHistogram: 0 };
  
  // Calculate 12-day EMA
  const ema12 = calculateEMA(data, 12);
  
  // Calculate 26-day EMA
  const ema26 = calculateEMA(data, 26);
  
  // Calculate MACD line
  const macdLine = ema12 - ema26;
  
  // Calculate signal line (9-day EMA of MACD line)
  // For simplicity, we're using an approximation here
  const signalLine = macdLine * 0.2 + calculateEMA(data.slice(0, -1), 26) * 0.8;
  
  // Calculate histogram
  const currentHistogram = macdLine - signalLine;
  
  // Calculate previous histogram for trend detection
  // Using a simple approximation
  const previousData = data.slice(0, -1);
  const prevEma12 = calculateEMA(previousData, 12);
  const prevEma26 = calculateEMA(previousData, 26);
  const prevMacdLine = prevEma12 - prevEma26;
  const prevSignalLine = prevMacdLine * 0.2 + calculateEMA(previousData.slice(0, -1), 26) * 0.8;
  const previousHistogram = prevMacdLine - prevSignalLine;
  
  return {
    line: macdLine,
    signal: signalLine,
    histogram: currentHistogram,
    previousHistogram: previousHistogram
  };
}

/**
 * Calculate Exponential Moving Average
 * @param {Array} data - Price data
 * @param {number} period - Period for EMA
 * @returns {number} - EMA value
 */
function calculateEMA(data, period) {
  if (data.length < period) return data[data.length - 1];
  
  const k = 2 / (period + 1);
  
  // Start with SMA
  let ema = calculateSMA(data.slice(0, period), period);
  
  // Calculate EMA for remaining data
  for (let i = period; i < data.length; i++) {
    ema = data[i] * k + ema * (1 - k);
  }
  
  return ema;
}

/**
 * Calculate Bollinger Bands
 * @param {Array} data - Price data
 * @param {number} period - Period for calculation (typically 20)
 * @param {number} multiplier - Standard deviation multiplier (typically 2)
 * @returns {Object} - Bollinger Bands values
 */
function calculateBollingerBands(data, period, multiplier) {
  if (data.length < period) {
    return { upper: 0, middle: 0, lower: 0 };
  }
  
  const recentData = data.slice(data.length - period);
  
  // Calculate middle band (SMA)
  const middle = recentData.reduce((sum, price) => sum + price, 0) / period;
  
  // Calculate standard deviation
  const squaredDifferences = recentData.map(price => Math.pow(price - middle, 2));
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / period;
  const standardDeviation = Math.sqrt(variance);
  
  // Calculate upper and lower bands
  const upper = middle + (standardDeviation * multiplier);
  const lower = middle - (standardDeviation * multiplier);
  
  return { upper, middle, lower };
}

/**
 * Calculate price volatility
 * @param {Array} data - Price data
 * @param {number} period - Period for calculation (typically 30 days)
 * @returns {Object} - Volatility values
 */
function calculateVolatility(data, period) {
  if (data.length < period) return { daily: 0, annualized: 0 };
  
  const recentData = data.slice(data.length - period);
  const returns = [];
  
  for (let i = 1; i < recentData.length; i++) {
    returns.push(Math.log(recentData[i] / recentData[i - 1]));
  }
  
  // Calculate standard deviation of returns
  const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
  const squaredDiffs = returns.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / returns.length;
  const dailyVolatility = Math.sqrt(variance);
  
  // Annualize volatility (assuming 365 trading days)
  const annualizedVolatility = dailyVolatility * Math.sqrt(365);
  
  return {
    daily: dailyVolatility,
    annualized: annualizedVolatility
  };
}

/**
 * Find support and resistance levels
 * @param {Array} data - Price data
 * @returns {Object} - Support and resistance levels
 */
function findSupportResistanceLevels(data) {
  if (data.length < 30) {
    return { support: [], resistance: [] };
  }
  
  // Simplified approach to find local minima and maxima
  const support = [];
  const resistance = [];
  
  // Track the last price for context
  const currentPrice = data[data.length - 1];
  
  // Find significant swing points
  for (let i = 10; i < data.length - 10; i++) {
    // Check for local minimum (potential support)
    if (data[i] < data[i - 1] && data[i] < data[i + 1] && 
        data[i] < data[i - 2] && data[i] < data[i + 2] &&
        data[i] < data[i - 5] && data[i] < data[i + 5]) {
      // Add to support levels if it's below current price
      if (data[i] < currentPrice) {
        support.push({
          price: data[i].toFixed(6),
          strength: 'medium',
          percentFromCurrent: ((data[i] / currentPrice - 1) * 100).toFixed(2) + '%'
        });
      } else {
        resistance.push({
          price: data[i].toFixed(6),
          strength: 'weak',
          percentFromCurrent: ((data[i] / currentPrice - 1) * 100).toFixed(2) + '%'
        });
      }
    }
    
    // Check for local maximum (potential resistance)
    if (data[i] > data[i - 1] && data[i] > data[i + 1] && 
        data[i] > data[i - 2] && data[i] > data[i + 2] &&
        data[i] > data[i - 5] && data[i] > data[i + 5]) {
      // Add to resistance levels if it's above current price
      if (data[i] > currentPrice) {
        resistance.push({
          price: data[i].toFixed(6),
          strength: 'medium',
          percentFromCurrent: ((data[i] / currentPrice - 1) * 100).toFixed(2) + '%'
        });
      } else {
        support.push({
          price: data[i].toFixed(6),
          strength: 'weak',
          percentFromCurrent: ((data[i] / currentPrice - 1) * 100).toFixed(2) + '%'
        });
      }
    }
  }
  
  // Limit to the most relevant support and resistance levels
  const limitResults = (arr, limit = 3) => {
    // Sort by distance from current price
    return arr
      .sort((a, b) => Math.abs(parseFloat(a.price) - currentPrice) - Math.abs(parseFloat(b.price) - currentPrice))
      .slice(0, limit);
  };
  
  return {
    support: limitResults(support),
    resistance: limitResults(resistance)
  };
}

/**
 * Get global cryptocurrency market data and key metrics
 * Includes market cap, dominance, and volume statistics
 */
export const getMarketOverview = async () => {
  try {
    const globalData = await getGlobalMarketData();
    
    if (!globalData) {
      throw new Error('Failed to retrieve global market data');
    }
    
    return {
      totalMarketCap: globalData.data?.total_market_cap?.usd || 0,
      totalVolume24h: globalData.data?.total_volume?.usd || 0,
      marketCapPercentage: {
        btc: globalData.data?.market_cap_percentage?.btc || 0,
        eth: globalData.data?.market_cap_percentage?.eth || 0,
      },
      marketCapChange24hPercentage: globalData.data?.market_cap_change_percentage_24h_usd || 0,
      activeCoins: globalData.data?.active_cryptocurrencies || 0,
      activePairs: globalData.data?.active_market_pairs || 0,
      marketCategoryDistribution: globalData.data?.market_cap_percentage || {},
      lastUpdated: globalData.data?.updated_at || null,
    };
  } catch (error) {
    console.error('Error getting market overview:', error);
    throw error;
  }
};

/**
 * Check the health status of the APIs
 * @returns {Promise<Object>} - API health status
 */
export const checkApiHealth = async () => {
  try {
    // Check CoinGecko ping
    const coinGeckoResponse = await fetch(`${COINGECKO_API_BASE}/ping`);
    const coinGeckoStatus = coinGeckoResponse.ok;
    
    // Check DexScreener basic endpoint
    const dexScreenerResponse = await fetch(`${DEXSCREENER_API_BASE}/dex/search?q=ethereum`);
    const dexScreenerStatus = dexScreenerResponse.ok;
    
    return {
      coinGecko: {
        status: coinGeckoStatus ? 'online' : 'offline',
        responseTime: calculateResponseTime(coinGeckoResponse),
      },
      dexScreener: {
        status: dexScreenerStatus ? 'online' : 'offline',
        responseTime: calculateResponseTime(dexScreenerResponse),
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error checking API health:', error);
    return {
      coinGecko: { status: 'error', error: error.message },
      dexScreener: { status: 'error', error: error.message },
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Calculate response time from fetch response
 * @param {Response} response - Fetch response object
 * @returns {number} - Response time in ms
 */
const calculateResponseTime = (response) => {
  if (!response || !response.headers) return null;
  
  // Try to get timing info from headers if available
  const timing = response.headers.get('x-response-time');
  if (timing) {
    return parseInt(timing, 10);
  }
  
  // Fallback to estimated time (not very accurate)
  return Math.random() * 200 + 100; // Placeholder for demo
};

/**
 * Get multiple tokens data in a single batch request
 * @param {Array<string>} tokenIds - Array of token IDs to fetch
 * @returns {Promise<Object>} - Object with token data
 */
export const batchFetchTokenData = async (tokenIds) => {
  if (!tokenIds || !Array.isArray(tokenIds) || tokenIds.length === 0) {
    throw new Error('Invalid token IDs provided');
  }
  
  try {
    // Limit to 25 tokens per request to avoid API limits
    const idsToFetch = tokenIds.slice(0, 25).join(',');
    
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${idsToFetch}&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process and format the data
    const formattedData = data.reduce((acc, token) => {
      acc[token.id] = {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        currentPrice: token.current_price,
        marketCap: token.market_cap,
        marketCapRank: token.market_cap_rank,
        totalVolume: token.total_volume,
        high24h: token.high_24h,
        low24h: token.low_24h,
        priceChange24h: token.price_change_24h,
        priceChangePercentage24h: token.price_change_percentage_24h,
        priceChangePercentage7d: token.price_change_percentage_7d_in_currency,
        priceChangePercentage30d: token.price_change_percentage_30d_in_currency,
        marketCapChange24h: token.market_cap_change_24h,
        marketCapChangePercentage24h: token.market_cap_change_percentage_24h,
        circulatingSupply: token.circulating_supply,
        totalSupply: token.total_supply,
        maxSupply: token.max_supply,
        ath: token.ath,
        athChangePercentage: token.ath_change_percentage,
        athDate: token.ath_date,
        lastUpdated: token.last_updated,
        image: token.image,
      };
      return acc;
    }, {});
    
    return {
      tokens: formattedData,
      count: Object.keys(formattedData).length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error batch fetching token data:', error);
    throw error;
  }
};

/**
 * Get trending tokens in the last 24 hours
 * @returns {Promise<Array>} - List of trending tokens
 */
export const getTrendingTokens = async () => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/search/trending`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko trending API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the trending coins data
    return data.coins.map(item => ({
      id: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      marketCapRank: item.item.market_cap_rank,
      thumb: item.item.thumb,
      score: item.item.score,
      slug: item.item.slug,
    }));
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    throw error;
  }
};

/**
 * Get defi protocol data based on the name or identifier
 * @param {string} protocol - DeFi protocol name or identifier
 * @returns {Promise<Object>} - Protocol data
 */
export const getDefiProtocolData = async (protocol) => {
  try {
    // Search for the protocol
    const searchResponse = await fetch(`${COINGECKO_API_BASE}/search?query=${encodeURIComponent(protocol)}`);
    
    if (!searchResponse.ok) {
      throw new Error(`CoinGecko search API error: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    // Filter for category: "Decentralized Finance (DeFi)"
    const defiTokens = searchData.coins.filter(coin => 
      coin.category === "Decentralized Finance (DeFi)" ||
      coin.category === "DEX" ||
      coin.category === "Lending/Borrowing" ||
      coin.category === "Yield Aggregator" ||
      coin.category === "Yield Farming"
    );
    
    if (defiTokens.length === 0) {
      return {
        found: false,
        message: "No DeFi protocols found matching the query"
      };
    }
    
    // Get full data for the top match
    const tokenId = defiTokens[0].id;
    const protocolData = await fetchTokenDataFromCoinGecko(tokenId);
    
    // Format protocol data with DeFi specific metrics
    return {
      found: true,
      protocol: formatTokenDataForAnalysis(protocolData),
      defiSpecific: extractDefiMetrics(protocolData),
    };
  } catch (error) {
    console.error('Error fetching DeFi protocol data:', error);
    throw error;
  }
};

/**
 * Extract DeFi-specific metrics from token data
 * @param {Object} data - Token data
 * @returns {Object} - DeFi metrics
 */
const extractDefiMetrics = (data) => {
  // Extract DeFi-specific data if available
  return {
    totalValueLocked: data.market_data?.total_value_locked?.usd || null,
    fdv: data.market_data?.fully_diluted_valuation?.usd || null,
    treasurySize: null, // Would need additional API or source
    stakingYield: null, // Would need additional API or source
    category: data.categories?.find(cat => 
      cat?.includes("DeFi") || 
      cat?.includes("Decentralized Finance") || 
      cat?.includes("DEX") || 
      cat?.includes("Lending")
    ) || "DeFi",
    subCategory: getDefiSubcategory(data),
  };
};

/**
 * Determine DeFi subcategory from token data
 * @param {Object} data - Token data
 * @returns {string} - DeFi subcategory
 */
const getDefiSubcategory = (data) => {
  const description = data.description?.en?.toLowerCase() || "";
  const categories = data.categories || [];
  
  if (categories.some(cat => cat?.includes("DEX") || cat?.includes("Exchange"))) {
    return "DEX";
  } else if (categories.some(cat => cat?.includes("Lending") || cat?.includes("Borrowing"))) {
    return "Lending/Borrowing";
  } else if (categories.some(cat => cat?.includes("Yield"))) {
    return "Yield";
  } else if (description.includes("dex") || description.includes("exchange") || description.includes("swap")) {
    return "DEX";
  } else if (description.includes("lend") || description.includes("borrow") || description.includes("loan")) {
    return "Lending/Borrowing";
  } else if (description.includes("yield") || description.includes("farm") || description.includes("harvest")) {
    return "Yield";
  } else if (description.includes("governance") || description.includes("dao")) {
    return "Governance";
  } else if (description.includes("insurance") || description.includes("coverage")) {
    return "Insurance";
  } else if (description.includes("index") || description.includes("etf")) {
    return "Index";
  } else {
    return "Other";
  }
};