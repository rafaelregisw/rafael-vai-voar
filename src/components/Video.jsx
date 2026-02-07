import { useState, useRef } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { Trans, useTranslation } from 'react-i18next';

const Video = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({
    onu: false,
    cirurgia: false,
    simuladores: false
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Função para obter thumbnail com fallback
  const getThumbnailUrl = (videoId, quality = 'maxresdefault') => {
    // Tenta múltiplas qualidades de thumbnail
    // maxresdefault > hqdefault > mqdefault > default
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const mainVideoId = "MmeehCjBxHs"; // Domingo Espetacular
  const thumbnailUrl = getThumbnailUrl(mainVideoId, 'maxresdefault');

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleCardPlay = (videoKey) => {
    setPlayingVideos(prev => ({
      ...prev,
      [videoKey]: true
    }));
  };

  const videos = [
    {
      key: 'onu',
      id: 'KJPW01A1gmQ',
    },
    {
      key: 'cirurgia',
      id: 'gtqN2V_DO_o',
    },
    {
      key: 'simuladores',
      id: 'WosULAsvar0',
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-cinza-suave to-white">
      <div className="max-container section-padding">
        {/* Section Header */}
        <Motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-preto-suave mb-6">
            <Trans i18nKey="video.heading" components={[<span key="0" className="gradient-text" />]} />
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('video.description')}
          </p>
        </Motion.div>

        {/* Main Video Container */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <img
                  src={thumbnailUrl}
                  alt={t('video.main.thumbnailAlt')}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback para qualidade menor se a imagem não carregar
                    if (e.target.src.includes('maxresdefault')) {
                      e.target.src = getThumbnailUrl(mainVideoId, 'hqdefault');
                    } else if (e.target.src.includes('hqdefault')) {
                      e.target.src = getThumbnailUrl(mainVideoId, 'mqdefault');
                    } else if (e.target.src.includes('mqdefault')) {
                      e.target.src = getThumbnailUrl(mainVideoId, 'default');
                    }
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Play Button */}
                <Motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-all">
                    <FiPlay className="text-4xl md:text-5xl text-azul-horizonte ml-2" />
                  </div>
                </Motion.button>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-shadow-lg">
                    {t('video.main.title')}
                  </h3>
                  <p className="text-white/80 text-shadow">
                    {t('video.main.subtitle')}
                  </p>
                </div>
              </>
            ) : (
              /* YouTube Iframe */
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={t('video.main.iframeTitle')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </Motion.div>

        {/* Videos Grid */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center text-preto-suave mb-10">
            {t('video.othersTitle')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <Motion.div
                key={video.key}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg bg-black aspect-video">
                  {!playingVideos[video.key] ? (
                    <>
                      {/* Thumbnail */}
                      <img
                        src={getThumbnailUrl(video.id, video.id === 'gtqN2V_DO_o' ? 'hqdefault' : 'maxresdefault')}
                        alt={t(`video.cards.${video.key}.title`)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback para qualidade menor se a imagem não carregar
                          if (e.target.src.includes('maxresdefault')) {
                            e.target.src = getThumbnailUrl(video.id, 'hqdefault');
                          } else if (e.target.src.includes('hqdefault')) {
                            e.target.src = getThumbnailUrl(video.id, 'mqdefault');
                          } else if (e.target.src.includes('mqdefault')) {
                            e.target.src = getThumbnailUrl(video.id, 'default');
                          }
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      {/* Play Button */}
                      <button
                        onClick={() => handleCardPlay(video.key)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all">
                          <FiPlay className="text-3xl text-azul-horizonte ml-1" />
                        </div>
                      </button>

                      {/* Video Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-semibold text-shadow-lg">
                          {t(`video.cards.${video.key}.title`)}
                        </h4>
                        <p className="text-white/80 text-sm text-shadow">
                          {t(`video.cards.${video.key}.description`)}
                        </p>
                      </div>
                    </>
                  ) : (
                    /* YouTube Iframe */
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                      title={t(`video.cards.${video.key}.title`)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Video;
