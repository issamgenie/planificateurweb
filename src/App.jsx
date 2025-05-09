import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import Home from './pages/Home'; // Importer la page Home
import Result from './pages/Result'; // Importer la page Result
import './App.css'; // Importer le CSS global

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-main-title">{t('app_title')}</h1>
          <nav className="app-nav">
            <Link to="/">{t('nav_home')}</Link>
            {/* D'autres liens de navigation peuvent être ajoutés ici */}
          </nav>
        </div>
        <LanguageSelector />
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>{t('footer_text')}</p>
      </footer>
    </div>
  );
}

export default App;

