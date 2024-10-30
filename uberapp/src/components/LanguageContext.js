import React, { createContext, useContext, useState } from 'react';

//  un contexte de langue
const LanguageContext = createContext();

// Fournisseur de contexte de langue
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Par défaut en français

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useLanguage = () => {
  return useContext(LanguageContext);
};
