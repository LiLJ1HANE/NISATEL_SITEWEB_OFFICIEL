import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Container, Section, SectionHeader, Button } from "../components/SharedStyles";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// Images
import wifiImage from '../assets/wifi-enterprise.png';
import paratonnerreImage from '../assets/paratonnere.jpg';
import balisageImage from '../assets/balisage.jpg';
import climatisationImage from '../assets/climatisation.webp';

const SolutionsTechniques = () => {
  const { t } = useTranslation();
  const solutions = t('technicalSolutions.solutions', { returnObjects: true });

  return (
    <Section bgColor="#f9f9f9">
      <Container>
        <SectionHeader className="mt-10">
          <h2>{t('technicalSolutions.title')}</h2>
          <p>{t('technicalSolutions.subtitle')}</p>
        </SectionHeader>

        {solutions.map((solution, index) => (
          <SolutionSection key={index} reverse={index % 2 !== 0}>
            <SolutionContent>
              <h3>{solution.title}</h3>
              {solution.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              
              {index === 0 ? (
                <SolutionGrid>
                  {solution.features.map((feature, i) => (
                    <SolutionFeature key={i}>
                      <i className={feature.icon}></i>
                      <span>{feature.text}</span>
                    </SolutionFeature>
                  ))}
                </SolutionGrid>
              ) : (
                <ul>
                  {solution.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}
              
              {index === 0 && (
                <Link to="/wireless">
                <Button whileHover={{ scale: 1.05 }}>{solution.button}</Button>
                </Link>
              )}
            </SolutionContent>
            <SolutionImage bgImage={
              index === 0 ? wifiImage : 
              index === 1 ? paratonnerreImage : 
              index === 2 ? balisageImage : 
              climatisationImage
            } />
          </SolutionSection>
        ))}
      </Container>
    </Section>
  );
};

// Styles spécifiques à cette page
const SolutionSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
  align-items: center;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SolutionContent = styled.div`
  flex: 1;
  
  h3 {
    color: #1a5f9a;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }

  ul {
    margin-top: 15px;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 15px;

      &:before {
        content: '•';
        color: #1a5f9a;
        position: absolute;
        left: 0;
      }
    }
  }
`;

const SolutionImage = styled.div`
  flex: 1;
  min-height: 400px;
  border-radius: 10px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    min-height: 300px;
    width: 100%;
  }
`;

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 25px 0;
`;

const SolutionFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2c3e50;
  
  i {
    color: #1a5f9a;
    font-size: 1.2rem;
  }
`;

export default SolutionsTechniques;