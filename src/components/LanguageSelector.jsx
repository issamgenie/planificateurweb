import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector">
      <button onClick={() => changeLanguage('fr')} disabled={i18n.language === 'fr'}>Français</button>
      <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>English</button>
      <button onClick={() => changeLanguage('es')} disabled={i18n.language === 'es'}>Español</button>
    </div>
  );
};

export default LanguageSelector;

