import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!region && !country) {
      // Utiliser la traduction pour le message d'alerte
      alert(t('provide_region_or_country'));
      return;
    }
    // Passer les états à la page de résultat via la navigation
    navigate('/result', { state: { region, country } });
  };

  return (
    <div className="home-page">
      {/* Le titre principal est déjà dans App.jsx, ici on peut mettre un sous-titre ou rien */}
      <form onSubmit={handleSubmit} className="recommendation-form">
        <div className="form-group">
          <label htmlFor="region">{t('region_label')}</label>
          <input
            id="region"
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder={t('region_label').split(':')[0]} // Exemple: "Région (ex. : Europe)" -> "Région"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">{t('country_label')}</label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={t('country_label').split(':')[0]} // Exemple: "Pays (ex. : Italy)" -> "Pays"
          />
        </div>
        <button type="submit" className="submit-button">{t('get_recommendation_button')}</button>
      </form>
    </div>
  );
};

// Exporter le composant pour qu'il puisse être importé ailleurs
export default Home;

