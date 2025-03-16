import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Language, type Translations, languages } from "./translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: {
  children: ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("foodscan-language");
    return (stored as Language) || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem("foodscan-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof Translations) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
