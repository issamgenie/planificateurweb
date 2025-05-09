import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Ajout de useNavigate
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchRecommendation } from '../api/client';
import DestinationCard from '../components/DestinationCard';
import WeatherWidget from '../components/WeatherWidget';
import HealthTips from '../components/HealthTips';

export const Result = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate(); // Pour la sélection de pays
  const { region, country: initialCountry } = location.state || {}; // Renommer country en initialCountry

  // État pour le pays sélectionné si plusieurs sont retournés
  const [selectedCountry, setSelectedCountry] = React.useState(initialCountry);
  const [countryList, setCountryList] = React.useState([]);

  const {
    data: recommendation,
    isLoading,
    isError,
    error,
    // `refetch` n'est pas directement utilisé ici car la clé de requête change avec selectedCountry
  } = useQuery({
    // La clé de requête inclut `selectedCountry` pour se ré-exécuter si celui-ci change
    queryKey: ['recommendation', region, selectedCountry],
    queryFn: () => {
      // Si une liste de pays est affichée, `selectedCountry` sera défini par l'utilisateur.
      // Sinon, `initialCountry` (ou `region`) est utilisé.
      return fetchRecommendation({ region: countryList.length > 0 ? null : region, country: selectedCountry });
    },
    enabled: !!(region || selectedCountry),
    onSuccess: (data) => {
      // Si la requête initiale était par région et a retourné une liste de pays potentiels (non implémenté côté backend pour l'instant)
      // ou si le backend est modifié pour retourner une liste de pays au lieu d'une erreur pour une région ambiguë.
      // Cette logique est un placeholder pour la fonctionnalité de sélection de pays.
      // Pour l'instant, le backend choisit le premier pays si une région est donnée.
      // La logique de sélection de pays sera affinée à l'étape 11.
      if (data && data.potentialCountries && data.potentialCountries.length > 1 && !initialCountry) {
        setCountryList(data.potentialCountries);
        setSelectedCountry(null); // Effacer le pays sélectionné pour forcer le choix
      } else {
        setCountryList([]); // S'assurer que la liste est vide si une recommandation directe est obtenue
      }
    }
  });

  // Gérer la sélection d'un pays depuis la liste
  const handleCountrySelection = (countryName) => {
    setSelectedCountry(countryName);
    setCountryList([]); // Cacher la liste après sélection
    // La requête useQuery se ré-exécutera automatiquement car `selectedCountry` dans queryKey a changé.
  };

  if (isLoading) {
    return <div className="loading-state">{t('loading_text')}</div>;
  }

  if (isError) {
    return <div className="error-state">{t('error_text', { message: error.response?.data?.error?.message || error.message })}</div>;
  }

  // Si une liste de pays est à afficher pour sélection
  if (countryList.length > 0 && !selectedCountry) {
    return (
      <div className="country-selection-dialog">
        <h3>{t('country_selection_title', { region: region })}</h3>
        <ul className="country-selection-list">
          {countryList.map((countryItem, index) => (
            <li key={index}>
              <button onClick={() => handleCountrySelection(countryItem.name)}>
                {countryItem.name} {/* Supposant que countryItem a une propriété name */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!recommendation && !isLoading) { // Vérifier aussi !isLoading pour éviter un flash de "no_data_text"
    return <div className="no-data-state">{t('no_data_text')}</div>;
  }
  
  // S'assurer que recommendation et ses sous-propriétés existent avant de les utiliser
  if (!recommendation || !recommendation.country || !recommendation.weather || !recommendation.tips) {
      if (!isLoading) { // Ne pas afficher si encore en chargement
          console.error("Recommendation data is incomplete:", recommendation);
          return <div className="error-state">{t('error_text', { message: 'Incomplete recommendation data received.' })}</div>;
      }
      return null; // Ou un autre placeholder pendant que les données sont finalisées
  }

  const { country: countryInfo, weather: weatherInfo, tips: healthTipsData } = recommendation;

  return (
    <div className="results-page">
      {/* Le titre est déjà dans App.jsx, ici on peut avoir un sous-titre si besoin */}
      <div className="recommendation-dashboard">
        <DestinationCard countryInfo={countryInfo} />
        <WeatherWidget weatherInfo={weatherInfo} capitalName={countryInfo.capital} />
        <HealthTips tips={healthTipsData} />
      </div>
    </div>
  );
};

export default Result;

