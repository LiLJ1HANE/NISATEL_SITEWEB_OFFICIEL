import React from "react";
import dowslakeLogo from "../assets/logodowslake.png";
import fibreImage from "../assets/fibre-optique.jpg";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import vid from "../assets/vid.mp4"; 
import { useTranslation } from 'react-i18next';

export default function WirelessPage() {
  const { t } = useTranslation();
  
  return (
    <div className="text-gray-800 min-h-screen pt-[150px] p-6" style={{ background: 'linear-gradient(to bottom, #1e40af 0%, #fff 60%)' }}>
      {/* Section principale */}
      <motion.section 
        className="relative px-6 pb-16 overflow-hidden text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="mb-4 text-5xl font-extrabold text-white ">
          <span>{t('wirelessPage.title')}</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-blue-100 md:text-xl">
          {t('wirelessPage.subtitle')}
        </p>
      </motion.section>

      {/* Partie Fibre Optique */}
      <motion.section 
        className="px-6 py-16 bg-white shadow-lg md:px-20 rounded-t-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-orange-500 md:text-4xl">
            {t('wirelessPage.fiberSection.title')}
          </h2>
          
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="md:w-1/2">
              <img 
                src={fibreImage} 
                alt="Fibre optique" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2">
              <ul className="space-y-3 text-lg text-gray-700">
                {t('wirelessPage.fiberSection.items', { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>
                      {typeof item === 'object' ? (
                        <>
                          <span className="font-semibold">{item.text}</span> {item.details}
                        </>
                      ) : (
                        <span className="font-semibold">{item}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative px-6 py-16 h-[80vh] min-h-[500px] overflow-hidden text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            webkit-playsinline="true"
          >
            <source src={vid} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>

        {/* Contenu */}
        <div className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {t('wirelessPage.ctaSection.title')}
          </h2>
          <p className="max-w-2xl mb-8 text-lg">
            {t('wirelessPage.ctaSection.text')}
          </p>
          <Link to="/contact" className="inline-block">
            <motion.button 
              className="px-8 py-4 font-semibold text-blue-600 bg-white rounded-lg shadow-lg hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('wirelessPage.ctaSection.button')}
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Partie Dowslake */}
      <motion.section 
        className="px-6 py-12 md:px-20 bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="max-w-4xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
            {t('wirelessPage.partnerSection.title')}
          </h2>
          
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex justify-center md:w-1/6">
              <img 
                src={dowslakeLogo} 
                alt="Logo Dowslake" 
                className="w-32 h-auto" 
              />
            </div>
            <div className="md:w-5/6">
              <p className="text-gray-700">
                {t('wirelessPage.partnerSection.description')}
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}