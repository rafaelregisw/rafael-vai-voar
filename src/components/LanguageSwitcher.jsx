import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const normalizeLanguage = (lng) => (lng ? lng.split('-')[0] : 'pt');

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const current = normalizeLanguage(i18n.resolvedLanguage || i18n.language);

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);

    // Persist preference even if the detector cache is disabled/misconfigured.
    try {
      window.localStorage.setItem('lang', lng);
    } catch {
      // ignore
    }
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `lang=${encodeURIComponent(lng)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  };

  return (
    <div className="fixed top-4 right-4 z-[60]">
      <label htmlFor="language" className="sr-only">
        {t('languageSwitcher.label')}
      </label>
      <select
        id="language"
        value={current}
        onChange={(e) => setLanguage(e.target.value)}
        className="glass-dark rounded-full px-4 py-2 text-white shadow-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-dourado-suave/70 cursor-pointer"
        aria-label={t('languageSwitcher.ariaLabel')}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
