import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: 40, suffix: "%", label: "Gain temps étude", desc: "Accélération des phases de conception" },
  { value: 30, suffix: "%", label: "Erreurs terrain", desc: "Réduction des reprises et malfaçons" },
  { value: 100, suffix: "%", label: "Traçabilité réseau", desc: "Audit complet de chaque équipement" },
  { value: 24, suffix: "/7", label: "Vision temps réel", desc: "Disponibilité totale des données" }
];

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const Impact = () => {
  return (
    <section id="impact" className="py-24 relative overflow-hidden bg-brand/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Impact Business</h2>
          <p className="text-white/50">Des résultats concrets pour votre rentabilité opérationnelle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-8 rounded-2xl bg-black/40 border border-white/5 glow-red"
            >
              <div className="text-5xl md:text-6xl font-black text-brand mb-4 font-display">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xl font-bold mb-2">{stat.label}</div>
              <p className="text-sm text-white/40">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
