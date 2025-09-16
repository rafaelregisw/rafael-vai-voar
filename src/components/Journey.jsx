import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiGlobe, FiHeart, FiAward } from 'react-icons/fi';

const locations = [
  {
    id: 'brazil',
    name: 'Brasil',
    emoji: '🇧🇷',
    description: '100+ médicos consultados, zero diagnóstico',
    detail: 'Durante 10 anos, Rafael percorreu hospitais e clínicas por todo o Brasil. Nenhum médico conseguiu diagnosticar sua condição rara.',
    position: { top: '65%', left: '35%' },
    color: 'from-green-500 to-yellow-500'
  },
  {
    id: 'germany',
    name: 'Alemanha',
    emoji: '🇩🇪',
    description: 'Dr. Sudhoff - A primeira esperança',
    detail: 'Em Bielefeld, Alemanha, o Dr. Sudhoff foi o primeiro a identificar corretamente a neuralgia do nervo intermédio e propor um tratamento.',
    position: { top: '30%', left: '52%' },
    color: 'from-red-500 to-yellow-500'
  },
  {
    id: 'usa',
    name: 'Estados Unidos',
    emoji: '🇺🇸',
    description: 'UConn Health - A cirurgia salvadora',
    detail: 'Na Universidade de Connecticut, a equipe médica realizou a cirurgia complexa que finalmente libertou Rafael de uma década de dor.',
    position: { top: '40%', left: '25%' },
    color: 'from-blue-500 to-red-500'
  },
  {
    id: 'un',
    name: 'ONU - Nova York',
    emoji: '🇺🇳',
    description: 'Voz global pelos pacientes com dor',
    detail: 'Rafael levou sua história à ONU, defendendo políticas públicas globais para pacientes com doenças raras e dor crônica extrema.',
    position: { top: '42%', left: '23%' },
    color: 'from-blue-600 to-blue-400'
  }
];

const Journey = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-azul-ceu/10">
      <div className="max-container section-padding">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-preto-suave mb-6">
            Uma Jornada <span className="gradient-text">Mundial</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De Goiânia à ONU, a busca incansável por respostas e tratamento
            que cruzou continentes e inspirou o mundo
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* World Map Background */}
          <div className="relative bg-gradient-to-br from-azul-ceu/20 to-azul-horizonte/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Decorative World Map SVG */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 150,250 Q 200,200 250,250 T 350,250 Q 400,200 450,250 T 550,250 Q 600,200 650,250 T 750,250 Q 800,200 850,250"
                stroke="#5B9BD5"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              {/* Simplified world map paths */}
              <ellipse cx="500" cy="250" rx="450" ry="200" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.3" />
              <ellipse cx="500" cy="250" rx="350" ry="150" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.3" />
              <ellipse cx="500" cy="250" rx="250" ry="100" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.3" />
            </svg>

            {/* Location Pins */}
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                className="absolute"
                style={location.position}
              >
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocation(location)}
                  className={`relative group`}
                >
                  {/* Pulse Animation */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${location.color} animate-ping opacity-30`} />

                  {/* Pin */}
                  <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${location.color} shadow-xl flex items-center justify-center text-2xl md:text-3xl hover:shadow-2xl transition-all`}>
                    {location.emoji}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap">
                      <p className="font-semibold text-preto-suave">{location.name}</p>
                      <p className="text-xs text-gray-600">{location.description}</p>
                    </div>
                    <div className="w-3 h-3 bg-white rotate-45 absolute left-1/2 transform -translate-x-1/2 -bottom-1.5" />
                  </div>
                </motion.button>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path
                d="M 350,325 Q 520,150 550,130"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M 250,200 Q 350,180 550,130"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.7 }}
              />
              <motion.path
                d="M 230,210 Q 240,205 250,200"
                stroke="url(#gradient3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.9 }}
              />
              <defs>
                <linearGradient id="gradient1">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#87CEEB" />
                </linearGradient>
                <linearGradient id="gradient2">
                  <stop offset="0%" stopColor="#87CEEB" />
                  <stop offset="100%" stopColor="#5B9BD5" />
                </linearGradient>
                <linearGradient id="gradient3">
                  <stop offset="0%" stopColor="#5B9BD5" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Selected Location Detail */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedLocation.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {selectedLocation.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-preto-suave mb-2">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-gray-700 mb-2 font-semibold">
                    {selectedLocation.description}
                  </p>
                  <p className="text-gray-600">
                    {selectedLocation.detail}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Journey Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          <div className="text-center">
            <FiGlobe className="text-4xl text-azul-horizonte mx-auto mb-3" />
            <p className="text-2xl font-bold text-preto-suave">4</p>
            <p className="text-gray-600">Países visitados</p>
          </div>
          <div className="text-center">
            <FiMapPin className="text-4xl text-azul-horizonte mx-auto mb-3" />
            <p className="text-2xl font-bold text-preto-suave">15+</p>
            <p className="text-gray-600">Cidades percorridas</p>
          </div>
          <div className="text-center">
            <FiHeart className="text-4xl text-azul-horizonte mx-auto mb-3" />
            <p className="text-2xl font-bold text-preto-suave">50K+</p>
            <p className="text-gray-600">Km viajados</p>
          </div>
          <div className="text-center">
            <FiAward className="text-4xl text-azul-horizonte mx-auto mb-3" />
            <p className="text-2xl font-bold text-preto-suave">1</p>
            <p className="text-gray-600">Vida salva</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;