import React from 'react';
import { useTranslation } from 'react-i18next';

const WeatherWidget = ({ weatherInfo, capitalName }) => {
  const { t } = useTranslation();

  if (!weatherInfo) {
    return null; // Ou un message indiquant que les informations ne sont pas disponibles
  }

  const { temp, humidity, condition } = weatherInfo;

  return (
    <div className="weather-widget component-card">
      <h3>{t('weather_widget_title', { capital: capitalName })}</h3>
      <p>
        {t('weather_details', {
          temp: temp,
          humidity: humidity,
          condition: condition,
        })}
      </p>
    </div>
  );
};

export default WeatherWidget;

