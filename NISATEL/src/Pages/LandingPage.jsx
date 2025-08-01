import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';
import logo from '../assets/Logo_Nisatel-re.png';
import fabrication from '../assets/climatisation.webp';
import fibre from '../assets/fibre-optique.jpg'
import pylone from '../assets/1536773861660_page-0001.jpg'
import treillis from '../assets/Pylônes-treillis-autoportants.jpg'
import Wifi from '../assets/enterprise-wireless-network.jpg'
import energie from '../assets/energie.jpg'
import { Link } from 'react-router-dom';

import { 
  FaDraftingCompass, 
  FaIndustry, 
  FaTools,
  FaMobileAlt,
  FaShieldAlt,
  FaBroadcastTower,
  FaTruckMonster
} from 'react-icons/fa';

const slideLinks = [
  '/pylônes',      // Slide 0
  '/wireless', // Slide 1
  '/services',   // Slide 2
];

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('pylones');
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false
  };

  // Slide images
  const slideImages = [
    pylone,
    fibre,
    fabrication,
  ];

  // Product images
  const productImages = [
    treillis,
    Wifi,
    energie,
  ];

  return (
    <motion.div 
      className="overflow-x-hidden font-sans leading-relaxed text-gray-800 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Slider Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <Slider {...sliderSettings}>
          {slideImages.map((image, index) => (
            <div key={index} className="h-[80vh] relative">
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%] max-w-4xl">
                <motion.h1 className="mb-5 text-5xl leading-tight drop-shadow-md" variants={itemVariants}>
                  {t(`landingPage.hero.slides.${index}.title`)}
                </motion.h1>
                <motion.p className="mb-8 text-xl drop-shadow-sm" variants={itemVariants}>
                  {t(`landingPage.hero.slides.${index}.subtitle`)}
                </motion.p>
                <Link to={slideLinks[index]}>
  <motion.button 
    className="px-8 py-3 text-lg font-semibold tracking-wider text-white uppercase transition-all duration-300 bg-blue-900 rounded-full shadow-md hover:bg-blue-800"
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {t(`landingPage.hero.slides.${index}.button`)}
  </motion.button>
</Link>

              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="flex flex-wrap items-center justify-between max-w-6xl gap-10 px-5 mx-auto">
          <motion.div 
            className="flex-1 min-w-[300px]"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-4xl text-gray-800">{t('landingPage.about.title')}</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              {t('landingPage.about.description1')}
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              {t('landingPage.about.description2')}
            </p>
            
          </motion.div>
          
          <motion.div 
            className="flex-1 min-w-[300px] relative h-[400px]"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src={logo} 
              alt="NISATEL Logo" 
              className="max-w-[450px] mx-auto block drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <div className="w-full py-20 bg-white" data-aos="fade-up">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block mb-4 text-4xl text-blue-900">
              {t('landingPage.values.title')}
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-900"></span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-500">
              {t('landingPage.values.subtitle')}
            </p>
          </div>
          
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              loop
              breakpoints={{
                768: {
                  slidesPerView: 1,
                  spaceBetween: 30
                }
              }}
            >
              {t('landingPage.values.items', { returnObjects: true }).map((value, index) => (
                <SwiperSlide key={index} className="px-5">
                  <div className="flex items-center justify-center h-full p-10 text-center shadow-md bg-blue-50 rounded-2xl">
                    <p className="m-0 text-xl italic leading-relaxed text-gray-800">
                      "{value}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Services Preview Section */}
      <section className="py-24">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block mb-4 text-4xl text-blue-900">
              {t('landingPage.services.title')}
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-900"></span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-500">
              {t('landingPage.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t('landingPage.services.items', { returnObjects: true }).map((service, index) => (
              <motion.div 
                key={index}
                className="p-8 text-center transition-all duration-300 bg-white border-t-4 border-blue-900 shadow-md rounded-xl hover:-translate-y-2 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 text-blue-900 bg-blue-100 rounded-full">
                  {index === 0 && <FaDraftingCompass className="text-3xl" />}
                  {index === 1 && <FaIndustry className="text-3xl" />}
                  {index === 2 && <FaTools className="text-3xl" />}
                </div>
                <h3 className="mb-4 text-2xl text-gray-800">{service.title}</h3>
                <p className="mb-6 leading-relaxed text-gray-700">
                  {service.description}
                </p>
                <Link to="/services">
                <motion.button
                  className="px-6 py-2 text-sm font-semibold text-white transition-all duration-300 bg-blue-900 rounded-full hover:bg-blue-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {service.button}
                </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block mb-4 text-4xl text-blue-900">
              {t('landingPage.products.title')}
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-900"></span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-500">
              {t('landingPage.products.subtitle')}
            </p>
          </div>
          
          <div className="overflow-hidden bg-white shadow-md rounded-xl">
            <div className="flex flex-wrap border-b border-gray-200">
              {Object.entries(t('landingPage.products.tabs', { returnObjects: true })).map(([key, value]) => (
                <button 
                  key={key}
                  className={`flex-1 py-4 px-5 text-lg font-semibold ${activeTab === key ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-500'}`}
                  onClick={() => setActiveTab(key)}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <div>
              {activeTab && (
                <motion.div 
                  className="p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex-1 min-w-[300px] h-[300px] bg-cover bg-center rounded-xl shadow-lg" 
                      style={{ backgroundImage: `url(${productImages[Object.keys(t('landingPage.products.tabs', { returnObjects: true })).indexOf(activeTab)]})` }}></div>
                    <div className="flex-1 min-w-[300px]">
                      <h3 className="mb-5 text-3xl text-gray-800">
                        {t(`landingPage.products.items.${activeTab}.title`)}
                      </h3>
                      <ul className="pl-5 mb-6">
                        {t(`landingPage.products.items.${activeTab}.features`, { returnObjects: true }).map((feature, i) => (
                          <li key={i} className="mb-3 text-gray-700 relative pl-5 leading-relaxed before:content-['•'] before:text-blue-900 before:text-xl before:absolute before:left-0 before:top-[-3px]">
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to="/pylônes">
                      <motion.button
                        className="px-8 py-3 font-semibold text-white transition-all duration-300 bg-blue-900 rounded-full hover:bg-blue-800"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t(`landingPage.products.items.${activeTab}.button`)}
                      </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Clients & Applications Section */}
      <section className="py-24">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block mb-4 text-4xl text-blue-900">
              {t('landingPage.applications.title')}
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-900"></span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-500">
              {t('landingPage.applications.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t('landingPage.applications.items', { returnObjects: true }).map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 text-center transition-all duration-300 border-t-4 border-blue-900 hover:scale-[1.03]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 text-3xl text-blue-900 bg-blue-100 rounded-full">
                  {index === 0 && <FaMobileAlt />}
                  {index === 1 && <FaShieldAlt />}
                  {index === 2 && <FaBroadcastTower />}
                  {index === 3 && <FaTruckMonster />}
                </div>
                <h3 className="mb-3 text-xl text-gray-800">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block mb-4 text-4xl text-blue-900">
              {t('landingPage.testimonials.title')}
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-900"></span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-500">
              {t('landingPage.testimonials.subtitle')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Slider {...sliderSettings}>
              {t('landingPage.testimonials.items', { returnObjects: true }).map(testimonial => (
                <div key={testimonial.name} className="px-4">
                  <div className="p-8 bg-white border-t-4 border-blue-900 shadow-md rounded-xl">
                    <div className="text-center">
                      <p className="mb-5 text-lg italic leading-relaxed text-gray-800">
                        "{testimonial.comment}"
                      </p>
                      <div>
                        <h4 className="mb-1 text-xl text-gray-800">{testimonial.name}</h4>
                        <span className="text-sm text-gray-500">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LandingPage;