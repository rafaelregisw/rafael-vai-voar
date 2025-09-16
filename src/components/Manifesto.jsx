import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const manifestoPoints = [
  {
    id: 1,
    title: "Acesso Universal",
    description: "Todo brasileiro com doença rara deve ter acesso a tratamentos especializados, independente de sua condição financeira.",
    icon: "🏥"
  },
  {
    id: 2,
    title: "Protocolo Nacional",
    description: "Criação de um protocolo nacional para dor crônica extrema, garantindo diagnóstico rápido e tratamento adequado.",
    icon: "📋"
  },
  {
    id: 3,
    title: "Centros de Referência",
    description: "Estabelecimento de centros especializados em cada região do Brasil para tratamento de condições neurológicas raras.",
    icon: "🏛️"
  },
  {
    id: 4,
    title: "Fast-Track SUS",
    description: "Sistema prioritário no SUS para casos graves, eliminando a burocracia que pode custar vidas.",
    icon: "⚡"
  },
  {
    id: 5,
    title: "Dignidade no Tratamento",
    description: "Humanização do atendimento, reconhecendo a dor invisível e oferecendo suporte psicológico integrado.",
    icon: "💙"
  }
];

const Manifesto = () => {
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
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-preto-suave via-azul-horizonte to-preto-suave opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000')] bg-cover bg-center opacity-30" />

        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
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
      </motion.div>

      <div className="relative z-10 max-container section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow-xl">
            Nosso <span className="text-dourado-suave">Manifesto</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-shadow">
            Por um Brasil onde nenhuma dor seja ignorada e nenhum sonho seja destruído
            por falta de acesso à saúde
          </p>
        </motion.div>

        {/* Manifesto Quote */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-white text-shadow-xl italic">
            "A dor não escolhe classe social,<br />
            mas o <span className="text-dourado-suave">tratamento</span> sim.<br />
            Isso precisa <span className="text-dourado-suave">mudar</span>."
          </blockquote>
          <cite className="text-white/80 text-lg mt-4 block">— Rafael Regis Azevedo</cite>
        </motion.div>

        {/* Manifesto Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {manifestoPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-dark backdrop-blur-lg rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-bold text-dourado-suave mb-3">
                {point.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Signature Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-dark backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl font-serif font-bold text-white mb-6">
            Junte-se a este movimento
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Sua voz importa. Ao assinar este manifesto, você se une a milhares de brasileiros
            na luta por um sistema de saúde mais justo e humano.
          </p>

          {!signedManifesto ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSignedManifesto(true)}
              className="btn-primary text-lg inline-flex items-center gap-3"
            >
              Assinar o Manifesto
              <FiCheck className="text-xl" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 text-dourado-suave text-xl font-semibold"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FiCheck className="text-3xl" />
              </motion.div>
              Manifesto Assinado! Obrigado pelo apoio.
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div>
              <p className="text-3xl font-bold text-dourado-suave">50K+</p>
              <p className="text-white/60 text-sm">Assinaturas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dourado-suave">15</p>
              <p className="text-white/60 text-sm">Estados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dourado-suave">100+</p>
              <p className="text-white/60 text-sm">Cidades</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dourado-suave">3</p>
              <p className="text-white/60 text-sm">Projetos de Lei</p>
            </div>
          </div>
        </motion.div>

        {/* Final Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-serif text-white text-shadow-xl">
            Juntos, podemos transformar <span className="text-dourado-suave">dor em propósito</span>
            <br />
            e <span className="text-dourado-suave">sofrimento em solução</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;