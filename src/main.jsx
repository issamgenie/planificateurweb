import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
//import './index.css'; // Optionnel, si vous avez un fichier CSS global
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n'; // Importer la configuration i18n

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

