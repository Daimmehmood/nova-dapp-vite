// src/components/DevTools.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import apiTester from '../utils/apiTester';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestPanel = styled.div`
  background: rgba(30, 30, 40, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TestButton = styled.button`
  background: ${props => props.variant === 'danger' ? 'crimson' : 
               props.variant === 'warning' ? 'orange' : 
               props.theme.gradients.orangeYellow};
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
`;

const TestResults = styled.div`
  margin-top: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  max-height: 500px;
  overflow: auto;
  font-family: monospace;
  font-size: 0.9rem;
`;

const ResultItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: ${props => props.success ? '#4EFF9F' : '#FF4E4E'};
`;

const DevTools = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTests = async (config = {}) => {
    setLoading(true);
    
    // Update tester config
    Object.keys(config).forEach(key => {
      apiTester.TEST_CONFIG[key] = config[key];
    });
    
    try {
      const testResults = await apiTester.runApiTests();
      setResults(testResults);
    } catch (error) {
      console.error("Test execution error:", error);
      setResults({
        summary: { failed: 1, passed: 0, total: 1 },
        results: [{ test: 'Test Runner', success: false, message: error.message }]
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCaches = () => {
    window.clearApiCaches();
    alert('API caches cleared');
  };

  return (
    <Container>
      <h1>API Integration Test Panel</h1>
      <p>Use these tools to test and debug API integrations</p>

      <TestPanel>
        <h3>Test Controls</h3>
        <div>
          <TestButton onClick={() => runTests()}>
            Run Standard Tests
          </TestButton>
          <TestButton onClick={() => runTests({ runAllTests: true })}>
            Run Comprehensive Tests
          </TestButton>
          <TestButton onClick={() => runTests({ testCoinGecko: true, testDexScreener: false })}>
            Test CoinGecko Only
          </TestButton>
          <TestButton onClick={() => runTests({ testCoinGecko: false, testDexScreener: true })}>
            Test DexScreener Only
          </TestButton>
          <TestButton onClick={clearCaches} variant="warning">
            Clear API Caches
          </TestButton>
        </div>
      </TestPanel>

      {loading && <p>Running tests...</p>}
      
      {results && (
        <TestPanel>
          <h3>Test Results</h3>
          <p>
            Passed: {results.summary.passed} / Failed: {results.summary.failed} / 
            Total: {results.summary.total}
          </p>
          
          <TestResults>
            {results.results.map((result, index) => (
              <ResultItem key={index} success={result.success}>
                {result.success ? '✅' : '❌'} {result.test}: {result.message}
              </ResultItem>
            ))}
          </TestResults>
        </TestPanel>
      )}
    </Container>
  );
};

export default DevTools;