import React from 'react';
import { useTranslation } from 'react-i18next';

const DestinationCard = ({ countryInfo }) => {
  const { t } = useTranslation();

  if (!countryInfo) {
    return null; // Ou un message indiquant que les informations ne sont pas disponibles
  }

  const { name, capital, currencies, languages } = countryInfo;

  return (
    <div className="destination-card component-card">
      <h3>{t('destination_card_title', { countryName: name })}</h3>
      <p>
        {t('destination_details', {
          capital: capital,
          currency: currencies,
          language: languages,
        })}
      </p>
    </div>
  );
};

export default DestinationCard;

