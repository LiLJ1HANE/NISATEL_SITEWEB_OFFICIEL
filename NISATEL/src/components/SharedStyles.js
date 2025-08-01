// src/components/SharedStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const Section = styled.section`
  padding: 100px 0;
  background-color: ${props => props.bgColor || '#ffffff'};

  @media (max-width: 768px) {
    padding: 70px 0;
  }
  
  @media (max-width: 480px) {
    padding: 50px 0;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  
  h2 {
    font-size: 2.5rem;
    color: #1a5f9a;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      width: 50px;
      height: 3px;
      background-color: #1a5f9a;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #7f8c8d;
    max-width: 700px;
    margin: 0 auto;
  }
`;

export const Button = styled.button`
  background-color: #1a5f9a;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background-color: #124b7e;
  }
`;