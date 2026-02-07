import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'];
const CF_GEO_LANG_ENABLED =
  (import.meta.env.VITE_ENABLE_CF_GEO_LANG ?? 'true') !== 'false';

const normalizeLanguage = (lng) => (lng ? lng.split('-')[0] : 'pt');
const isSupportedLanguage = (lng) =>
  SUPPORTED_LANGUAGES.includes(normalizeLanguage(lng));

const languageToHtmlLang = (lng) => {
  const base = normalizeLanguage(lng);
  if (base === 'pt') return 'pt-BR';
  if (base === 'en') return 'en';
  if (base === 'es') return 'es';
  return base || 'pt-BR';
};

const readCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const cookie = document.cookie
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${name}=`));
  if (!cookie) return null;
  return decodeURIComponent(cookie.slice(name.length + 1));
};

const readStoredLanguage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const fromLocalStorage = window.localStorage.getItem('lang');
    if (fromLocalStorage && isSupportedLanguage(fromLocalStorage)) {
      return normalizeLanguage(fromLocalStorage);
    }
  } catch {
    // ignore
  }

  const fromCookie = readCookie('lang');
  if (fromCookie && isSupportedLanguage(fromCookie)) {
    return normalizeLanguage(fromCookie);
  }

  return null;
};

const persistLanguage = (lng) => {
  if (typeof window === 'undefined') return;
  if (!lng || !isSupportedLanguage(lng)) return;

  const normalized = normalizeLanguage(lng);

  try {
    window.localStorage.setItem('lang', normalized);
  } catch {
    // ignore
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `lang=${encodeURIComponent(normalized)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
};

const syncHtmlLang = (lng) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = languageToHtmlLang(lng);
};

const LUSOPHONE_COUNTRIES = new Set([
  'BR',
  'PT',
  'AO',
  'MZ',
  'CV',
  'GW',
  'TL',
  'ST',
]);

const SPANISH_SPEAKING_COUNTRIES = new Set([
  'AR',
  'BO',
  'CL',
  'CO',
  'CR',
  'CU',
  'DO',
  'EC',
  'ES',
  'GT',
  'HN',
  'MX',
  'NI',
  'PA',
  'PE',
  'PR',
  'PY',
  'SV',
  'UY',
  'VE',
]);

const languageFromCountry = (countryCode) => {
  if (!countryCode) return null;
  const code = countryCode.trim().toUpperCase();

  if (LUSOPHONE_COUNTRIES.has(code)) return 'pt';
  if (SPANISH_SPEAKING_COUNTRIES.has(code)) return 'es';
  return 'en';
};

const detectCloudflareGeoLanguage = async () => {
  if (typeof window === 'undefined') return null;
  if (!CF_GEO_LANG_ENABLED) return null;

  try {
    const res = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
    if (!res.ok) return null;
    const trace = await res.text();
    const locLine = trace
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l.startsWith('loc='));

    const country = locLine ? locLine.slice('loc='.length) : null;
    const lng = languageFromCountry(country);
    return lng && isSupportedLanguage(lng) ? lng : null;
  } catch {
    return null;
  }
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
      // Prefer persisting only explicit choices (LanguageSwitcher) or CF geo default.
      caches: [],
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

// Cloudflare geo-IP default language (only when the user hasn't picked a language yet).
// Works when the site is behind Cloudflare (orange cloud). We fetch /cdn-cgi/trace and
// use `loc=` to pick pt/es/en.
if (!readStoredLanguage()) {
  detectCloudflareGeoLanguage().then((geoLng) => {
    if (!geoLng) return;

    // Don't override an explicit choice made while the request was in-flight.
    if (readStoredLanguage()) return;

    const current = normalizeLanguage(i18n.resolvedLanguage || i18n.language);
    if (normalizeLanguage(geoLng) !== current) {
      i18n.changeLanguage(geoLng).catch(() => {});
    }
    persistLanguage(geoLng);
  });
}

export default i18n;
