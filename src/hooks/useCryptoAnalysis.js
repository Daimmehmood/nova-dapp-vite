// src/hooks/useCryptoAnalysis.js
import { useState, useCallback } from 'react';
import { generateTokenAnalysis, getQuickTokenSummary, isOpenAIAvailable } from '../services/aiAnalysisService';
import { getComprehensiveTokenAnalysis } from '../services/cryptoApiService';

/**
 * Custom hook for cryptocurrency analysis functionality
 * @returns {Object} - Crypto analysis methods and state
 */
const useCryptoAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  
  /**
   * Check if OpenAI integration is available
   * @returns {boolean} - Whether OpenAI is available
   */
  const checkAIAvailability = useCallback(() => {
    return isOpenAIAvailable();
  }, []);
  
  /**
   * Analyze a cryptocurrency token
   * @param {string} query - Token to analyze (name, symbol, or address)
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} - Analysis result
   */
  const analyzeToken = useCallback(async (query, options = {}) => {
    if (!query) {
      setError('Please provide a token to analyze');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateTokenAnalysis(query, options);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to analyze token');
      }
      
      setAnalysisResult(result.analysis);
      setTokenData(result.data);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);
  
  /**
   * Get raw token data without AI analysis
   * @param {string} query - Token to analyze
   * @returns {Promise<Object>} - Token data
   */
  const getRawTokenData = useCallback(async (query) => {
    if (!query) {
      setError('Please provide a token to analyze');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getComprehensiveTokenAnalysis(query);
      setTokenData(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message || 'An error occurred while fetching token data');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);
  
  /**
   * Get a quick summary of a token for chat responses
   * @param {string} query - Token to analyze
   * @returns {Promise<string>} - Token summary
   */
  const getTokenSummary = useCallback(async (query) => {
    if (!query) {
      return 'Please provide a token to analyze';
    }
    
    try {
      return await getQuickTokenSummary(query);
    } catch (err) {
      return `Error analyzing ${query}: ${err.message}`;
    }
  }, []);
  
  /**
   * Get technical analysis for a token
   * @param {string} query - Token to analyze
   * @returns {Promise<Object>} - Technical analysis
   */
  const getTechnicalAnalysis = useCallback(async (query) => {
    return await analyzeToken(query, { analysisType: 'technical' });
  }, [analyzeToken]);
  
  /**
   * Get fundamental analysis for a token
   * @param {string} query - Token to analyze
   * @returns {Promise<Object>} - Fundamental analysis
   */
  const getFundamentalAnalysis = useCallback(async (query) => {
    return await analyzeToken(query, { analysisType: 'fundamental' });
  }, [analyzeToken]);
  
  /**
   * Get risk assessment for a token
   * @param {string} query - Token to analyze
   * @returns {Promise<Object>} - Risk assessment
   */
  const getRiskAssessment = useCallback(async (query) => {
    return await analyzeToken(query, { analysisType: 'risk' });
  }, [analyzeToken]);
  
  /**
   * Compare multiple tokens
   * @param {Array<string>} tokens - Tokens to compare
   * @returns {Promise<Object>} - Comparison analysis
   */
  const compareTokens = useCallback(async (tokens) => {
    if (!tokens || !Array.isArray(tokens) || tokens.length < 2) {
      setError('Please provide at least two tokens to compare');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Format the comparison as a special analysis type
      const result = await generateTokenAnalysis(tokens.join(' vs '), {
        analysisType: 'comparison',
        tokens: tokens
      });
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to compare tokens');
      }
      
      setAnalysisResult(result.analysis);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred during token comparison');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);
  
  /**
   * Analyze a smart contract address
   * @param {string} address - Contract address to analyze
   * @param {string} blockchain - Blockchain (ethereum, solana, etc.)
   * @returns {Promise<Object>} - Contract analysis
   */
  const analyzeContract = useCallback(async (address, blockchain = 'ethereum') => {
    if (!address) {
      setError('Please provide a contract address to analyze');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Format as a contract analysis
      const result = await generateTokenAnalysis(address, {
        analysisType: 'contract',
        contractDetails: {
          address,
          blockchain
        }
      });
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to analyze contract');
      }
      
      setAnalysisResult(result.analysis);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred during contract analysis');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);
  
  /**
   * Clear the current analysis state
   */
  const clearAnalysis = useCallback(() => {
    setAnalysisResult(null);
    setTokenData(null);
    setError(null);
  }, []);
  
  return {
    loading,
    error,
    analysisResult,
    tokenData,
    analyzeToken,
    getRawTokenData,
    getTokenSummary,
    getTechnicalAnalysis,
    getFundamentalAnalysis,
    getRiskAssessment,
    compareTokens,
    analyzeContract,
    clearAnalysis,
    checkAIAvailability
  };
};

export default useCryptoAnalysis;