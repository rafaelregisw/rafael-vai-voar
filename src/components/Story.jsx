import { motion as Motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const TIMELINE_EVENTS = [
  {
    id: "startNightmare",
    year: "2012",
    icon: "🎯",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=800"
  },
  {
    id: "decadeDarkness",
    year: "2012-2022",
    icon: "💔",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800"
  },
  {
    id: "loveAnchor",
    year: "2018",
    icon: "❤️",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800"
  },
  {
    id: "worldJourney",
    year: "2022",
    icon: "🌍",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800"
  },
  {
    id: "lifeSavingSurgery",
    year: "2023",
    icon: "🏥",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800"
  },
  {
    id: "patientToAdvocate",
    year: "2024",
    icon: "✊",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800"
  },
  {
    id: "rafaelWillFly",
    year: "2025",
    icon: "✈️",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800"
  }
];

const TimelineItem = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16 md:mb-24`}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <Motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="glass rounded-3xl p-6 md:p-8 backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/30 shadow-2xl"
          style={{
            boxShadow: '0 20px 60px rgba(135,206,235,0.2), 0 0 100px rgba(135,206,235,0.1)',
            transform: 'perspective(1000px)'
          }}
        >
          <span className="text-dourado-suave font-black text-xl"
                style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
            {event.year}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-preto-suave mt-2 mb-4"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            {event.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {event.description}
          </p>
          {event.image && (
            <Motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-4 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </Motion.div>
          )}
        </Motion.div>
      </div>

      {/* Timeline Icon */}
      <div className="w-2/12 flex justify-center">
        <Motion.div
          whileHover={{ scale: 1.3, rotate: 360, boxShadow: '0 0 60px rgba(135,206,235,0.8)' }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-azul-horizonte via-azul-ceu to-dourado-suave rounded-full flex items-center justify-center text-4xl shadow-2xl"
          style={{
            boxShadow: '0 10px 40px rgba(135,206,235,0.5), 0 0 80px rgba(135,206,235,0.2)',
            animation: 'glow-pulse 3s ease-in-out infinite'
          }}
        >
          {event.icon}
        </Motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12" />
    </Motion.div>
  );
};

const Story = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const timelineEvents = TIMELINE_EVENTS.map((event) => ({
    ...event,
    title: t(`story.timeline.${event.id}.title`),
    description: t(`story.timeline.${event.id}.description`),
  }));

  return (
    <section id="story" className="py-20 md:py-32 bg-gradient-to-b from-white to-cinza-suave">
      <div className="max-container section-padding">
        {/* Section Header */}
        <Motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-preto-suave mb-6">
            <Trans i18nKey="story.heading" components={[<span key="0" className="gradient-text" />]} />
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('story.description')}
          </p>
        </Motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-azul-horizonte to-azul-ceu" />

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-serif text-preto-suave mb-8">
            <Trans i18nKey="story.quote" components={[<span key="0" className="gradient-gold" />]} />
          </p>
          <p className="text-lg text-gray-600 italic">{t('story.quoteAuthor')}</p>
        </Motion.div>
      </div>
    </section>
  );
};

export default Story;
