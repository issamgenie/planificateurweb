import React from 'react';
import { useTranslation } from 'react-i18next';

const HealthTips = ({ tips }) => {
  const { t } = useTranslation();

  if (!tips || tips.length === 0) {
    // Ce cas devrait être géré par le message spécifique dans le moteur de recommandation,
    // mais au cas où, on peut afficher un message générique ou rien.
    // Pour l'instant, le message est construit dans le moteur et passé tel quel.
    return null; 
  }

  return (
    <div className="health-tips component-card">
      <h3>{t('health_tips_title')}</h3>
      {tips.map((tip, index) => (
        <p key={index}>{tip.message}</p>
      ))}
    </div>
  );
};

export default HealthTips;

