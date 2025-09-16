import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';

const Video = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-cinza-suave to-white">
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
            Momentos <span className="gradient-text">Importantes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe os momentos marcantes da jornada de Rafael.
            Uma história de coragem que inspira o mundo.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center text-preto-suave mb-10">
            Mais Momentos da Jornada
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Video Card 1 - ONU */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => window.open('https://www.youtube.com/watch?v=KJPW01A1gmQ', '_blank')}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://img.youtube.com/vi/KJPW01A1gmQ/maxresdefault.jpg`}
                  alt="Reconhecimento na ONU"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h4 className="text-white font-semibold">Reconhecimento na ONU</h4>
                    <p className="text-white/80 text-sm">Assista no YouTube</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <FiPlay className="text-2xl text-azul-horizonte ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Card 2 - Depoimento de Rafael */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => window.open('https://www.youtube.com/watch?v=gtqN2V_DO_o', '_blank')}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://img.youtube.com/vi/gtqN2V_DO_o/maxresdefault.jpg`}
                  alt="Depoimento de Rafael"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h4 className="text-white font-semibold">Cirurgia nos EUA</h4>
                    <p className="text-white/80 text-sm">Assista o depoimento completo</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <FiPlay className="text-2xl text-azul-horizonte ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Card 3 - Simuladores */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => window.open('https://www.youtube.com/watch?v=WosULAsvar0', '_blank')}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://img.youtube.com/vi/WosULAsvar0/maxresdefault.jpg`}
                  alt="Retorno aos Simuladores"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h4 className="text-white font-semibold">Retorno aos Simuladores</h4>
                    <p className="text-white/80 text-sm">Assista no YouTube</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <FiPlay className="text-2xl text-azul-horizonte ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;