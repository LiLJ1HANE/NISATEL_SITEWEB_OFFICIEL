import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

import LandingPage from './Pages/LandingPage';
import ContactPage from './Pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ServicesPage from './Pages/ServicesPage';
import PylonesPage from './Pages/PylonesPage';
import ApplicationsPage from './Pages/ApplicationsPage';
import WirelessPage from './Pages/WirelessPage';
import ChatbotFr from './components/ChatbotFr';
import ChatbotEn from './components/ChatbotEn';
import SolutionsTechniques from './Pages/SolutionsTechniques';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

function App() {
  const { i18n } = useTranslation();
  const [langReady, setLangReady] = useState(false);

  useEffect(() => {
    AOS.init();

    const savedLang = localStorage.getItem('lang');

    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang).then(() => setLangReady(true));
    } else if (!savedLang) {
      i18n.changeLanguage('fr').then(() => setLangReady(true));  
    } else {
      setLangReady(true);
    }
  }, [i18n]);

  if (!langReady) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Chargement...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden App">
        <Header />
        {i18n.language === 'fr' ? <ChatbotFr /> : <ChatbotEn />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Acceuil" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pylônes" element={<PylonesPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/wireless" element={<WirelessPage />} />
            <Route path="/solutions-techniques" element={<SolutionsTechniques />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
