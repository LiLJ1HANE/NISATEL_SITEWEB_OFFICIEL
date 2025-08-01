import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/LogoNisatel.jpg";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileProducts, setShowMobileProducts] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const closeDropdownTimeout = useRef();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'services', path: '/services' },
    { key: 'products', path: '/products', hasDropdown: true },
    { key: 'applications', path: '/applications' },
    { key: 'contact', path: '/contact' }
  ];

  const productsDropdownItems = [
    { key: 'towers', path: '/pylônes' },
    { key: 'wireless', path: '/wireless' },
    { key: 'technical', path: '/solutions-techniques' }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "h-0 opacity-0" : "h-8 opacity-100"
        } bg-black text-white text-xs flex items-center justify-center space-x-2 sm:space-x-6 px-2`}
      >
        <a href="tel:+212537410257" className="flex items-center transition hover:text-orange-400 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {t('header.phone')}
        </a>
        <a href="mailto:contact@nisatel.com" className="flex items-center transition hover:text-orange-400 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {t('header.email')}
        </a>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md h-16"
            : "bg-white shadow-lg h-20"
        }`}
        style={{ top: isScrolled ? '0' : '2rem' }}
      >
        <div className="container flex items-center justify-between px-4 mx-auto sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={logo}
              alt="Logo"
              className={`transition-transform duration-500 group-hover:rotate-6 ${
                isScrolled ? "w-10 h-10 sm:w-12 sm:h-12" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
            />
            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 font-poppins">
              NISATEL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <nav className="hidden md:flex space-x-4 sm:space-x-6">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => {
                      if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
                      setIsProductsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      closeDropdownTimeout.current = setTimeout(() => {
                        setIsProductsDropdownOpen(false);
                      }, 200);
                    }}
                  >
                    <button
                      className="relative flex items-center gap-1 text-sm font-medium text-gray-700 transition hover:text-orange-600 focus:outline-none"
                      aria-haspopup="true"
                      aria-expanded={isProductsDropdownOpen}
                    >
                      <span className="after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:transition-all after:duration-300 group-hover:after:w-full">
                        {t(`header.nav.${item.key}`)}
                      </span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    {isProductsDropdownOpen && (
                      <div className="absolute left-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-lg"
                        onMouseEnter={() => {
                          if (closeDropdownTimeout.current) clearTimeout(closeDropdownTimeout.current);
                          setIsProductsDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                          closeDropdownTimeout.current = setTimeout(() => {
                            setIsProductsDropdownOpen(false);
                          }, 200);
                        }}
                      >
                        {productsDropdownItems.map(dropdownItem => (
                          <Link 
                            key={dropdownItem.key}
                            to={dropdownItem.path} 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                          >
                            {t(`header.nav.productsDropdown.${dropdownItem.key}`)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.path}
                    className="relative text-sm font-medium text-gray-700 transition hover:text-orange-600"
                  >
                    <span className="after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:transition-all after:duration-300 hover:after:w-full">
                      {t(`header.nav.${item.key}`)}
                    </span>
                  </Link>
                )
              )}
            </nav>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:block ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-3">
            <div className="md:hidden">
              <LanguageSwitcher mobile />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-orange-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 6.75h15M4.5 12h15M4.5 17.25h15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="absolute left-0 right-0 px-6 pb-2 bg-white shadow-inner md:hidden"
            ref={mobileMenuRef}
            style={{ top: isScrolled ? '4rem' : '5rem' }}
          >
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.key} className="border-b border-gray-200">
                  <button
                    className="flex items-center justify-between w-full py-3 text-sm text-left text-gray-700 hover:text-orange-600 focus:outline-none"
                    onClick={() => setShowMobileProducts((prev) => !prev)}
                    type="button"
                  >
                    <span>{t(`header.nav.${item.key}`)}</span>
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform ${showMobileProducts ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showMobileProducts && (
                    <div className="pl-4 bg-gray-50 rounded-lg mt-1 mb-2">
                      {productsDropdownItems.map(dropdownItem => (
                        <Link 
                          key={dropdownItem.key}
                          to={dropdownItem.path} 
                          className="block py-2.5 text-sm text-gray-700 hover:text-orange-600"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setShowMobileProducts(false);
                          }}
                        >
                          {t(`header.nav.productsDropdown.${dropdownItem.key}`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  to={item.path}
                  className="block py-3 text-sm text-gray-700 border-b border-gray-200 hover:text-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(`header.nav.${item.key}`)}
                </Link>
              )
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;