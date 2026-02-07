import { useState, useRef } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import {
  FiInstagram,
  FiShare2,
  FiMail,
  FiMessageCircle,
  FiHeart,
  FiUsers,
  FiSend,
  FiYoutube,
  FiDollarSign
} from 'react-icons/fi';
import { FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Trans, useTranslation } from 'react-i18next';
import DonationModal from './DonationModal';

const CTA = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const shareUrl = "https://rafaelvaivoar.org.br";
  const shareText = t('cta.shareText');

  const socialLinks = {
    whatsapp: `https://wa.me/19146093655?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    instagram: 'https://www.instagram.com/rafaelvaivoar',
    youtube: 'https://www.youtube.com/@rafaelvaivoar'
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-azul-horizonte via-azul-ceu to-dourado-suave/20 animate-gradient" />
        <Motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, #FFD700 0%, transparent 50%), radial-gradient(circle at 80% 20%, #87CEEB 0%, transparent 50%), radial-gradient(circle at 40% 40%, #5B9BD5 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="relative z-10 max-container section-padding">
        {/* Main CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow-xl">
            <Trans i18nKey="cta.heading" components={[<span key="0" className="text-dourado-suave" />]} />
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 text-shadow">
            {t('cta.description')}
          </p>

          {/* Main Donation Button */}
          <Motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDonationModalOpen(true)}
            className="relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-dourado-suave via-yellow-300 to-dourado-suave text-preto-suave font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all group"
          >
            <Motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <FiHeart className="text-2xl" />
            </Motion.div>
            <span>{t('cta.buttons.support')}</span>
            <FiDollarSign className="text-xl opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Pulse Effect */}
            <Motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-dourado-suave to-yellow-300"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </Motion.button>
        </Motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Share Card */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-dark backdrop-blur-lg rounded-2xl p-8 text-center group hover:scale-105 transition-transform"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiShare2 className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t('cta.cards.share.title')}</h3>
            <p className="text-white/80 mb-6 font-semibold">
              {t('cta.cards.share.description')}
            </p>
            <div className="flex justify-center gap-3">
              <Motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </Motion.a>
              <Motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all"
                title="Instagram"
              >
                <FiInstagram className="text-xl" />
              </Motion.a>
              <Motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                title="YouTube"
              >
                <FaYoutube className="text-xl" />
              </Motion.a>
            </div>
          </Motion.div>

          {/* Instagram Card */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-dark backdrop-blur-lg rounded-2xl p-8 text-center group hover:scale-105 transition-transform"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiInstagram className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t('cta.cards.instagram.title')}</h3>
            <p className="text-white/80 mb-6">
              {t('cta.cards.instagram.description')}
            </p>
            <Motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              @rafaelvaivoar
            </Motion.a>
          </Motion.div>

          {/* YouTube Card */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-dark backdrop-blur-lg rounded-2xl p-8 text-center group hover:scale-105 transition-transform"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaYoutube className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t('cta.cards.youtube.title')}</h3>
            <p className="text-white/80 mb-6">
              {t('cta.cards.youtube.description')}
            </p>
            <Motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              {t('cta.cards.youtube.button')}
            </Motion.a>
          </Motion.div>
        </div>

        {/* Newsletter Section */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-dark backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <FiMail className="text-5xl text-dourado-suave mx-auto mb-4" />
            <h3 className="text-3xl font-serif font-bold text-white mb-3">
              {t('cta.newsletter.title')}
            </h3>
            <p className="text-white/80">
              {t('cta.newsletter.description')}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('cta.newsletter.emailPlaceholder')}
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-all"
                required
              />
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-dourado-suave to-yellow-300 text-preto-suave font-bold rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    {t('cta.newsletter.subscribed')}
                  </>
                ) : (
                  <>
                    {t('cta.newsletter.subscribeButton')}
                    <FiSend className="text-xl" />
                  </>
                )}
              </Motion.button>
            </div>
            <p className="text-white/60 text-sm text-center mt-4">
              {t('cta.newsletter.privacy')}
            </p>
          </form>
        </Motion.div>

        {/* Impact Stats */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center"
        >
          <div>
            <FiUsers className="text-4xl text-white mx-auto mb-3" />
            <p className="text-3xl font-bold text-dourado-suave">10K+</p>
            <p className="text-white/80">{t('cta.impact.supporters')}</p>
          </div>
          <div>
            <FiMessageCircle className="text-4xl text-white mx-auto mb-3" />
            <p className="text-3xl font-bold text-dourado-suave">500K+</p>
            <p className="text-white/80">{t('cta.impact.reach')}</p>
          </div>
          <div>
            <FiShare2 className="text-4xl text-white mx-auto mb-3" />
            <p className="text-3xl font-bold text-dourado-suave">50K+</p>
            <p className="text-white/80">{t('cta.impact.shares')}</p>
          </div>
          <div>
            <FiHeart className="text-4xl text-white mx-auto mb-3" />
            <p className="text-3xl font-bold text-dourado-suave">100%</p>
            <p className="text-white/80">{t('cta.impact.committed')}</p>
          </div>
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

export default CTA;
