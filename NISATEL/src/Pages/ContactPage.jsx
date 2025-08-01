import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaFax } from "react-icons/fa";
import headerImage from "../assets/Business-phones-entreprise.jpg";
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function ContactPage() {
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/contact", {
        name: fullName,
        email,
        phone,
        company,
        service: selectedService,
        message,
      });
      alert(" Votre message a été envoyé avec succès !");
      setFullName(""); setEmail(""); setPhone("");
      setCompany(""); setSelectedService(""); setMessage("");
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error);
      alert(" Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const options = [
    { value: 'etudes', label: t("contact.services.etudes") },
    { value: 'fabrication', label: t("contact.services.fabrication") },
    { value: 'installation', label: t("contact.services.installation") },
    { value: 'maintenance', label: t("contact.services.maintenance") },
    { value: 'autre', label: t("contact.services.autre") },
  ];

  const contactItems = [
    {
      icon: <FiPhone className="text-xl" />,
      title: t("contact.phone"),
      info: "+212 5 37 41 02 57",
      link: "tel:+212537410257",
      className: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FaFax className="text-xl" />,
      title: t("contact.fax"),
      info: "+212 5 37 41 02 26",
      className: "bg-blue-100 text-blue-900",
    },
    {
      icon: <FiMail className="text-xl" />,
      title: t("contact.email"),
      info: "contact@nisatel.ma",
      link: "mailto:contact@nisatel.ma",
      className: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FiMapPin className="text-xl" />,
      title: t("contact.address"),
      info: t("contact.addressDetails"),
      className: "bg-blue-100 text-blue-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative pt-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-orange-600/60 z-10" />
        <img src={headerImage} alt={t("contact.heroAlt")} className="w-full h-96 object-cover object-center" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-400">{t("contact.heroHighlight")}</span> {t("contact.heroText")}
            </motion.h1>
            <motion.p
              className="text-xl font-medium text-white md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t("contact.heroSubtitle")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Infos */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t("contact.contactDetails")}</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
              <p className="mt-4 text-gray-600">{t("contact.contactDetailsText")}</p>
            </div>

            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -2 }}
              >
                <div className={`p-3 rounded-lg ${item.className} flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  {item.link ? (
                    <a href={item.link} className="mt-1 text-gray-600 hover:text-orange-600 block">
                      {item.info}
                    </a>
                  ) : (
                    <p className="mt-1 text-gray-600">{item.info}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t("contact.sendMessage")}</h2>
              <div className="w-20 h-1 bg-blue-900 rounded-full"></div>
              <p className="mt-4 text-gray-600">{t("contact.sendMessageText")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.fullName")} <span className="text-orange-500">*</span>
                  </label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.company")}
                  </label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.email")} <span className="text-orange-500">*</span>
                  </label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.phone")}
                  </label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.service")} <span className="text-orange-500">*</span>
                </label>
                <Select options={options} placeholder={t("contact.selectService")} className="w-full" onChange={(o) => setSelectedService(o.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("contact.yourMessage")} <span className="text-orange-500">*</span>
                </label>
                <textarea rows="5" required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-md" />
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-blue-900 text-white font-medium rounded-md hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                <span>{t("contact.sendButton")}</span>
                <FiSend className="text-lg" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div className="mt-20" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{t("contact.location")}</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title={t("contact.mapTitle")}
              src="https://maps.google.com/maps?q=06%2C%20Résidence%20Kader%2C%20Mers%20El%20Kheir%2C%20Témara%20Maroc&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-96 border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="mt-4 text-center text-gray-600">
            <p>{t("contact.addressDetails")}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
