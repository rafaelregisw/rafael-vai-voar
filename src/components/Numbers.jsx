import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiClock, FiUsers, FiGlobe, FiHeart, FiTrendingUp, FiAward } from 'react-icons/fi';

const Counter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    icon: FiClock,
    value: 3650,
    suffix: "",
    label: "Dias de Dor Ininterrupta",
    description: "10 anos, 24 horas por dia, nível 10/10",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: FiUsers,
    value: 100,
    suffix: "+",
    label: "Médicos Consultados",
    description: "Sem diagnóstico por uma década",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FiGlobe,
    value: 150,
    suffix: "",
    label: "Casos no Mundo",
    description: "Rafael é o único caso conhecido no Brasil",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: FiHeart,
    value: 50000,
    suffix: "+",
    label: "Pessoas que Doaram",
    description: "União mundial pela vida de Rafael",
    color: "from-pink-500 to-red-500"
  },
  {
    icon: FiTrendingUp,
    value: 1000000,
    suffix: "+",
    label: "Pessoas Alcançadas",
    description: "História que inspirou o Brasil",
    color: "from-yellow-500 to-amber-500"
  },
  {
    icon: FiAward,
    value: 3,
    suffix: "",
    label: "Reconhecimentos Oficiais",
    description: "ONU, Câmara Federal e Senado",
    color: "from-indigo-500 to-blue-500"
  }
];

const Numbers = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-sky-400 via-blue-400 to-cyan-400 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-dourado-suave/10 rounded-full blur-3xl" />
      </div>

      <div className="max-container section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-shadow-xl">
            Números que <span className="text-dourado-suave">Impactam</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-shadow">
            Cada número conta uma parte desta jornada extraordinária de superação e esperança
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-dark backdrop-blur-lg rounded-2xl p-6 text-center group cursor-pointer"
              >
                {/* Icon Simples e Menor */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <Icon className="text-2xl text-white" />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-dourado-suave mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/80 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-10 md:mt-12"
        >
          <p className="text-2xl md:text-3xl font-serif text-white text-shadow-xl">
            "Cada número representa uma batalha vencida,
            <br />
            cada estatística, uma razão para <span className="text-dourado-suave">nunca desistir</span>."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Numbers;