import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import DonationModal from './DonationModal';

const Hero = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Overlay Simples e Elegante */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2000"
        >
          <source src="/assets/videos/clouds.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient background - Azul Céu Vibrante */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-transparent to-sky-300/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="/LogoRafael.png"
            alt={t('hero.logoAlt')}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full shadow-2xl ring-4 ring-white/30"
          />
        </Motion.div>

        <Motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
        >
          <span className="block mb-4 text-shadow-xl">
            {t('hero.title.line1')}
          </span>
          <Motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dourado-suave text-shadow-lg font-bold"
          >
            {t('hero.title.line2')}
          </Motion.span>
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-12 text-shadow"
        >
          {t('hero.subtitle')}
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToStory}
            className="px-10 py-4 bg-gradient-to-r from-azul-horizonte to-azul-ceu text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            aria-label={t('hero.aria.story')}
          >
            {t('hero.buttons.story')}
          </Motion.button>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDonationModalOpen(true)}
            className="px-10 py-4 bg-white text-azul-horizonte font-semibold text-lg rounded-full border-2 border-azul-horizonte shadow-xl hover:bg-azul-horizonte hover:text-white transition-all duration-300"
            aria-label={t('hero.aria.support')}
          >
            {t('hero.buttons.support')}
          </Motion.button>
        </Motion.div>
      </div>

      {/* Scroll Indicator */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <Motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="flex flex-col items-center text-white cursor-pointer group"
          onClick={scrollToStory}
          role="button"
          tabIndex={0}
          aria-label={t('hero.aria.scroll')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToStory();
            }
          }}
        >
          <span className="text-sm mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
            {t('hero.scroll.more')}
          </span>
          <FiChevronDown className="text-3xl" />
        </Motion.div>
      </Motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 z-20" aria-hidden="true">
        <Motion.div
          animate={{
            rotate: [0, 360],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="opacity-30"
        >
          ✈️
        </Motion.div>
      </div>
      <div className="absolute top-20 right-20 z-20" aria-hidden="true">
        <Motion.div
          animate={{
            rotate: [0, -360],
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="opacity-30"
        >
          ✈️
        </Motion.div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
