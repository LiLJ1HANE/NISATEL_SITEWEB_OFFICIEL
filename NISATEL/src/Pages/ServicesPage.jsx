import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fabricationImg from '../assets/NISATEL FABRICATION.webp';
import MontageSurSite from '../assets/NISATEL_MONTAGE_SUR_SITE.webp';
import MaintenanceImg from '../assets/NISATEL-MAINTENANCE.webp';
import Usine from '../assets/NISATEL BUREAU ETUDE.webp'
import {
  faNetworkWired,
  faTools,
  faPhoneAlt,
  faMobileAlt,
  faSyncAlt,
  faDoorOpen,
  faVideo,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons';

const ServicesPage = () => {
  const { t } = useTranslation();

  const mainServices = [
    {
      dataKey: 'etudes',
      image: Usine
    },
    {
      dataKey: 'fabrication',
      image: fabricationImg
    },
    {
      dataKey: 'installation',
      image: MontageSurSite
    },
    {
      dataKey: 'maintenance',
      image: MaintenanceImg
    }
  ];

  const telecomServices = [
    {
      icon: faNetworkWired,
      key: 'installation'
    },
    {
      icon: faTools,
      key: 'maintenance'
    },
    {
      icon: faPhoneAlt,
      key: 'voip'
    },
    {
      icon: faMobileAlt,
      key: 'mobilite'
    },
    {
      icon: faSyncAlt,
      key: 'convergence'
    },
    {
      icon: faDoorOpen,
      key: 'interphone'
    },
    {
      icon: faVideo,
      key: 'visio'
    },
    {
      icon: faLaptopCode,
      key: 'cti'
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <div className="w-full py-16 bg-orange-400 lg:pt-40 pt-30 pb-15">
        <div className="max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h1 className="relative mb-6 text-3xl font-bold text-blue-900 lg:text-5xl">
            {t('servicesPage.mainTitle')}
            <span className="absolute bottom-0 w-20 h-1 mt-6 transform -translate-x-1/2 left-1/2"></span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl lg:text-2xl  text-white">
            {t('servicesPage.mainSubtitle')}
          </p>
        </div>
      </div>

      {/* Main Services */}
      <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {mainServices.map((service, index) => {
          const s = t(`servicesPage.main.${service.dataKey}`, { returnObjects: true });
          return (
            <motion.section
              key={index}
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}>
                <div className="md:w-1/2">
                  <h2 className="relative pb-2 mb-4 text-3xl font-bold text-blue-900">
                    {s.title}
                    <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500"></span>
                  </h2>
                  <p className="mb-6 text-lg text-gray-600">{s.description}</p>
                  <ul className="mb-6 space-y-3">
                    {s.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mt-1 mr-2 text-blue-500">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="relative w-full overflow-hidden transition-all duration-300 border-4 border-blue-500 rounded-lg shadow-xl h-80 sm:h-96 hover:border-orange-500">
                    <div
                      className="w-full h-full transition-transform duration-500 bg-center bg-cover hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}

        {/* Telecom Services */}
        <div className="p-8 mt-20 bg-gray-50 rounded-xl sm:p-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-blue-900">
              {t('servicesPage.telecomTitle')}
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              {t('servicesPage.telecomSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {telecomServices.map((service, index) => {
              const tData = t(`servicesPage.telecom.${service.key}`, { returnObjects: true });
              return (
                <motion.div
                  key={index}
                  className="relative p-6 overflow-hidden transition-shadow duration-300 bg-white border-t-4 border-blue-500 rounded-lg shadow-md hover:shadow-xl"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center w-16 h-16 mb-4 text-2xl text-blue-500 rounded-full bg-blue-50">
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-blue-900">
                    {tData.title}
                  </h3>
                  <p className="text-gray-600">{tData.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
