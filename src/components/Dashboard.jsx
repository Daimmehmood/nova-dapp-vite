// src/components/Dashboard.jsx
import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <p>This is a placeholder for the Dashboard component.</p>
    </DashboardContainer>
  );
};

export default Dashboard;