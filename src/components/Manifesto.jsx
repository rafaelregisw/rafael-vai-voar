import { useRef, useState } from 'react';
import { motion as Motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { Trans, useTranslation } from 'react-i18next';

const MANIFESTO_POINTS = [
  {
    id: "universalAccess",
    icon: "🏥"
  },
  {
    id: "nationalProtocol",
    icon: "📋"
  },
  {
    id: "referenceCenters",
    icon: "🏛️"
  },
  {
    id: "susFastTrack",
    icon: "⚡"
  },
  {
    id: "dignityInCare",
    icon: "💙"
  }
];

const Manifesto = () => {
  const { t } = useTranslation();
  const [signedManifesto, setSignedManifesto] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Parallax Background */}
      <Motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-preto-suave via-azul-horizonte to-preto-suave opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000')] bg-cover bg-center opacity-30" />

        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <Motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </Motion.div>

      <div className="relative z-10 max-container section-padding">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow-xl">
            <Trans i18nKey="manifesto.heading" components={[<span key="0" className="text-dourado-suave" />]} />
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-shadow">
            {t('manifesto.description')}
          </p>
        </Motion.div>

        {/* Manifesto Quote */}
        <Motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-white text-shadow-xl italic">
            <Trans
              i18nKey="manifesto.quote"
              components={[<span key="0" className="text-dourado-suave" />, <br key="1" />]}
            />
          </blockquote>
          <cite className="text-white/80 text-lg mt-4 block">{t('manifesto.quoteAuthor')}</cite>
        </Motion.div>

        {/* Manifesto Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {MANIFESTO_POINTS.map((point, index) => (
            <Motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-dark backdrop-blur-lg rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-bold text-dourado-suave mb-3">
                {t(`manifesto.points.${point.id}.title`)}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t(`manifesto.points.${point.id}.description`)}
              </p>
            </Motion.div>
          ))}
        </div>

        {/* Signature Section */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-dark backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl font-serif font-bold text-white mb-6">
            {t('manifesto.join.title')}
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t('manifesto.join.description')}
          </p>

          {!signedManifesto ? (
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSignedManifesto(true)}
              className="btn-primary text-lg inline-flex items-center gap-3"
            >
              {t('manifesto.join.signButton')}
              <FiCheck className="text-xl" />
            </Motion.button>
          ) : (
            <Motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 text-dourado-suave text-xl font-semibold"
            >
              <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FiCheck className="text-3xl" />
              </Motion.div>
              {t('manifesto.join.signedMessage')}
            </Motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div>
              <p className="text-3xl font-bold text-dourado-suave">50K+</p>
              <p className="text-white/60 text-sm">{t('manifesto.stats.signatures')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dourado-suave">15</p>
              <p className="text-white/60 text-sm">{t('manifesto.stats.states')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dourado-suave">100+</p>
              <p className="text-white/60 text-sm">{t('manifesto.stats.cities')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dourado-suave">3</p>
              <p className="text-white/60 text-sm">{t('manifesto.stats.bills')}</p>
            </div>
          </div>
        </Motion.div>

        {/* Final Quote */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-serif text-white text-shadow-xl">
            <Trans
              i18nKey="manifesto.finalQuote"
              components={[<span key="0" className="text-dourado-suave" />, <br key="1" />]}
            />
          </p>
        </Motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
