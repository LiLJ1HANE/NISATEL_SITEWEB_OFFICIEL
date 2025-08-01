import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VideoPylone from '../assets/pylone.mp4';

const PageContainer = styled.div`/* ... */`;
const HeroSection = styled.section`/* ... */`;
const VideoBackground = styled.video`/* ... */`;
const Overlay = styled.div`/* ... */`;
const HeroContent = styled.div`/* ... */`;
const Section = styled.section`/* ... */`;
const ProductBlock = styled.div`/* ... */`;
const ProductText = styled.div`/* ... */`;
const ProductImage = styled.div`/* ... */`;
const CTAButton = styled(motion.button)`/* ... */`;

const PylonesPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

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
        {products.map((product, index) => (
          <ProductBlock key={product.id}>
            {(index % 2 === 0 || window.innerWidth < 768) ? (
              <>
                <ProductText>
                  <h3>{product.name}</h3>
                  <ul>
                    {product.features?.map((feat, i) => (
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
                  <img src={product.imageUrl} alt={product.name} />
                </ProductImage>
              </>
            ) : (
              <>
                <ProductImage>
                  <img src={product.imageUrl} alt={product.name} />
                </ProductImage>
                <ProductText>
                  <h3>{product.name}</h3>
                  <ul>
                    {product.features?.map((feat, i) => (
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
