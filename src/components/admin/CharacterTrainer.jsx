// src/components/admin/CharacterTrainer.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';

// Import character data
import novaData from '../../data/characters/nova.json';
import lunaData from '../../data/characters/luna.json';
import vegaData from '../../data/characters/vega.json';
import emberData from '../../data/characters/ember.json';
import astraData from '../../data/characters/astra.json';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primaryOrange};
  color: ${({ theme }) => theme.colors.primaryOrange};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 107, 26, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  background: ${({ color, theme }) => 
    `linear-gradient(45deg, ${color || theme.colors.primaryOrange} 0%, white 150%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid ${({ color }) => color || 'rgba(255, 107, 26, 0.3)'};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ color }) => color || '#FFD700'};
`;

const ResponseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResponseItem = styled.div`
  position: relative;
  background: rgba(20, 20, 30, 0.7);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: rgba(15, 15, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: white;
  padding: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ color }) => color || '#FF6B1A'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color, danger }) => 
    danger ? 'rgba(255, 77, 77, 0.2)' : 
    color ? `rgba(${color.replace(/^#/, '').match(/../g).map(hex => parseInt(hex, 16)).join(', ')}, 0.2)` : 
    'rgba(255, 107, 26, 0.2)'};
  color: ${({ color, danger }) => 
    danger ? '#FF4D4D' : color || '#FF6B1A'};
  border: 1px solid ${({ color, danger }) => 
    danger ? '#FF4D4D' : color || '#FF6B1A'};
  cursor: pointer;
  
  &:hover {
    background: ${({ color, danger }) => 
      danger ? 'rgba(255, 77, 77, 0.4)' : 
      color ? `rgba(${color.replace(/^#/, '').match(/../g).map(hex => parseInt(hex, 16)).join(', ')}, 0.4)` : 
      'rgba(255, 107, 26, 0.4)'};
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(20, 20, 30, 0.7);
  border: 1px dashed ${({ color }) => color || 'rgba(255, 107, 26, 0.5)'};
  color: ${({ color }) => color || '#FF6B1A'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(30, 30, 40, 0.7);
  }
`;

const SaveButton = styled.button`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.gradients.orangeYellow};
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.glowOrange};
  }
`;

const CharacterTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [characterData, setCharacterData] = useState(null);
  const [responses, setResponses] = useState({});
  
  // Load character data
  useEffect(() => {
    let data;
    switch(id) {
      case 'nova':
        data = novaData;
        break;
      case 'luna':
        data = lunaData;
        break;
      case 'vega':
        data = vegaData;
        break;
      case 'ember':
        data = emberData;
        break;
      case 'astra':
        data = astraData;
        break;
      default:
        navigate('/admin');
        return;
    }
    
    setCharacterData(data);
    setResponses(data.responses || {});
  }, [id, navigate]);
  
  // Handler to update a response
  const handleUpdateResponse = (category, index, value) => {
    const updatedResponses = { ...responses };
    if (!updatedResponses[category]) {
      updatedResponses[category] = [];
    }
    updatedResponses[category][index] = value;
    setResponses(updatedResponses);
  };
  
  // Handler to add a new response
  const handleAddResponse = (category) => {
    const updatedResponses = { ...responses };
    if (!updatedResponses[category]) {
      updatedResponses[category] = [];
    }
    updatedResponses[category].push('');
    setResponses(updatedResponses);
  };
  
  // Handler to delete a response
  const handleDeleteResponse = (category, index) => {
    const updatedResponses = { ...responses };
    updatedResponses[category].splice(index, 1);
    setResponses(updatedResponses);
  };
  
  // Handler to save all changes
  const handleSave = () => {
    // In a real application, you would save this to your backend
    // For now, we'll just log it to the console
    console.log('Updated character data:', {
      ...characterData,
      responses
    });
    alert('Changes saved! (In a real app, this would update the JSON files)');
  };
  
  if (!characterData) {
    return <div>Loading...</div>;
  }
  
  // Character color
  const characterColor = 
    id === 'nova' ? '#FF9933' :
    id === 'luna' ? '#33CCFF' :
    id === 'vega' ? '#9933FF' :
    id === 'ember' ? '#4EFF9F' :
    id === 'astra' ? '#FF5B78' : 
    '#FF6B1A';
  
  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/admin')}>
          <FaArrowLeft />
        </BackButton>
        <Title color={characterColor}>
          Training {characterData.character_info.name}: {characterData.character_info.title}
        </Title>
      </Header>
      
      {/* Response categories */}
      {['bitcoin', 'ethereum', 'solana', 'defi', 'nft', 'market_analysis', 'investment_strategy', 'default'].map(category => (
        <Section key={category} color={characterColor}>
          <SectionTitle color={characterColor}>
            {category.charAt(0).toUpperCase() + category.replace('_', ' ').slice(1)} Responses
          </SectionTitle>
          
          <ResponseList>
            {responses[category]?.map((response, index) => (
              <ResponseItem key={index}>
                <TextArea
                  value={response}
                  onChange={(e) => handleUpdateResponse(category, index, e.target.value)}
                  color={characterColor}
                />
                <ButtonGroup>
                  <IconButton 
                    danger 
                    onClick={() => handleDeleteResponse(category, index)}
                    title="Delete response"
                  >
                    <FaTrash />
                  </IconButton>
                </ButtonGroup>
              </ResponseItem>
            ))}
            
            <AddButton 
              color={characterColor} 
              onClick={() => handleAddResponse(category)}
            >
              <FaPlus /> Add Response
            </AddButton>
          </ResponseList>
        </Section>
      ))}
      
      <SaveButton onClick={handleSave}>
        <FaSave /> Save Changes
      </SaveButton>
    </Container>
  );
};

export default CharacterTrainer;