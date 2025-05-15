// src/components/Layout.jsx
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; // Space for fixed navbar
  position: relative;
  z-index: 1;
`;

// Optional cyberpunk overlay scan line
const ScanLine = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 107, 26, 0.3);
  z-index: 999;
  pointer-events: none;
  animation: scanLine 4s linear infinite;
  opacity: 0.5;
  
  @keyframes scanLine {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;

// Grid overlay for cyberpunk effect
const GridOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 107, 26, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 26, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <ScanLine />
      <GridOverlay />
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;