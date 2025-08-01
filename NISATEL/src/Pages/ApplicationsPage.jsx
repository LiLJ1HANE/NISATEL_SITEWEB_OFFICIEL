import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ApplicationPage = () => {
  const { t } = useTranslation();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des applications :", error);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-blue-900">
        <div className="absolute inset-0"></div>

        <div className="relative z-10 max-w-5xl px-6 mx-auto text-center pt-35 pb-15">
          <h1 className="text-3xl font-bold leading-tight text-white lg:text-5xl">
            {t("hero.title.part1")} <span className="inline text-orange-400">{t("hero.title.highlight")}</span>
          </h1>

          <div className="inline-block px-6 py-3 mt-6 text-2xl font-bold text-white bg-orange-400 border border-orange-400 rounded-full shadow-md">
            {t("hero.experience")}
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            <span>{t("applications.sectionTitle.part1")}</span>
            <span className="mt-2 text-orange-500 "> {t("applications.sectionTitle.part2")}</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-blue-600">
            {t("applications.sectionDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, index) => (
            <div 
              key={index}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  src={app.image_url}
                  alt={app.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-900">{app.title}</h3>
                <p className="text-gray-600">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-white bg-blue-900">
        <div className="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-10 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">{t("cta.title.part1")}</span>
            <span className="block mt-2 text-orange-400">{t("cta.title.part2")}</span>
          </h2>
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-800 bg-white border border-transparent rounded-md hover:bg-gray-50"
              >
                {t("cta.button")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
