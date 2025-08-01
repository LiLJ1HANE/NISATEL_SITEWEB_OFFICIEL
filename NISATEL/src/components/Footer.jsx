import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../assets/LogoNisatel.jpg';
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Footer = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  return (
    <footer className="pt-12 pb-6 text-white bg-gray-900">
      <div className="container px-4 mx-auto">

        {/* Company info with logo */}
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="mb-6" data-aos="fade-up">
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="Logo NISATEL"
                className="w-12 h-12 p-1 mr-3 bg-white border-2 border-blue-400 rounded-full"
              />
              <div className="pl-2 border-l-2 border-blue-400">
                <div className="text-xl font-bold text-orange-400">{t('footer.company.name')}</div>
                <div className="text-xs text-gray-400">{t('footer.company.slogan')}</div>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-300">
              {t('footer.company.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition hover:text-blue-400">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-blue-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-blue-400">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="pb-2 mb-4 text-lg font-semibold text-blue-400 border-b border-blue-400">
              {t('footer.sections.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.links.home')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.links.about')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.links.services')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.links.products')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.links.applications')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.links.contact')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="mb-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="pb-2 mb-4 text-lg font-semibold text-blue-400 border-b border-blue-400">
              {t('footer.sections.services')}
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.servicesList.engineering')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.servicesList.manufacturing')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.servicesList.installation')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.servicesList.maintenance')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.servicesList.wifi')}</a></li>
              <li><a href="#" className="text-sm text-gray-300 transition hover:text-blue-400">{t('footer.servicesList.fiber')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
            <h3 className="pb-2 mb-4 text-lg font-semibold text-blue-400 border-b border-blue-400">
              {t('footer.sections.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="flex-shrink-0 mt-1 mr-2 text-blue-400" />
                <span className="text-sm text-gray-300">{t('footer.contactInfo.phone')}</span>
              </li>
              <li className="flex items-start">
                <FaFax className="flex-shrink-0 mt-1 mr-2 text-blue-400" />
                <span className="text-sm text-gray-300">{t('footer.contactInfo.fax')}</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="flex-shrink-0 mt-1 mr-2 text-blue-400" />
                <a href={`mailto:${t('footer.contactInfo.email')}`} className="text-sm text-gray-300 transition hover:text-blue-400">
                  {t('footer.contactInfo.email')}
                </a>
              </li>
              <li className="flex items-start">
                <FaGlobe className="flex-shrink-0 mt-1 mr-2 text-blue-400" />
                <a href={`https://${t('footer.contactInfo.website')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 transition hover:text-blue-400">
                  {t('footer.contactInfo.website')}
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="flex-shrink-0 mt-1 mr-2 text-blue-400" />
                <span className="text-sm text-gray-300">{t('footer.contactInfo.address')}</span>
              </li>
            </ul>
          </div>
        </div>

       

        {/* Copyright */}
        <div className="pt-6 mt-6 text-sm text-center text-gray-500 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} {t('footer.company.name')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;