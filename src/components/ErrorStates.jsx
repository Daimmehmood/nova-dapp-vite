// src/components/ErrorStates.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaWifi, FaDatabase, FaClock, FaUnlockAlt } from 'react-icons/fa';

const ErrorContainer = styled(motion.div)`
  background: rgba(30, 30, 40, 0.8);
  border: 1px solid ${({ type, theme }) => 
    type === 'api' ? theme.colors.warning : 
    type === 'auth' ? theme.colors.danger :
    theme.colors.primaryOrange};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconContainer = styled.div`
  font-size: 2.5rem;
  color: ${({ type, theme }) => 
    type === 'api' ? theme.colors.warning : 
    type === 'auth' ? theme.colors.danger :
    theme.colors.primaryOrange};
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  color: white;
`;

const ErrorMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const RetryButton = styled(motion.button)`
  background: ${({ theme }) => theme.gradients.orangeYellow};
  color: black;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
`;

export const ApiErrorMessage = ({ error, onRetry }) => (
  <ErrorContainer 
    type="api" 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <IconContainer type="api">
      <FaWifi />
    </IconContainer>
    <ErrorTitle>API Connection Error</ErrorTitle>
    <ErrorMessage>
      {error?.message || "Unable to fetch data from cryptocurrency API services."}
    </ErrorMessage>
    <ErrorMessage>
      This could be due to rate limiting, network issues, or the service being temporarily unavailable.
    </ErrorMessage>
    {onRetry && (
      <RetryButton 
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </RetryButton>
    )}
  </ErrorContainer>
);

export const DataErrorMessage = ({ error, onRetry }) => (
  <ErrorContainer 
    type="data" 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <IconContainer type="data">
      <FaDatabase />
    </IconContainer>
    <ErrorTitle>Data Processing Error</ErrorTitle>
    <ErrorMessage>
      {error?.message || "There was a problem processing the cryptocurrency data."}
    </ErrorMessage>
    <ErrorMessage>
      The token or information you're looking for might not be available or recognized.
    </ErrorMessage>
    {onRetry && (
      <RetryButton 
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </RetryButton>
    )}
  </ErrorContainer>
);

export const RateLimitErrorMessage = ({ retryTime, onRetry }) => (
  <ErrorContainer 
    type="rateLimit" 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <IconContainer type="rateLimit">
      <FaClock />
    </IconContainer>
    <ErrorTitle>Rate Limit Reached</ErrorTitle>
    <ErrorMessage>
      We've hit the API rate limit for cryptocurrency data services.
    </ErrorMessage>
    <ErrorMessage>
      {retryTime ? `Please try again in ${Math.ceil(retryTime / 1000)} seconds.` : 'Please try again in a moment.'}
    </ErrorMessage>
    {onRetry && (
      <RetryButton 
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </RetryButton>
    )}
  </ErrorContainer>
);

export const AuthErrorMessage = ({ error, onRetry }) => (
  <ErrorContainer 
    type="auth" 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <IconContainer type="auth">
      <FaUnlockAlt />
    </IconContainer>
    <ErrorTitle>Authentication Error</ErrorTitle>
    <ErrorMessage>
      {error?.message || "There was a problem with API authentication."}
    </ErrorMessage>
    <ErrorMessage>
      This could be due to invalid or missing API keys. Please check your configuration.
    </ErrorMessage>
    {onRetry && (
      <RetryButton 
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </RetryButton>
    )}
  </ErrorContainer>
);