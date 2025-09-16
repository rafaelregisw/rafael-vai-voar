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
    position: { x: 35, y: 70 }, // Percentual position on map
    color: 'from-green-500 to-yellow-500'
  },
  {
    id: 'germany',
    name: 'Alemanha',
    emoji: '🇩🇪',
    description: 'Dr. Sudhoff - A primeira esperança',
    detail: 'Em Bielefeld, Alemanha, o Dr. Sudhoff foi o primeiro a identificar corretamente a neuralgia do nervo intermédio e propor um tratamento.',
    position: { x: 51, y: 25 },
    color: 'from-red-500 to-yellow-500'
  },
  {
    id: 'usa',
    name: 'Estados Unidos',
    emoji: '🇺🇸',
    description: 'UConn Health - A cirurgia salvadora',
    detail: 'Na Universidade de Connecticut, a equipe médica realizou a cirurgia complexa que finalmente libertou Rafael de uma década de dor.',
    position: { x: 22, y: 35 },
    color: 'from-blue-500 to-red-500'
  },
  {
    id: 'un',
    name: 'ONU - Nova York',
    emoji: '🇺🇳',
    description: 'Voz global pelos pacientes com dor',
    detail: 'Rafael levou sua história à ONU, defendendo políticas públicas globais para pacientes com doenças raras e dor crônica extrema.',
    position: { x: 26, y: 32 },
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
          <div className="relative bg-gradient-to-br from-azul-ceu/20 to-azul-horizonte/20 rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden">
            {/* World Map SVG */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Water/Ocean Background */}
              <rect x="0" y="0" width="1000" height="500" fill="#E0F4FD" opacity="0.5" />

              {/* Continents */}
              <g className="continents" fill="#87CEEB" fillOpacity="0.3" stroke="#5B9BD5" strokeWidth="1">
                {/* North America */}
                <motion.path
                  d="M 150,180 Q 180,150 220,160 L 280,170 L 320,190 L 340,220 L 320,250 L 280,270 L 240,280 L 200,260 L 170,230 L 150,200 Z"
                  initial={{ fillOpacity: 0, pathLength: 0 }}
                  animate={isInView ? { fillOpacity: 0.3, pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />

                {/* South America */}
                <motion.path
                  d="M 280,320 L 300,300 L 320,310 L 340,330 L 360,360 L 370,400 L 360,430 L 340,450 L 320,460 L 300,440 L 280,400 L 270,360 Z"
                  initial={{ fillOpacity: 0, pathLength: 0 }}
                  animate={isInView ? { fillOpacity: 0.3, pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />

                {/* Europe */}
                <motion.path
                  d="M 480,140 L 500,130 L 520,135 L 540,140 L 560,150 L 550,170 L 530,180 L 510,175 L 490,165 L 480,150 Z"
                  initial={{ fillOpacity: 0, pathLength: 0 }}
                  animate={isInView ? { fillOpacity: 0.3, pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />

                {/* Africa */}
                <motion.path
                  d="M 480,220 L 500,200 L 520,210 L 540,230 L 550,260 L 560,300 L 550,340 L 530,370 L 500,380 L 470,360 L 460,320 L 465,280 L 470,250 Z"
                  initial={{ fillOpacity: 0, pathLength: 0 }}
                  animate={isInView ? { fillOpacity: 0.3, pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Asia */}
                <motion.path
                  d="M 580,120 L 620,110 L 680,120 L 740,140 L 780,160 L 800,190 L 780,220 L 740,230 L 680,220 L 620,210 L 580,180 L 570,150 Z"
                  initial={{ fillOpacity: 0, pathLength: 0 }}
                  animate={isInView ? { fillOpacity: 0.3, pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />

                {/* Australia/Oceania */}
                <motion.path
                  d="M 720,360 L 760,350 L 800,360 L 820,380 L 810,410 L 780,420 L 740,410 L 720,390 Z"
                  initial={{ fillOpacity: 0, pathLength: 0 }}
                  animate={isInView ? { fillOpacity: 0.3, pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </g>

              {/* Grid lines for latitude/longitude effect */}
              <g stroke="#5B9BD5" strokeWidth="0.5" opacity="0.2">
                {/* Latitude lines */}
                <line x1="0" y1="125" x2="1000" y2="125" strokeDasharray="5,5" />
                <line x1="0" y1="250" x2="1000" y2="250" strokeDasharray="5,5" />
                <line x1="0" y1="375" x2="1000" y2="375" strokeDasharray="5,5" />

                {/* Longitude lines */}
                <line x1="250" y1="0" x2="250" y2="500" strokeDasharray="5,5" />
                <line x1="500" y1="0" x2="500" y2="500" strokeDasharray="5,5" />
                <line x1="750" y1="0" x2="750" y2="500" strokeDasharray="5,5" />
              </g>

              {/* Connection Lines between locations */}
              <g stroke="url(#pathGradient)" strokeWidth="2" fill="none">
                {/* Brazil to Germany */}
                <motion.path
                  d="M 350,350 Q 450,200 510,125"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1 }}
                />
                {/* Germany to USA */}
                <motion.path
                  d="M 510,125 Q 350,100 220,175"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1.3 }}
                />
                {/* USA to UN */}
                <motion.path
                  d="M 220,175 L 260,160"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1.6 }}
                />
              </g>

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#87CEEB" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5B9BD5" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Location Pins - Overlaid on SVG */}
            <div className="absolute inset-0">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute"
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLocation(location)}
                    className="relative group"
                  >
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${location.color} animate-ping opacity-30`} />

                    {/* Pin */}
                    <div className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${location.color} shadow-xl flex items-center justify-center text-xl md:text-2xl hover:shadow-2xl transition-all border-2 border-white`}>
                      {location.emoji}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap">
                        <p className="font-semibold text-preto-suave">{location.name}</p>
                        <p className="text-xs text-gray-600 max-w-[200px] whitespace-normal">{location.description}</p>
                      </div>
                      <div className="w-3 h-3 bg-white rotate-45 absolute left-1/2 transform -translate-x-1/2 -bottom-1.5" />
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
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