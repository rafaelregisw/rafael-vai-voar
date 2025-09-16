import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineEvents = [
  {
    year: "2012",
    title: "O Início do Pesadelo",
    description: "Aos 19 anos, Rafael era um jovem fisiculturista, recém-casado e cheio de sonhos. Um simples zumbido no ouvido marcou o início de uma jornada de dor inimaginável.",
    icon: "🎯",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=800"
  },
  {
    year: "2012-2022",
    title: "A Década na Escuridão",
    description: "10 anos com dor nível 10/10, 24 horas por dia. Mais de 100 médicos consultados, zero diagnóstico. A neuralgia do nervo intermédio, conhecida como 'doença do suicídio', testou todos os limites.",
    icon: "💔",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800"
  },
  {
    year: "2018",
    title: "O Amor que Sustenta",
    description: "Luana, sua esposa, tornou-se sua âncora. Nos momentos mais sombrios, quando a dor parecia invencível, o amor incondicional foi a luz que o manteve vivo.",
    icon: "❤️",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800"
  },
  {
    year: "2022",
    title: "A Jornada Mundial",
    description: "Após anos de busca, a esperança surgiu na Alemanha com o Dr. Sudhoff. Mais de 50 mil pessoas ao redor do mundo se uniram para tornar o tratamento possível.",
    icon: "🌍",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800"
  },
  {
    year: "2023",
    title: "A Cirurgia Salvadora",
    description: "Na UConn Health, Estados Unidos, Rafael finalmente encontrou alívio. A cirurgia complexa foi um sucesso, marcando o fim de uma década de sofrimento ininterrupto.",
    icon: "🏥",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800"
  },
  {
    year: "2024",
    title: "De Paciente a Advogado",
    description: "Rafael transformou sua dor em propósito. Reconhecido na ONU, Câmara e Senado, hoje luta por políticas públicas para que nenhum brasileiro sofra em silêncio com doenças raras.",
    icon: "✊",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800"
  },
  {
    year: "2025",
    title: "Rafael Vai Voar",
    description: "O sonho de ser piloto, que o manteve vivo durante os anos de dor, está sendo retomado. Rafael está de volta aos simuladores, provando que nenhum sonho é grande demais quando se tem esperança.",
    icon: "✈️",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800"
  }
];

const TimelineItem = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16 md:mb-24`}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <motion.div
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-4 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Timeline Icon */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.3, rotate: 360, boxShadow: '0 0 60px rgba(135,206,235,0.8)' }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-azul-horizonte via-azul-ceu to-dourado-suave rounded-full flex items-center justify-center text-4xl shadow-2xl"
          style={{
            boxShadow: '0 10px 40px rgba(135,206,235,0.5), 0 0 80px rgba(135,206,235,0.2)',
            animation: 'glow-pulse 3s ease-in-out infinite'
          }}
        >
          {event.icon}
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
};

const Story = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section id="story" className="py-20 md:py-32 bg-gradient-to-b from-white to-cinza-suave">
      <div className="max-container section-padding">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-preto-suave mb-6">
            Uma Jornada de <span className="gradient-text">Superação</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Do sonho interrompido ao voo retomado, conheça cada capítulo desta história
            que inspirou milhões e chegou até a ONU
          </p>
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-serif text-preto-suave mb-8">
            "A dor me ensinou que <span className="gradient-gold">nenhum sonho</span> deve morrer
            por falta de <span className="gradient-gold">esperança</span>"
          </p>
          <p className="text-lg text-gray-600 italic">- Rafael Regis Azevedo</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;