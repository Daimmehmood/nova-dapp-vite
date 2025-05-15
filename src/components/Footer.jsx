// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTwitter, FaDiscord, FaTelegram, FaGithub, FaMedium } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem 1.5rem;
  border-top: 1px solid rgba(255, 107, 26, 0.3);
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primaryYellow};
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primaryOrange};
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.primaryOrange};
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 1rem;
  
  h2 {
    font-size: 2rem;
    background: ${({ theme }) => theme.gradients.orangeYellow};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 800;
  }
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  position: relative;
  padding-left: 1rem;
  transition: all 0.3s ease;
  
  &::before {
    content: '>';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primaryOrange};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryYellow};
    transform: translateX(5px);
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  position: relative;
  padding-left: 1rem;
  transition: all 0.3s ease;
  
  &::before {
    content: '>';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primaryOrange};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryYellow};
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.darkGray};
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 107, 26, 0.3);
  
  &:hover {
    background: ${({ theme }) => theme.gradients.orangeYellow};
    color: ${({ theme }) => theme.colors.primaryBlack};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.glowOrange};
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 107, 26, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryYellow};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <LogoContainer>
            <h2>NOVA</h2>
          </LogoContainer>
          <FooterText>
            The future of decentralized intelligence. Explore the digital metropolis where
            AI companions guide you through the world of DeFi.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <FaDiscord />
            </SocialIcon>
            <SocialIcon href="https://t.me" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
            <SocialIcon href="https://medium.com" target="_blank" rel="noopener noreferrer">
              <FaMedium />
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>QUICK LINKS</FooterTitle>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
            <FooterLink to="/agents">Nova Agents</FooterLink>
            <FooterLink to="/roadmap">Roadmap</FooterLink>
            <FooterLink to="/about">About</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>RESOURCES</FooterTitle>
          <FooterLinks>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Documentation
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Whitepaper
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              API
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              GitHub
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Agent Guides
            </ExternalLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>CONTACT</FooterTitle>
          <FooterLinks>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Support
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Community
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Partnerships
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Careers
            </ExternalLink>
            <ExternalLink href="#" target="_blank" rel="noopener noreferrer">
              Press Kit
            </ExternalLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>
      
      <BottomBar>
        <Copyright>© 2025 NOVA DAPP. All rights reserved.</Copyright>
        <LegalLinks>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Cookies
          </a>
        </LegalLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;