import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importer les fichiers de traduction
// Pour l'instant, nous allons les définir directement ici pour la simplicité,
// mais ils seront déplacés dans des fichiers JSON séparés plus tard.

const resources = {
  en: {
    translation: {
      "app_title": "Weather-Health Travel Planner",
      "home_page_title": "Weather-Health Travel Planner",
      "region_label": "Region (e.g., Europe):",
      "country_label": "Country (e.g., Italy):",
      "get_recommendation_button": "Get Recommendation",
      "footer_text": "© 2025 Weather-Health Travel Planner",
      "nav_home": "Home",
      "loading_text": "Loading...",
      "error_text": "Error: {{message}}",
      "no_data_text": "No recommendation data available.",
      "results_page_title": "Your Travel Recommendation",
      "destination_card_title": "Destination: Travel to {{countryName}}!",
      "destination_details": "The capital, {{capital}}, uses {{currency}} and speaks {{language}}.",
      "weather_widget_title": "Weather in {{capital}}",
      "weather_details": "It will be {{temp}}°C with {{humidity}}% humidity ({{condition}}).",
      "health_tips_title": "Health Tips",
      "error_no_fruit": "No specific local fruits found for this country. We recommend inquiring locally to discover seasonal products.",
      "provide_region_or_country": "Please provide a region or country",
      "country_selection_title": "Multiple countries found in {{region}}. Please select one:",
      "select_country_button": "Select Country"
    }
  },
  fr: {
    translation: {
      "app_title": "Planificateur de Voyage Météo-Santé",
      "home_page_title": "Planificateur de voyage Météo-Santé",
      "region_label": "Région (ex. : Europe) :",
      "country_label": "Pays (ex. : Italy) :",
      "get_recommendation_button": "Obtenir une recommandation",
      "footer_text": "© 2025 Planificateur de Voyage Météo-Santé",
      "nav_home": "Accueil",
      "loading_text": "Chargement...",
      "error_text": "Erreur : {{message}}",
      "no_data_text": "Aucune donnée de recommandation disponible.",
      "results_page_title": "Votre Recommandation de Voyage",
      "destination_card_title": "Destination : Voyagez en {{countryName}} !",
      "destination_details": "La capitale, {{capital}}, utilise {{currency}} et parle {{language}}.",
      "weather_widget_title": "Météo à {{capital}}",
      "weather_details": "Il fera {{temp}}°C avec {{humidity}}% d’humidité ({{condition}}).",
      "health_tips_title": "Conseils Santé",
      "error_no_fruit": "Aucun fruit local spécifique n'a été trouvé pour ce pays. Nous vous recommandons de vous renseigner sur place pour découvrir les produits de saison.",
      "provide_region_or_country": "Veuillez fournir une région ou un pays",
      "country_selection_title": "Plusieurs pays trouvés dans la région {{region}}. Veuillez en sélectionner un :",
      "select_country_button": "Sélectionner le Pays"
    }
  },
  es: {
    translation: {
      "app_title": "Planificador de Viaje Clima-Salud",
      "home_page_title": "Planificador de Viaje Clima-Salud",
      "region_label": "Región (ej. Europa):",
      "country_label": "País (ej. Italia):",
      "get_recommendation_button": "Obtener Recomendación",
      "footer_text": "© 2025 Planificador de Viaje Clima-Salud",
      "nav_home": "Inicio",
      "loading_text": "Cargando...",
      "error_text": "Error: {{message}}",
      "no_data_text": "No hay datos de recomendación disponibles.",
      "results_page_title": "Su Recomendación de Viaje",
      "destination_card_title": "Destino: ¡Viaje a {{countryName}}!",
      "destination_details": "La capital, {{capital}}, usa {{currency}} y habla {{language}}.",
      "weather_widget_title": "Clima en {{capital}}",
      "weather_details": "Estará a {{temp}}°C con {{humidity}}% de humedad ({{condition}}).",
      "health_tips_title": "Consejos de Salud",
      "error_no_fruit": "No se encontraron frutas locales específicas para este país. Le recomendamos preguntar localmente para descubrir los productos de temporada.",
      "provide_region_or_country": "Por favor, proporcione una región o un país",
      "country_selection_title": "Se encontraron varios países en la región {{region}}. Por favor seleccione uno:",
      "select_country_button": "Seleccionar País"
    }
  }
};

i18n
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Passe i18n à react-i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la détection échoue ou si la langue n'est pas supportée
    interpolation: {
      escapeValue: false // React gère déjà l'échappement XSS
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    }
  });

export default i18n;

