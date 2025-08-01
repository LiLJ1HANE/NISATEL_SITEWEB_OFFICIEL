import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <div className="flex border border-orange-400 rounded-md overflow-hidden">
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-2 py-1 text-sm font-semibold ${
          i18n.language === "fr"
            ? "bg-orange-400 text-white"
            : "text-orange-600 hover:bg-orange-100"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-sm font-semibold ${
          i18n.language === "en"
            ? "bg-orange-400 text-white"
            : "text-orange-600 hover:bg-orange-100"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;