import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPlay, FiPause, FiMaximize } from 'react-icons/fi';

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const videoId = "gtqN2V_DO_o";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

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
            Assista ao <span className="gradient-text">Depoimento</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rafael conta sua jornada em suas próprias palavras.
            Uma história de dor, amor e superação que precisa ser ouvida.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail do vídeo"
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-all">
                    <FiPlay className="text-4xl md:text-5xl text-azul-horizonte ml-2" />
                  </div>
                </motion.button>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-shadow-lg">
                    A História de Rafael Regis
                  </h3>
                  <p className="text-white/80 text-shadow">
                    Documentário completo sobre a jornada de superação
                  </p>
                </div>
              </>
            ) : (
              /* YouTube Iframe */
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Depoimento de Rafael Regis"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>

          {/* Video Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-azul-horizonte">1M+</p>
              <p className="text-gray-600">Visualizações</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-azul-horizonte">50K+</p>
              <p className="text-gray-600">Compartilhamentos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-azul-horizonte">10K+</p>
              <p className="text-gray-600">Comentários</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Videos Grid */}
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
            {/* Video Card 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=600"
                  alt="Momento 1"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h4 className="text-white font-semibold">Reconhecimento na ONU</h4>
                    <p className="text-white/80 text-sm">5:42</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <FiPlay className="text-2xl text-azul-horizonte ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Card 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=600"
                  alt="Momento 2"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h4 className="text-white font-semibold">Cirurgia na Alemanha</h4>
                    <p className="text-white/80 text-sm">8:15</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <FiPlay className="text-2xl text-azul-horizonte ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Card 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600"
                  alt="Momento 3"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h4 className="text-white font-semibold">Retorno aos Simuladores</h4>
                    <p className="text-white/80 text-sm">3:27</p>
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