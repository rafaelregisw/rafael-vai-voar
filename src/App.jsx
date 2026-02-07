import { useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import Hero from './components/Hero';
import Story from './components/Story';
import Numbers from './components/Numbers';
import Journey from './components/Journey';
import Video from './components/Video';
import Manifesto from './components/Manifesto';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen overflow-x-hidden"
      >
        <LanguageSwitcher />

        {/* Loading Animation */}
        <Motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-azul-horizonte to-azul-ceu flex items-center justify-center"
        >
          <Motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            ✈️
          </Motion.div>
        </Motion.div>

        {/* Main Content */}
        <main>
          <Hero />
          <Story />
          <Numbers />
          <Journey />
          <Video />
          <Manifesto />
          <CTA />
        </main>

        <Footer />

        {/* Floating WhatsApp Button */}
        <Motion.a
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={`https://wa.me/19146093655?text=${encodeURIComponent(t('whatsapp.floatingMessage'))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </Motion.a>
      </Motion.div>
    </AnimatePresence>
  );
}

export default App;
