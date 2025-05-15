// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';
import SolanaWalletProvider from './context/SolanaWalletProvider';
import CharacterProvider from './context/CharacterContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AgentSelect from './components/AgentSelect';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import CharacterTrainer from './components/admin/CharacterTrainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SolanaWalletProvider>
        <CharacterProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/agents" element={<AgentSelect />} />
                <Route path="/character/:id" element={<ChatInterface />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/train/:id" element={<CharacterTrainer />} />
              </Routes>
            </Layout>
          </Router>
        </CharacterProvider>
      </SolanaWalletProvider>
    </ThemeProvider>
  );
}

export default App;