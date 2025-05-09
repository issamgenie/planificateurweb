import axios from 'axios';

// Lire l'URL de l'API depuis les variables d'environnement de Vite
const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchRecommendation = async ({ region, country }) => {
  const { data } = await apiClient.post('/v1/recommendation', { region, country });
  return data;
};

// Exporter l'instance apiClient si elle doit être utilisée directement ailleurs
export default apiClient;

