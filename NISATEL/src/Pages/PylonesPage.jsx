import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Assets
import VideoPylone from '../assets/pylone.mp4';
import autoportantsImage from '../assets/pylones-monotubes-2.jpg';
import monotubesImage from '../assets/NISATEL-MAINTENANCE.webp';
import speciauxImage from '../assets/Pylônes-spéciaux.png';
import renforcementImage from '../assets/Pylones_treillis_autoportants.jpg';

const PageContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
  color: #333;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  padding: 0 20px;

  h1 {
    font-size: 2.8rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: auto;
  padding: 60px 20px;
`;

const ProductBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductText = styled.div`
  flex: 1;
  min-width: 280px;

  h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 20px;
    position: relative;

    &::after {
      content: '';
      width: 50px;
      height: 3px;
      background: #f39c12;
      position: absolute;
      bottom: -10px;
      left: 0;
    }
  }

  ul {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  li {
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    font-size: 1rem;
    color: #555;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      top: -3px;
      color: #3498db;
      font-size: 1.5rem;
    }
  }
`;

const ProductImage = styled.div`
  flex: 1;
  min-width: 280px;
  text-align: center;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 10px;
    border: 4px solid #3498db;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;

    &:hover {
      border-color: #f39c12;
    }
  }
`;

const CTAButton = styled(motion.button)`
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }

  i {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }

  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`;

const PylonesPage = () => {
  const { t } = useTranslation();

  const productCategories = [
    {
      id: 'autoportants',
      name: t('productsPage.products.autoportants.title'),
      image: renforcementImage,
      features: t('productsPage.products.autoportants.features', { returnObjects: true }),
    },
    {
      id: 'monotubes',
      name: t('productsPage.products.monotubes.title'),
      image: autoportantsImage,
      features: t('productsPage.products.monotubes.features', { returnObjects: true }),
    },
    {
      id: 'speciaux',
      name: t('productsPage.products.speciaux.title'),
      image: speciauxImage,
      features: t('productsPage.products.speciaux.features', { returnObjects: true }),
    },
    {
      id: 'renforcement',
      name: t('productsPage.products.renforcement.title'),
      image: monotubesImage,
      features: t('productsPage.products.renforcement.features', { returnObjects: true }),
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <VideoBackground autoPlay muted loop playsInline>
          <source src={VideoPylone} type="video/mp4" />
        </VideoBackground>
        <Overlay />
        <HeroContent>
          <h1>{t('productsPage.hero.title')}</h1>
          <p>{t('productsPage.hero.subtitle')}</p>
        </HeroContent>
      </HeroSection>

      <Section>
        {productCategories.map((product, index) => (
          <ProductBlock key={product.id}>
            {(index % 2 === 0 || window.innerWidth < 768) ? (
              <>
                <ProductText>
                  <h3>{product.name}</h3>
                  <ul>
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <CTAButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('productsPage.ctaButton')} <i className="fas fa-arrow-right" />
                    </CTAButton>
                  </Link>
                </ProductText>
                <ProductImage>
                  <img src={product.image} alt={product.name} />
                </ProductImage>
              </>
            ) : (
              <>
                <ProductImage>
                  <img src={product.image} alt={product.name} />
                </ProductImage>
                <ProductText>
                  <h3>{product.name}</h3>
                  <ul>
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <CTAButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('productsPage.ctaButton')} <i className="fas fa-arrow-right" />
                    </CTAButton>
                  </Link>
                </ProductText>
              </>
            )}
          </ProductBlock>
        ))}
      </Section>
    </PageContainer>
  );
};

export default PylonesPage;
