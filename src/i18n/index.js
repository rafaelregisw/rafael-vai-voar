import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'];

const normalizeLanguage = (lng) => (lng ? lng.split('-')[0] : 'pt');

const languageToHtmlLang = (lng) => {
  const base = normalizeLanguage(lng);
  if (base === 'pt') return 'pt-BR';
  if (base === 'en') return 'en';
  if (base === 'es') return 'es';
  return base || 'pt-BR';
};

const syncHtmlLang = (lng) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = languageToHtmlLang(lng);
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: 'pt',
    ns: ['common'],
    defaultNS: 'common',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'lang',
      lookupCookie: 'lang',
      cookieMinutes: 60 * 24 * 365, // 1 year
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', syncHtmlLang);
syncHtmlLang(i18n.resolvedLanguage);

export default i18n;

